import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../lib/content.jsx';
import { telHref } from '../lib/format.js';

const LINKS = [
  ['/', 'Home'],
  ['/about', 'About Us'],
  ['/brands', 'Brands We Deal In'],
  ['/industries', 'Industries We Serve'],
  ['/products', 'Products'],
  ['/case-studies', 'Case Study'],
  ['/contact', 'Contact Us'],
];

// Phone header, following the original mobile design (mobile.html).
export default function MobileHeader() {
  const s = useSettings();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="m-only">
      <div className="util" style={{ padding: '0 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '34px', fontSize: '10.5px', textAlign: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></svg>
          <span style={{ marginLeft: '6px' }}>{s.addressLine2}</span>
        </div>
      </div>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--bd)', padding: '12px 14px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="m-burger" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B2239" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B2239" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            )}
          </button>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '7px', flex: '1' }}>
            <img src="/brand/logo-mark.png" alt="Machinery Mall" style={{ height: '34px', width: 'auto', display: 'block' }} />
            <img src="/brand/wordmark.png" alt="" style={{ height: '15px', width: 'auto', display: 'block' }} />
          </Link>
          <a href={telHref(s.phone)} aria-label="Call us" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--red-t)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z" /></svg>
          </a>
        </div>
        <form
          className="search"
          style={{ height: '42px', marginTop: '12px', borderWidth: '1.5px' }}
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8296A9" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.6-3.6" /></svg>
          </div>
          <input placeholder="Search a machine or tool…" style={{ fontSize: '13px' }} value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
          <button type="submit" className="search-go" style={{ padding: '0 14px', fontSize: '11px' }}>GO</button>
        </form>
        {open && (
          <nav className="m-menu" aria-label="Main">
            {LINKS.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => 'm-menu__link' + (isActive ? ' on' : '')}>
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

export function MobileActionBar() {
  const s = useSettings();
  return (
    <div className="m-only m-actionbar">
      <a className="btn btn-out btn-sm" href={telHref(s.phone)} style={{ flex: '1' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z" /></svg>
        Call
      </a>
      <Link className="btn btn-red btn-sm" to="/contact" style={{ flex: '1.4' }}>Send Enquiry</Link>
    </div>
  );
}
