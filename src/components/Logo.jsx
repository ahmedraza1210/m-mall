import { Link } from 'react-router-dom';
import { useSettings } from '../lib/content.jsx';

export default function Logo({ to = '/', light = false }) {
  const { siteName = 'Machinery Mall', logo } = useSettings();
  const [first, ...rest] = siteName.split(' ');
  return (
    <Link to={to} className={`logo ${light ? 'logo--light' : ''}`} aria-label={`${siteName} home`}>
      {logo ? (
        <img src={logo} alt={siteName} className="logo__img" />
      ) : (
        <>
          <span className="logo__mark" aria-hidden="true">
            <svg viewBox="0 0 64 64"><path d="M14 46V18h8l10 16 10-16h8v28h-8V32l-10 15-10-15v14z" fill="currentColor" /></svg>
          </span>
          <span className="logo__text">
            {first}
            {rest.length > 0 && <strong> {rest.join(' ')}</strong>}
          </span>
        </>
      )}
    </Link>
  );
}
