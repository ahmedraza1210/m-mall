import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from './Icon.jsx';
import { useContent } from '../lib/content.jsx';

export default function Footer() {
  const { data } = useContent();
  const s = data?.settings || {};
  const categories = data?.categories || [];
  const socials = [
    ['Facebook', s.facebook],
    ['Instagram', s.instagram],
    ['LinkedIn', s.linkedin],
    ['YouTube', s.youtube],
  ].filter(([, url]) => url);

  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div>
          <Logo light />
          <p className="footer__tagline">{s.tagline}</p>
          {socials.length > 0 && (
            <div className="footer__socials">
              {socials.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noreferrer">
                  {name}
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4>Categories</h4>
          <ul>
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link to={`/products?category=${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/case-studies">Case studies</Link></li>
            <li><Link to="/products">All products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="footer__contact">
            {s.address && <li><Icon name="pin" size={16} /> {s.address}</li>}
            {s.phone && <li><Icon name="phone" size={16} /> <a href={`tel:${s.phone.replace(/\s/g, '')}`}>{s.phone}</a></li>}
            {s.email && <li><Icon name="mail" size={16} /> <a href={`mailto:${s.email}`}>{s.email}</a></li>}
            {s.hours && <li><Icon name="clock" size={16} /> {s.hours}</li>}
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {s.siteName || 'Machinery Mall'}. All rights reserved.</span>
        <Link to="/admin">Admin</Link>
      </div>
    </footer>
  );
}
