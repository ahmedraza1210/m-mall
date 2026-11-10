// Flat vector illustrations in the style of the original site, used when no photo has been uploaded.
export function PlantIllustration({ style }) {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', background: '#E3EAF1', ...style }} aria-hidden="true">
      <rect x="56" y="196" width="290" height="46" rx="4" fill="#7C93A7" />
      <rect x="76" y="118" width="120" height="80" rx="5" fill="#C6D3DE" />
      <rect x="196" y="140" width="120" height="26" rx="13" fill="#9FB2C2" />
      <rect x="286" y="112" width="60" height="86" rx="5" fill="#0071BC" />
      <path d="M316 98v14" stroke="#7C93A7" strokeWidth="10" strokeLinecap="round" />
      <circle cx="316" cy="90" r="12" fill="#E01B22" />
      <rect x="98" y="140" width="34" height="34" fill="#F5F8FA" stroke="#9FB2C2" strokeWidth="3" />
      <rect x="146" y="140" width="34" height="34" fill="#F5F8FA" stroke="#9FB2C2" strokeWidth="3" />
      <path d="M60 242v14h280v-14" stroke="#9FB2C2" strokeWidth="5" fill="none" />
    </svg>
  );
}

export function MachineIllustration({ style }) {
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', background: '#E3EAF1', ...style }} aria-hidden="true">
      <rect x="70" y="200" width="260" height="34" rx="4" fill="#7C93A7" />
      <rect x="96" y="120" width="150" height="82" rx="5" fill="#C6D3DE" />
      <rect x="116" y="140" width="56" height="40" fill="#F5F8FA" stroke="#9FB2C2" strokeWidth="3" />
      <circle cx="210" cy="160" r="20" fill="#9FB2C2" />
      <circle cx="210" cy="160" r="8" fill="#F5F8FA" />
      <rect x="246" y="96" width="58" height="106" rx="5" fill="#0071BC" />
      <rect x="258" y="112" width="34" height="16" rx="2" fill="#F5F8FA" opacity=".85" />
      <circle cx="275" cy="150" r="7" fill="#E01B22" />
      <path d="M80 234v14h240v-14" stroke="#9FB2C2" strokeWidth="5" fill="none" />
    </svg>
  );
}

/** Uploaded photo, or the illustration when there is none. */
export function Photo({ src, alt = '', kind = 'machine', style, className = '' }) {
  if (src) return <img src={src} alt={alt} loading="lazy" decoding="async" className={className} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', ...style }} />;
  return kind === 'plant' ? <PlantIllustration style={style} /> : <MachineIllustration style={style} />;
}
