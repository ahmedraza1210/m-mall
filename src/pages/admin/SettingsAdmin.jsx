import { useState } from 'react';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader, Field, Panel, LinesEditor, useUnsaved } from './ui.jsx';
import { useLeaveWarning } from './ProductForm.jsx';

export default function SettingsAdmin() {
  const { db, saveSettings, notify, handleError } = useAdmin();
  const { form, set, reset, dirty } = useUnsaved(db.settings);
  const [saving, setSaving] = useState(false);
  useLeaveWarning(dirty && !saving);
  const input = (key) => ({ value: form[key] ?? '', onChange: (e) => set(key, e.target.value) });

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      reset(await saveSettings(form));
      notify('Settings saved');
    } catch (err) {
      handleError(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="admin-form">
      <AdminHeader title="Site settings" subtitle="Contact details shown in the header, footer and Contact page, and the home page hero text.">
        <button className="btn btn--primary" disabled={saving || !dirty}>{saving ? 'Saving…' : 'Save settings'}</button>
      </AdminHeader>
      <div className="form-cols">
        <div className="form-cols__main">
          <Panel title="Contact details">
            <div className="grid-2">
              <Field label="Phone (Call or WhatsApp)"><input {...input('phone')} /></Field>
              <Field label="WhatsApp number" hint="Country code + number, digits only, e.g. 919876543210."><input {...input('whatsapp')} /></Field>
            </div>
            <Field label="Email addresses" hint="One per line. The first one is shown in the top bar."><LinesEditor value={form.emails || []} onChange={(v) => set('emails', v)} rows={3} /></Field>
            <div className="grid-2">
              <Field label="Address line 1"><input {...input('addressLine1')} /></Field>
              <Field label="Address line 2"><input {...input('addressLine2')} /></Field>
            </div>
            <Field label="Note under the address (Contact page)"><input {...input('addressNote')} /></Field>
          </Panel>
          <Panel title="Home page hero">
            <div className="grid-2">
              <Field label="Headline (line 1)"><input {...input('heroTitle1')} /></Field>
              <Field label="Headline (line 2, blue)"><input {...input('heroTitle2')} /></Field>
            </div>
            <Field label="Text"><textarea rows={3} {...input('heroText')} /></Field>
            <Field label="Seconds per industry slide"><input type="number" min="3" max="60" {...input('heroSlideSeconds')} /></Field>
            <p className="muted small" style={{ margin: 0 }}>Choose which industries rotate in the hero under Industries → “Rotate in the home page hero”.</p>
          </Panel>
        </div>
        <div className="form-cols__side">
          <Panel title="Shop timings (Contact page)">
            <Field label="Monday – Saturday" hint="e.g. 10:00 am – 7:00 pm"><input {...input('hoursWeekdays')} /></Field>
            <Field label="Sunday"><input {...input('hoursSunday')} /></Field>
          </Panel>
          <Panel title="Map (Contact page)">
            <Field label="Google Maps embed link" hint="Google Maps → Share → Embed a map → copy only the link inside src=&quot;…&quot;. Without it, a button opens the address in Google Maps.">
              <input type="url" {...input('mapUrl')} />
            </Field>
          </Panel>
          <Panel title="Brand">
            <Field label="Company name"><input {...input('siteName')} /></Field>
            <Field label="Tagline"><input {...input('tagline')} /></Field>
          </Panel>
        </div>
      </div>
    </form>
  );
}
