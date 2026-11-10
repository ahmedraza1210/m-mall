import { useState } from 'react';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader, Field, FieldLabel, Panel, PairsEditor, ImageUploader, useUnsaved } from './ui.jsx';
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
      <AdminHeader title="Site settings" subtitle="Company details, home page text and contact information.">
        <button className="btn btn--primary" disabled={saving || !dirty}>{saving ? 'Saving…' : 'Save settings'}</button>
      </AdminHeader>
      <div className="form-cols">
        <div className="form-cols__main">
          <Panel title="Brand">
            <div className="grid-2">
              <Field label="Site name"><input {...input('siteName')} /></Field>
              <Field label="Tagline"><input {...input('tagline')} /></Field>
            </div>
            <FieldLabel label="Logo" hint="Optional. Replaces the text logo. A wide PNG with a transparent background works best." />
            <ImageUploader multiple={false} value={form.logo ? [form.logo] : []} onChange={(v) => set('logo', v[0] || '')} onError={handleError} />
          </Panel>
          <Panel title="Home page">
            <Field label="Hero title"><input {...input('heroTitle')} /></Field>
            <Field label="Hero text"><textarea rows={3} {...input('heroSubtitle')} /></Field>
            <FieldLabel label="Hero background image" hint="Optional. A wide photo of machinery works best." />
            <ImageUploader multiple={false} value={form.heroImage ? [form.heroImage] : []} onChange={(v) => set('heroImage', v[0] || '')} onError={handleError} />
            <FieldLabel label="Key numbers" hint="Shown on the home and about pages." />
            <PairsEditor value={form.stats || []} onChange={(v) => set('stats', v)} labelText="e.g. Machines delivered" valueText="e.g. 1,200+" addText="Add number" />
          </Panel>
          <Panel title="About page">
            <Field label="About text" hint="Leave a blank line between paragraphs."><textarea rows={8} {...input('aboutText')} /></Field>
          </Panel>
        </div>
        <div className="form-cols__side">
          <Panel title="Contact details">
            <Field label="Phone"><input {...input('phone')} /></Field>
            <Field label="WhatsApp number" hint="Country code + number, digits only, e.g. 923001234567."><input {...input('whatsapp')} /></Field>
            <Field label="Email"><input type="email" {...input('email')} /></Field>
            <Field label="Address"><textarea rows={2} {...input('address')} /></Field>
            <Field label="Opening hours"><input {...input('hours')} /></Field>
            <Field label="Google Maps embed link" hint="Google Maps → Share → Embed a map → copy only the src link."><input type="url" {...input('mapUrl')} /></Field>
          </Panel>
          <Panel title="Social links">
            <Field label="Facebook"><input type="url" {...input('facebook')} /></Field>
            <Field label="Instagram"><input type="url" {...input('instagram')} /></Field>
            <Field label="LinkedIn"><input type="url" {...input('linkedin')} /></Field>
            <Field label="YouTube"><input type="url" {...input('youtube')} /></Field>
          </Panel>
        </div>
      </div>
    </form>
  );
}
