import { Link, useParams } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { paragraphs, usePageTitle } from '../lib/format.js';
import PageHeader from '../components/PageHeader.jsx';
import Gallery from '../components/Gallery.jsx';
import { ProductCard, CaseStudyCard } from '../components/Cards.jsx';
import { NotFoundBlock } from '../components/Status.jsx';

function Section({ title, text }) {
  if (!text) return null;
  return (
    <div className="block prose">
      <h2>{title}</h2>
      {paragraphs(text).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const { data } = useContent();
  const study = data.caseStudies.find((c) => c.slug === slug);
  usePageTitle(study?.title || 'Case study not found');
  if (!study) return <NotFoundBlock title="Case study not found" to="/case-studies" cta="All case studies" />;

  const catById = Object.fromEntries(data.categories.map((c) => [c.id, c]));
  const used = data.products.filter((p) => study.productIds?.includes(p.id));
  const more = data.caseStudies.filter((c) => c.id !== study.id).slice(0, 3);
  const facts = [
    ['Client', study.client],
    ['Industry', study.industry],
    ['Location', study.location],
  ].filter(([, v]) => v);

  return (
    <>
      <PageHeader title={study.title} subtitle={study.summary} crumbs={[{ label: 'Case studies', to: '/case-studies' }, { label: study.client || 'Project' }]} />
      <section className="section section--tight">
        <div className="container">
          {facts.length > 0 && (
            <dl className="facts facts--row">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}
          {study.metrics?.length > 0 && (
            <div className="metrics">
              {study.metrics.map((m, i) => (
                <div key={i} className="metric">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          )}
          <div className="case-layout">
            <div>
              <Section title="The challenge" text={study.challenge} />
              <Section title="Our solution" text={study.solution} />
              <Section title="The results" text={study.results} />
              {study.testimonial && (
                <blockquote className="quote">
                  <p>“{study.testimonial}”</p>
                  {study.testimonialAuthor && <cite>— {study.testimonialAuthor}</cite>}
                </blockquote>
              )}
            </div>
            <div className="case-layout__media">
              <Gallery images={study.images} alt={study.title} />
              <div className="quote-card quote-card--small">
                <h3>Planning a similar project?</h3>
                <p>We'll help you choose the right machines and plan delivery.</p>
                <Link to="/contact" className="btn btn--primary btn--block">Talk to our team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {used.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div className="section__head">
              <div>
                <span className="eyebrow">Equipment used</span>
                <h2>Machines in this project</h2>
              </div>
            </div>
            <div className="card-grid">
              {used.map((p) => (
                <ProductCard key={p.id} product={p} category={catById[p.categoryId]} />
              ))}
            </div>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section__head">
              <div>
                <span className="eyebrow">More stories</span>
                <h2>Other case studies</h2>
              </div>
            </div>
            <div className="card-grid">
              {more.map((c) => (
                <CaseStudyCard key={c.id} study={c} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
