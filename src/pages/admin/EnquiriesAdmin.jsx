import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader } from './ui.jsx';
import Icon from '../../components/Icon.jsx';
import { formatDateTime } from '../../lib/format.js';

const STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
];

function toCsv(rows) {
  const cols = ['createdAt', 'name', 'company', 'phone', 'email', 'region', 'industry', 'productName', 'source', 'message', 'status', 'notes'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  return [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n');
}

export default function EnquiriesAdmin() {
  const { db, save, remove, notify, handleError } = useAdmin();
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(null);
  const rows = filter ? db.enquiries.filter((e) => e.status === filter) : db.enquiries;
  const productById = Object.fromEntries(db.products.map((p) => [p.id, p]));

  async function update(e, patch) {
    try {
      await save('enquiries', { ...e, ...patch });
      notify('Enquiry updated');
    } catch (err) {
      handleError(err);
    }
  }

  async function onDelete(e) {
    if (!window.confirm(`Delete the enquiry from ${e.name}?`)) return;
    try {
      await remove('enquiries', e.id);
      notify('Enquiry deleted');
    } catch (err) {
      handleError(err);
    }
  }

  function exportCsv() {
    const blob = new Blob([toCsv(rows)], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <>
      <AdminHeader title="Enquiries" subtitle="Requirements sent from the website forms, with any attached photos or datasheets.">
        {db.enquiries.length > 0 && <button className="btn btn--outline" onClick={exportCsv}>Export CSV</button>}
      </AdminHeader>
      <div className="chips chips--spaced">
        <button className={`chip ${!filter ? 'is-active' : ''}`} onClick={() => setFilter('')}>All ({db.enquiries.length})</button>
        {STATUSES.map((s) => (
          <button key={s.value} className={`chip ${filter === s.value ? 'is-active' : ''}`} onClick={() => setFilter(s.value)}>
            {s.label} ({db.enquiries.filter((e) => e.status === s.value).length})
          </button>
        ))}
      </div>
      {rows.length === 0 ? (
        <div className="empty">
          <h3>No enquiries here</h3>
          <p>When visitors use a quote or contact form, their messages appear here.</p>
        </div>
      ) : (
        <div className="enquiries">
          {rows.map((e) => {
            const isOpen = open === e.id;
            const product = productById[e.productId];
            return (
              <article key={e.id} className={`enquiry ${e.status === 'new' ? 'is-new' : ''}`}>
                <button className="enquiry__summary" onClick={() => setOpen(isOpen ? null : e.id)} aria-expanded={isOpen}>
                  <span className={`dot dot--${e.status}`} aria-hidden="true" />
                  <span className="enquiry__who">
                    <strong>{e.name}</strong>
                    {e.company && <small className="muted"> · {e.company}</small>}
                  </span>
                  <span className="enquiry__what muted">{e.productName || e.industry || e.source || 'General enquiry'}</span>
                  <span className="enquiry__when muted small">{formatDateTime(e.createdAt)}</span>
                </button>
                {isOpen && (
                  <div className="enquiry__body">
                    <div className="enquiry__contact">
                      {e.phone && <a href={`tel:${e.phone}`}><Icon name="phone" size={15} /> {e.phone}</a>}
                      {e.email && <a href={`mailto:${e.email}`}><Icon name="mail" size={15} /> {e.email}</a>}
                      {e.phone && (
                        <a href={`https://wa.me/${e.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={15} /> WhatsApp</a>
                      )}
                      {product && <Link to={`/admin/products/${product.id}`}><Icon name="box" size={15} /> {product.name}</Link>}
                    </div>
                    {(e.region || e.industry || e.source) && (
                      <p className="muted small" style={{ margin: 0 }}>
                        {[e.region && `Region: ${e.region}`, e.industry && `Industry: ${e.industry}`, e.source && `Sent from: ${e.source}`].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    <p className="enquiry__message">{e.message}</p>
                    {e.attachments?.length > 0 && (
                      <div className="attachments">
                        {e.attachments.map((a) => (
                          <a key={a.url} href={a.url} target="_blank" rel="noreferrer"><Icon name="file" size={15} /> {a.name}</a>
                        ))}
                      </div>
                    )}
                    <NotesEditor enquiry={e} onSave={(notes) => update(e, { notes })} />
                    <div className="enquiry__actions">
                      <label>
                        Status{' '}
                        <select value={e.status} onChange={(ev) => update(e, { status: ev.target.value })}>
                          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </label>
                      <button className="btn btn--subtle btn--sm icon-danger" onClick={() => onDelete(e)}><Icon name="trash" size={15} /> Delete</button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}

function NotesEditor({ enquiry, onSave }) {
  const [notes, setNotes] = useState(enquiry.notes || '');
  const changed = notes !== (enquiry.notes || '');
  return (
    <div className="notes">
      <textarea rows={2} placeholder="Private notes (only visible to admins)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      {changed && <button className="btn btn--primary btn--sm" onClick={() => onSave(notes)}>Save note</button>}
    </div>
  );
}
