import { useState } from 'react';
import { api } from '../lib/api.js';
import Icon from './Icon.jsx';

export default function EnquiryForm({ product, compact = false }) {
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: product ? `I'd like a quote for the ${product.name}.` : '',
    website: '',
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: 'sending', message: '' });
    try {
      await api('enquiry', {
        method: 'POST',
        body: { ...form, productId: product?.id || '', productName: product?.name || '' },
      });
      setStatus({ state: 'sent', message: '' });
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  }

  if (status.state === 'sent') {
    return (
      <div className="form-success">
        <Icon name="check" size={28} />
        <h3>Thanks, we've received your enquiry</h3>
        <p>Our sales team will contact you within one working day.</p>
      </div>
    );
  }

  return (
    <form className={`form ${compact ? 'form--compact' : ''}`} onSubmit={submit}>
      <div className="form__row">
        <label className="field">
          <span>Your name *</span>
          <input required value={form.name} onChange={set('name')} autoComplete="name" />
        </label>
        <label className="field">
          <span>Company</span>
          <input value={form.company} onChange={set('company')} autoComplete="organization" />
        </label>
      </div>
      <div className="form__row">
        <label className="field">
          <span>Phone</span>
          <input type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" />
        </label>
        <label className="field">
          <span>Email</span>
          <input type="email" value={form.email} onChange={set('email')} autoComplete="email" />
        </label>
      </div>
      <label className="field">
        <span>Message *</span>
        <textarea required rows={compact ? 4 : 5} value={form.message} onChange={set('message')} />
      </label>
      <input className="hp" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} aria-hidden="true" />
      {status.state === 'error' && <p className="form__error">{status.message}</p>}
      <button className="btn btn--primary btn--block" disabled={status.state === 'sending'}>
        {status.state === 'sending' ? 'Sending…' : product ? 'Request a quote' : 'Send enquiry'}
      </button>
      <p className="form__hint">Add a phone number or email so we can reply.</p>
    </form>
  );
}
