import { Link, useSearchParams } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { usePageTitle } from '../lib/format.js';
import { industryLink } from '../lib/industries.js';
import PageBand from '../components/PageBand.jsx';
import IndustryIcon from '../components/IndustryIcon.jsx';
import { ProductCard } from '../components/ProductCard.jsx';

const norm = (s) => String(s || '').toLowerCase();

// Search across products (with photos) and every industry's product range.
export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim();
  const { data } = useContent();
  usePageTitle(q ? `Search: ${q}` : 'Search');
  const words = norm(q).split(/\s+/).filter(Boolean);
  const match = (text) => words.length > 0 && words.every((w) => norm(text).includes(w));
  const industryById = Object.fromEntries(data.industries.map((i) => [i.id, i]));

  const products = data.products.filter((p) => match([p.name, p.brand, p.model, p.category, p.shortDescription, industryById[p.industryId]?.name].join(' ')));
  const ranges = [];
  for (const ind of data.industries) {
    const lists = [{ title: '', items: ind.items || [] }, ...(ind.groups || [])];
    for (const g of lists) for (const item of g.items) if (match(`${item} ${g.title}`) || match(`${item} ${ind.name}`)) ranges.push({ ind, item, group: g.title });
  }
  const industries = data.industries.filter((i) => match(i.name));

  return (
    <>
      <PageBand crumbs={[{ label: 'Search' }]} eyebrow="Search results" title={q ? `“${q}”` : 'Search'} lead={q ? `${products.length + ranges.length + industries.length} results across products and industry ranges.` : 'Type a machine, tool or equipment in the search box above.'} />
      <div style={{ background: 'var(--bg)', padding: '40px 0 56px' }}>
        <div className="wrap">
          {industries.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <span className="eyebrow">Industries</span>
              <div className="r-g1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '12px', marginTop: '14px' }}>
                {industries.map((i) => (
                  <Link key={i.id} className="card" to={industryLink(i)} style={{ padding: '18px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <IndustryIcon name={i.icon} size={19} />
                    <span className="h5">{i.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {products.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <span className="eyebrow">Products</span>
              <div className="r-g1" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '14px', marginTop: '14px' }}>
                {products.map((p) => <ProductCard key={p.id} product={p} industry={industryById[p.industryId]} />)}
              </div>
            </div>
          )}
          {ranges.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <span className="eyebrow">In our product ranges</span>
              <div className="card" style={{ marginTop: '14px' }}>
                {ranges.slice(0, 200).map((r, i) => (
                  <Link key={i} to={industryLink(r.ind)} className="search-row">
                    <span style={{ fontWeight: '600', color: 'var(--ink)' }}>{r.item}</span>
                    <span className="tiny">{r.ind.name}{r.group ? ` · ${r.group}` : ''}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="card on-dark" style={{ background: 'var(--ink2)', border: '0', padding: '30px 32px' }}>
            <h3 className="h3" style={{ color: '#fff', fontSize: '23px', marginBottom: '8px' }}>{q && !products.length && !ranges.length ? 'Nothing listed — but we can still source it.' : 'Didn’t find exactly what you need?'}</h3>
            <p className="lead" style={{ marginBottom: '18px' }}>Send the machine name, model, capacity and quantity. Our lists show what we are asked for most often — not the limit of what we can source.</p>
            <Link className="btn btn-red" to="/contact">Send Your Requirement</Link>
          </div>
        </div>
      </div>
    </>
  );
}
