import { Link } from 'react-router-dom';
import { useAdmin } from './AdminApp.jsx';
import { AdminHeader } from './ui.jsx';
import Icon from '../../components/Icon.jsx';
import MachineImage from '../../components/MachineImage.jsx';

export default function CaseStudiesAdmin() {
  const { db, remove, notify, handleError } = useAdmin();

  async function onDelete(c) {
    if (!window.confirm(`Delete "${c.title}"? Its photos will be deleted too. This can't be undone.`)) return;
    try {
      await remove('caseStudies', c.id);
      notify('Case study deleted');
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <>
      <AdminHeader title="Case studies" subtitle="Show customers real projects and results.">
        <Link to="/admin/case-studies/new" className="btn btn--primary"><Icon name="plus" size={18} /> Add case study</Link>
      </AdminHeader>
      {db.caseStudies.length === 0 ? (
        <div className="empty">
          <h3>No case studies yet</h3>
          <Link to="/admin/case-studies/new" className="btn btn--primary">Write your first case study</Link>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Case study</th>
                <th>Industry</th>
                <th>Machines</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {db.caseStudies.map((c) => (
                <tr key={c.id}>
                  <td>
                    <Link to={`/admin/case-studies/${c.id}`} className="row-title">
                      <MachineImage className="thumb" src={c.images?.[0]} alt="" />
                      <span>
                        <strong>{c.title}</strong>
                        <small className="muted">{c.client || '—'}</small>
                      </span>
                    </Link>
                  </td>
                  <td>{c.industry || <span className="muted">—</span>}</td>
                  <td>{c.productIds?.length || 0}</td>
                  <td>{c.featured && <span className="pill pill--accent"><Icon name="star" size={12} /> Featured</span>}</td>
                  <td className="actions">
                    <a className="icon-btn" href={`/case-studies/${c.slug}`} target="_blank" rel="noreferrer" aria-label="View on site"><Icon name="eye" size={17} /></a>
                    <Link className="icon-btn" to={`/admin/case-studies/${c.id}`} aria-label="Edit"><Icon name="edit" size={17} /></Link>
                    <button className="icon-btn icon-btn--danger" onClick={() => onDelete(c)} aria-label="Delete"><Icon name="trash" size={17} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
