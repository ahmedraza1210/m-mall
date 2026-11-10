import { Link } from 'react-router-dom';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader } from './ui.jsx';
import Icon from '../../components/Icon.jsx';
import { formatDateTime } from '../../lib/format.js';
import { totalProductTypes } from '../../lib/industries.js';

export default function Dashboard() {
  const { db } = useAdmin();
  const newEnq = db.enquiries.filter((e) => e.status === 'new');
  const noImages = db.products.filter((p) => !p.images?.length);
  const placeholderBrands = db.brandGroups.flatMap((g) => g.brands).filter((b) => !b.logo).length;
  const cards = [
    { label: 'Products', value: db.products.length, to: '/admin/products', icon: 'box' },
    { label: 'Industries', value: db.industries.length, to: '/admin/industries', icon: 'tag', sub: `${totalProductTypes(db.industries).toLocaleString('en-US')} product types` },
    { label: 'Case studies', value: db.caseStudies.length, to: '/admin/case-studies', icon: 'file' },
    { label: 'New enquiries', value: newEnq.length, to: '/admin/enquiries', icon: 'inbox' },
  ];
  const todo = [
    ...(placeholderBrands ? [{ to: '/admin/brands', text: `${placeholderBrands} brand tiles are still placeholders — add brand names and logos` }] : []),
    ...(!db.settings.hoursWeekdays ? [{ to: '/admin/settings', text: 'Add your shop opening hours' }] : []),
    ...(!db.settings.mapUrl ? [{ to: '/admin/settings', text: 'Add a Google Maps embed for the Contact page' }] : []),
    ...noImages.slice(0, 6).map((p) => ({ to: `/admin/products/${p.id}`, text: `Add photos to “${p.name}”` })),
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
            {c.sub && <small className="muted">{c.sub}</small>}
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
              <p className="muted">No enquiries yet. Requirements sent from the website appear here.</p>
            ) : (
              <ul className="simple-list">
                {db.enquiries.slice(0, 6).map((e) => (
                  <li key={e.id}>
                    <div>
                      <strong>{e.name}</strong> {e.status === 'new' && <span className="pill pill--hot">New</span>}
                      <p className="muted small">{e.productName || e.industry || e.source || 'General enquiry'} · {formatDateTime(e.createdAt)}</p>
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
            {todo.length === 0 ? (
              <p className="muted">Everything is filled in. Nice.</p>
            ) : (
              <ul className="simple-list">
                {todo.map((t, i) => (
                  <li key={i}>
                    <Link to={t.to}>{t.text}</Link>
                    <Icon name="arrow" size={14} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
