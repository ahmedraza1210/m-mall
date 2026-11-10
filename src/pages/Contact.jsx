import { Link } from 'react-router-dom';
import { useSettings } from '../lib/content.jsx';
import { usePageTitle, telHref } from '../lib/format.js';
import PageBand from '../components/PageBand.jsx';
import { ContactForm } from '../components/EnquiryForms.jsx';

const ICONS = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
};

function InfoCard({ icon, label, note, children }) {
  return (
    <div className="card" style={{ padding: '26px 24px' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--red-t)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#E01B22" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{ICONS[icon]}</svg>
      </div>
      <span className="lbl" style={{ marginBottom: '8px' }}>{label}</span>
      <div style={{ fontFamily: 'Archivo,sans-serif', fontWeight: '700', fontSize: '15.5px', lineHeight: '1.55', marginBottom: '8px', wordBreak: 'break-word' }}>{children}</div>
      <p className="tiny">{note}</p>
    </div>
  );
}

// Converted from contact-us.html. Contact details are managed in Admin → Site settings.
export default function Contact() {
  const s = useSettings();
  usePageTitle('Contact Us');
  const address = `${s.addressLine1}, ${s.addressLine2}`;
  return (
    <>
      <PageBand
        crumbs={[{ label: 'Contact Us' }]}
        eyebrow="Contact us"
        title="Tell us what you need. We’ll try to find it."
        lead="Send a requirement, ask for a price, or describe an industrial problem you haven’t found a solution for. There is no obligation to purchase."
      />
      <div style={{ background: 'var(--bg)', padding: '48px 0' }}>
        <div className="wrap">
          <div className="r-g1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: '16px', marginBottom: '32px' }}>
            <InfoCard icon="phone" label="Call or WhatsApp" note="Send a photo or model number directly">
              <a href={telHref(s.phone)} style={{ color: 'inherit' }}>{s.phone}</a>
              {s.whatsapp && (
                <>
                  <br />
                  <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noreferrer" style={{ fontSize: '13px' }}>Open WhatsApp chat →</a>
                </>
              )}
            </InfoCard>
            <InfoCard icon="mail" label="Email us" note="We reply on working days">
              {(s.emails || []).map((e, i) => (
                <span key={e}>
                  {i > 0 && <br />}
                  <a href={`mailto:${e}`} style={{ color: 'inherit' }}>{e}</a>
                </span>
              ))}
            </InfoCard>
            <InfoCard icon="pin" label="Visit our shop" note={s.addressNote}>
              {s.addressLine1}
              <br />
              {s.addressLine2}
            </InfoCard>
          </div>
          <div className="r-stack" style={{ display: 'flex', gap: '36px', alignItems: 'flex-start' }}>
            <div className="card" style={{ flex: '1', padding: '34px 38px', minWidth: '0' }}>
              <span className="eyebrow">Send your requirement</span>
              <h2 className="h3" style={{ marginTop: '10px', marginBottom: '6px' }}>What are you looking for?</h2>
              <p className="sub" style={{ marginBottom: '26px' }}>Fill in whatever you know — even a partial description helps us start looking.</p>
              <ContactForm />
            </div>
            <div className="r-side" style={{ width: '400px', flexShrink: '0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {s.mapUrl ? (
                <div className="card" style={{ overflow: 'hidden', height: '280px' }}>
                  <iframe src={s.mapUrl} title="Map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: '0', width: '100%', height: '100%' }} />
                </div>
              ) : (
                <a
                  className="card blueprint"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ minHeight: '280px', backgroundColor: '#E9EEF3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--ink)' }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0071BC" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{ICONS.pin}</svg>
                  <span className="h5">Open in Google Maps</span>
                  <span className="tiny" style={{ textAlign: 'center', maxWidth: '250px' }}>{address}</span>
                </a>
              )}
              <div className="card" style={{ padding: '26px' }}>
                <div className="h4" style={{ marginBottom: '14px' }}>Shop timings</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '8px 0', borderBottom: '1px solid var(--bd)' }}>
                  <span className="sub">Monday – Saturday</span>
                  <span className="h5">{s.hoursWeekdays || 'Call to confirm'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', padding: '8px 0' }}>
                  <span className="sub">Sunday</span>
                  <span className="h5">{s.hoursSunday || 'Closed'}</span>
                </div>
              </div>
              <div className="card on-dark" style={{ background: 'var(--ink2)', border: '0', padding: '26px' }}>
                <h3 className="h4" style={{ color: '#fff', marginBottom: '8px' }}>Have an industrial problem?</h3>
                <p className="sub" style={{ marginBottom: '18px' }}>If you haven’t found the right solution yet, that conversation is free. Start there.</p>
                <a className="btn btn-red btn-sm btn-w" href={telHref(s.phone)}>Discuss Your Requirement</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
