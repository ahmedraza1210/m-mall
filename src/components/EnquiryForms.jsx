import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../lib/api.js';
import { prepareImage } from '../lib/image.js';
import { useContent } from '../lib/content.jsx';

function useEnquiry(initial = {}) {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', region: '', industry: '', message: '', website: '', ...initial });
  const [state, setState] = useState({ status: 'idle', error: '' });
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  async function submit(extra = {}) {
    setState({ status: 'sending', error: '' });
    try {
      await api('enquiry', { method: 'POST', body: { ...form, ...extra } });
      setState({ status: 'sent', error: '' });
    } catch (err) {
      setState({ status: 'error', error: err.message });
    }
  }
  return { form, set, state, submit };
}

function Sent({ dark }) {
  return (
    <div style={{ textAlign: 'center', padding: '26px 6px' }}>
      <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: dark ? 'rgba(255,255,255,.1)' : 'var(--blue-t)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={dark ? '#fff' : '#0071BC'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7" /></svg>
      </div>
      <h3 className="h4" style={{ marginBottom: '6px' }}>Thank you — requirement received</h3>
      <p className="sub">We will get back to you on the next working day.</p>
    </div>
  );
}

/** The dark "Send your requirement" card used in sidebars (home, case study, product pages). */
export function EnquiryCard({ title = 'Tell us what you need', text = 'Any machine, tool or equipment — for any industry. Tell us the requirement and we will find it.', product, source = 'Sidebar form', compact }) {
  const { form, set, state, submit } = useEnquiry({ message: product ? `I'd like a quote for: ${product.name}` : '' });
  return (
    <div className="card on-dark" style={{ background: 'var(--ink)', border: '0', padding: compact ? '24px 14px' : '28px 26px' }}>
      <span className="eyebrow" style={{ color: '#FF8A8E' }}>Send your requirement</span>
      <h3 className="h3" style={{ marginTop: '10px', fontSize: '23px', marginBottom: '6px' }}>{title}</h3>
      <p className="sub" style={{ marginBottom: '20px' }}>{text}</p>
      {state.status === 'sent' ? (
        <Sent dark />
      ) : (
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          onSubmit={(e) => {
            e.preventDefault();
            submit({ productId: product?.id || '', productName: product?.name || '', source });
          }}
        >
          <label><span className="lbl w">Name</span><input className="inp" required placeholder="Your name" value={form.name} onChange={set('name')} autoComplete="name" /></label>
          <label><span className="lbl w">Phone Number</span><input className="inp" type="tel" placeholder="Your mobile / WhatsApp" value={form.phone} onChange={set('phone')} autoComplete="tel" /></label>
          <label><span className="lbl w">Email ID</span><input className="inp" type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} autoComplete="email" /></label>
          <label><span className="lbl w">Region</span><input className="inp" placeholder="Your city / state / country" value={form.region} onChange={set('region')} /></label>
          <label>
            <span className="lbl w">What do you require?</span>
            <textarea className="inp ta" required placeholder="Machine name, model, capacity, quantity — or simply describe the problem you are trying to solve…" value={form.message} onChange={set('message')} />
          </label>
          <input className="hp" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} aria-hidden="true" />
          {state.status === 'error' && <p className="form-err">{state.error}</p>}
          <button className="btn btn-red btn-w btn-lg" disabled={state.status === 'sending'}>{state.status === 'sending' ? 'Sending…' : 'Send Enquiry'}</button>
        </form>
      )}
      <p className="tiny" style={{ textAlign: 'center', marginTop: '12px' }}>No obligation. We reply to requirements on working days.</p>
    </div>
  );
}

const MAX_FILES = 3;

