// POST /api/login { password } → { token }
import { checkPassword, createToken, adminPassword } from '../lib/auth.js';
import { send, body } from '../lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  if (!adminPassword()) {
    return send(res, 503, { error: 'Admin password is not set. Add ADMIN_PASSWORD in Vercel → Settings → Environment Variables and redeploy.' });
  }
  const { password } = body(req);
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return send(res, 401, { error: 'Incorrect password' });
  }
  send(res, 200, { token: createToken() });
}
