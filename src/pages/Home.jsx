import { Link } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { usePageTitle } from '../lib/format.js';
import { ProductCard, CaseStudyCard } from '../components/Cards.jsx';
import MachineImage from '../components/MachineImage.jsx';
import Icon from '../components/Icon.jsx';

const reasons = [
  { icon: 'shield', title: 'Inspected & certified', text: 'Every machine is checked by our technicians before it leaves the yard.' },
  { icon: 'truck', title: 'Delivery & installation', text: 'We transport, install and commission equipment at your site.' },
  { icon: 'wrench', title: 'After-sales service', text: 'Genuine parts, scheduled maintenance and fast breakdown support.' },
  { icon: 'coins', title: 'Flexible financing', text: 'Lease, instalment and trade-in options to fit your budget.' },
];

export default function Home() {
  const { data } = useContent();
  const { settings: s, categories, products, caseStudies } = data;
  usePageTitle(s.tagline);

  const featured = (products.filter((p) => p.featured).length ? products.filter((p) => p.featured) : products).slice(0, 6);
  const stories = (caseStudies.filter((c) => c.featured).length ? caseStudies.filter((c) => c.featured) : caseStudies).slice(0, 3);
  const catById = Object.fromEntries(categories.map((c) => [c.id, c]));
  const countIn = (id) => products.filter((p) => p.categoryId === id).length;

  return (
    <>
      <section className={`hero ${s.heroImage ? 'hero--image' : ''}`} style={s.heroImage ? { '--hero-img': `url("${s.heroImage}")` } : undefined}>
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="hero__kicker">{s.siteName}</span>
            <h1>{s.heroTitle}</h1>
            <p>{s.heroSubtitle}</p>
            <div className="hero__actions">
              <Link to="/products" className="btn btn--primary btn--lg">
                Browse machinery <Icon name="arrow" size={18} />
              </Link>
              <Link to="/contact" className="btn btn--ghost btn--lg">
                Request a quote
              </Link>
            </div>
          </div>
          {s.stats?.length > 0 && (
            <dl className="hero__stats">
              {s.stats.map((st, i) => (
                <div key={i}>
                  <dt>{st.label}</dt>
                  <dd>{st.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {categories.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section__head">
              <div>
                <span className="eyebrow">Shop by category</span>
                <h2>Machinery for every job</h2>
              </div>
              <Link to="/products" className="link-arrow">
                All products <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="category-grid">
              {categories.map((c) => (
                <Link key={c.id} to={`/products?category=${c.slug}`} className="category-tile">
                  <MachineImage src={c.image} alt={c.name} />
                  <div className="category-tile__body">
                    <h3>{c.name}</h3>
                    <p>{c.description}</p>
                    <span className="category-tile__count">{countIn(c.id)} products</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div className="section__head">
              <div>
                <span className="eyebrow">Featured equipment</span>
                <h2>Popular machines</h2>
              </div>
              <Link to="/products" className="link-arrow">
                View catalogue <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="card-grid">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} category={catById[p.categoryId]} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section__head section__head--center">
            <span className="eyebrow">Why {s.siteName}</span>
            <h2>More than a machine supplier</h2>
          </div>
          <div className="reasons">
            {reasons.map((r) => (
              <div key={r.title} className="reason">
                <span className="reason__icon"><Icon name={r.icon} size={26} /></span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {stories.length > 0 && (
        <section className="section section--dark">
          <div className="container">
            <div className="section__head">
              <div>
                <span className="eyebrow">Case studies</span>
                <h2>Results our customers see</h2>
              </div>
              <Link to="/case-studies" className="link-arrow">
                All case studies <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="card-grid">
              {stories.map((c) => (
                <CaseStudyCard key={c.id} study={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cta-band">
        <div className="container cta-band__inner">
          <div>
            <h2>Need help choosing a machine?</h2>
            <p>Tell us about your project and we'll recommend the right equipment and send a quote.</p>
          </div>
          <div className="cta-band__actions">
            <Link to="/contact" className="btn btn--dark btn--lg">Talk to sales</Link>
            {s.phone && (
              <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="btn btn--outline-dark btn--lg">
                <Icon name="phone" size={18} /> {s.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
