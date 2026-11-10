// POST /api/upload { filename, contentType, data (base64) } → { url }
// Images are resized in the browser before upload, so they stay well under
// Vercel's 4.5 MB request limit.
import { saveImage } from '../lib/storage.js';
import { isAdmin } from '../lib/auth.js';
import { send, body, handleError } from '../lib/http.js';

const MAX_BYTES = 4 * 1024 * 1024;

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  if (!isAdmin(req)) return send(res, 401, { error: 'Please log in again.' });
  try {
    const { filename, contentType, data } = body(req);
    if (!data) return send(res, 400, { error: 'No image received' });
    const buffer = Buffer.from(String(data).replace(/^data:[^,]+,/, ''), 'base64');
    if (buffer.length > MAX_BYTES) return send(res, 413, { error: 'Image is too large (max 4 MB).' });
    const url = await saveImage(buffer, contentType, filename);
    send(res, 200, { url });
  } catch (err) {
    handleError(res, err);
  }
}
