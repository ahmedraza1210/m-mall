// Content storage without a database.
//
// - On Vercel: data lives in Vercel Blob (Vercel's built-in file storage):
//     * machinery-mall/data/content.json  — everything shown on the website
//       (settings, industries, products, case studies, brands). It is public
//       information anyway, so a fixed file name is fine.
//     * machinery-mall/private/enquiries-<random>.json — customer enquiries.
//       The random name is created on first save and never published, so the
//       file can't be found by visitors even though the store is public.
//   Uploaded images are Blob files too.
//   Works with both ways Vercel connects a store: OIDC (BLOB_STORE_ID, the
//   current default) or a read-write token (BLOB_READ_WRITE_TOKEN).
// - Locally (no Blob store): data is saved in ./data/ and images in ./public/uploads.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { seed } from './seed.js';

const CONTENT_PATH = 'machinery-mall/data/content.json';
const ENQUIRIES_PREFIX = 'machinery-mall/private/enquiries-';

// A custom prefix may be chosen when connecting a store in Vercel (e.g.
// MYSTORE_READ_WRITE_TOKEN / MYSTORE_STORE_ID), so look for either name.
function envMatch(suffix, valuePrefix) {
  const entry = Object.entries(process.env).find(([k, v]) => k.endsWith(suffix) && String(v).startsWith(valuePrefix));
  return entry ? entry[1] : '';
}
function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || envMatch('READ_WRITE_TOKEN', 'vercel_blob_rw_');
}
function blobStoreId() {
  return process.env.BLOB_STORE_ID || envMatch('_STORE_ID', 'store_');
}
const useBlob = () => Boolean(blobToken() || blobStoreId());
// Credentials for @vercel/blob calls. With OIDC the library fetches its own
// short-lived token; we only have to tell it which store to use.
function auth() {
  const token = blobToken();
  if (token) return { token };
  return { storeId: blobStoreId() };
}
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
const LOCAL_CONTENT = path.join(ROOT, 'data', 'content.json');
const LOCAL_ENQUIRIES = path.join(ROOT, 'data', 'enquiries.json');
const LOCAL_LEGACY = path.join(ROOT, 'data', 'db.json');
const LOCAL_UPLOADS = path.join(ROOT, 'public', 'uploads');

function withDefaults(db) {
  const base = structuredClone(seed);
  return {
    settings: { ...base.settings, ...(db.settings || {}) },
    industries: db.industries ?? base.industries,
    products: db.products ?? base.products,
    caseStudies: db.caseStudies ?? base.caseStudies,
    brandGroups: db.brandGroups ?? base.brandGroups,
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

async function blobApi() {
  return globalThis.__MM_BLOB_TEST__ || import('@vercel/blob'); // test hook
}

async function getJson(pathname, { fresh }) {
  const { get } = await blobApi();
  const result = await get(pathname, { access: 'public', useCache: !fresh, ...auth() }).catch((err) => {
    if (err?.name === 'BlobNotFoundError') return null;
    throw blobError(err);
  });
  if (!result || !result.stream) return null;
  return JSON.parse(await new Response(result.stream).text());
}

async function putJson(pathname, data, { random = false } = {}) {
  const { put } = await blobApi();
  return put(pathname, JSON.stringify(data, null, 2), {
    ...auth(),
    access: 'public',
    addRandomSuffix: random,
    allowOverwrite: !random,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  }).catch((err) => {
    throw blobError(err);
  });
}

// The enquiries file name is random; find it once per server instance.
let enquiriesPathname = null;
async function findEnquiriesPathname() {
  if (enquiriesPathname) return enquiriesPathname;
  const { list } = await blobApi();
  const res = await list({ prefix: ENQUIRIES_PREFIX, limit: 10, ...auth() }).catch((err) => {
    throw blobError(err);
  });
  const latest = res.blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0];
  enquiriesPathname = latest ? latest.pathname : null;
  return enquiriesPathname;
}

async function readLocal(file) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

async function writeLocal(file, data) {
  if (isVercel()) throw new StorageNotConfiguredError();
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

async function readContent({ fresh }) {
  if (useBlob()) return withDefaults((await getJson(CONTENT_PATH, { fresh })) || {});
  return withDefaults((await readLocal(LOCAL_CONTENT)) || (await readLocal(LOCAL_LEGACY)) || {});
}

async function readEnquiries() {
  if (useBlob()) {
    const pathname = await findEnquiriesPathname();
    return pathname ? (await getJson(pathname, { fresh: true })) || [] : [];
  }
  const local = await readLocal(LOCAL_ENQUIRIES);
  if (local) return local;
  return (await readLocal(LOCAL_LEGACY))?.enquiries || [];
}

async function writeContent(content) {
  const { enquiries, ...rest } = content; // never publish enquiries in the content file
  if (useBlob()) return void (await putJson(CONTENT_PATH, rest));
  await writeLocal(LOCAL_CONTENT, rest);
}

async function writeEnquiries(enquiries) {
  if (useBlob()) {
    const pathname = await findEnquiriesPathname();
    if (pathname) return void (await putJson(pathname, enquiries));
    const blob = await putJson(`${ENQUIRIES_PREFIX}${crypto.randomBytes(12).toString('hex')}.json`, enquiries, { random: true });
    enquiriesPathname = blob.pathname;
    return;
  }
  await writeLocal(LOCAL_ENQUIRIES, enquiries);
}

/**
 * Read the site data.
 * - `enquiries: true` also loads customer enquiries (admin only).
 * - `fresh: true` reads straight from storage; otherwise a copy up to ~60 s old may be used.
 */
export async function readDb({ enquiries = false, fresh = true } = {}) {
  const content = await readContent({ fresh });
  return { ...content, enquiries: enquiries ? await readEnquiries() : [] };
}

/**
 * Read, modify and save in one step.
 * `part` is 'content' (default) or 'enquiries' — only that part is loaded and saved.
 */
export async function updateDb(mutator, { part = 'content' } = {}) {
  if (part === 'enquiries') {
    const db = { enquiries: await readEnquiries() };
    const result = await mutator(db);
    await writeEnquiries(db.enquiries);
    return result;
  }
  const db = await readContent({ fresh: true });
  const result = await mutator(db);
  await writeContent(db);
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
  const name = `${base}-${crypto.randomBytes(folder === 'uploads' ? 4 : 12).toString('hex')}.${ext}`;

  if (useBlob()) {
    const { put } = await blobApi();
    const blob = await put(`machinery-mall/${folder}/${name}`, buffer, {
      ...auth(),
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
    const { del } = await blobApi();
    await del(url, auth()).catch(() => {});
  } else if (url.startsWith('/uploads/')) {
    const file = path.join(LOCAL_UPLOADS, url.slice('/uploads/'.length));
    if (file.startsWith(LOCAL_UPLOADS + path.sep)) await fs.unlink(file).catch(() => {});
  }
}
