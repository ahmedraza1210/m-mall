import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { usePageTitle } from '../lib/format.js';
import PageBand from '../components/PageBand.jsx';
import { ProductCard } from '../components/ProductCard.jsx';
import { EnquiryCard } from '../components/EnquiryForms.jsx';

// Product catalogue: machines added in Admin → Products, with photos and full details.
export default function Products() {
  const { data } = useContent();
  const { products, industries } = data;
  const [params, setParams] = useSearchParams();
  const industryId = params.get('industry') || '';
  usePageTitle('Products');
  const industryById = Object.fromEntries(industries.map((i) => [i.id, i]));
  const used = industries.filter((i) => products.some((p) => p.industryId === i.id)).sort((a, b) => a.name.localeCompare(b.name));
  const list = useMemo(() => (industryId ? products.filter((p) => p.industryId === industryId) : products), [products, industryId]);
  const pick = (id) => setParams(id ? { industry: id } : {}, { replace: true });

  return (
    <>
      <PageBand
        crumbs={[{ label: 'Products' }]}
        eyebrow="Products"
        title="Machines, equipment and complete lines"
        lead="A selection of the machinery we supply, with photos and specifications. Can’t see what you need? Every industry’s full product range is on the Industries page — and we source beyond it."
      >
        <div style={{ display: 'flex', gap: '14px', flexShrink: '0' }}>
          <Link className="btn btn-out-w" to="/industries">Browse all industries</Link>
        </div>
      </PageBand>
      <div style={{ background: 'var(--bg)', padding: '40px 0 48px' }}>
        <div className="wrap r-stack" style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
          <div style={{ flex: '1', minWidth: '0' }}>
            {used.length > 1 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                <button className={`chip${!industryId ? ' tint' : ''}`} onClick={() => pick('')}>All products</button>
                {used.map((i) => (
                  <button key={i.id} className={`chip${industryId === i.id ? ' tint' : ''}`} onClick={() => pick(i.id)}>{i.name}</button>
                ))}
              </div>
            )}
            {list.length ? (
              <div className="r-g1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '16px' }}>
                {list.map((p) => <ProductCard key={p.id} product={p} industry={industryById[p.industryId]} />)}
              </div>
            ) : (
              <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                <h3 className="h4" style={{ marginBottom: '8px' }}>No products listed here yet</h3>
                <p className="sub">See the full product ranges on the <Link to="/industries">Industries</Link> page, or send us your requirement.</p>
              </div>
            )}
          </div>
          <div className="r-side" style={{ width: '340px', flexShrink: '0', position: 'sticky', top: '20px' }}>
            <EnquiryCard source="Products page" />
          </div>
        </div>
      </div>
    </>
  );
}
