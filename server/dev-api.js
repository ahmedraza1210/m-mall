// Runs the /api functions locally with the same request/response shape Vercel uses.
import http from 'node:http';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
import { promises as fs } from 'node:fs';

const API_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'api');

// Load variables from .env / .env.local for local development.
async function loadEnv() {
  for (const file of ['.env', '.env.local']) {
    try {
      const text = await fs.readFile(path.join(API_DIR, '..', file), 'utf8');
      for (const line of text.split(/\r?\n/)) {
        const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
        if (m && m[2] !== '' && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
      }
    } catch {
      /* file not present */
    }
  }
}

export async function startApi(port = Number(process.env.API_PORT || 3001)) {
  await loadEnv();
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const name = url.pathname.replace(/^\/api\//, '').replace(/\/$/, '');
    if (!/^[a-z-]+$/.test(name)) {
      res.statusCode = 404;
      return res.end('{"error":"Not found"}');
    }
    const file = path.join(API_DIR, `${name}.js`);
    try {
      await fs.access(file);
    } catch {
      res.statusCode = 404;
      return res.end('{"error":"Not found"}');
    }
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const raw = Buffer.concat(chunks).toString();
    try {
      req.body = raw && (req.headers['content-type'] || '').includes('json') ? JSON.parse(raw) : raw;
    } catch {
      req.body = {};
    }
    req.query = Object.fromEntries(url.searchParams);
    try {
      const mod = await import(`${pathToFileURL(file).href}?t=${Date.now()}`);
      await mod.default(req, res);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message }));
    }
  });
  await new Promise((resolve) => server.listen(port, resolve));
  return port;
}
