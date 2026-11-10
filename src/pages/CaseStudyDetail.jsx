import { Link, useParams } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { usePageTitle, paragraphs } from '../lib/format.js';
import PageBand from '../components/PageBand.jsx';
import Gallery from '../components/Gallery.jsx';
import { EnquiryCard } from '../components/EnquiryForms.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { NotFoundBlock } from '../components/Status.jsx';

const TICK = (
  <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--red-t)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: '0', marginTop: '1px' }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7" /></svg>
  </div>
);

// Converted from case-study.html. Case studies are managed in Admin → Case studies.
export default function CaseStudyDetail() {
  const { slug } = useParams();
  const { data } = useContent();
  const cs = data.caseStudies.find((c) => c.slug === slug);
  usePageTitle(cs ? `Case Study: ${cs.title}` : 'Case study not found');
  if (!cs) return <NotFoundBlock title="Case study not found" to="/case-studies" cta="All case studies" />;
  const used = data.products.filter((p) => cs.productIds?.includes(p.id));
  const industryById = Object.fromEntries(data.industries.map((i) => [i.id, i]));
  const multiple = data.caseStudies.length > 1;

  return (
    <>
      <PageBand
        crumbs={multiple ? [{ label: 'Case Study', to: '/case-studies' }, { label: cs.client || cs.title }] : [{ label: 'Case Study' }]}
        eyebrow="Case study"
        title={cs.title}
        lead={cs.summary}
      />
      {cs.facts?.length > 0 && (
        <div style={{ background: '#fff', borderBottom: '1px solid var(--bd)' }}>
          <div className="wrap r-g2 facts-bar" style={{ display: 'flex' }}>
            {cs.facts.map((f, i) => (
              <div key={i} style={{ flex: '1', padding: i === 0 ? '24px 0' : '24px 0 24px 22px', borderRight: i === cs.facts.length - 1 ? '0' : '1px solid var(--bd)' }}>
                <span className="lbl" style={{ marginBottom: '5px' }}>{f.label}</span>
                <div className="h4">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ background: 'var(--bg)', padding: '48px 0' }}>
        <div className="wrap r-stack" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1', minWidth: '0' }}>
            <Gallery images={cs.images} alt={cs.title} kind="plant" note={cs.images?.length ? '' : cs.imageNote} />
            {cs.projectText && (
              <div style={{ marginTop: '36px' }}>
                <span className="eyebrow">The project</span>
                <h2 className="h3" style={{ marginTop: '10px' }}>{cs.projectTitle}</h2>
                {paragraphs(cs.projectText).map((p, i) => (
                  <p key={i} className="lead" style={{ marginTop: '14px' }}>{p}</p>
                ))}
              </div>
            )}
            {cs.roleItems?.length > 0 && (
              <div style={{ marginTop: '36px' }}>
                <span className="eyebrow">Our role</span>
                <h2 className="h3" style={{ marginTop: '10px', marginBottom: '8px' }}>{cs.roleTitle}</h2>
                {cs.roleItems.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '15px 0', borderBottom: '1px solid var(--bd)' }}>
                    {TICK}
                    <span style={{ fontSize: '15.5px' }}>{r}</span>
                  </div>
                ))}
              </div>
            )}
            {cs.highlightTitle && (
              <div className="card" style={{ marginTop: '36px', padding: '32px 34px', borderLeft: '3px solid var(--red)' }}>
                <span className="eyebrow">Project highlight</span>
                <h3 className="h3" style={{ marginTop: '10px', fontSize: '23px' }}>{cs.highlightTitle}</h3>
                {cs.highlightText && <p className="lead" style={{ marginTop: '13px' }}>{cs.highlightText}</p>}
              </div>
            )}
            {cs.whyText && (
              <div style={{ marginTop: '36px' }}>
                <span className="eyebrow">Why this matters</span>
                <h2 className="h3" style={{ marginTop: '10px' }}>{cs.whyTitle}</h2>
                <p className="lead" style={{ marginTop: '14px' }}>{cs.whyText}</p>
              </div>
            )}
            {used.length > 0 && (
              <div style={{ marginTop: '36px' }}>
                <span className="eyebrow">Machines supplied</span>
                <h2 className="h3" style={{ marginTop: '10px', marginBottom: '16px' }}>Equipment in this project</h2>
                <div className="r-g1" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '14px' }}>
                  {used.map((p) => <ProductCard key={p.id} product={p} industry={industryById[p.industryId]} />)}
                </div>
              </div>
            )}
            <div className="on-dark blueprint-d" style={{ marginTop: '32px', background: 'var(--ink)', borderRadius: '4px', padding: '40px 36px', textAlign: 'center' }}>
              <h2 className="h2" style={{ fontSize: '29px', color: '#fff' }}>Your Requirement. Our Sourcing.<br />One Complete Solution.</h2>
              <div className="r-stack" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
                <Link className="btn btn-red btn-lg" to="/contact">Start Your Project</Link>
                <Link className="btn btn-out-w btn-lg" to="/contact">Contact Us</Link>
              </div>
            </div>
            {cs.footnote && <p className="tiny" style={{ marginTop: '20px' }}>{cs.footnote}</p>}
          </div>
          <div className="r-side" style={{ width: '380px', flexShrink: '0', position: 'sticky', top: '68px' }}>
            <EnquiryCard title="Planning a similar project?" source={`Case study: ${cs.title}`} />
            {cs.glance?.length > 0 && (
              <div className="card" style={{ padding: '24px', marginTop: '16px' }}>
                <div className="h5" style={{ marginBottom: '12px' }}>At a glance</div>
                <table className="spec narrow" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {cs.glance.map((g, i) => (
                      <tr key={i}>
                        <td>{g.label}</td>
                        <td style={{ color: 'var(--ink)', fontWeight: '500' }}>{g.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
