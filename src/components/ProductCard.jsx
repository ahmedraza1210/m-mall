import { Link } from 'react-router-dom';
import { Photo } from './Illustrations.jsx';

// Product card in the original site's card style.
export function ProductCard({ product, industry }) {
  return (
    <Link to={`/products/${product.slug}`} className="card pcard" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', color: 'var(--ink)' }}>
      <div className="pcard__media" style={{ aspectRatio: '4 / 3', background: '#E3EAF1', overflow: 'hidden' }}>
        <Photo src={product.images?.[0]} alt={product.name} />
      </div>
      <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', flex: '1' }}>
        {industry && (
          <span className="tiny" style={{ letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: '700', color: 'var(--red)', fontFamily: 'Archivo,sans-serif', fontSize: '11px' }}>
            {industry.name}
          </span>
        )}
        <div className="h5" style={{ marginTop: '6px', fontSize: '16px' }}>{product.name}</div>
        {(product.brand || product.model) && <p className="tiny" style={{ marginTop: '3px' }}>{[product.brand, product.model].filter(Boolean).join(' · ')}</p>}
        <p className="tiny" style={{ marginTop: '8px', color: 'var(--mut)', flex: '1' }}>{product.shortDescription}</p>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontWeight: '600', fontSize: '13.5px', marginTop: '14px', color: 'var(--blue)' }}>
          {'View details '}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
        </span>
      </div>
    </Link>
  );
}
