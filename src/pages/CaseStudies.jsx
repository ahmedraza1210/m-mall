import { Link, Navigate } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { usePageTitle } from '../lib/format.js';
import PageBand from '../components/PageBand.jsx';
import { Photo } from '../components/Illustrations.jsx';

// List of case studies. With a single case study the visitor goes straight to it,
// as on the original site.
export default function CaseStudies() {
  const { data } = useContent();
  const list = data.caseStudies;
  usePageTitle('Case Studies');
  if (list.length === 1) return <Navigate to={`/case-studies/${list[0].slug}`} replace />;
  return (
    <>
      <PageBand
        crumbs={[{ label: 'Case Study' }]}
        eyebrow="Case studies"
        title="Projects we have sourced and supplied"
        lead="From a single specialised machine to a complete production plant — a look at requirements we have handled for our customers."
      />
      <div style={{ background: 'var(--bg)', padding: '48px 0' }}>
        <div className="wrap">
          {list.length === 0 ? (
            <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
              <h3 className="h4">Case studies coming soon</h3>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {list.map((cs) => (
                <Link key={cs.id} to={`/case-studies/${cs.slug}`} className="card r-stack" style={{ overflow: 'hidden', display: 'flex', color: 'var(--ink)' }}>
                  <div className="r-side" style={{ width: '320px', flexShrink: '0', background: '#E3EAF1', minHeight: '220px' }}>
                    <Photo src={cs.images?.[0]} alt={cs.title} kind="plant" />
                  </div>
                  <div style={{ flex: '1', padding: '28px 30px' }}>
                    <span className="eyebrow">{cs.facts?.find((f) => f.label.toLowerCase() === 'industry')?.value || 'Case study'}</span>
                    <h2 className="h3" style={{ marginTop: '10px', fontSize: '24px' }}>{cs.title}</h2>
                    {cs.clientFull && <p className="sub" style={{ fontWeight: '600', color: 'var(--ink)', marginTop: '10px' }}>{cs.clientFull}</p>}
                    <p className="sub" style={{ marginTop: '8px' }}>{cs.teaser || cs.summary}</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontWeight: '600', marginTop: '16px', color: 'var(--blue)' }}>
                      {'Read the case study '}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
