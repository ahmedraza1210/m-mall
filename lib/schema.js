// Cleans data coming from the admin panel so only known fields are saved.
import { slugify } from './http.js';
import { INDUSTRY_ICONS } from '../src/lib/industryIcons.js';

const str = (v, max = 5000) => (v == null ? '' : String(v).trim().slice(0, max));
// Only allow http(s) links, so a link field can never run script.
const url = (v) => {
  const u = str(v, 1000);
  return /^https?:\/\//i.test(u) ? u : '';
};
const strList = (v, max = 300, limit = 400) =>
  Array.isArray(v) ? v.map((x) => str(x, max)).filter(Boolean).slice(0, limit) : [];
const pairs = (v, limit = 60) =>
  Array.isArray(v)
    ? v
        .map((p) => ({ label: str(p?.label, 120), value: str(p?.value, 500) }))
        .filter((p) => p.label || p.value)
        .slice(0, limit)
    : [];
const isUpload = (u) => /^(https?:\/\/|\/uploads\/)/.test(u);
const images = (v) => (Array.isArray(v) ? v.map((x) => str(x, 1000)).filter(isUpload).slice(0, 30) : []);
const image = (v) => images([v])[0] || '';
const icon = (v) => (INDUSTRY_ICONS[v] ? v : 'i1');
const int = (v, min, max) => Math.max(min, Math.min(max, Number.parseInt(v, 10) || 0));

export const COLLECTIONS = {
  products: {
    prefix: 'p',
    clean: (i) => ({
      name: str(i.name, 200),
      slug: slugify(i.slug || i.name),
      industryId: str(i.industryId, 120),
      category: str(i.category, 160),
      brand: str(i.brand, 120),
      model: str(i.model, 120),
      origin: str(i.origin, 120),
      shortDescription: str(i.shortDescription, 500),
      description: str(i.description, 20000),
      specs: pairs(i.specs),
      features: strList(i.features, 300, 50),
      images: images(i.images),
      brochureUrl: url(i.brochureUrl),
      videoUrl: url(i.videoUrl),
      featured: Boolean(i.featured),
    }),
    required: ['name'],
  },
  caseStudies: {
    prefix: 'cs',
    clean: (i) => ({
      title: str(i.title, 200),
      slug: slugify(i.slug || i.title),
      teaserTitle: str(i.teaserTitle, 200),
      summary: str(i.summary, 1000),
      teaser: str(i.teaser, 1000),
      client: str(i.client, 200),
      clientFull: str(i.clientFull, 300),
      facts: pairs(i.facts, 6),
      images: images(i.images),
      imageNote: str(i.imageNote, 200),
      projectTitle: str(i.projectTitle, 200),
      projectText: str(i.projectText, 20000),
      roleTitle: str(i.roleTitle, 200),
      roleItems: strList(i.roleItems, 300, 30),
      highlightTitle: str(i.highlightTitle, 300),
      highlightText: str(i.highlightText, 5000),
      whyTitle: str(i.whyTitle, 200),
      whyText: str(i.whyText, 5000),
      glance: pairs(i.glance, 12),
      footnote: str(i.footnote, 500),
      industryId: str(i.industryId, 120),
      productIds: strList(i.productIds, 100, 100),
      featured: Boolean(i.featured),
    }),
    required: ['title'],
  },
  industries: {
    prefix: 'ind',
    clean: (i) => ({
      name: str(i.name, 120),
      slug: slugify(i.slug || i.name),
      title: str(i.title, 200),
      icon: icon(i.icon),
      image: image(i.image),
      intro: strList(i.intro, 5000, 10),
      items: strList(i.items, 200, 400),
      itemColumns: int(i.itemColumns, 1, 3) || 3,
      groups: Array.isArray(i.groups)
        ? i.groups
            .map((g) => ({ title: str(g?.title, 200), icon: icon(g?.icon), items: strList(g?.items, 200, 200), columns: int(g?.columns, 1, 3) || 2 }))
            .filter((g) => g.title || g.items.length)
            .slice(0, 60)
        : [],
      solution:
        i.solution && (str(i.solution.title) || strList(i.solution.paragraphs).length)
          ? { title: str(i.solution.title, 200), paragraphs: strList(i.solution.paragraphs, 5000, 10) }
          : null,
      showOnHome: Boolean(i.showOnHome),
      showInHero: Boolean(i.showInHero),
      heroOrder: int(i.heroOrder, 0, 999),
      heroItems: strList(i.heroItems, 200, 8),
    }),
    required: ['name'],
  },
  brandGroups: {
    prefix: 'bg',
    clean: (i) => ({
      name: str(i.name, 200),
      brands: Array.isArray(i.brands)
        ? i.brands.map((b) => ({ name: str(b?.name, 120), logo: image(b?.logo), url: url(b?.url) })).filter((b) => b.name || b.logo).slice(0, 200)
        : [],
    }),
    required: ['name'],
  },
  enquiries: {
    prefix: 'enq',
    // Admins can only change the status/notes of an enquiry.
    clean: (i) => ({ status: ['new', 'contacted', 'closed'].includes(i.status) ? i.status : 'new', notes: str(i.notes, 5000) }),
    required: [],
  },
};

export function cleanSettings(s = {}) {
  return {
    siteName: str(s.siteName, 120),
    tagline: str(s.tagline, 200),
    phone: str(s.phone, 60),
    whatsapp: str(s.whatsapp, 30).replace(/[^0-9]/g, ''),
    emails: strList(s.emails, 200, 5),
    addressLine1: str(s.addressLine1, 200),
    addressLine2: str(s.addressLine2, 200),
    addressNote: str(s.addressNote, 200),
    hoursWeekdays: str(s.hoursWeekdays, 120),
    hoursSunday: str(s.hoursSunday, 120),
    mapUrl: url(s.mapUrl),
    heroTitle1: str(s.heroTitle1, 120),
    heroTitle2: str(s.heroTitle2, 120),
    heroText: str(s.heroText, 600),
    heroSlideSeconds: int(s.heroSlideSeconds, 3, 60) || 12,
  };
}

export function uniqueSlug(list, slug, id) {
  const base = slug || 'item';
  let candidate = base;
  let n = 2;
  while (list.some((x) => x.slug === candidate && x.id !== id)) candidate = `${base}-${n++}`;
  return candidate;
}
