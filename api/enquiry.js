// POST /api/enquiry — public "Send your requirement" / quote form.
// Optional attachments (photo, drawing or PDF datasheet) are sent as base64 and
// stored alongside other uploads. Images are resized in the browser first.
import { updateDb, saveImage } from '../lib/storage.js';
import { send, body, handleError, newId } from '../lib/http.js';

const str = (v, max) => (v == null ? '' : String(v).trim().slice(0, max));
const MAX_FILES = 3;
const MAX_TOTAL = 4 * 1024 * 1024;

// Light protection against floods from a single address (per server instance).
const recent = new Map();
function tooMany(ip) {
  const now = Date.now();
  const list = (recent.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  recent.set(ip, list);
  return list.length > 8;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  try {
    const b = body(req);
    if (b.website) return send(res, 200, { ok: true }); // honeypot field for bots
    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
    if (tooMany(ip)) return send(res, 429, { error: 'Too many enquiries from your connection. Please call or email us instead.' });

    const enquiry = {
      id: newId('enq'),
      name: str(b.name, 120),
      company: str(b.company, 200),
      phone: str(b.phone, 60),
      email: str(b.email, 200),
      region: str(b.region, 200),
      industry: str(b.industry, 200),
      message: str(b.message, 5000),
      productId: str(b.productId, 100),
      productName: str(b.productName, 200),
      source: str(b.source, 120),
      attachments: [],
      status: 'new',
      notes: '',
      createdAt: new Date().toISOString(),
    };
    if (!enquiry.name || (!enquiry.email && !enquiry.phone) || !enquiry.message) {
      return send(res, 400, { error: 'Please enter your name, a phone number or email, and what you require.' });
    }
    if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
      return send(res, 400, { error: 'Please enter a valid email address.' });
    }

    const files = Array.isArray(b.attachments) ? b.attachments.slice(0, MAX_FILES) : [];
    let total = 0;
    for (const f of files) {
      const buffer = Buffer.from(String(f?.data || '').replace(/^data:[^,]+,/, ''), 'base64');
      total += buffer.length;
      if (!buffer.length) continue;
      if (total > MAX_TOTAL) return send(res, 413, { error: 'Attachments are too large (max 4 MB in total).' });
      const url = await saveImage(buffer, f.contentType, f.filename, { folder: 'enquiries', allowPdf: true });
      enquiry.attachments.push({ name: str(f.filename, 200) || 'file', url });
    }

    await updateDb((db) => {
      db.enquiries.unshift(enquiry);
      db.enquiries = db.enquiries.slice(0, 3000);
    }, { part: 'enquiries' });
    send(res, 200, { ok: true });
  } catch (err) {
    handleError(res, err);
  }
}
