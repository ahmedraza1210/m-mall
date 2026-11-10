import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { usePageTitle, telHref } from '../lib/format.js';
import { productTypeCount, totalProductTypes, industryAnchor } from '../lib/industries.js';
import PageBand from '../components/PageBand.jsx';
import IndustryIcon from '../components/IndustryIcon.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { EnquiryCard } from '../components/EnquiryForms.jsx';

const PHONE_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z" /></svg>
);

const grid = (cols) => ({ display: 'grid', gridTemplateColumns: `repeat(${cols},minmax(0,1fr))`, gap: '0 24px' });

function IndustryBlock({ ind, open, products, phone }) {
  const count = productTypeCount(ind);
  return (
    <div className="card indblock" id={industryAnchor(ind)} style={{ marginBottom: '16px', scrollMarginTop: '24px' }}>
      <details open={open}>
        <summary>
          <div style={{ width: '46px', height: '46px', borderRadius: '3px', background: 'var(--red-t)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0' }}>
            <IndustryIcon name={ind.icon} size={22} />
          </div>
          <div style={{ flex: '1', minWidth: '0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <h3 className="h3" style={{ fontSize: '21px' }}>{ind.title || ind.name}</h3>
              <span className="tag">{count} product types</span>
              {products.length > 0 && <span className="tag red">{products.length} with photos</span>}
            </div>
            <p className="tiny" style={{ marginTop: '5px' }}>Full product range</p>
          </div>
          <span className="chev">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
          </span>
        </summary>
        <div className="indbody" style={{ padding: '0 28px 28px' }}>
          {(ind.intro || []).map((p, i) => (
            <p key={i} className="sub" style={{ maxWidth: '820px', marginBottom: '6px' }}>{p}</p>
          ))}
          {ind.items?.length > 0 && (
            <ul className="plist r-g1" style={grid(ind.itemColumns || 3)}>
              {ind.items.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
          )}
          {(ind.groups || []).map((g, gi) => (
            <div key={gi}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px', margin: '22px 0 12px' }}>
                <IndustryIcon name={g.icon} size={17} color="#0071BC" />
                <h4 className="h5" style={{ fontSize: '14.5px' }}>{g.title}</h4>
                <div style={{ flex: '1', height: '1px', background: 'var(--bd)' }} />
                <span className="tiny mono">{g.items.length}</span>
              </div>
              <ul className="plist r-g1" style={grid(g.columns || 2)}>
                {g.items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </div>
          ))}
          {ind.solution && (
            <div style={{ marginTop: '24px', padding: '22px 24px', background: 'var(--bg)', borderLeft: '3px solid var(--red)', borderRadius: '0 3px 3px 0' }}>
              <div className="h5" style={{ marginBottom: '2px' }}>{ind.solution.title}</div>
              {ind.solution.paragraphs.map((p, i) => (
                <p key={i} className="sub" style={{ marginTop: '10px' }}>{p}</p>
              ))}
            </div>
          )}
          {products.length > 0 && (
            <div style={{ marginTop: '26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px', margin: '0 0 14px' }}>
                <h4 className="h5" style={{ fontSize: '14.5px' }}>Featured machines</h4>
                <div style={{ flex: '1', height: '1px', background: 'var(--bd)' }} />
                <span className="tiny mono">{products.length}</span>
              </div>
              <div className="r-g1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '14px' }}>
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: '12px', marginTop: '22px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link className="btn btn-red btn-sm" to={`/contact?industry=${encodeURIComponent(ind.name)}`}>Enquire About This Range</Link>
            <a className="btn btn-out btn-sm" href={telHref(phone)}>{PHONE_ICON}{phone}</a>
            <span className="tiny">Send the item name, capacity and quantity — we will revert with options.</span>
          </div>
        </div>
      </details>
    </div>
  );
}

// Converted from industries.html. Industries and their product ranges are managed in Admin → Industries.
export default function Industries() {
  const { data } = useContent();
  const { industries, products, settings: s } = data;
  const location = useLocation();
  usePageTitle('Industries We Serve');

  // Open and scroll to the industry named in the URL (#i-…), e.g. from the home page.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const details = el.querySelector('details');
    if (details) details.open = true;
    requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }, [location.hash]);

  const sorted = [...industries].sort((a, b) => a.name.localeCompare(b.name));
  const byIndustry = (id) => products.filter((p) => p.industryId === id);

  return (
    <>
      <PageBand
        crumbs={[{ label: 'Industries We Serve' }]}
        eyebrow="Industries we serve"
        title="Machinery and equipment for every industry"
        lead="We provide a comprehensive range of machinery, industrial equipment, production systems, tools, testing instruments, automation solutions, material handling equipment, and complete plant solutions across a wide range of industries. Open any industry below to see its full product range."
      >
        <div style={{ display: 'flex', gap: '28px', flexShrink: '0', textAlign: 'right' }} className="band-stats">
          <div>
            <span className="mono" style={{ fontSize: '32px', fontWeight: '600', color: '#fff', lineHeight: '1' }}>{industries.length}</span>
            <div className="tiny" style={{ letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '4px' }}>Industries</div>
          </div>
          <div>
            <span className="mono" style={{ fontSize: '32px', fontWeight: '600', color: '#fff', lineHeight: '1' }}>{totalProductTypes(industries).toLocaleString('en-US')}</span>
            <div className="tiny" style={{ letterSpacing: '.1em', textTransform: 'uppercase', marginTop: '4px' }}>Product types</div>
          </div>
        </div>
      </PageBand>
      <div style={{ background: 'var(--bg)', padding: '40px 0' }}>
        <div className="wrap r-stack" style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
          <div className="r-side" style={{ width: '246px', flexShrink: '0', position: 'sticky', top: '20px' }}>
            <div className="card idxbox r-hide" style={{ padding: '14px 10px' }}>
              <div className="h5" style={{ padding: '6px 10px 12px', borderBottom: '1px solid var(--bd)', marginBottom: '8px' }}>All industries</div>
              {sorted.map((ind) => (
                <a key={ind.id} href={`#${industryAnchor(ind)}`} className="idxlink" onClick={(e) => {
                  e.preventDefault();
                  window.history.replaceState(null, '', `#${industryAnchor(ind)}`);
                  const el = document.getElementById(industryAnchor(ind));
                  el?.querySelector('details')?.setAttribute('open', '');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}>
                  <IndustryIcon name={ind.icon} size={15} color="#0071BC" />
                  <span>{ind.name}</span>
                  <span className="mono" style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--mut2)' }}>{productTypeCount(ind)}</span>
                </a>
              ))}
            </div>
            <div className="card r-hide" style={{ marginTop: '16px', padding: '22px 20px', borderLeft: '3px solid var(--red)' }}>
              <div className="h5" style={{ marginBottom: '8px' }}>Can’t find it here?</div>
              <p className="tiny" style={{ marginBottom: '14px' }}>Send us the requirement — we will source it.</p>
              <Link className="btn btn-red btn-sm btn-w" to="/contact">Send Your Requirement</Link>
              <a className="btn btn-out btn-sm btn-w" href={telHref(s.phone)} style={{ marginTop: '9px' }}>{PHONE_ICON}{s.phone}</a>
            </div>
          </div>
          <div style={{ flex: '1', minWidth: '0' }}>
            <div className="card r-stack" style={{ padding: '18px 24px', marginBottom: '16px', display: 'flex', gap: '14px', alignItems: 'center', borderLeft: '3px solid var(--blue)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.6-3.6" /></svg>
              <p className="sub" style={{ flex: '1' }}>Click any industry to open its full product range. Every list is what we are asked for most often — not the limit of what we can source.</p>
              <Link className="btn btn-red btn-sm" to="/contact">Send Your Requirement</Link>
            </div>
            {sorted.map((ind, i) => (
              <IndustryBlock key={ind.id} ind={ind} open={i === 0} products={byIndustry(ind.id)} phone={s.phone} />
            ))}
            <div className="card on-dark" style={{ background: 'var(--ink2)', border: '0', padding: '36px 38px', marginTop: '24px' }}>
              <span className="eyebrow" style={{ color: '#FF8A8E' }}>And many more industries & solutions</span>
              <h3 className="h3" style={{ color: '#fff', marginTop: '11px', fontSize: '25px' }}>Your industry isn’t listed?</h3>
              <p className="lead" style={{ marginTop: '12px', maxWidth: '700px' }}>
                If you cannot find the specific machinery or equipment you are looking for, simply share your requirement with us — our team will help you source the right product, brand, or complete solution according to your technical and commercial requirements.
              </p>
              <div className="r-stack" style={{ display: 'flex', gap: '12px', marginTop: '22px' }}>
                <Link className="btn btn-red" to="/contact">Send Your Requirement</Link>
                <a className="btn btn-out-w" href={telHref(s.phone)}>{PHONE_ICON}{s.phone}</a>
              </div>
            </div>
            <div style={{ marginTop: '24px' }}>
              <EnquiryCard source="Industries page" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
