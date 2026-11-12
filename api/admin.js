// Admin-only API.
// GET  /api/admin                                   → full content incl. enquiries
// POST /api/admin { action: 'save', collection, item }
// POST /api/admin { action: 'delete', collection, id }
// POST /api/admin { action: 'settings', settings }
import { readDb, updateDb, deleteImage } from '../lib/storage.js';
import { isAdmin } from '../lib/auth.js';
import { send, body, handleError, newId } from '../lib/http.js';
import { COLLECTIONS, cleanSettings, uniqueSlug } from '../lib/schema.js';

const fail = (status, message) => Object.assign(new Error(message), { status });

export default async function handler(req, res) {
  if (!isAdmin(req)) return send(res, 401, { error: 'Please log in again.' });
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') return send(res, 200, await readDb({ enquiries: true }));
    if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });

    const { action, collection, item, id, settings } = body(req);

    if (action === 'settings') {
      const saved = await updateDb((db) => {
        db.settings = cleanSettings({ ...db.settings, ...settings });
        return db.settings;
      });
      return send(res, 200, { settings: saved });
    }

    const def = COLLECTIONS[collection];
    if (!def) throw fail(400, 'Unknown collection');
    const part = collection === 'enquiries' ? 'enquiries' : 'content';

    if (action === 'save') {
      if (!item || typeof item !== 'object') throw fail(400, 'Missing item');
      const clean = def.clean(item);
      for (const field of def.required) if (!clean[field]) throw fail(400, `${field} is required`);

      const saved = await updateDb((db) => {
        const list = db[collection];
        const index = item.id ? list.findIndex((x) => x.id === item.id) : -1;
        if (collection === 'enquiries' && index === -1) throw fail(404, 'Enquiry not found');
        const now = new Date().toISOString();
        const existing = index >= 0 ? list[index] : null;
        const record = { ...(existing || {}), ...clean, id: existing?.id || newId(def.prefix), updatedAt: now };
        if (!existing) record.createdAt = now;
        if ('slug' in clean) record.slug = uniqueSlug(list, clean.slug, record.id);
        if (index >= 0) list[index] = record;
        else list.unshift(record);
        return record;
      }, { part });
      return send(res, 200, { item: saved });
    }

    if (action === 'delete') {
      const removed = await updateDb((db) => {
        const list = db[collection];
        const index = list.findIndex((x) => x.id === id);
        if (index === -1) throw fail(404, 'Item not found');
        const [gone] = list.splice(index, 1);
        if (collection === 'industries') {
          db.products.forEach((p) => p.industryId === id && (p.industryId = ''));
          db.caseStudies.forEach((c) => c.industryId === id && (c.industryId = ''));
        }
        if (collection === 'products') {
          db.caseStudies.forEach((c) => (c.productIds = (c.productIds || []).filter((pid) => pid !== id)));
        }
        return gone;
      }, { part });
      // Remove the deleted item's images from storage.
      const files = [...(removed.images || []), removed.image, ...(removed.brands || []).map((b) => b.logo), ...(removed.attachments || []).map((a) => a.url)];
      await Promise.all(files.filter(Boolean).map(deleteImage));
      return send(res, 200, { ok: true });
    }

    throw fail(400, 'Unknown action');
  } catch (err) {
    handleError(res, err);
  }
}
