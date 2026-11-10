/** Number of product types listed for an industry. */
export function productTypeCount(ind) {
  return (ind.items?.length || 0) + (ind.groups || []).reduce((n, g) => n + (g.items?.length || 0), 0);
}

export function totalProductTypes(industries) {
  return industries.reduce((n, i) => n + productTypeCount(i), 0);
}

/** "1,267" → "1,200+" style rounding used in headlines. */
export function roundedPlus(n) {
  if (n < 100) return String(n);
  const step = n >= 1000 ? 100 : 10;
  return `${(Math.floor(n / step) * step).toLocaleString('en-US')}+`;
}

export const industryAnchor = (ind) => `i-${ind.slug}`;
export const industryLink = (ind) => `/industries#${industryAnchor(ind)}`;
