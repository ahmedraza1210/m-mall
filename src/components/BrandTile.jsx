// A brand logo tile. Brands without an uploaded logo show their name in the
// original dashed placeholder style.
export default function BrandTile({ brand, height = '84px' }) {
  const inner = brand.logo ? (
    <img src={brand.logo} alt={brand.name} loading="lazy" style={{ maxWidth: '80%', maxHeight: '70%', objectFit: 'contain' }} />
  ) : (
    <span className="tiny" style={{ textAlign: 'center', padding: '0 8px' }}>{brand.name}</span>
  );
  const style = { height, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' };
  const cls = `card${brand.logo ? '' : ' ph'}`;
  return brand.url ? (
    <a className={cls} style={style} href={brand.url} target="_blank" rel="noreferrer" title={brand.name}>{inner}</a>
  ) : (
    <div className={cls} style={style} title={brand.name}>{inner}</div>
  );
}
