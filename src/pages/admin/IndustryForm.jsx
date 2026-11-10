import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader, Field, Panel, LinesEditor, ParagraphsEditor, useUnsaved } from './ui.jsx';
import { useLeaveWarning } from './ProductForm.jsx';
import Icon from '../../components/Icon.jsx';
import IndustryIcon from '../../components/IndustryIcon.jsx';
import { INDUSTRY_ICONS } from '../../lib/industryIcons.js';
import { productTypeCount } from '../../lib/industries.js';

const empty = {
  name: '', title: '', slug: '', icon: 'i1', intro: [], items: [], itemColumns: 3, groups: [], solution: null,
  showOnHome: false, showInHero: false, heroOrder: 0, heroItems: [],
};

function IconPicker({ value, onChange }) {
  return (
    <div className="icon-picker">
      {Object.keys(INDUSTRY_ICONS).map((k) => (
        <button type="button" key={k} className={value === k ? 'is-on' : ''} onClick={() => onChange(k)} aria-label={`Icon ${k}`}>
          <IndustryIcon name={k} size={20} />
        </button>
      ))}
    </div>
  );
}

export default function IndustryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { db, save, remove, notify, handleError } = useAdmin();
  const existing = id ? db.industries.find((i) => i.id === id) : null;
  const { form, set, reset, dirty } = useUnsaved(existing ? { ...empty, ...existing } : empty);
  const [saving, setSaving] = useState(false);
  const [formKey, setFormKey] = useState(0);
  useLeaveWarning(dirty && !saving);

  useEffect(() => {
    if (existing) reset({ ...empty, ...existing });
    setFormKey((k) => k + 1);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (id && !existing) {
    return (
      <div className="empty">
        <h3>Industry not found</h3>
        <Link to="/admin/industries" className="btn btn--primary">Back to industries</Link>
      </div>
    );
  }

  const input = (key) => ({ value: form[key] ?? '', onChange: (e) => set(key, e.target.value) });
  const setGroup = (i, patch) => set('groups', form.groups.map((g, j) => (j === i ? { ...g, ...patch } : g)));
  const moveGroup = (i, dir) => {
    const next = [...form.groups];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    set('groups', next);
    setFormKey((k) => k + 1);
  };

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const saved = await save('industries', form);
      reset({ ...empty, ...saved });
      notify(existing ? 'Industry saved' : 'Industry created');
      if (!existing) navigate(`/admin/industries/${saved.id}`, { replace: true });
    } catch (err) {
      handleError(err);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!window.confirm(`Delete "${form.name}" and its product range? This can't be undone.`)) return;
    try {
      reset(form);
      await remove('industries', existing.id);
      notify('Industry deleted');
      navigate('/admin/industries');
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <form onSubmit={submit} className="admin-form" key={formKey}>
      <AdminHeader title={existing ? 'Edit industry' : 'New industry'} subtitle={existing ? `${form.name} · ${productTypeCount(form)} product types` : 'Add an industry and its product range.'}>
        <Link to="/admin/industries" className="btn btn--subtle"><Icon name="back" size={18} /> Back</Link>
        {existing && <a href={`/industries#i-${existing.slug}`} target="_blank" rel="noreferrer" className="btn btn--outline"><Icon name="eye" size={18} /> View</a>}
        <button className="btn btn--primary" disabled={saving}>{saving ? 'Saving…' : 'Save industry'}</button>
      </AdminHeader>
      <div className="form-cols">
        <div className="form-cols__main">
          <Panel title="Industry">
            <div className="grid-2">
              <Field label="Short name *" hint="Used in menus and cards, e.g. “Steel”."><input required {...input('name')} /></Field>
              <Field label="Full heading" hint="Shown on the Industries page, e.g. “Steel Industry”."><input {...input('title')} /></Field>
            </div>
            <Field label="Introduction" hint="Leave a blank line between paragraphs.">
              <ParagraphsEditor value={form.intro} onChange={(v) => set('intro', v)} rows={4} />
            </Field>
          </Panel>
          <Panel title="Product range" description="Either one simple list, or several titled groups (or both). Type one product per line.">
            <Field label="Simple list (no group heading)">
              <LinesEditor value={form.items} onChange={(v) => set('items', v)} rows={8} placeholder={'Screw Compressors\nAir Dryers\n…'} />
            </Field>
            <Field label="Columns on the website">
              <select value={form.itemColumns} onChange={(e) => set('itemColumns', Number(e.target.value))}>
                <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option>
              </select>
            </Field>
          </Panel>
          {form.groups.map((g, i) => (
            <section className="panel" key={i}>
              <header className="panel__head panel__head--row">
                <h2>{g.title || `Group ${i + 1}`} <small className="muted">· {g.items.length} items</small></h2>
                <div className="rows__buttons">
                  <button type="button" className="icon-btn" onClick={() => moveGroup(i, -1)} aria-label="Move up"><Icon name="up" size={16} /></button>
                  <button type="button" className="icon-btn" onClick={() => moveGroup(i, 1)} aria-label="Move down"><Icon name="down" size={16} /></button>
                  <button type="button" className="icon-btn icon-btn--danger" onClick={() => { set('groups', form.groups.filter((_, j) => j !== i)); setFormKey((k) => k + 1); }} aria-label="Remove group"><Icon name="trash" size={16} /></button>
                </div>
              </header>
              <div className="panel__body">
                <div className="grid-2">
                  <Field label="Group heading"><input value={g.title} onChange={(e) => setGroup(i, { title: e.target.value })} /></Field>
                  <Field label="Columns">
                    <select value={g.columns || 2} onChange={(e) => setGroup(i, { columns: Number(e.target.value) })}>
                      <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option>
                    </select>
                  </Field>
                </div>
                <Field label="Products (one per line)"><LinesEditor value={g.items} onChange={(v) => setGroup(i, { items: v })} rows={6} /></Field>
                <Field label="Icon"><IconPicker value={g.icon} onChange={(v) => setGroup(i, { icon: v })} /></Field>
              </div>
            </section>
          ))}
          <button type="button" className="btn btn--subtle" style={{ marginBottom: '20px' }} onClick={() => set('groups', [...form.groups, { title: '', icon: 'i13', items: [], columns: 2 }])}>
            <Icon name="plus" size={16} /> Add product group
          </button>
          <Panel title="“Complete solutions” box" description="Optional highlighted box at the end of the industry.">
            <Field label="Heading">
              <input value={form.solution?.title || ''} onChange={(e) => set('solution', { paragraphs: [], ...(form.solution || {}), title: e.target.value })} />
            </Field>
            <Field label="Text" hint="Leave a blank line between paragraphs.">
              <ParagraphsEditor value={form.solution?.paragraphs || []} onChange={(v) => set('solution', { title: '', ...(form.solution || {}), paragraphs: v })} rows={5} />
            </Field>
          </Panel>
        </div>
        <div className="form-cols__side">
          <Panel title="Icon">
            <IconPicker value={form.icon} onChange={(v) => set('icon', v)} />
          </Panel>
          <Panel title="Home page">
            <label className="check">
              <input type="checkbox" checked={form.showOnHome} onChange={(e) => set('showOnHome', e.target.checked)} />
              <span>Show in the “Industries we serve” grid</span>
            </label>
            <label className="check">
              <input type="checkbox" checked={form.showInHero} onChange={(e) => set('showInHero', e.target.checked)} />
              <span>Rotate in the home page hero</span>
            </label>
            {form.showInHero && (
              <>
                <Field label="Hero position" hint="1 shows first."><input type="number" min="1" value={form.heroOrder || ''} onChange={(e) => set('heroOrder', Number(e.target.value))} /></Field>
                <Field label="Products shown in the hero" hint="Up to 6, one per line. Leave empty to use the first 6 products."><LinesEditor value={form.heroItems} onChange={(v) => set('heroItems', v)} rows={6} /></Field>
              </>
            )}
          </Panel>
          <Panel title="Options">
            <Field label="URL anchor" hint="Leave empty to create from the name."><input {...input('slug')} placeholder="auto" /></Field>
          </Panel>
          {existing && (
            <button type="button" className="btn btn--danger btn--block" onClick={onDelete}>
              <Icon name="trash" size={18} /> Delete industry
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
