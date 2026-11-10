import { Link } from 'react-router-dom';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader } from './ui.jsx';
import Icon from '../../components/Icon.jsx';
import { formatDateTime } from '../../lib/format.js';

export default function Dashboard() {
  const { db } = useAdmin();
  const newEnq = db.enquiries.filter((e) => e.status === 'new');
  const noImages = db.products.filter((p) => !p.images?.length);
  const cards = [
    { label: 'Products', value: db.products.length, to: '/admin/products', icon: 'box' },
    { label: 'Case studies', value: db.caseStudies.length, to: '/admin/case-studies', icon: 'file' },
    { label: 'Categories', value: db.categories.length, to: '/admin/categories', icon: 'tag' },
    { label: 'New enquiries', value: newEnq.length, to: '/admin/enquiries', icon: 'inbox' },
  ];

  return (
    <>
      <AdminHeader title="Dashboard" subtitle={`Welcome back. Here's what's on ${db.settings.siteName}.`}>
        <Link to="/admin/products/new" className="btn btn--primary"><Icon name="plus" size={18} /> Add product</Link>
        <Link to="/admin/case-studies/new" className="btn btn--outline"><Icon name="plus" size={18} /> Add case study</Link>
      </AdminHeader>
      <div className="stat-cards">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="stat-card">
            <Icon name={c.icon} size={22} />
            <strong>{c.value}</strong>
            <span>{c.label}</span>
          </Link>
        ))}
      </div>
      <div className="dash-grid">
        <section className="panel">
          <header className="panel__head panel__head--row">
            <h2>Latest enquiries</h2>
            <Link to="/admin/enquiries" className="link-arrow">View all <Icon name="arrow" size={14} /></Link>
          </header>
          <div className="panel__body">
            {db.enquiries.length === 0 ? (
              <p className="muted">No enquiries yet. Quote requests from the website will appear here.</p>
            ) : (
              <ul className="simple-list">
                {db.enquiries.slice(0, 6).map((e) => (
                  <li key={e.id}>
                    <div>
                      <strong>{e.name}</strong> {e.status === 'new' && <span className="pill pill--hot">New</span>}
                      <p className="muted small">{e.productName || 'General enquiry'} · {formatDateTime(e.createdAt)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
        <section className="panel">
          <header className="panel__head"><h2>To do</h2></header>
          <div className="panel__body">
            {noImages.length === 0 ? (
              <p className="muted">All products have photos. Nice.</p>
            ) : (
              <>
                <p className="muted small">These products don't have photos yet:</p>
                <ul className="simple-list">
                  {noImages.slice(0, 8).map((p) => (
                    <li key={p.id}>
                      <Link to={`/admin/products/${p.id}`}>{p.name}</Link>
                      <Link to={`/admin/products/${p.id}`} className="btn btn--subtle btn--sm"><Icon name="upload" size={14} /> Add photos</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
