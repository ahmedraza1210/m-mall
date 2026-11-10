import { useContent } from '../lib/content.jsx';
import { usePageTitle } from '../lib/format.js';
import PageHeader from '../components/PageHeader.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import Icon from '../components/Icon.jsx';

export default function Contact() {
  const { data } = useContent();
  const s = data.settings;
  usePageTitle('Contact');
  const items = [
    s.phone && { icon: 'phone', label: 'Call us', value: s.phone, href: `tel:${s.phone.replace(/\s/g, '')}` },
    s.whatsapp && { icon: 'whatsapp', label: 'WhatsApp', value: `+${s.whatsapp}`, href: `https://wa.me/${s.whatsapp}` },
    s.email && { icon: 'mail', label: 'Email', value: s.email, href: `mailto:${s.email}` },
    s.address && { icon: 'pin', label: 'Visit our yard', value: s.address },
    s.hours && { icon: 'clock', label: 'Opening hours', value: s.hours },
  ].filter(Boolean);

  return (
    <>
      <PageHeader title="Contact us" subtitle="Tell us what you need and our sales team will get back to you within one working day." crumbs={[{ label: 'Contact' }]} />
      <section className="section section--tight">
        <div className="container contact-grid">
          <div className="contact-list">
            {items.map((it) => (
              <div key={it.label} className="contact-item">
                <span className="contact-item__icon"><Icon name={it.icon} size={22} /></span>
                <div>
                  <span className="contact-item__label">{it.label}</span>
                  {it.href ? (
                    <a href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{it.value}</a>
                  ) : (
                    <span>{it.value}</span>
                  )}
                </div>
              </div>
            ))}
            {s.mapUrl && (
              <div className="map">
                <iframe src={s.mapUrl} title="Map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            )}
          </div>
          <div className="quote-card">
            <h2>Send an enquiry</h2>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
