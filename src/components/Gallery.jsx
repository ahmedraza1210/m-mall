import { useEffect, useState } from 'react';
import MachineImage from './MachineImage.jsx';
import Icon from './Icon.jsx';

export default function Gallery({ images = [], alt }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    setActive(0);
  }, [images]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setZoom(false);
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom, images.length]);

  if (!images.length) return <MachineImage className="gallery__main" alt={alt} label="Photos coming soon" />;

  return (
    <div className="gallery">
      <button className="gallery__main-btn" onClick={() => setZoom(true)} aria-label="Enlarge image">
        <MachineImage className="gallery__main" src={images[active]} alt={alt} />
      </button>
      {images.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              className={`gallery__thumb ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      {zoom && (
        <div className="lightbox" onClick={() => setZoom(false)} role="dialog" aria-modal="true">
          <button className="lightbox__close" aria-label="Close">
            <Icon name="close" size={28} />
          </button>
          <img src={images[active]} alt={alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
