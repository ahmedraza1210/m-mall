import { Link } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { usePageTitle, telHref } from '../lib/format.js';
import { productTypeCount, totalProductTypes, roundedPlus, industryLink } from '../lib/industries.js';
import IndustryIcon from '../components/IndustryIcon.jsx';
import { Photo } from '../components/Illustrations.jsx';
import { EnquiryCard } from '../components/EnquiryForms.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import BrandTile from '../components/BrandTile.jsx';
import HeroSlider from '../components/HeroSlider.jsx';

// Converted from index.html

export default function Home() {
  const { data } = useContent();
  const { settings: s, industries, products, caseStudies, brandGroups } = data;
  usePageTitle('');
  const industryById = Object.fromEntries(industries.map((i) => [i.id, i]));
  const homeIndustries = industries.filter((i) => i.showOnHome);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
  const cs = caseStudies.find((c) => c.featured) || caseStudies[0];
  const homeBrands = brandGroups.flatMap((g) => g.brands).slice(0, 12);
  return (
    <>
      <HeroSlider />
      <div style={{ background: 'var(--bg)', padding: '56px 0' }}>
        <div className="wrap r-stack" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1', minWidth: '0' }}>
            <div style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', marginBottom: '30px' }}>
                <span className="eyebrow">What we supply</span>
                <h2 className="h2" style={{ marginTop: '11px', fontSize: '31px' }}>
                  Whatever your industry runs on, we can source it
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '22px 26px' }} className="r-g1">
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '3px',
                      background: 'var(--blue-t)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: '0',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21V10l5.5 3.6V10L14 13.6V7l7 4.4V21z" />
                      <path d="M7 21v-3.4M12 21v-3.4M17 21v-3.4" />
                    </svg>
                  </div>
                  <div>
                    <div className="h5" style={{ marginBottom: '4px' }}>
                      Production machinery
                    </div>
                    <p className="tiny">Manufacturing, processing and production machines across every sector we serve.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '3px',
                      background: 'var(--blue-t)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: '0',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="10" width="14" height="7" rx="3.5" />
                      <path d="M17 13.5h4M8 10V7h5v3" />
                    </svg>
                  </div>
                  <div>
                    <div className="h5" style={{ marginBottom: '4px' }}>
                      Plant & utilities
                    </div>
                    <p className="tiny">Compressed air, HVAC, water treatment, dust collection and plant infrastructure.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '3px',
                      background: 'var(--blue-t)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: '0',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15.6 3.6a5.4 5.4 0 0 0-6.9 6.9L3 16.2 6.9 20l5.7-5.7a5.4 5.4 0 0 0 6.9-6.9l-3 3-2.9-.7-.7-2.9z" />
                    </svg>
                  </div>
                  <div>
                    <div className="h5" style={{ marginBottom: '4px' }}>
                      Tools & equipment
                    </div>
                    <p className="tiny">Power tools, hand tools, workshop equipment and industrial consumables.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '3px',
                      background: 'var(--blue-t)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: '0',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 3h4M10.5 3v6L5 19.4A1.6 1.6 0 0 0 6.4 21h11.2a1.6 1.6 0 0 0 1.4-1.6L13.5 9V3" />
                      <path d="M8 15h8" />
                    </svg>
                  </div>
                  <div>
                    <div className="h5" style={{ marginBottom: '4px' }}>
                      Testing & laboratory
                    </div>
                    <p className="tiny">Testing machines, analytical instruments and quality-control systems.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '3px',
                      background: 'var(--blue-t)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: '0',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 21V5h13M17 5l3.5 3.5M9 5v4M13 9V5" />
                      <path d="M9 9h4M11 9v3.5" />
                      <path d="M8 21h8" />
                    </svg>
                  </div>
                  <div>
                    <div className="h5" style={{ marginBottom: '4px' }}>
                      Material handling
                    </div>
                    <p className="tiny">Cranes, hoists, conveyors and lifting equipment for plant and site.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '3px',
                      background: 'var(--blue-t)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: '0',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l9 4.6-9 4.6-9-4.6z" />
                      <path d="M3 12.4l9 4.6 9-4.6M3 16.6L12 21l9-4.4" />
                    </svg>
                  </div>
                  <div>
                    <div className="h5" style={{ marginBottom: '4px' }}>
                      Complete plants
                    </div>
                    <p className="tiny">Turnkey sourcing — from specification through to commissioning.</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', marginBottom: '30px' }}>
                <span className="eyebrow">Industries we serve</span>
                <h2 className="h2" style={{ marginTop: '11px', fontSize: '31px' }}>
                  {industries.length} industries. {roundedPlus(totalProductTypes(industries))} product types.
                </h2>
                <p className="lead" style={{ marginTop: '14px', maxWidth: '760px', textAlign: 'left' }}>
                  Every industry we serve has its full product range published — from compressors and furnaces to filling lines, testing instruments and
                  complete plants.
                </p>
              </div>
              <div className="r-g1" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '14px' }}>
                {homeIndustries.map((i) => (
                  <Link
                    key={i.id}
                    className="card"
                    to={industryLink(i)}
                    style={{ padding: '20px 18px', display: 'flex', gap: '13px', alignItems: 'flex-start' }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '3px',
                        background: 'var(--red-t)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: '0',
                      }}
                    >
                      <IndustryIcon name={i.icon} size={19} />
                    </div>
                    <div>
                      <div className="h5" style={{ marginBottom: '4px' }}>
                        {i.name}
                      </div>
                      <p className="tiny">{productTypeCount(i)} product types</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '22px' }}>
                <Link className="btn btn-out" to="/industries">
                  {`See all ${industries.length} industries & product ranges `}
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12h15M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
            {featuredProducts.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', marginBottom: '30px' }}>
                  <span className="eyebrow">Featured products</span>
                  <h2 className="h2" style={{ marginTop: '11px', fontSize: '31px' }}>
                    Machines our customers ask for
                  </h2>
                </div>
                <div className="r-g1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '14px' }}>
                  {featuredProducts.map((p) => (
                    <ProductCard key={p.id} product={p} industry={industryById[p.industryId]} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '22px' }}>
                  <Link className="btn btn-out" to="/products">
                    {'See all products '}
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12h15M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', marginBottom: '30px' }}>
                <span className="eyebrow">Scope of supply</span>
                <h2 className="h2" style={{ marginTop: '11px', fontSize: '31px' }}>
                  One tool, or an entire plant
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '18px',
                    padding: '15px 20px',
                    background: '#fff',
                    border: '1px solid var(--bd)',
                    borderRadius: '3px',
                  }}
                >
                  <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: '600', fontSize: '16px' }}>Need one power tool?</span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--blue)',
                      fontFamily: 'Archivo,sans-serif',
                      fontWeight: '700',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12.5l5.2 5.2L20 7" />
                    </svg>
                    Yes.
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '18px',
                    padding: '15px 20px',
                    background: '#fff',
                    border: '1px solid var(--bd)',
                    borderRadius: '3px',
                  }}
                >
                  <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: '600', fontSize: '16px' }}>Need a specific machine or model?</span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--blue)',
                      fontFamily: 'Archivo,sans-serif',
                      fontWeight: '700',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12.5l5.2 5.2L20 7" />
                    </svg>
                    Yes.
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '18px',
                    padding: '15px 20px',
                    background: '#fff',
                    border: '1px solid var(--bd)',
                    borderRadius: '3px',
                  }}
                >
                  <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: '600', fontSize: '16px' }}>Need spare parts that are hard to find?</span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--blue)',
                      fontFamily: 'Archivo,sans-serif',
                      fontWeight: '700',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12.5l5.2 5.2L20 7" />
                    </svg>
                    Yes.
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '18px',
                    padding: '15px 20px',
                    background: '#fff',
                    border: '1px solid var(--bd)',
                    borderRadius: '3px',
                  }}
                >
                  <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: '600', fontSize: '16px' }}>Need 100 machines for a new factory?</span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--blue)',
                      fontFamily: 'Archivo,sans-serif',
                      fontWeight: '700',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12.5l5.2 5.2L20 7" />
                    </svg>
                    Yes.
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '18px',
                    padding: '15px 20px',
                    background: '#fff',
                    border: '1px solid var(--bd)',
                    borderRadius: '3px',
                  }}
                >
                  <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: '600', fontSize: '16px' }}>Need a complete production line?</span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--blue)',
                      fontFamily: 'Archivo,sans-serif',
                      fontWeight: '700',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12.5l5.2 5.2L20 7" />
                    </svg>
                    Yes.
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '18px',
                    padding: '15px 20px',
                    background: '#fff',
                    border: '1px solid var(--bd)',
                    borderRadius: '3px',
                  }}
                >
                  <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: '600', fontSize: '16px' }}>Need a machine customised to your process?</span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--blue)',
                      fontFamily: 'Archivo,sans-serif',
                      fontWeight: '700',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12.5l5.2 5.2L20 7" />
                    </svg>
                    Yes.
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '18px',
                    padding: '15px 20px',
                    background: '#fff',
                    border: '1px solid var(--bd)',
                    borderRadius: '3px',
                  }}
                >
                  <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: '600', fontSize: '16px' }}>Need a complete plant?</span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--red)',
                      fontFamily: 'Archivo,sans-serif',
                      fontWeight: '700',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 15a2.5 2.5 0 0 1-2.5 2.5H9L4 21V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z" />
                    </svg>
                    Talk to us.
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '18px',
                    padding: '15px 20px',
                    background: '#fff',
                    border: '1px solid var(--bd)',
                    borderRadius: '3px',
                  }}
                >
                  <span style={{ fontFamily: 'Archivo,sans-serif', fontWeight: '600', fontSize: '16px' }}>Have a problem but don’t know the machine?</span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--red)',
                      fontFamily: 'Archivo,sans-serif',
                      fontWeight: '700',
                      fontSize: '14px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 15a2.5 2.5 0 0 1-2.5 2.5H9L4 21V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z" />
                    </svg>
                    Talk to us.
                  </span>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', marginBottom: '30px' }}>
                <span className="eyebrow">Why Machinery Mall</span>
                <h2 className="h2" style={{ marginTop: '11px', fontSize: '31px' }}>
                  Six reasons customers keep coming back
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '16px' }} className="r-g2">
                <div className="card" style={{ padding: '24px 22px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '3px',
                      background: 'var(--blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '14px',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z" />
                    </svg>
                  </div>
                  <div className="h5" style={{ marginBottom: '7px' }}>
                    Best value
                  </div>
                  <p className="tiny">Quality products at competitive and reasonable prices.</p>
                </div>
                <div className="card" style={{ padding: '24px 22px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '3px',
                      background: 'var(--blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '14px',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                  </div>
                  <div className="h5" style={{ marginBottom: '7px' }}>
                    Wide range
                  </div>
                  <p className="tiny">Machinery, power tools, hand tools, equipment, spare parts and industrial supplies.</p>
                </div>
                <div className="card" style={{ padding: '24px 22px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '3px',
                      background: 'var(--blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '14px',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6h11v10H2z" />
                      <path d="M13 9h4l4 4v3h-8z" />
                      <circle cx="6.5" cy="18.5" r="1.7" />
                      <circle cx="17.5" cy="18.5" r="1.7" />
                    </svg>
                  </div>
                  <div className="h5" style={{ marginBottom: '7px' }}>
                    Reliable delivery
                  </div>
                  <p className="tiny">We understand that delayed equipment can delay work and production.</p>
                </div>
                <div className="card" style={{ padding: '24px 22px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '3px',
                      background: 'var(--blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '14px',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l7.5 3v5.2c0 4.8-3.1 8.6-7.5 10-4.4-1.4-7.5-5.2-7.5-10V6z" />
                      <path d="M9 12l2.2 2.2L15.4 10" />
                    </svg>
                  </div>
                  <div className="h5" style={{ marginBottom: '7px' }}>
                    After-sales support
                  </div>
                  <p className="tiny">Technical assistance, spare parts and after-sales coordination.</p>
                </div>
                <div className="card" style={{ padding: '24px 22px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '3px',
                      background: 'var(--blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '14px',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 15a2.5 2.5 0 0 1-2.5 2.5H9L4 21V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z" />
                    </svg>
                  </div>
                  <div className="h5" style={{ marginBottom: '7px' }}>
                    Product guidance
                  </div>
                  <p className="tiny">Unsure which product suits your application? Our team can help identify a suitable option.</p>
                </div>
                <div className="card" style={{ padding: '24px 22px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '3px',
                      background: 'var(--blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '14px',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3 12h18M12 3c2.6 3 2.6 15 0 18M12 3c-2.6 3-2.6 15 0 18" />
                    </svg>
                  </div>
                  <div className="h5" style={{ marginBottom: '7px' }}>
                    Global sourcing
                  </div>
                  <p className="tiny">Suitable manufacturers and technologies from India and international markets.</p>
                </div>
              </div>
            </div>
            <div style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', marginBottom: '30px' }}>
                <span className="eyebrow">How we work</span>
                <h2 className="h2" style={{ marginTop: '11px', fontSize: '31px' }}>
                  From your first message to a running machine
                </h2>
              </div>
              <div className="card" style={{ padding: '6px 26px 22px' }}>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', padding: '18px 0', borderBottom: '1px solid var(--bd)' }}>
                  <span
                    className="mono"
                    style={{ fontSize: '13px', fontWeight: '600', color: 'var(--red)', flexShrink: '0', paddingTop: '3px', letterSpacing: '.08em' }}
                  >
                    01
                  </span>
                  <div>
                    <div className="h5" style={{ marginBottom: '4px' }}>
                      Tell us your requirement
                    </div>
                    <p className="sub">Product name, model, specification, photo — or just the problem.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', padding: '18px 0', borderBottom: '1px solid var(--bd)' }}>
                  <span
                    className="mono"
                    style={{ fontSize: '13px', fontWeight: '600', color: 'var(--red)', flexShrink: '0', paddingTop: '3px', letterSpacing: '.08em' }}
                  >
                    02
                  </span>
                  <div>
                    <div className="h5" style={{ marginBottom: '4px' }}>
                      We understand your application
                    </div>
                    <p className="sub">How and where the machine will actually be used.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', padding: '18px 0', borderBottom: '1px solid var(--bd)' }}>
                  <span
                    className="mono"
                    style={{ fontSize: '13px', fontWeight: '600', color: 'var(--red)', flexShrink: '0', paddingTop: '3px', letterSpacing: '.08em' }}
                  >
                    03
                  </span>
                  <div>
                    <div className="h5" style={{ marginBottom: '4px' }}>
                      We find & evaluate options
                    </div>
                    <p className="sub">Suitable machines, makes and technologies, in India and overseas.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', padding: '18px 0', borderBottom: '1px solid var(--bd)' }}>
                  <span
                    className="mono"
                    style={{ fontSize: '13px', fontWeight: '600', color: 'var(--red)', flexShrink: '0', paddingTop: '3px', letterSpacing: '.08em' }}
                  >
                    04
                  </span>
                  <div>
                    <div className="h5" style={{ marginBottom: '4px' }}>
                      Commercial offer & procurement
                    </div>
                    <p className="sub">Pricing, terms, documentation and order placement.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', padding: '18px 0', borderBottom: '1px solid var(--bd)' }}>
                  <span
                    className="mono"
                    style={{ fontSize: '13px', fontWeight: '600', color: 'var(--red)', flexShrink: '0', paddingTop: '3px', letterSpacing: '.08em' }}
                  >
                    05
                  </span>
                  <div>
                    <div className="h5" style={{ marginBottom: '4px' }}>
                      Delivery + after-sales
                    </div>
                    <p className="sub">Dispatch, installation support, spares and ongoing assistance.</p>
                  </div>
                </div>
              </div>
            </div>
            {cs && (
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', marginBottom: '30px' }}>
                  <span className="eyebrow">Case study</span>
                  <h2 className="h2" style={{ marginTop: '11px', fontSize: '31px' }}>
                    {cs.teaserTitle || cs.title}
                  </h2>
                </div>
                <div className="card r-stack" style={{ overflow: 'hidden', display: 'flex' }}>
                  <div className="r-side" style={{ width: '290px', flexShrink: '0', background: '#E3EAF1', minHeight: '200px' }}>
                    <Photo src={cs.images?.[0]} alt={cs.title} kind="plant" />
                  </div>
                  <div style={{ flex: '1', padding: '28px 30px' }}>
                    {cs.clientFull && (
                      <p className="sub" style={{ fontWeight: '600', color: 'var(--ink)', marginBottom: '10px' }}>
                        {cs.clientFull}
                      </p>
                    )}
                    <p className="sub">{cs.teaser || cs.summary}</p>
                    <Link
                      to={`/case-studies/${cs.slug}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontWeight: '600', marginTop: '16px' }}
                    >
                      {' Read the case study '}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h15M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', marginBottom: '30px' }}>
                <span className="eyebrow">Brands we deal in</span>
                <h2 className="h2" style={{ marginTop: '11px', fontSize: '31px' }}>
                  We source from established manufacturers
                </h2>
              </div>
              <div className="r-g2" style={{ display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: '12px' }}>
                {homeBrands.map((b, i) => (
                  <BrandTile key={i} brand={b} height="74px" />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Link className="btn btn-out" to="/brands">
                  {'See all brands '}
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12h15M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div style={{ width: '380px', flexShrink: '0', position: 'sticky', top: '20px' }} className="r-side m-first">
            <EnquiryCard />
            <div className="card" style={{ padding: '24px', marginTop: '16px' }}>
              <div className="h4" style={{ marginBottom: '12px' }}>
                Why customers ask us first
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '7px 0' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12.5l5.2 5.2L20 7" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Any industry, any machine</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '7px 0' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12.5l5.2 5.2L20 7" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>One tool to a complete plant</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '7px 0' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12.5l5.2 5.2L20 7" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>India & overseas manufacturers</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '7px 0' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12.5l5.2 5.2L20 7" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>After-sales support</span>
              </div>
            </div>
            <div className="card" style={{ padding: '24px', marginTop: '16px', borderLeft: '3px solid var(--red)' }}>
              <div className="h4" style={{ marginBottom: '14px' }}>
                Prefer to talk?
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '11px' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z" />
                </svg>
                <a className="mono" href={telHref(s.phone)} style={{ fontSize: '14.5px', fontWeight: '600', color: 'var(--ink)' }}>
                  {s.phone}
                </a>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '11px' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                <span style={{ fontSize: '13px', lineHeight: '1.7' }}>
                  {(s.emails || []).map((e, i) => (
                    <span key={e}>
                      {i > 0 && <br />}
                      <a href={`mailto:${e}`} style={{ color: 'inherit' }}>
                        {e}
                      </a>
                    </span>
                  ))}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.6" />
                </svg>
                <span style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  {s.addressLine1}
                  <br />
                  {s.addressLine2}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="on-dark blueprint-d" style={{ background: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: '-90px',
            right: '-60px',
            width: '400px',
            height: '400px',
            border: '2px solid rgba(224,27,34,.28)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '110px',
            width: '270px',
            height: '270px',
            border: '2px solid rgba(0,113,188,.35)',
            borderRadius: '50%',
          }}
        />
        <div className="wrap" style={{ padding: '72px 0', position: 'relative' }}>
          <div style={{ maxWidth: '790px' }}>
            <span className="eyebrow" style={{ color: '#FF8A8E' }}>
              The most important thing we do
            </span>
            <h2 className="h2" style={{ marginTop: '13px', fontSize: '42px' }}>
              Have an industrial problem?
              <br />
              Talk to us.
            </h2>
            <p className="lead" style={{ marginTop: '20px' }}>
              Sometimes the biggest challenge isn’t finding a machine — it’s knowing which machine you actually need. If you have a production, manufacturing,
              maintenance, automation or equipment-related problem and haven’t found the right solution, share your requirement with us.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
              <Link className="btn btn-red btn-lg" to="/contact">
                Discuss Your Requirement
              </Link>
              <Link className="btn btn-out-w btn-lg" to="/contact">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z" />
                </svg>
                {s.phone}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: '#fff', padding: '64px 0', borderTop: '1px solid var(--bd)' }}>
        <div className="wrap r-stack" style={{ display: 'flex', gap: '64px', alignItems: 'center' }}>
          <div style={{ flex: '1' }}>
            <span className="eyebrow b">Global sourcing</span>
            <h2 className="h2" style={{ marginTop: '12px', fontSize: '34px' }}>
              Machinery, tools & spares — without borders
            </h2>
            <p className="lead" style={{ marginTop: '16px', maxWidth: '500px' }}>
              The right machine may be manufactured in another city or country, while a specialised spare may be available from a highly focused manufacturer
              elsewhere. Geography should not become a barrier to finding the right industrial solution.
            </p>
          </div>
          <div style={{ width: '520px', flexShrink: '0', display: 'flex', flexWrap: 'wrap', gap: '10px' }} className="r-side">
            <span className="chip" style={{ height: '38px', fontSize: '14px', fontWeight: '600' }}>
              India
            </span>
            <span className="chip" style={{ height: '38px', fontSize: '14px', fontWeight: '600' }}>
              China
            </span>
            <span className="chip" style={{ height: '38px', fontSize: '14px', fontWeight: '600' }}>
              Germany
            </span>
            <span className="chip" style={{ height: '38px', fontSize: '14px', fontWeight: '600' }}>
              Japan
            </span>
            <span className="chip" style={{ height: '38px', fontSize: '14px', fontWeight: '600' }}>
              South Korea
            </span>
            <span className="chip" style={{ height: '38px', fontSize: '14px', fontWeight: '600' }}>
              Italy
            </span>
            <span className="chip" style={{ height: '38px', fontSize: '14px', fontWeight: '600' }}>
              Taiwan
            </span>
            <span className="chip" style={{ height: '38px', fontSize: '14px', fontWeight: '600' }}>
              USA
            </span>
            <span className="chip" style={{ height: '38px', fontSize: '14px', fontWeight: '600' }}>
              Turkey
            </span>
            <span className="chip" style={{ height: '38px', fontSize: '14px', fontWeight: '600' }}>
              UAE
            </span>
            <span className="chip" style={{ height: '38px', fontSize: '14px', fontWeight: '600' }}>
              Europe
            </span>
            <span className="chip" style={{ height: '38px', fontSize: '14px', fontWeight: '600' }}>
              Southeast Asia
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
