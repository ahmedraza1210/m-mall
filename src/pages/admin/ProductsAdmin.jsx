import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader } from './ui.jsx';
import Icon from '../../components/Icon.jsx';
import MachineImage from '../../components/MachineImage.jsx';

export default function ProductsAdmin() {
  const { db, remove, notify, handleError } = useAdmin();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const catById = Object.fromEntries(db.categories.map((c) => [c.id, c]));
  const term = q.trim().toLowerCase();
  const rows = db.products.filter(
    (p) =>
      (!cat || p.categoryId === cat) &&
      (!term || [p.name, p.brand, p.model].join(' ').toLowerCase().includes(term))
  );

  async function onDelete(p) {
    if (!window.confirm(`Delete "${p.name}"? Its photos will be deleted too. This can't be undone.`)) return;
    try {
      await remove('products', p.id);
      notify('Product deleted');
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <>
      <AdminHeader title="Products" subtitle="Add machines, upload photos and edit specifications.">
        <Link to="/admin/products/new" className="btn btn--primary"><Icon name="plus" size={18} /> Add product</Link>
      </AdminHeader>
      <div className="toolbar">
        <label className="search">
          <Icon name="search" size={18} />
          <input type="search" placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {db.categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      {rows.length === 0 ? (
        <div className="empty">
          <h3>{db.products.length ? 'No products match' : 'No products yet'}</h3>
          {!db.products.length && <Link to="/admin/products/new" className="btn btn--primary">Add your first product</Link>}
        </div>
      ) : (
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Photos</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link to={`/admin/products/${p.id}`} className="row-title">
                      <MachineImage className="thumb" src={p.images?.[0]} alt="" />
                      <span>
                        <strong>{p.name}</strong>
                        <small className="muted">{[p.brand, p.model].filter(Boolean).join(' · ') || '—'}</small>
                      </span>
                    </Link>
                  </td>
                  <td>{catById[p.categoryId]?.name || <span className="muted">None</span>}</td>
                  <td>{p.images?.length || <span className="pill pill--warn">0</span>}</td>
                  <td>
                    {p.featured && <span className="pill pill--accent"><Icon name="star" size={12} /> Featured</span>} {p.availability && <span className="pill">{p.availability}</span>}
                  </td>
                  <td className="actions">
                    <a className="icon-btn" href={`/products/${p.slug}`} target="_blank" rel="noreferrer" aria-label="View on site"><Icon name="eye" size={17} /></a>
                    <Link className="icon-btn" to={`/admin/products/${p.id}`} aria-label="Edit"><Icon name="edit" size={17} /></Link>
                    <button className="icon-btn icon-btn--danger" onClick={() => onDelete(p)} aria-label="Delete"><Icon name="trash" size={17} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
