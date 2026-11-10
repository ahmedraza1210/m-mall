// GET /api/content — public site content (no enquiries).
import { readDb } from '../lib/storage.js';
import { send, handleError } from '../lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed' });
  try {
    const { settings, industries, products, caseStudies, brandGroups } = await readDb();
    send(
      res,
      200,
      { settings, industries, products, caseStudies, brandGroups },
      { 'Cache-Control': 'public, max-age=0, s-maxage=5, stale-while-revalidate=30' }
    );
  } catch (err) {
    handleError(res, err);
  }
}