/** The full form on the Contact page, including photo / drawing / datasheet upload. */
export function ContactForm() {
  const { data } = useContent();
  const [params] = useSearchParams();
  const { form, set, state, submit } = useEnquiry({ industry: params.get('industry') || '' });
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [drag, setDrag] = useState(false);
  const input = useRef(null);

  async function addFiles(list) {
    setFileError('');
    const picked = Array.from(list).slice(0, MAX_FILES - files.length);
    const ready = [];
    for (const f of picked) {
      try {
        if (f.type === 'application/pdf') {
          if (f.size > 3 * 1024 * 1024) throw new Error(`${f.name} is larger than 3 MB`);
          const data = await new Promise((res, rej) => {
            const r = new FileReader();
            r.onload = () => res(r.result);
            r.onerror = rej;
            r.readAsDataURL(f);
          });
          ready.push({ filename: f.name, contentType: f.type, data });
        } else if (f.type.startsWith('image/')) {
          ready.push(await prepareImage(f));
        } else {
          throw new Error(`${f.name}: please send a photo (JPG/PNG) or a PDF`);
        }
      } catch (err) {
        setFileError(err.message);
      }
    }
    setFiles((cur) => [...cur, ...ready].slice(0, MAX_FILES));
  }

  if (state.status === 'sent') return <Sent />;

  return (
    <form
      className="r-g1"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: '18px' }}
      onSubmit={(e) => {
        e.preventDefault();
        submit({ attachments: files, source: 'Contact page' });
      }}
    >
      <label><span className="lbl">Name *</span><input className="inp" required placeholder="Your name" value={form.name} onChange={set('name')} autoComplete="name" /></label>
      <label><span className="lbl">Company</span><input className="inp" placeholder="Company name" value={form.company} onChange={set('company')} autoComplete="organization" /></label>
      <label><span className="lbl">Phone Number *</span><input className="inp" type="tel" placeholder="Your mobile / WhatsApp" value={form.phone} onChange={set('phone')} autoComplete="tel" /></label>
      <label><span className="lbl">Email ID *</span><input className="inp" type="email" placeholder="you@company.com" value={form.email} onChange={set('email')} autoComplete="email" /></label>
      <label><span className="lbl">Region</span><input className="inp" placeholder="City / State / Country" value={form.region} onChange={set('region')} /></label>
      <label>
        <span className="lbl">Industry</span>
        <select className="inp sel" value={form.industry} onChange={set('industry')}>
          <option value="">Select your industry</option>
          {(data?.industries || []).map((i) => (
            <option key={i.id} value={i.name}>{i.name}</option>
          ))}
          <option value="Other">Other</option>
        </select>
      </label>
      <label className="r-span" style={{ gridColumn: 'span 2' }}>
        <span className="lbl">What do you require?</span>
        <textarea
          className="inp ta"
          required
          style={{ minHeight: '120px' }}
          placeholder="Machine name, model, capacity, quantity — or describe the process or problem you need solved. If you don’t know which machine you need, describe the problem instead."
          value={form.message}
          onChange={set('message')}
        />
      </label>
      <div className="r-span" style={{ gridColumn: 'span 2' }}>
        <span className="lbl">Photo, drawing or datasheet</span>
        <div
          className={`inp ph dropzone${drag ? ' is-over' : ''}`}
          style={{ height: '100px', flexDirection: 'column', justifyContent: 'center', gap: '8px', background: 'var(--bg)', cursor: 'pointer' }}
          onClick={() => input.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            addFiles(e.dataTransfer.files);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && input.current?.click()}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8296A9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h3.5l1.6-2.4h7.8L17.5 8H21v11H3z" /><circle cx="12" cy="13.4" r="3.6" /></svg>
          <span style={{ fontSize: '14px' }}>Drag files here, or <span style={{ color: 'var(--blue)', fontWeight: '600' }}>browse</span></span>
          <span className="tiny">JPG, PNG or PDF · up to {MAX_FILES} files</span>
          <input ref={input} type="file" hidden multiple accept="image/*,application/pdf" onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
        </div>
        {files.length > 0 && (
          <ul className="file-list">
            {files.map((f, i) => (
              <li key={i}>
                <span>{f.filename}</span>
                <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} aria-label={`Remove ${f.filename}`}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        {fileError && <p className="form-err" style={{ marginTop: '8px' }}>{fileError}</p>}
      </div>
      <input className="hp" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} aria-hidden="true" />
      {state.status === 'error' && <p className="form-err r-span" style={{ gridColumn: 'span 2' }}>{state.error}</p>}
      <button className="btn btn-red btn-lg r-span" style={{ gridColumn: 'span 2' }} disabled={state.status === 'sending'}>
        {state.status === 'sending' ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  );
}
