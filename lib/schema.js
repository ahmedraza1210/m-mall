// Cleans data coming from the admin panel so only known fields are saved.
import { slugify } from './http.js';

const str = (v, max = 5000) => (v == null ? '' : String(v).trim().slice(0, max));
// Only allow http(s) links, so a link field can never run script.
const url = (v) => {
  const u = str(v, 1000);
  return /^https?:\/\//i.test(u) ? u : '';
};
const strList = (v, max = 300) => (Array.isArray(v) ? v.map((x) => str(x, max)).filter(Boolean).slice(0, 50) : []);
const pairs = (v) =>
  Array.isArray(v)
    ? v
        .map((p) => ({ label: str(p?.label, 120), value: str(p?.value, 300) }))
        .filter((p) => p.label || p.value)
        .slice(0, 60)
    : [];
const images = (v) =>
  Array.isArray(v)
    ? v.map((x) => str(x, 1000)).filter((u) => /^(https?:\/\/|\/uploads\/)/.test(u)).slice(0, 30)
    : [];

export const COLLECTIONS = {
  products: {
    prefix: 'p',
    clean: (i) => ({
      name: str(i.name, 200),
      slug: slugify(i.slug || i.name),
      categoryId: str(i.categoryId, 100),
      brand: str(i.brand, 120),
      model: str(i.model, 120),
      condition: str(i.condition, 60),
      availability: str(i.availability, 60),
      price: str(i.price, 60),
      shortDescription: str(i.shortDescription, 400),
      description: str(i.description, 20000),
      specs: pairs(i.specs),
      features: strList(i.features),
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
      client: str(i.client, 200),
      industry: str(i.industry, 120),
      location: str(i.location, 120),
      summary: str(i.summary, 1000),
      challenge: str(i.challenge, 20000),
      solution: str(i.solution, 20000),
      results: str(i.results, 20000),
      testimonial: str(i.testimonial, 2000),
      testimonialAuthor: str(i.testimonialAuthor, 200),
      metrics: pairs(i.metrics),
      productIds: strList(i.productIds, 100),
      images: images(i.images),
      featured: Boolean(i.featured),
    }),
    required: ['title'],
  },
  categories: {
    prefix: 'cat',
    clean: (i) => ({
      name: str(i.name, 120),
      slug: slugify(i.slug || i.name),
      description: str(i.description, 500),
      image: images([i.image])[0] || '',
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
    heroTitle: str(s.heroTitle, 200),
    heroSubtitle: str(s.heroSubtitle, 600),
    heroImage: images([s.heroImage])[0] || '',
    logo: images([s.logo])[0] || '',
    phone: str(s.phone, 60),
    whatsapp: str(s.whatsapp, 30).replace(/[^0-9]/g, ''),
    email: str(s.email, 200),
    address: str(s.address, 300),
    hours: str(s.hours, 120),
    mapUrl: url(s.mapUrl),
    aboutText: str(s.aboutText, 5000),
    stats: pairs(s.stats).slice(0, 6),
    facebook: url(s.facebook),
    instagram: url(s.instagram),
    linkedin: url(s.linkedin),
    youtube: url(s.youtube),
  };
}

export function uniqueSlug(list, slug, id) {
  let base = slug || 'item';
  let candidate = base;
  let n = 2;
  while (list.some((x) => x.slug === candidate && x.id !== id)) candidate = `${base}-${n++}`;
  return candidate;
}
