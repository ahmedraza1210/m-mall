import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader } from './ui.jsx';
import Icon from '../../components/Icon.jsx';
import IndustryIcon from '../../components/IndustryIcon.jsx';
import { productTypeCount } from '../../lib/industries.js';

export default function IndustriesAdmin() {
  const { db, remove, notify, handleError } = useAdmin();
  const [q, setQ] = useState('');
  const rows = [...db.industries]
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((i) => i.name.toLowerCase().includes(q.trim().toLowerCase()));

  async function onDelete(ind) {
    const n = db.products.filter((p) => p.industryId === ind.id).length;
    if (!window.confirm(`Delete "${ind.name}" and its product range?${n ? ` ${n} product(s) will be left without an industry.` : ''}`)) return;
    try {
      await remove('industries', ind.id);
      notify('Industry deleted');
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <>
      <AdminHeader title="Industries" subtitle="The industries and product ranges shown on the Industries page, the home page and in search.">
        <Link to="/admin/industries/new" className="btn btn--primary"><Icon name="plus" size={18} /> Add industry</Link>
      </AdminHeader>
      <div className="toolbar">
        <label className="search">
          <Icon name="search" size={18} />
          <input type="search" placeholder="Search industries…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Industry</th>
              <th>Product types</th>
              <th>Products</th>
              <th>Home page</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {rows.map((ind) => (
              <tr key={ind.id}>
                <td>
                  <Link to={`/admin/industries/${ind.id}`} className="row-title">
                    <span className="ind-icon"><IndustryIcon name={ind.icon} size={18} /></span>
                    <span>
                      <strong>{ind.name}</strong>
                      <small className="muted">{ind.groups?.length ? `${ind.groups.length} groups` : 'Single list'}</small>
                    </span>
                  </Link>
                </td>
                <td>{productTypeCount(ind)}</td>
                <td>{db.products.filter((p) => p.industryId === ind.id).length}</td>
                <td>
                  {ind.showInHero && <span className="pill pill--accent">Hero #{ind.heroOrder || '–'}</span>}{' '}
                  {ind.showOnHome && <span className="pill">Grid</span>}
                </td>
                <td className="actions">
                  <a className="icon-btn" href={`/industries#i-${ind.slug}`} target="_blank" rel="noreferrer" aria-label="View on site"><Icon name="eye" size={17} /></a>
                  <Link className="icon-btn" to={`/admin/industries/${ind.id}`} aria-label="Edit"><Icon name="edit" size={17} /></Link>
                  <button className="icon-btn icon-btn--danger" onClick={() => onDelete(ind)} aria-label="Delete"><Icon name="trash" size={17} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
