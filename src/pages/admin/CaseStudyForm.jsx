import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader, Field, Panel, PairsEditor, ImageUploader, useUnsaved } from './ui.jsx';
import { useLeaveWarning } from './ProductForm.jsx';
import Icon from '../../components/Icon.jsx';

const empty = {
  title: '', slug: '', client: '', industry: '', location: '', summary: '', challenge: '', solution: '', results: '',
  testimonial: '', testimonialAuthor: '', metrics: [], productIds: [], images: [], featured: false,
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
  const industries = [...new Set(db.caseStudies.map((c) => c.industry).filter(Boolean))];
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
          <Panel title="Overview">
            <div className="grid-2">
              <Field label="Title *" wide><input required {...input('title')} placeholder="e.g. Upgrading a contractor's earthmoving fleet" /></Field>
              <Field label="Client"><input {...input('client')} placeholder="Company name or description" /></Field>
              <Field label="Industry">
                <input list="industries" {...input('industry')} />
                <datalist id="industries">{industries.map((i) => <option key={i} value={i} />)}</datalist>
              </Field>
              <Field label="Location"><input {...input('location')} /></Field>
              <Field label="Summary" hint="Shown on cards and at the top of the page." wide><textarea rows={3} {...input('summary')} /></Field>
            </div>
          </Panel>
          <Panel title="The story" description="Leave a blank line between paragraphs.">
            <Field label="The challenge"><textarea rows={5} {...input('challenge')} /></Field>
            <Field label="Our solution"><textarea rows={5} {...input('solution')} /></Field>
            <Field label="The results"><textarea rows={5} {...input('results')} /></Field>
          </Panel>
          <Panel title="Results in numbers" description="Big numbers shown at the top, e.g. “18%” — “Fuel saving”.">
            <PairsEditor value={form.metrics} onChange={(v) => set('metrics', v)} labelText="e.g. Fuel saving" valueText="e.g. 18%" addText="Add metric" />
          </Panel>
          <Panel title="Project photos" description="The first image is the cover photo.">
            <ImageUploader value={form.images} onChange={(v) => set('images', v)} onError={handleError} />
          </Panel>
          <Panel title="Customer testimonial">
            <Field label="Quote"><textarea rows={3} {...input('testimonial')} /></Field>
            <Field label="Who said it"><input {...input('testimonialAuthor')} placeholder="e.g. Project Manager, ABC Construction" /></Field>
          </Panel>
        </div>
        <div className="form-cols__side">
          <Panel title="Machines used" description="Linked products show on the case study, and the case study shows on those product pages.">
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
            <label className="check">
              <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
              <span>Feature on the home page</span>
            </label>
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
