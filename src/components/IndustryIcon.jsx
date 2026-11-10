import { INDUSTRY_ICONS } from '../lib/industryIcons.js';

// Renders one of the original site's line icons. Icons come from a fixed
// built-in list (never from user input), so the markup is safe to inject.
export default function IndustryIcon({ name, size = 20, color = '#E01B22', strokeWidth = 1.8 }) {
  const inner = INDUSTRY_ICONS[name] || INDUSTRY_ICONS.i1;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
