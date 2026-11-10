import { useState } from 'react';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader, Field, Panel, ImageUploader } from './ui.jsx';
import Icon from '../../components/Icon.jsx';

function GroupEditor({ group, onSaved, onCancel }) {
  const { save, notify, handleError } = useAdmin();
  const [form, setForm] = useState(group);
  const [saving, setSaving] = useState(false);
  const setBrand = (i, patch) => setForm((f) => ({ ...f, brands: f.brands.map((b, j) => (j === i ? { ...b, ...patch } : b)) }));
  const move = (i, dir) =>
    setForm((f) => {
      const next = [...f.brands];
      const j = i + dir;
      if (j < 0 || j >= next.length) return f;
      [next[i], next[j]] = [next[j], next[i]];
      return { ...f, brands: next };
    });

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await save('brandGroups', form);
      notify(form.id ? 'Brand group saved' : 'Brand group added');
      onSaved();
    } catch (err) {
      handleError(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit}>
      <Panel title={form.id ? 'Edit brand group' : 'New brand group'} description="Brands without a logo show as a name tile. Add a website link to make the tile clickable.">
        <Field label="Group name *"><input required autoFocus={!form.id} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Compressors & industrial utilities" /></Field>
        <div className="brand-rows">
          {form.brands.map((b, i) => (
            <div key={i} className="brand-row">
              <div className="brand-row__logo">
                <ImageUploader multiple={false} value={b.logo ? [b.logo] : []} onChange={(v) => setBrand(i, { logo: v[0] || '' })} onError={handleError} />
              </div>
              <div className="brand-row__fields">
                <input placeholder="Brand name" value={b.name} onChange={(e) => setBrand(i, { name: e.target.value })} />
                <input placeholder="Website (optional) https://…" value={b.url} onChange={(e) => setBrand(i, { url: e.target.value })} />
              </div>
              <div className="rows__buttons">
                <button type="button" className="icon-btn" onClick={() => move(i, -1)} aria-label="Move up"><Icon name="up" size={16} /></button>
                <button type="button" className="icon-btn" onClick={() => move(i, 1)} aria-label="Move down"><Icon name="down" size={16} /></button>
                <button type="button" className="icon-btn icon-btn--danger" onClick={() => setForm({ ...form, brands: form.brands.filter((_, j) => j !== i) })} aria-label="Remove brand"><Icon name="trash" size={16} /></button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn--subtle btn--sm" style={{ justifySelf: 'start' }} onClick={() => setForm({ ...form, brands: [...form.brands, { name: '', logo: '', url: '' }] })}>
          <Icon name="plus" size={16} /> Add brand
        </button>
        <div className="row-gap">
          <button className="btn btn--primary" disabled={saving}>{saving ? 'Saving…' : 'Save group'}</button>
          <button type="button" className="btn btn--subtle" onClick={onCancel}>Cancel</button>
        </div>
      </Panel>
    </form>
  );
}

export default function BrandsAdmin() {
  const { db, remove, notify, handleError } = useAdmin();
  const [editing, setEditing] = useState(null);

  async function onDelete(g) {
    if (!window.confirm(`Delete the group "${g.name}" and its ${g.brands.length} brands?`)) return;
    try {
      await remove('brandGroups', g.id);
      notify('Brand group deleted');
      if (editing?.id === g.id) setEditing(null);
    } catch (err) {
      handleError(err);
    }
  }

  if (editing) return (
    <>
      <AdminHeader title="Brands" subtitle="Brand logos shown on the Brands page and the home page." />
      <GroupEditor key={editing.id || 'new'} group={editing} onSaved={() => setEditing(null)} onCancel={() => setEditing(null)} />
    </>
  );

  return (
    <>
      <AdminHeader title="Brands" subtitle="Brand logos shown on the Brands page and the home page (first 12).">
        <button className="btn btn--primary" onClick={() => setEditing({ name: '', brands: [{ name: '', logo: '', url: '' }] })}><Icon name="plus" size={18} /> Add brand group</button>
      </AdminHeader>
      <div className="cat-list">
        {db.brandGroups.map((g) => (
          <div key={g.id} className="cat-row">
            <div className="brand-strip">
              {g.brands.slice(0, 5).map((b, i) => (
                <span key={i} className="brand-chip">{b.logo ? <img src={b.logo} alt="" /> : b.name || '—'}</span>
              ))}
            </div>
            <div className="cat-row__text">
              <strong>{g.name}</strong>
              <small className="muted">{g.brands.length} brands · {g.brands.filter((b) => !b.logo).length} without logo</small>
            </div>
            <div className="actions">
              <button className="icon-btn" onClick={() => setEditing(g)} aria-label="Edit"><Icon name="edit" size={17} /></button>
              <button className="icon-btn icon-btn--danger" onClick={() => onDelete(g)} aria-label="Delete"><Icon name="trash" size={17} /></button>
            </div>
          </div>
        ))}
        {db.brandGroups.length === 0 && <div className="empty"><h3>No brand groups yet</h3></div>}
      </div>
    </>
  );
}
