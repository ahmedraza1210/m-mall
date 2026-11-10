import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../lib/content.jsx';
import { telHref } from '../lib/format.js';
import MobileHeader from './MobileHeader.jsx';

const navClass = ({ isActive }) => 'navlink' + (isActive ? ' on' : '');

// Converted from the original site's header (utility bar, logo + search, blue navigation bar).
export default function SiteHeader() {
  const s = useSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const [q, setQ] = useState('');
  useEffect(() => {
    setQ(new URLSearchParams(location.search).get('q') || '');
  }, [location.search]);
  const onSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header>
      <div className="util r-hide">
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '38px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.6" />
            </svg>
            <span>{s.addressLine1 + ', ' + s.addressLine2}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span>{s.emails?.[0]}</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z" />
              </svg>
              <span className="mono">{s.phone}</span>
            </span>
          </div>
        </div>
      </div>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--bd)' }} className="r-hide">
        <div className="wrap r-stack" style={{ display: 'flex', alignItems: 'center', gap: '34px', height: '92px' }}>
          <Link style={{ display: 'flex', alignItems: 'center', gap: '11px', flexShrink: '0' }} to="/">
            <img src="/brand/logo-mark.png" alt="Machinery Mall" style={{ height: '50px', width: 'auto', display: 'block' }} />
            <img src="/brand/wordmark.png" alt="Machinery Mall" style={{ height: '23px', width: 'auto', display: 'block' }} />
          </Link>
          <form className="search" style={{ flex: '1', maxWidth: '520px' }} onSubmit={onSearch} role="search">
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#8296A9" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.6-3.6" />
              </svg>
            </div>
            <input placeholder="Search a machine, tool or equipment…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
            <button type="submit" className="search-go">
              SEARCH
            </button>
          </form>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginLeft: 'auto' }} className="r-stack">
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'var(--red-t)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z" />
                </svg>
              </div>
              <div style={{ lineHeight: '1.35' }}>
                <div style={{ fontSize: '11px', letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--mut2)', fontWeight: '600' }}>
                  Call or WhatsApp
                </div>
                <div className="h5 mono" style={{ fontSize: '15px' }}>
                  {s.phone}
                </div>
              </div>
            </div>
            <Link className="btn btn-red btn-sm" style={{ height: '46px' }} to="/contact">
              Send Enquiry
            </Link>
          </div>
        </div>
      </div>
      <div className="nav r-hide">
        <div className="wrap r-stack" style={{ display: 'flex', alignItems: 'center', gap: '34px' }}>
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About Us
          </NavLink>
          <NavLink to="/brands" className={navClass}>
            Brands We Deal In
          </NavLink>
          <NavLink to="/industries" className={navClass}>
            Industries We Serve
          </NavLink>
          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>
          <NavLink to="/case-studies" className={navClass}>
            Case Study
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact Us
          </NavLink>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '9px', color: '#CFE6F7', fontSize: '13px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12.5l5.2 5.2L20 7" />
            </svg>
            Enquiry-based supply · No online payment
          </span>
        </div>
      </div>
      <MobileHeader />
    </header>
  );
}
