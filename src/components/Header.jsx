import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';
import { useSettings } from '../lib/content.jsx';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/products', label: 'Products' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { phone, email, hours } = useSettings();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar__inner">
          {hours && (
            <span className="topbar__item">
              <Icon name="clock" size={14} /> {hours}
            </span>
          )}
          <span className="topbar__spacer" />
          {email && (
            <a className="topbar__item" href={`mailto:${email}`}>
              <Icon name="mail" size={14} /> {email}
            </a>
          )}
          {phone && (
            <a className="topbar__item" href={`tel:${phone.replace(/\s/g, '')}`}>
              <Icon name="phone" size={14} /> {phone}
            </a>
          )}
        </div>
      </div>
      <div className="navbar">
        <div className="container navbar__inner">
          <Logo />
          <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className="nav__link">
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn btn--primary nav__cta">
              Get a quote
            </Link>
          </nav>
          <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
