import { useEffect, useState } from 'react';
import { Photo } from './Illustrations.jsx';

// Main image with thumbnails and a click-to-enlarge lightbox, in the original card style.
export default function Gallery({ images = [], alt = '', kind = 'machine', note = '' }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    setActive(0);
  }, [images]);
  useEffect(() => {
    if (!zoom) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setZoom(false);
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom, images.length]);

  return (
    <div>
      <div className="card gallery-main" style={{ height: '340px', overflow: 'hidden', position: 'relative', background: '#E6ECF2' }}>
        {images.length ? (
          <button className="gallery-zoom" onClick={() => setZoom(true)} aria-label="Enlarge image">
            <img src={images[active]} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          </button>
        ) : (
          <Photo kind={kind} style={{ background: '#E6ECF2' }} />
        )}
        {note && (
          <div style={{ position: 'absolute', bottom: '14px', right: '16px' }}>
            <span className="tiny">{note}</span>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(78px,1fr))', gap: '10px', marginTop: '12px' }}>
          {images.map((src, i) => (
            <button key={src} className={`thumb${i === active ? ' on' : ''}`} onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`}>
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      {zoom && (
        <div className="lightbox" onClick={() => setZoom(false)} role="dialog" aria-modal="true">
          <img src={images[active]} alt={alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
