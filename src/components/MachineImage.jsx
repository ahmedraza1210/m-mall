// Shows an uploaded image, or a neutral illustrated placeholder when none exists.
export default function MachineImage({ src, alt = '', className = '', label }) {
  if (src) return <img className={`media ${className}`} src={src} alt={alt} loading="lazy" decoding="async" />;
  return (
    <div className={`media media--placeholder ${className}`} role="img" aria-label={alt || 'No image yet'}>
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
          <rect x="18" y="38" width="44" height="18" rx="3" />
          <path d="M40 38V26h14l8 12" />
          <path d="M62 44l20-20 14 6" />
          <path d="M96 30l4 12h-10" />
          <rect x="14" y="56" width="52" height="10" rx="5" />
          <circle cx="22" cy="61" r="2" />
          <circle cx="58" cy="61" r="2" />
        </g>
      </svg>
      {label && <span>{label}</span>}
    </div>
  );
}
