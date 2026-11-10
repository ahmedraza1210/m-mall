// Small building blocks shared by the admin forms.
import { useRef, useState } from 'react';
import { adminApi } from '../../lib/api.js';
import { prepareImage } from '../../lib/image.js';
import Icon from '../../components/Icon.jsx';

export function AdminHeader({ title, subtitle, children }) {
  return (
    <div className="admin-head">
      <div>
        <h1>{title}</h1>
        {subtitle && <p className="muted">{subtitle}</p>}
      </div>
      {children && <div className="admin-head__actions">{children}</div>}
    </div>
  );
}

export function Field({ label, hint, children, wide }) {
  return (
    <label className={`field ${wide ? 'field--wide' : ''}`}>
      <span>{label}</span>
      {children}
      {hint && <small className="field__hint">{hint}</small>}
    </label>
  );
}

export function FieldLabel({ label, hint }) {
  return (
    <div className="field">
      <span>{label}</span>
      {hint && <small className="field__hint">{hint}</small>}
    </div>
  );
}

export function Panel({ title, description, children }) {
  return (
    <section className="panel">
      {title && (
        <header className="panel__head">
          <h2>{title}</h2>
          {description && <p className="muted">{description}</p>}
        </header>
      )}
      <div className="panel__body">{children}</div>
    </section>
  );
}

/** Editable list of { label, value } rows (specifications, metrics, stats). */
export function PairsEditor({ value = [], onChange, labelText = 'Label', valueText = 'Value', addText = 'Add row' }) {
  const update = (i, key, v) => onChange(value.map((row, j) => (j === i ? { ...row, [key]: v } : row)));
  const move = (i, dir) => {
    const next = [...value];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="rows">
      {value.map((row, i) => (
        <div className="rows__item" key={i}>
          <input placeholder={labelText} value={row.label} onChange={(e) => update(i, 'label', e.target.value)} />
          <input placeholder={valueText} value={row.value} onChange={(e) => update(i, 'value', e.target.value)} />
          <RowButtons onUp={() => move(i, -1)} onDown={() => move(i, 1)} onRemove={() => onChange(value.filter((_, j) => j !== i))} />
        </div>
      ))}
      <button type="button" className="btn btn--subtle btn--sm" onClick={() => onChange([...value, { label: '', value: '' }])}>
        <Icon name="plus" size={16} /> {addText}
      </button>
    </div>
  );
}

/** Editable list of strings (features). */
export function ListEditor({ value = [], onChange, placeholder = '', addText = 'Add item' }) {
  const move = (i, dir) => {
    const next = [...value];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="rows">
      {value.map((item, i) => (
        <div className="rows__item rows__item--single" key={i}>
          <input placeholder={placeholder} value={item} onChange={(e) => onChange(value.map((x, j) => (j === i ? e.target.value : x)))} />
          <RowButtons onUp={() => move(i, -1)} onDown={() => move(i, 1)} onRemove={() => onChange(value.filter((_, j) => j !== i))} />
        </div>
      ))}
      <button type="button" className="btn btn--subtle btn--sm" onClick={() => onChange([...value, ''])}>
        <Icon name="plus" size={16} /> {addText}
      </button>
    </div>
  );
}

function RowButtons({ onUp, onDown, onRemove }) {
  return (
    <div className="rows__buttons">
      <button type="button" className="icon-btn" onClick={onUp} aria-label="Move up"><Icon name="up" size={16} /></button>
      <button type="button" className="icon-btn" onClick={onDown} aria-label="Move down"><Icon name="down" size={16} /></button>
      <button type="button" className="icon-btn icon-btn--danger" onClick={onRemove} aria-label="Remove"><Icon name="trash" size={16} /></button>
    </div>
  );
}

/** Upload, reorder and remove images. The first image is the cover. */
export function ImageUploader({ value = [], onChange, multiple = true, onError }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const images = multiple ? value : value.filter(Boolean).slice(0, 1);

  async function upload(files) {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!list.length) return;
    const chosen = multiple ? list : list.slice(0, 1);
    setUploading((n) => n + chosen.length);
    const urls = [];
    for (const file of chosen) {
      try {
        const payload = await prepareImage(file);
        const { url } = await adminApi.upload(payload);
        urls.push(url);
      } catch (err) {
        onError?.(err);
      } finally {
        setUploading((n) => n - 1);
      }
    }
    if (urls.length) onChange(multiple ? [...value, ...urls] : urls.slice(0, 1));
  }

  const move = (i, dir) => {
    const next = [...images];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="uploader">
      {images.length > 0 && (
        <div className="uploader__grid">
          {images.map((src, i) => (
            <figure key={src} className="uploader__item">
              <img src={src} alt="" />
              {multiple && i === 0 && <span className="uploader__cover">Cover</span>}
              <div className="uploader__tools">
                {multiple && (
                  <>
                    <button type="button" className="icon-btn" onClick={() => move(i, -1)} aria-label="Move left" disabled={i === 0}>
                      <Icon name="back" size={15} />
                    </button>
                    <button type="button" className="icon-btn" onClick={() => move(i, 1)} aria-label="Move right" disabled={i === images.length - 1}>
                      <Icon name="arrow" size={15} />
                    </button>
                  </>
                )}
                <button type="button" className="icon-btn icon-btn--danger" onClick={() => onChange(images.filter((_, j) => j !== i))} aria-label="Remove image">
                  <Icon name="trash" size={15} />
                </button>
              </div>
            </figure>
          ))}
        </div>
      )}
      {(multiple || images.length === 0) && (
        <div
          className={`dropzone ${dragOver ? 'is-over' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            upload(e.dataTransfer.files);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
        >
          <Icon name="upload" size={26} />
          <strong>{uploading ? `Uploading ${uploading} image${uploading > 1 ? 's' : ''}…` : multiple ? 'Click or drop images here' : 'Click or drop an image'}</strong>
          <span>JPG, PNG, WEBP or GIF. Large photos are resized automatically.</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            hidden
            onChange={(e) => {
              upload(e.target.files);
              e.target.value = '';
            }}
          />
        </div>
      )}
      {!multiple && images.length > 0 && (
        <button type="button" className="btn btn--subtle btn--sm" onClick={() => inputRef.current?.click()}>
          Replace image
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => { upload(e.target.files); e.target.value = ''; }} />
        </button>
      )}
    </div>
  );
}

export function useUnsaved(initial) {
  const [form, setForm] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
  };
  const reset = (next) => {
    setForm(next);
    setDirty(false);
  };
  return { form, set, reset, dirty, setDirty };
}

/** A textarea that edits a list of strings, one per line. Good for long lists like product types. */
export function LinesEditor({ value = [], onChange, rows = 6, placeholder }) {
  const [text, setText] = useState(value.join('\n'));
  const [last, setLast] = useState(value);
  if (value !== last) {
    // Value changed from outside (e.g. a different record was loaded).
    if (value.join('\n') !== text.split('\n').map((s) => s.trim()).filter(Boolean).join('\n')) setText(value.join('\n'));
    setLast(value);
  }
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        const next = e.target.value.split('\n').map((s) => s.trim()).filter(Boolean);
        setLast(next);
        onChange(next);
      }}
    />
  );
}

/** Same as LinesEditor but for paragraphs separated by a blank line. */
export function ParagraphsEditor({ value = [], onChange, rows = 5, placeholder }) {
  const [text, setText] = useState(value.join('\n\n'));
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        onChange(e.target.value.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean));
      }}
    />
  );
}
