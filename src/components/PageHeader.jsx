import { Link } from 'react-router-dom';

export default function PageHeader({ title, subtitle, crumbs = [] }) {
  return (
    <section className="page-header">
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map((c, i) => (
              <span key={i}>
                <span aria-hidden="true">/</span> {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
              </span>
            ))}
          </nav>
        )}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
