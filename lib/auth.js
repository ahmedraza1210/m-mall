import crypto from 'node:crypto';

const TOKEN_DAYS = 7;

function secret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'dev-only-secret';
}

export function adminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  // Never allow the default password on a deployed site.
  if (process.env.VERCEL) return null;
  return 'admin123';
}

const b64url = (buf) => Buffer.from(buf).toString('base64url');
const sign = (payload) => crypto.createHmac('sha256', secret()).update(payload).digest('base64url');

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

export function checkPassword(input) {
  const pw = adminPassword();
  return Boolean(pw) && safeEqual(input || '', pw);
}

export function createToken() {
  const payload = b64url(JSON.stringify({ role: 'admin', exp: Date.now() + TOKEN_DAYS * 864e5 }));
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token) {
  if (!token || !token.includes('.')) return false;
  const [payload, sig] = token.split('.');
  if (!safeEqual(sig, sign(payload))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.role === 'admin' && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function isAdmin(req) {
  const header = req.headers['authorization'] || '';
  return verifyToken(header.replace(/^Bearer\s+/i, ''));
}
