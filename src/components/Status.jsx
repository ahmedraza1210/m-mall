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
    <div className="status status--empty container">
      <h1>{title}</h1>
      <p>{text}</p>
      <Link className="btn btn--primary" to={to}>{cta}</Link>
    </div>
  );
}
