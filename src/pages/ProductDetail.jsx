import { Link, useParams } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { paragraphs, usePageTitle } from '../lib/format.js';
import PageHeader from '../components/PageHeader.jsx';
import Gallery from '../components/Gallery.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import { ProductCard, CaseStudyCard } from '../components/Cards.jsx';
import { NotFoundBlock } from '../components/Status.jsx';
import Icon from '../components/Icon.jsx';

function videoEmbed(url) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { data } = useContent();
  const { products, categories, caseStudies, settings } = data;
  const product = products.find((p) => p.slug === slug);
  usePageTitle(product?.name || 'Product not found');

  if (!product) return <NotFoundBlock title="Product not found" text="This machine may have been removed." to="/products" cta="Browse products" />;

  const category = categories.find((c) => c.id === product.categoryId);
  const related = products.filter((p) => p.id !== product.id && p.categoryId === product.categoryId).slice(0, 3);
  const stories = caseStudies.filter((c) => c.productIds?.includes(product.id));
  const embed = product.videoUrl ? videoEmbed(product.videoUrl) : null;
  const facts = [
    ['Brand', product.brand],
    ['Model', product.model],
    ['Condition', product.condition],
    ['Availability', product.availability],
  ].filter(([, v]) => v);

  return (
    <>
      <PageHeader
        title={product.name}
        crumbs={[{ label: 'Products', to: '/products' }, ...(category ? [{ label: category.name, to: `/products?category=${category.slug}` }] : [])]}
      />
      <section className="section section--tight">
        <div className="container product-layout">
          <div className="product-layout__media">
            <Gallery images={product.images} alt={product.name} />
          </div>
          <aside className="product-layout__info">
            {category && <span className="eyebrow">{category.name}</span>}
            <h2 className="product-title">{product.name}</h2>
            <p className="lead">{product.shortDescription}</p>
            <div className="price-box">
              <span>Price</span>
              <strong>{product.price || 'On request'}</strong>
            </div>
            {facts.length > 0 && (
              <dl className="facts">
                {facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="product-actions">
              <a href="#quote" className="btn btn--primary btn--lg">Request a quote</a>
              {settings.whatsapp && (
                <a
                  className="btn btn--outline btn--lg"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name}.`)}`}
                >
                  <Icon name="whatsapp" size={18} /> WhatsApp
                </a>
              )}
              {product.brochureUrl && (
                <a className="btn btn--outline btn--lg" href={product.brochureUrl} target="_blank" rel="noreferrer">
                  <Icon name="file" size={18} /> Brochure
                </a>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container product-details">
          <div className="product-details__main">
            {product.description && (
              <article className="prose">
                <h2>Overview</h2>
                {paragraphs(product.description).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </article>
            )}
            {product.features?.length > 0 && (
              <div className="block">
                <h2>Key features</h2>
                <ul className="checklist">
                  {product.features.map((f, i) => (
                    <li key={i}><Icon name="check" size={18} /> {f}</li>
                  ))}
                </ul>
              </div>
            )}
            {product.specs?.length > 0 && (
              <div className="block">
                <h2>Specifications</h2>
                <table className="spec-table">
                  <tbody>
                    {product.specs.map((s, i) => (
                      <tr key={i}>
                        <th scope="row">{s.label}</th>
                        <td>{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {embed && (
              <div className="block">
                <h2>Video</h2>
                <div className="video">
                  <iframe src={embed} title={`${product.name} video`} allowFullScreen loading="lazy" />
                </div>
              </div>
            )}
          </div>
          <aside id="quote" className="quote-card">
            <h2>Get a quote</h2>
            <p>Send us your requirements and we'll reply with price, availability and delivery time.</p>
            <EnquiryForm product={product} compact />
          </aside>
        </div>
      </section>

      {stories.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div className="section__head">
              <div>
                <span className="eyebrow">In the field</span>
                <h2>Case studies with this machine</h2>
              </div>
            </div>
            <div className="card-grid">
              {stories.map((c) => (
                <CaseStudyCard key={c.id} study={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section__head">
              <div>
                <span className="eyebrow">You may also need</span>
                <h2>Related machines</h2>
              </div>
              {category && (
                <Link to={`/products?category=${category.slug}`} className="link-arrow">
                  More {category.name} <Icon name="arrow" size={16} />
                </Link>
              )}
            </div>
            <div className="card-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
