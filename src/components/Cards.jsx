import { Link } from 'react-router-dom';
import MachineImage from './MachineImage.jsx';
import Icon from './Icon.jsx';

export function ProductCard({ product, category }) {
  return (
    <Link to={`/products/${product.slug}`} className="card product-card">
      <div className="card__media">
        <MachineImage src={product.images?.[0]} alt={product.name} />
        {product.availability && <span className="badge badge--float">{product.availability}</span>}
      </div>
      <div className="card__body">
        {category && <span className="eyebrow">{category.name}</span>}
        <h3 className="card__title">{product.name}</h3>
        {(product.brand || product.model) && (
          <p className="card__meta">{[product.brand, product.model].filter(Boolean).join(' · ')}</p>
        )}
        <p className="card__text">{product.shortDescription}</p>
        <div className="card__footer">
          <span className="card__price">{product.price || 'Price on request'}</span>
          <span className="card__link">
            Details <Icon name="arrow" size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CaseStudyCard({ study }) {
  return (
    <Link to={`/case-studies/${study.slug}`} className="card case-card">
      <div className="card__media">
        <MachineImage src={study.images?.[0]} alt={study.title} />
      </div>
      <div className="card__body">
        <span className="eyebrow">{[study.industry, study.location].filter(Boolean).join(' · ')}</span>
        <h3 className="card__title">{study.title}</h3>
        <p className="card__text">{study.summary}</p>
        {study.metrics?.length > 0 && (
          <div className="mini-metrics">
            {study.metrics.slice(0, 3).map((m, i) => (
              <div key={i}>
                <strong>{m.value}</strong>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        )}
        <span className="card__link">
          Read case study <Icon name="arrow" size={16} />
        </span>
      </div>
    </Link>
  );
}
