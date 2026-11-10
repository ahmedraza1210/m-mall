import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useBlocker } from 'react-router-dom';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader, Field, Panel, PairsEditor, ListEditor, ImageUploader, useUnsaved } from './ui.jsx';
import Icon from '../../components/Icon.jsx';

const empty = {
  name: '', slug: '', categoryId: '', brand: '', model: '', condition: 'New', availability: 'In stock', price: '',
  shortDescription: '', description: '', specs: [], features: [], images: [], brochureUrl: '', videoUrl: '', featured: false,
};

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { db, save, remove, notify, handleError } = useAdmin();
  const existing = id ? db.products.find((p) => p.id === id) : null;
  const { form, set, reset, dirty } = useUnsaved(existing ? { ...empty, ...existing } : empty);
  const [saving, setSaving] = useState(false);
  useLeaveWarning(dirty && !saving);

  useEffect(() => {
    if (existing) reset({ ...empty, ...existing });
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (id && !existing) {
    return (
      <div className="empty">
        <h3>Product not found</h3>
        <Link to="/admin/products" className="btn btn--primary">Back to products</Link>
      </div>
    );
  }

  const input = (key) => ({ value: form[key] ?? '', onChange: (e) => set(key, e.target.value) });

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = await save('products', form);
      reset({ ...empty, ...saved });
      notify(existing ? 'Product saved' : 'Product created');
      if (!existing) navigate(`/admin/products/${saved.id}`, { replace: true });
    } catch (err) {
      handleError(err);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!window.confirm(`Delete "${form.name}"? This can't be undone.`)) return;
    try {
      reset(form);
      await remove('products', existing.id);
      notify('Product deleted');
      navigate('/admin/products');
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <form onSubmit={submit} className="admin-form">
      <AdminHeader title={existing ? 'Edit product' : 'New product'} subtitle={existing ? form.name : 'Fill in the details and upload photos.'}>
        <Link to="/admin/products" className="btn btn--subtle"><Icon name="back" size={18} /> Back</Link>
        {existing && (
          <a href={`/products/${existing.slug}`} target="_blank" rel="noreferrer" className="btn btn--outline"><Icon name="eye" size={18} /> View</a>
        )}
        <button className="btn btn--primary" disabled={saving}>{saving ? 'Saving…' : 'Save product'}</button>
      </AdminHeader>

      <div className="form-cols">
        <div className="form-cols__main">
          <Panel title="Basic details">
            <div className="grid-2">
              <Field label="Product name *" wide>
                <input required {...input('name')} placeholder="e.g. Hydraulic Crawler Excavator 20T" />
              </Field>
              <Field label="Brand"><input {...input('brand')} /></Field>
              <Field label="Model"><input {...input('model')} /></Field>
              <Field label="Short description" hint="Shown on product cards (1–2 sentences)." wide>
                <textarea rows={2} {...input('shortDescription')} />
              </Field>
              <Field label="Full description" hint="Leave a blank line between paragraphs." wide>
                <textarea rows={8} {...input('description')} />
              </Field>
            </div>
          </Panel>

          <Panel title="Product images" description="The first image is the cover photo. Use the arrows to reorder.">
            <ImageUploader value={form.images} onChange={(v) => set('images', v)} onError={handleError} />
          </Panel>

          <Panel title="Specifications" description="Technical details shown in a table on the product page.">
            <PairsEditor value={form.specs} onChange={(v) => set('specs', v)} labelText="e.g. Engine power" valueText="e.g. 110 kW" addText="Add specification" />
          </Panel>

          <Panel title="Key features">
            <ListEditor value={form.features} onChange={(v) => set('features', v)} placeholder="e.g. ROPS certified cab" addText="Add feature" />
          </Panel>
        </div>

        <div className="form-cols__side">
          <Panel title="Organise">
            <Field label="Category">
              <select {...input('categoryId')}>
                <option value="">— No category —</option>
                {db.categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Condition">
              <input list="conditions" {...input('condition')} />
              <datalist id="conditions"><option value="New" /><option value="Used" /><option value="Refurbished" /></datalist>
            </Field>
            <Field label="Availability">
              <input list="availability" {...input('availability')} />
              <datalist id="availability"><option value="In stock" /><option value="Made to order" /><option value="Coming soon" /><option value="Sold" /></datalist>
            </Field>
            <Field label="Price" hint="Leave empty to show “Price on request”.">
              <input {...input('price')} placeholder="e.g. PKR 12,500,000" />
            </Field>
            <label className="check">
              <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
              <span>Feature on the home page</span>
            </label>
          </Panel>
          <Panel title="Extras">
            <Field label="Video link" hint="YouTube or Vimeo link."><input type="url" {...input('videoUrl')} /></Field>
            <Field label="Brochure / PDF link"><input type="url" {...input('brochureUrl')} /></Field>
            <Field label="URL slug" hint="Leave empty to create from the name.">
              <input {...input('slug')} placeholder="auto" />
            </Field>
          </Panel>
          {existing && (
            <button type="button" className="btn btn--danger btn--block" onClick={onDelete}>
              <Icon name="trash" size={18} /> Delete product
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export function useLeaveWarning(when) {
  const blocker = useBlocker(when);
  useEffect(() => {
    if (blocker.state === 'blocked') {
      if (window.confirm('You have unsaved changes. Leave without saving?')) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker]);
  useEffect(() => {
    if (!when) return;
    const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onUnload);
    return () => window.removeEventListener('beforeunload', onUnload);
  }, [when]);
}
