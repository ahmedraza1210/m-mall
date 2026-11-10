import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useContent } from '../lib/content.jsx';
import { usePageTitle } from '../lib/format.js';
import PageHeader from '../components/PageHeader.jsx';
import { ProductCard } from '../components/Cards.jsx';
import Icon from '../components/Icon.jsx';

export default function Products() {
  const { data } = useContent();
  const { categories, products } = data;
  const [params, setParams] = useSearchParams();
  const categorySlug = params.get('category') || '';
  const q = params.get('q') || '';
  const active = categories.find((c) => c.slug === categorySlug);
  usePageTitle(active ? active.name : 'Products');

  const catById = Object.fromEntries(categories.map((c) => [c.id, c]));
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) => {
      if (active && p.categoryId !== active.id) return false;
      if (!term) return true;
      return [p.name, p.brand, p.model, p.shortDescription, catById[p.categoryId]?.name]
        .join(' ')
        .toLowerCase()
        .includes(term);
    });
  }, [products, active, q]); // eslint-disable-line react-hooks/exhaustive-deps

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <>
      <PageHeader
        title={active ? active.name : 'Our machinery'}
        subtitle={active?.description || 'New and refurbished equipment for construction, industry and agriculture.'}
        crumbs={[{ label: 'Products', to: active ? '/products' : undefined }, ...(active ? [{ label: active.name }] : [])]}
      />
      <section className="section section--tight">
        <div className="container">
          <div className="filters">
            <div className="chips" role="tablist" aria-label="Categories">
              <button className={`chip ${!active ? 'is-active' : ''}`} onClick={() => update('category', '')}>
                All
              </button>
              {categories.map((c) => (
                <button key={c.id} className={`chip ${active?.id === c.id ? 'is-active' : ''}`} onClick={() => update('category', c.slug)}>
                  {c.name}
                </button>
              ))}
            </div>
            <label className="search">
              <Icon name="search" size={18} />
              <input type="search" placeholder="Search machines, brands, models…" value={q} onChange={(e) => update('q', e.target.value)} />
            </label>
          </div>
          <p className="results-count">
            {results.length} {results.length === 1 ? 'product' : 'products'}
          </p>
          {results.length ? (
            <div className="card-grid">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} category={catById[p.categoryId]} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>No machines match your search</h3>
              <p>Try another category or search term, or contact us — we can source machines that aren't listed.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
