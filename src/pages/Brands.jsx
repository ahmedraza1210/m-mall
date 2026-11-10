import { Link } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { usePageTitle } from '../lib/format.js';
import PageBand from '../components/PageBand.jsx';
import BrandTile from '../components/BrandTile.jsx';
import { EnquiryCard } from '../components/EnquiryForms.jsx';

// Converted from brands.html. Brand groups and logos are managed in Admin → Brands.
export default function Brands() {
  const { data } = useContent();
  const groups = data.brandGroups.filter((g) => g.brands.length);
  usePageTitle('Brands We Deal In');
  return (
    <>
      <PageBand
        crumbs={[{ label: 'Brands We Deal In' }]}
        eyebrow="Brands we deal in"
        title="The makes behind what we supply"
        lead="We are not tied to a single manufacturer. For every requirement we look at the makes that suit your application, your budget and your service expectations — across Indian and international manufacturers."
      >
        <div style={{ display: 'flex', gap: '14px', flexShrink: '0' }}>
          <Link className="btn btn-red" to="/contact">
            Ask For a Specific Brand
          </Link>
        </div>
      </PageBand>
      <div style={{ background: '#fff', padding: '52px 0', borderBottom: '1px solid var(--bd)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '16px' }} className="r-g2">
            <div className="card" style={{ padding: '24px 22px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '3px',
                  background: 'var(--blue-t)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7.5 3v5.2c0 4.8-3.1 8.6-7.5 10-4.4-1.4-7.5-5.2-7.5-10V6z" />
                  <path d="M9 12l2.2 2.2L15.4 10" />
                </svg>
              </div>
              <div className="h5" style={{ marginBottom: '7px' }}>
                Established manufacturers
              </div>
              <p className="tiny">We work with makes that have a service history and spare-part availability, not the cheapest name of the month.</p>
            </div>
            <div className="card" style={{ padding: '24px 22px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '3px',
                  background: 'var(--blue-t)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18" />
                </svg>
              </div>
              <div className="h5" style={{ marginBottom: '7px' }}>
                Indian & imported
              </div>
              <p className="tiny">Domestic manufacturers where support matters most, imported makes where the technology demands it.</p>
            </div>
            <div className="card" style={{ padding: '24px 22px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '3px',
                  background: 'var(--blue-t)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3.2" />
                  <path d="M12 2.6v2.6M12 18.8v2.6M21.4 12h-2.6M5.2 12H2.6M18.6 5.4l-1.8 1.8M7.2 16.8l-1.8 1.8M18.6 18.6l-1.8-1.8M7.2 7.2L5.4 5.4" />
                </svg>
              </div>
              <div className="h5" style={{ marginBottom: '7px' }}>
                Genuine spares
              </div>
              <p className="tiny">Replacement parts and consumables sourced against the original make and model.</p>
            </div>
            <div className="card" style={{ padding: '24px 22px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '3px',
                  background: 'var(--blue-t)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12.5l5.2 5.2L20 7" />
                </svg>
              </div>
              <div className="h5" style={{ marginBottom: '7px' }}>
                Brand-neutral advice
              </div>
              <p className="tiny">If a different make suits your application better, we will say so.</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: 'var(--bg)', padding: '48px 0' }}>
        <div className="wrap r-stack" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1', minWidth: '0' }}>
            {groups.map((g) => (
              <div key={g.id} style={{ marginBottom: '34px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <h3 className="h4">{g.name}</h3>
                  <div style={{ flex: '1', height: '1px', background: 'var(--bd)' }} />
                  <span className="tiny mono">
                    {g.brands.length} {g.brands.length === 1 ? 'brand' : 'brands'}
                  </span>
                </div>
                <div className="r-g2" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: '12px' }}>
                  {g.brands.map((b, i) => (
                    <BrandTile key={i} brand={b} />
                  ))}
                </div>
              </div>
            ))}
            <div className="card on-dark" style={{ background: 'var(--ink2)', border: '0', padding: '34px 36px' }}>
              <h3 className="h3" style={{ color: '#fff', fontSize: '24px', marginBottom: '10px' }}>
                Looking for a specific make?
              </h3>
              <p className="lead" style={{ marginBottom: '20px' }}>
                If you already know the brand and model you want, send it across. If the make you want isn’t listed here, ask anyway — we source beyond what is
                shown.
              </p>
              <Link className="btn btn-red" to="/contact">
                Send Your Requirement
              </Link>
            </div>
          </div>
          <div className="r-side" style={{ width: '380px', flexShrink: '0', position: 'sticky', top: '68px' }}>
            <EnquiryCard title="Ask about a brand" source="Brands page" />
          </div>
        </div>
      </div>
    </>
  );
}
