import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader, Field, Panel, PairsEditor, ImageUploader, LinesEditor, useUnsaved } from './ui.jsx';
import { useLeaveWarning } from './ProductForm.jsx';
import Icon from '../../components/Icon.jsx';

const empty = {
  title: '', slug: '', teaserTitle: '', summary: '', teaser: '', client: '', clientFull: '',
  facts: [
    { label: 'Client', value: '' },
    { label: 'Industry', value: '' },
    { label: 'Scope', value: '' },
    { label: 'Products', value: '' },
    { label: 'Status', value: '' },
  ],
  images: [], imageNote: '', projectTitle: '', projectText: '', roleTitle: 'What Machinery Mall handled', roleItems: [],
  highlightTitle: '', highlightText: '', whyTitle: '', whyText: '', glance: [], footnote: '', industryId: '', productIds: [], featured: false,
};

export default function CaseStudyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { db, save, remove, notify, handleError } = useAdmin();
  const existing = id ? db.caseStudies.find((c) => c.id === id) : null;
  const { form, set, reset, dirty } = useUnsaved(existing ? { ...empty, ...existing } : empty);
  const [saving, setSaving] = useState(false);
  const [productFilter, setProductFilter] = useState('');
  useLeaveWarning(dirty && !saving);

  useEffect(() => {
    if (existing) reset({ ...empty, ...existing });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (id && !existing) {
    return (
      <div className="empty">
        <h3>Case study not found</h3>
        <Link to="/admin/case-studies" className="btn btn--primary">Back to case studies</Link>
      </div>
    );
  }

  const input = (key) => ({ value: form[key] ?? '', onChange: (e) => set(key, e.target.value) });
  const toggleProduct = (pid) =>
    set('productIds', form.productIds.includes(pid) ? form.productIds.filter((x) => x !== pid) : [...form.productIds, pid]);
  const products = db.products.filter((p) => p.name.toLowerCase().includes(productFilter.trim().toLowerCase()));

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = await save('caseStudies', form);
      reset({ ...empty, ...saved });
      notify(existing ? 'Case study saved' : 'Case study created');
      if (!existing) navigate(`/admin/case-studies/${saved.id}`, { replace: true });
    } catch (err) {
      handleError(err);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!window.confirm(`Delete "${form.title}"? This can't be undone.`)) return;
    try {
      reset(form);
      await remove('caseStudies', existing.id);
      notify('Case study deleted');
      navigate('/admin/case-studies');
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <form onSubmit={submit} className="admin-form">
      <AdminHeader title={existing ? 'Edit case study' : 'New case study'} subtitle={existing ? form.title : 'Tell the story of a customer project.'}>
        <Link to="/admin/case-studies" className="btn btn--subtle"><Icon name="back" size={18} /> Back</Link>
        {existing && (
          <a href={`/case-studies/${existing.slug}`} target="_blank" rel="noreferrer" className="btn btn--outline"><Icon name="eye" size={18} /> View</a>
        )}
        <button className="btn btn--primary" disabled={saving}>{saving ? 'Saving…' : 'Save case study'}</button>
      </AdminHeader>

      <div className="form-cols">
        <div className="form-cols__main">
          <Panel title="Headline">
            <Field label="Title *"><input required {...input('title')} placeholder="e.g. Complete Syringe Injection Moulding Plant" /></Field>
            <Field label="Summary" hint="The lead paragraph under the title."><textarea rows={3} {...input('summary')} /></Field>
            <div className="grid-2">
              <Field label="Client (short)" hint="Used in the breadcrumb."><input {...input('client')} /></Field>
              <Field label="Client (full name)"><input {...input('clientFull')} /></Field>
            </div>
          </Panel>
          <Panel title="Key facts bar" description="The row of facts under the title, e.g. Client · Industry · Scope · Products · Status (up to 6).">
            <PairsEditor value={form.facts} onChange={(v) => set('facts', v)} labelText="Label" valueText="Value" addText="Add fact" />
          </Panel>
          <Panel title="Photos" description="Project photos. Without photos, a representative illustration is shown.">
            <ImageUploader value={form.images} onChange={(v) => set('images', v)} onError={handleError} />
            <Field label="Caption when no photo is uploaded"><input {...input('imageNote')} placeholder="Representative image — not the installed plant" /></Field>
          </Panel>
          <Panel title="The project">
            <Field label="Heading"><input {...input('projectTitle')} /></Field>
            <Field label="Text" hint="Leave a blank line between paragraphs."><textarea rows={5} {...input('projectText')} /></Field>
          </Panel>
          <Panel title="Our role">
            <Field label="Heading"><input {...input('roleTitle')} /></Field>
            <Field label="What we handled" hint="One item per line."><LinesEditor value={form.roleItems} onChange={(v) => set('roleItems', v)} rows={6} /></Field>
          </Panel>
          <Panel title="Project highlight">
            <Field label="Heading"><input {...input('highlightTitle')} /></Field>
            <Field label="Text"><textarea rows={3} {...input('highlightText')} /></Field>
          </Panel>
          <Panel title="Why this matters">
            <Field label="Heading"><input {...input('whyTitle')} /></Field>
            <Field label="Text"><textarea rows={3} {...input('whyText')} /></Field>
          </Panel>
          <Panel title="“At a glance” box" description="Shown in the sidebar under the enquiry form.">
            <PairsEditor value={form.glance} onChange={(v) => set('glance', v)} labelText="e.g. Sector" valueText="e.g. Pharmaceutical & Healthcare" addText="Add row" />
            <Field label="Small print at the bottom"><input {...input('footnote')} /></Field>
          </Panel>
        </div>
        <div className="form-cols__side">
          <Panel title="Home page">
            <label className="check">
              <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
              <span>Show this case study on the home page</span>
            </label>
            <Field label="Home page heading"><input {...input('teaserTitle')} placeholder="e.g. A complete syringe injection moulding plant" /></Field>
            <Field label="Home page text"><textarea rows={4} {...input('teaser')} /></Field>
          </Panel>
          <Panel title="Machines supplied" description="Linked products show on the case study, and the case study shows on those product pages.">
            {db.products.length > 6 && (
              <input className="mb" type="search" placeholder="Filter products…" value={productFilter} onChange={(e) => setProductFilter(e.target.value)} />
            )}
            <div className="checklist-box">
              {products.map((p) => (
                <label key={p.id} className="check">
                  <input type="checkbox" checked={form.productIds.includes(p.id)} onChange={() => toggleProduct(p.id)} />
                  <span>{p.name}</span>
                </label>
              ))}
              {db.products.length === 0 && <p className="muted small">Add products first.</p>}
            </div>
          </Panel>
          <Panel title="Options">
            <Field label="Industry">
              <select {...input('industryId')}>
                <option value="">— None —</option>
                {[...db.industries].sort((a, b) => a.name.localeCompare(b.name)).map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
              </select>
            </Field>
            <Field label="URL slug" hint="Leave empty to create from the title."><input {...input('slug')} placeholder="auto" /></Field>
          </Panel>
          {existing && (
            <button type="button" className="btn btn--danger btn--block" onClick={onDelete}>
              <Icon name="trash" size={18} /> Delete case study
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
