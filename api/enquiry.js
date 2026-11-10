// POST /api/enquiry — public quote request / contact form.
import { updateDb } from '../lib/storage.js';
import { send, body, handleError, newId } from '../lib/http.js';

const str = (v, max) => (v == null ? '' : String(v).trim().slice(0, max));

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  try {
    const b = body(req);
    if (b.website) return send(res, 200, { ok: true }); // honeypot field for bots
    const enquiry = {
      id: newId('enq'),
      name: str(b.name, 120),
      email: str(b.email, 200),
      phone: str(b.phone, 60),
      company: str(b.company, 200),
      message: str(b.message, 5000),
      productId: str(b.productId, 100),
      productName: str(b.productName, 200),
      status: 'new',
      notes: '',
      createdAt: new Date().toISOString(),
    };
    if (!enquiry.name || (!enquiry.email && !enquiry.phone) || !enquiry.message) {
      return send(res, 400, { error: 'Please enter your name, a phone or email, and a message.' });
    }
    if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
      return send(res, 400, { error: 'Please enter a valid email address.' });
    }
    await updateDb((db) => {
      db.enquiries.unshift(enquiry);
      db.enquiries = db.enquiries.slice(0, 2000);
    });
    send(res, 200, { ok: true });
  } catch (err) {
    handleError(res, err);
  }
}
