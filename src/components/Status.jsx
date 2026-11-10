import { Link } from 'react-router-dom';

export function Loading({ label = 'Loading…' }) {
  return (
    <div className="status">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function NotFoundBlock({ title = 'Page not found', text = "We couldn't find what you were looking for.", to = '/', cta = 'Back to home' }) {
  return (
    <div style={{ background: 'var(--bg)', padding: '90px 0' }}>
      <div className="wrap" style={{ textAlign: 'center' }}>
        <span className="eyebrow">Machinery Mall</span>
        <h1 className="h2" style={{ marginTop: '12px' }}>{title}</h1>
        <p className="lead" style={{ margin: '14px auto 26px', maxWidth: '560px' }}>{text}</p>
        <Link className="btn btn-red" to={to}>{cta}</Link>
      </div>
    </div>
  );
}
