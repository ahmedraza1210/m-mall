import { Link } from 'react-router-dom';

// The dark blueprint band with breadcrumb used at the top of every inner page.
export default function PageBand({ crumbs = [], eyebrow, title, lead, children }) {
  return (
    <div className="on-dark blueprint-d" style={{ background: 'var(--ink)', padding: '32px 0 50px' }}>
      <div className="wrap">
        <div className="crumbs" style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '13px', color: '#A9BECF', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'inherit', fontWeight: '400' }}>Home</Link>
          {crumbs.map((c, i) => (
            <span key={i} style={{ display: 'contents' }}>
              <span style={{ opacity: '.5' }}>/</span>
              {c.to ? (
                <Link to={c.to} style={{ color: 'inherit', fontWeight: '400' }}>{c.label}</Link>
              ) : (
                <span style={{ color: '#fff', fontWeight: '600' }}>{c.label}</span>
              )}
            </span>
          ))}
        </div>
        <div className="r-stack" style={{ display: 'flex', gap: '56px', alignItems: 'flex-end', marginTop: '24px' }}>
          <div style={{ flex: '1' }}>
            {eyebrow && <span className="eyebrow" style={{ color: '#FF8A8E' }}>{eyebrow}</span>}
            <h1 className="h2" style={{ marginTop: '12px', fontSize: '40px' }}>{title}</h1>
            {lead && <p className="lead" style={{ marginTop: '16px', maxWidth: '720px' }}>{lead}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
