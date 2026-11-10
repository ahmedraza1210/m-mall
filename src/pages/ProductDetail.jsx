import { Link, useParams } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { usePageTitle, paragraphs, telHref } from '../lib/format.js';
import { industryLink } from '../lib/industries.js';
import PageBand from '../components/PageBand.jsx';
import Gallery from '../components/Gallery.jsx';
import { EnquiryCard } from '../components/EnquiryForms.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { Photo } from '../components/Illustrations.jsx';
import { NotFoundBlock } from '../components/Status.jsx';

function videoEmbed(url) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  return vimeo ? `https://player.vimeo.com/video/${vimeo[1]}` : null;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { data } = useContent();
  const { products, industries, caseStudies, settings: s } = data;
  const product = products.find((p) => p.slug === slug);
  usePageTitle(product?.name || 'Product not found');
  if (!product) return <NotFoundBlock title="Product not found" text="This product may have been removed." to="/products" cta="All products" />;

  const industry = industries.find((i) => i.id === product.industryId);
  const related = products.filter((p) => p.id !== product.id && p.industryId === product.industryId).slice(0, 3);
  const stories = caseStudies.filter((c) => c.productIds?.includes(product.id));
  const embed = product.videoUrl ? videoEmbed(product.videoUrl) : null;
  const facts = [
    ['Industry', industry?.name],
    ['Category', product.category],
    ['Brand', product.brand],
    ['Model', product.model],
    ['Origin', product.origin],
  ].filter(([, v]) => v);

  return (
    <>
      <PageBand
        crumbs={[{ label: 'Products', to: '/products' }, ...(industry ? [{ label: industry.name, to: `/products?industry=${industry.id}` }] : []), { label: product.name }]}
        eyebrow={industry ? industry.name : 'Product'}
        title={product.name}
        lead={product.shortDescription}
      />
      {facts.length > 0 && (
        <div style={{ background: '#fff', borderBottom: '1px solid var(--bd)' }}>
          <div className="wrap r-g2 facts-bar" style={{ display: 'flex' }}>
            {facts.map(([k, v], i) => (
              <div key={k} style={{ flex: '1', padding: i === 0 ? '22px 0' : '22px 0 22px 22px', borderRight: i === facts.length - 1 ? '0' : '1px solid var(--bd)' }}>
                <span className="lbl" style={{ marginBottom: '5px' }}>{k}</span>
                <div className="h4" style={{ fontSize: '17px' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ background: 'var(--bg)', padding: '48px 0' }}>
        <div className="wrap r-stack" style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1', minWidth: '0' }}>
            <Gallery images={product.images} alt={product.name} />
            {product.description && (
              <div style={{ marginTop: '36px' }}>
                <span className="eyebrow">Overview</span>
                <h2 className="h3" style={{ marginTop: '10px' }}>About this machine</h2>
                {paragraphs(product.description).map((p, i) => (
                  <p key={i} className="lead" style={{ marginTop: '14px' }}>{p}</p>
                ))}
              </div>
            )}
            {product.features?.length > 0 && (
              <div style={{ marginTop: '36px' }}>
                <span className="eyebrow">Key features</span>
                <ul className="plist r-g1" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '0 24px', marginTop: '12px' }}>
                  {product.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}
            {product.specs?.length > 0 && (
              <div className="card" style={{ marginTop: '36px', padding: '28px 30px' }}>
                <span className="eyebrow">Specifications</span>
                <table className="spec" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
                  <tbody>
                    {product.specs.map((sp, i) => (
                      <tr key={i}>
                        <td>{sp.label}</td>
                        <td style={{ color: 'var(--ink)', fontWeight: '500' }}>{sp.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="tiny" style={{ marginTop: '14px' }}>Specifications vary by make and model — tell us your requirement and we will confirm.</p>
              </div>
            )}
            {embed && (
              <div style={{ marginTop: '36px' }}>
                <span className="eyebrow">Video</span>
                <div className="card" style={{ marginTop: '12px', aspectRatio: '16 / 9', overflow: 'hidden', background: '#000' }}>
                  <iframe src={embed} title={`${product.name} video`} allowFullScreen loading="lazy" style={{ width: '100%', height: '100%', border: '0' }} />
                </div>
              </div>
            )}
            <div className="r-stack" style={{ display: 'flex', gap: '12px', marginTop: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a className="btn btn-red" href="#enquire">Enquire About This Machine</a>
              {s.whatsapp && (
                <a className="btn btn-out" href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(`Hello, I am interested in: ${product.name}`)}`} target="_blank" rel="noreferrer">WhatsApp</a>
              )}
              {product.brochureUrl && <a className="btn btn-ghost" href={product.brochureUrl} target="_blank" rel="noreferrer">Download Brochure</a>}
              <a className="btn btn-ghost" href={telHref(s.phone)}>{s.phone}</a>
            </div>
            {stories.length > 0 && (
              <div style={{ marginTop: '40px' }}>
                <span className="eyebrow">Case study</span>
                <h2 className="h3" style={{ marginTop: '10px', marginBottom: '16px' }}>Where we have supplied this</h2>
                {stories.map((cs) => (
                  <Link key={cs.id} to={`/case-studies/${cs.slug}`} className="card r-stack" style={{ overflow: 'hidden', display: 'flex', color: 'var(--ink)', marginBottom: '14px' }}>
                    <div className="r-side" style={{ width: '220px', flexShrink: '0', background: '#E3EAF1', minHeight: '150px' }}>
                      <Photo src={cs.images?.[0]} alt="" kind="plant" />
                    </div>
                    <div style={{ flex: '1', padding: '22px 24px' }}>
                      <div className="h4">{cs.title}</div>
                      <p className="sub" style={{ marginTop: '8px' }}>{cs.teaser || cs.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {related.length > 0 && (
              <div style={{ marginTop: '40px' }}>
                <span className="eyebrow">Related machines</span>
                <h2 className="h3" style={{ marginTop: '10px', marginBottom: '16px' }}>More for {industry?.name || 'this industry'}</h2>
                <div className="r-g1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '14px' }}>
                  {related.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}
            {industry && (
              <p className="sub" style={{ marginTop: '28px' }}>
                See the full {industry.name} product range on the <Link to={industryLink(industry)}>Industries page</Link>.
              </p>
            )}
          </div>
          <div id="enquire" className="r-side" style={{ width: '380px', flexShrink: '0', position: 'sticky', top: '20px', scrollMarginTop: '20px' }}>
            <EnquiryCard title="Get a quote for this machine" text="Tell us the capacity, quantity and delivery location. We will reply with options and prices." product={product} source="Product page" />
          </div>
        </div>
      </div>
    </>
  );
}
