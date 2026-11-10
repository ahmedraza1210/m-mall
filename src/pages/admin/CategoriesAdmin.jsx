import { useState } from 'react';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader, Field, FieldLabel, Panel, ImageUploader } from './ui.jsx';
import Icon from '../../components/Icon.jsx';
import MachineImage from '../../components/MachineImage.jsx';

const empty = { name: '', description: '', image: '', slug: '' };

export default function CategoriesAdmin() {
  const { db, save, remove, notify, handleError } = useAdmin();
  const [editing, setEditing] = useState(null); // null | category object
  const [saving, setSaving] = useState(false);
  const count = (id) => db.products.filter((p) => p.categoryId === id).length;

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await save('categories', editing);
      notify(editing.id ? 'Category saved' : 'Category added');
      setEditing(null);
    } catch (err) {
      handleError(err);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(c) {
    const n = count(c.id);
    const msg = n ? `Delete "${c.name}"? ${n} product(s) will be left without a category.` : `Delete "${c.name}"?`;
    if (!window.confirm(msg)) return;
    try {
      await remove('categories', c.id);
      notify('Category deleted');
      if (editing?.id === c.id) setEditing(null);
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <>
      <AdminHeader title="Categories" subtitle="Group products so visitors can browse by type.">
        <button className="btn btn--primary" onClick={() => setEditing({ ...empty })}><Icon name="plus" size={18} /> Add category</button>
      </AdminHeader>
      <div className={`split ${editing ? 'split--open' : ''}`}>
        <div className="cat-list">
          {db.categories.map((c) => (
            <div key={c.id} className={`cat-row ${editing?.id === c.id ? 'is-active' : ''}`}>
              <MachineImage className="thumb" src={c.image} alt="" />
              <div className="cat-row__text">
                <strong>{c.name}</strong>
                <small className="muted">{count(c.id)} products · /{c.slug}</small>
              </div>
              <div className="actions">
                <button className="icon-btn" onClick={() => setEditing({ ...empty, ...c })} aria-label="Edit"><Icon name="edit" size={17} /></button>
                <button className="icon-btn icon-btn--danger" onClick={() => onDelete(c)} aria-label="Delete"><Icon name="trash" size={17} /></button>
              </div>
            </div>
          ))}
          {db.categories.length === 0 && <div className="empty"><h3>No categories yet</h3></div>}
        </div>
        {editing && (
          <form onSubmit={submit}>
            <Panel title={editing.id ? 'Edit category' : 'New category'}>
              <Field label="Name *"><input required autoFocus value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
              <Field label="Description"><textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></Field>
              <FieldLabel label="Image" hint="Shown on the home page category tiles." />
              <ImageUploader multiple={false} value={editing.image ? [editing.image] : []} onChange={(v) => setEditing({ ...editing, image: v[0] || '' })} onError={handleError} />
              <div className="row-gap">
                <button className="btn btn--primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
                <button type="button" className="btn btn--subtle" onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </Panel>
          </form>
        )}
      </div>
    </>
  );
}
