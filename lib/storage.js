// Content storage without a database.
//
// - On Vercel: content is one JSON file in Vercel Blob (Vercel's built-in file
//   storage) and uploaded images are Blob files too. The JSON file's name is
//   derived from your secret Blob token, so it can't be guessed, and it is
//   always read from origin storage (never a stale CDN copy).
// - Locally (no BLOB_READ_WRITE_TOKEN): content is saved to ./data/db.json and
//   images to ./public/uploads.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { seed } from './seed.js';

// Vercel adds BLOB_READ_WRITE_TOKEN when a Blob store is connected. If a custom
// prefix was chosen when connecting (e.g. MYSTORE_READ_WRITE_TOKEN), find it anyway.
function blobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const entry = Object.entries(process.env).find(([k, v]) => k.endsWith('READ_WRITE_TOKEN') && String(v).startsWith('vercel_blob_rw_'));
  return entry ? entry[1] : '';
}
const useBlob = () => Boolean(blobToken());

// Turn Blob errors into a message the site owner can act on.
function blobError(err) {
  const msg = String(err?.message || err);
  if (/private/i.test(msg) && /access/i.test(msg)) {
    return Object.assign(new Error('Your Vercel Blob store is set to Private. Create a store with Public access (Storage → Create → Blob → Public), connect it to this project and redeploy.'), { status: 503 });
  }
  if (/store.*(not found|does not exist)|suspended/i.test(msg)) {
    return Object.assign(new Error(`Vercel Blob storage problem: ${msg}. Check the store in your Vercel project's Storage tab.`), { status: 503 });
  }
  return err;
}
const isVercel = () => Boolean(process.env.VERCEL);

const ROOT = process.cwd();
const LOCAL_DB = path.join(ROOT, 'data', 'db.json');
const LOCAL_UPLOADS = path.join(ROOT, 'public', 'uploads');

function withDefaults(db) {
  const base = structuredClone(seed);
  return {
    settings: { ...base.settings, ...(db.settings || {}) },
    industries: db.industries ?? base.industries,
    products: db.products ?? base.products,
    caseStudies: db.caseStudies ?? base.caseStudies,
    brandGroups: db.brandGroups ?? base.brandGroups,
    enquiries: db.enquiries ?? [],
  };
}

export class StorageNotConfiguredError extends Error {
  constructor() {
    super(
      'Storage is not connected. In your Vercel project open Storage → Create → Blob (Public access), connect it to this project with the Production environment ticked, then redeploy.'
    );
    this.status = 503;
  }
}

function dbPathname() {
  const hash = crypto.createHash('sha256').update(`mm:${blobToken()}`).digest('hex').slice(0, 24);
  return `machinery-mall/data/content-${hash}.json`;
}

export async function readDb() {
  if (useBlob()) {
    const { get } = await import('@vercel/blob');
    const result = await get(dbPathname(), { access: 'public', useCache: false, token: blobToken() }).catch((err) => {
      if (err?.name === 'BlobNotFoundError') return null;
      throw blobError(err);
    });
    if (!result || !result.stream) return withDefaults({});
    const text = await new Response(result.stream).text();
    return withDefaults(JSON.parse(text));
  }
  try {
    return withDefaults(JSON.parse(await fs.readFile(LOCAL_DB, 'utf8')));
  } catch (err) {
    if (err.code === 'ENOENT') return withDefaults({});
    throw err;
  }
}

export async function writeDb(db) {
  const json = JSON.stringify(db, null, 2);
  if (useBlob()) {
    const { put } = await import('@vercel/blob');
    await put(dbPathname(), json, {
      token: blobToken(),
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
      cacheControlMaxAge: 60,
    }).catch((err) => {
      throw blobError(err);
    });
    return;
  }
  if (isVercel()) throw new StorageNotConfiguredError();
  await fs.mkdir(path.dirname(LOCAL_DB), { recursive: true });
  await fs.writeFile(LOCAL_DB, json);
}

/** Read, modify and save the content in one step. */
export async function updateDb(mutator) {
  const db = await readDb();
  const result = await mutator(db);
  await writeDb(db);
  return result;
}

const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif', 'application/pdf': 'pdf' };

export async function saveImage(buffer, contentType, originalName = 'image', { folder = 'uploads', allowPdf = false } = {}) {
  const ext = EXT[contentType];
  if (!ext || (ext === 'pdf' && !allowPdf)) {
    throw Object.assign(new Error(allowPdf ? 'Only images (JPG, PNG, WEBP) or PDF files are allowed.' : 'Only JPG, PNG, WEBP, GIF or AVIF images are allowed.'), { status: 400 });
  }
  const base =
    originalName
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 40) || 'image';
  const name = `${base}-${crypto.randomBytes(4).toString('hex')}.${ext}`;

  if (useBlob()) {
    const { put } = await import('@vercel/blob');
    const blob = await put(`machinery-mall/${folder}/${name}`, buffer, {
      token: blobToken(),
      access: 'public',
      addRandomSuffix: false,
      contentType,
      cacheControlMaxAge: 31536000,
    }).catch((err) => {
      throw blobError(err);
    });
    return blob.url;
  }
  if (isVercel()) throw new StorageNotConfiguredError();
  const dir = path.join(LOCAL_UPLOADS, folder === 'uploads' ? '' : folder);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), buffer);
  return folder === 'uploads' ? `/uploads/${name}` : `/uploads/${folder}/${name}`;
}

export async function deleteImage(url) {
  if (!url) return;
  if (useBlob() && /^https?:\/\//.test(url) && url.includes('.blob.vercel-storage.com')) {
    const { del } = await import('@vercel/blob');
    await del(url, { token: blobToken() }).catch(() => {});
  } else if (url.startsWith('/uploads/')) {
    const file = path.join(LOCAL_UPLOADS, url.slice('/uploads/'.length));
    if (file.startsWith(LOCAL_UPLOADS + path.sep)) await fs.unlink(file).catch(() => {});
  }
}
