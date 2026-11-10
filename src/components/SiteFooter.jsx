import { Link } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { telHref } from '../lib/format.js';

// Converted from the original site's footer.
export default function SiteFooter() {
  const { data } = useContent();
  const s = data?.settings || {};
  const industries = data?.industries || [];
  return (
    <footer>
      <div className="on-dark blueprint-d" style={{ background: 'var(--ink)', padding: '60px 0 0' }}>
        <div className="wrap r-stack" style={{ display: 'flex', gap: '52px', alignItems: 'flex-start' }}>
          <div style={{ width: '320px' }} className="r-side">
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', marginBottom: '20px' }}>
              <img src="/brand/logo-mark.png" alt="Machinery Mall" style={{ height: '46px', width: 'auto', display: 'block' }} />
              <img src="/brand/wordmark-white.png" alt="Machinery Mall" style={{ height: '34px', width: 'auto', display: 'block', opacity: '.95' }} />
            </div>
            <p className="sub" style={{ marginBottom: '20px' }}>
              Machinery, equipment, tools and complete industrial solutions for every industry — sourced from reliable manufacturers in India and overseas, and
              supplied against your requirement.
            </p>
            <Link className="btn btn-red btn-sm" to="/contact">
              Send Your Requirement
            </Link>
          </div>
          <div style={{ width: '180px' }} className="r-side">
            <div className="h5" style={{ color: '#fff', marginBottom: '14px' }}>
              Quick Links
            </div>
            <Link className="foot-l" to="/">
              Home
            </Link>
            <Link className="foot-l" to="/about">
              About Us
            </Link>
            <Link className="foot-l" to="/brands">
              Brands We Deal In
            </Link>
            <Link className="foot-l" to="/industries">
              Industries We Serve
            </Link>
            <Link className="foot-l" to="/case-studies">
              Case Study
            </Link>
            <Link className="foot-l" to="/contact">
              Contact Us
            </Link>
          </div>
          <div className="r-side" style={{ width: '240px' }}>
            <div className="h5" style={{ color: '#fff', marginBottom: '14px' }}>
              Industries We Serve
            </div>
            {industries.slice(0, 6).map((i) => (
              <Link key={i.id} className="foot-l" to={`/industries#i-${i.slug}`}>
                {i.name}
              </Link>
            ))}
            <Link className="foot-l" to="/industries" style={{ color: '#fff', fontWeight: '600' }}>
              All {industries.length} industries →
            </Link>
          </div>
          <div style={{ flex: '1', minWidth: '250px' }}>
            <div className="h5" style={{ color: '#fff', marginBottom: '14px' }}>
              Get in Touch
            </div>
            <div style={{ display: 'flex', gap: '9px', alignItems: 'flex-start', marginBottom: '14px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
                <circle cx="12" cy="10" r="2.6" />
              </svg>
              <span className="sub" style={{ fontSize: '13px' }}>
                {s.addressLine1}
                <br />
                {s.addressLine2}
              </span>
            </div>
            {(s.emails || []).map((e) => (
              <div key={e} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start', marginBottom: '7px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                <a className="foot-l" href={`mailto:${e}`} style={{ padding: '0', fontSize: '13px' }}>
                  {e}
                </a>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '9px', alignItems: 'center', marginTop: '12px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z" />
              </svg>
              <a className="mono" href={telHref(s.phone)} style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
                {s.phone}
              </a>
            </div>
          </div>
        </div>
        <div
          className="wrap"
          style={{
            marginTop: '46px',
            padding: '22px 0',
            borderTop: '1px solid rgba(255,255,255,.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span className="tiny">
            © {new Date().getFullYear()} Machinery Mall™ · {s.tagline}
          </span>
          <span className="tiny">
            <Link to="/contact" style={{ color: 'inherit' }}>
              Contact
            </Link>{' '}
            ·{' '}
            <Link to="/industries" style={{ color: 'inherit' }}>
              Industries
            </Link>{' '}
            ·{' '}
            <Link to="/admin" style={{ color: 'inherit' }}>
              Admin
            </Link>
          </span>
        </div>
        <div style={{ background: '#071A2C', padding: '14px 0' }}>
          <div className="wrap">
            <span className="tiny" style={{ color: '#6C8299' }}>
              Product availability, technical feasibility, applicable regulations, delivery timelines and commercial terms may vary by requirement.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
