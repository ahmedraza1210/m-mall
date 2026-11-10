import { Link } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { paragraphs, usePageTitle } from '../lib/format.js';
import PageHeader from '../components/PageHeader.jsx';
import Icon from '../components/Icon.jsx';

const values = [
  { icon: 'shield', title: 'Quality first', text: 'We only supply machines we would put on our own sites, from brands with proven track records.' },
  { icon: 'wrench', title: 'Support for the long run', text: 'Our service team, parts stock and maintenance plans keep your equipment working.' },
  { icon: 'truck', title: 'Nationwide delivery', text: 'Our logistics team delivers, installs and commissions machines wherever you work.' },
];

export default function About() {
  const { data } = useContent();
  const s = data.settings;
  usePageTitle('About us');
  return (
    <>
      <PageHeader title={`About ${s.siteName}`} subtitle={s.tagline} crumbs={[{ label: 'About' }]} />
      <section className="section section--tight">
        <div className="container about-grid">
          <div className="prose prose--lg">
            {paragraphs(s.aboutText).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <Link to="/contact" className="btn btn--primary">Get in touch</Link>
          </div>
          {s.stats?.length > 0 && (
            <div className="stat-grid">
              {s.stats.map((st, i) => (
                <div key={i} className="metric">
                  <strong>{st.value}</strong>
                  <span>{st.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="section section--alt">
        <div className="container">
          <div className="section__head section__head--center">
            <span className="eyebrow">What we stand for</span>
            <h2>How we work</h2>
          </div>
          <div className="reasons reasons--3">
            {values.map((v) => (
              <div key={v.title} className="reason">
                <span className="reason__icon"><Icon name={v.icon} size={26} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
