import { useState } from 'react';
import { useContent } from '../lib/content.jsx';
import { usePageTitle } from '../lib/format.js';
import PageHeader from '../components/PageHeader.jsx';
import { CaseStudyCard } from '../components/Cards.jsx';

export default function CaseStudies() {
  const { data } = useContent();
  const studies = data.caseStudies;
  usePageTitle('Case Studies');
  const industries = [...new Set(studies.map((s) => s.industry).filter(Boolean))];
  const [industry, setIndustry] = useState('');
  const shown = industry ? studies.filter((s) => s.industry === industry) : studies;

  return (
    <>
      <PageHeader
        title="Case studies"
        subtitle="How contractors, manufacturers and farms use our machinery to work faster and spend less."
        crumbs={[{ label: 'Case studies' }]}
      />
      <section className="section section--tight">
        <div className="container">
          {industries.length > 1 && (
            <div className="chips chips--spaced">
              <button className={`chip ${!industry ? 'is-active' : ''}`} onClick={() => setIndustry('')}>All industries</button>
              {industries.map((i) => (
                <button key={i} className={`chip ${industry === i ? 'is-active' : ''}`} onClick={() => setIndustry(i)}>{i}</button>
              ))}
            </div>
          )}
          {shown.length ? (
            <div className="card-grid">
              {shown.map((c) => (
                <CaseStudyCard key={c.id} study={c} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>Case studies coming soon</h3>
              <p>We're writing up recent projects. Check back shortly.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
