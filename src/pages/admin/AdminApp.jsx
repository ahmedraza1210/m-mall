import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Routes, Route, NavLink, Navigate, Link, useLocation } from 'react-router-dom';
import { adminApi, getToken, setToken } from '../../lib/api.js';
import { useContent } from '../../lib/content.jsx';
import { usePageTitle } from '../../lib/format.js';
import Icon from '../../components/Icon.jsx';
import { Loading } from '../../components/Status.jsx';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import ProductsAdmin from './ProductsAdmin.jsx';
import ProductForm from './ProductForm.jsx';
import IndustriesAdmin from './IndustriesAdmin.jsx';
import IndustryForm from './IndustryForm.jsx';
import CaseStudiesAdmin from './CaseStudiesAdmin.jsx';
import CaseStudyForm from './CaseStudyForm.jsx';
import BrandsAdmin from './BrandsAdmin.jsx';
import EnquiriesAdmin from './EnquiriesAdmin.jsx';
import SettingsAdmin from './SettingsAdmin.jsx';
import '../../admin-base.css';
import '../../admin.css';

const AdminContext = createContext(null);
export const useAdmin = () => useContext(AdminContext);

function useToast() {
  const [toast, setToast] = useState(null);
  const show = useCallback((message, type = 'success') => setToast({ message, type, id: Date.now() }), []);
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);
  return [toast, show];
}

export default function AdminApp() {
  const [authed, setAuthed] = useState(Boolean(getToken()));
  const [db, setDb] = useState(null);
  const [error, setError] = useState('');
  const [toast, notify] = useToast();
  const { reload: reloadPublic } = useContent();
  usePageTitle('Admin');

  const logout = useCallback(() => {
    setToken('');
    setAuthed(false);
    setDb(null);
    loadedOnce.current = false;
  }, []);

  const handleError = useCallback(
    (err) => {
      if (err.status === 401) logout();
      notify(err.message, 'error');
    },
    [logout, notify]
  );

  const lastLoad = useRef(0);
  const loadedOnce = useRef(false);
  const location = useLocation();

  const refresh = useCallback(
    async ({ quiet = true } = {}) => {
      lastLoad.current = Date.now();
      try {
        const fresh = await adminApi.load();
        setDb(fresh);
        loadedOnce.current = true;
        if (!quiet) notify('Updated');
      } catch (err) {
        if (err.status === 401) logout();
        else if (!loadedOnce.current) setError(err.message); // first load failed: show the error screen
        else if (!quiet) notify(err.message, 'error'); // later background refreshes fail silently
      }
    },
    [logout, notify]
  );

  useEffect(() => {
    if (authed) refresh();
  }, [authed, refresh]);

  // New enquiries arrive while the admin is open: reload when opening the
  // dashboard or enquiries, and when coming back to this browser tab.
  useEffect(() => {
    if (!authed || !db) return;
    const p = location.pathname.replace(/\/$/, '');
    if ((p === '/admin' || p === '/admin/enquiries') && Date.now() - lastLoad.current > 5000) refresh();
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!authed) return undefined;
    const onVisible = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastLoad.current > 30000) refresh();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [authed, refresh]);

  const actions = {
    async save(collection, item) {
      const { item: saved } = await adminApi.save(collection, item);
      setDb((d) => {
        const list = d[collection];
        const exists = list.some((x) => x.id === saved.id);
        return { ...d, [collection]: exists ? list.map((x) => (x.id === saved.id ? saved : x)) : [saved, ...list] };
      });
      reloadPublic();
      return saved;
    },
    async remove(collection, id) {
      await adminApi.remove(collection, id);
      setDb((d) => {
        const next = { ...d, [collection]: d[collection].filter((x) => x.id !== id) };
        if (collection === 'industries') {
          next.products = d.products.map((p) => (p.industryId === id ? { ...p, industryId: '' } : p));
          next.caseStudies = d.caseStudies.map((c) => (c.industryId === id ? { ...c, industryId: '' } : c));
        }
        if (collection === 'products') next.caseStudies = d.caseStudies.map((c) => ({ ...c, productIds: (c.productIds || []).filter((x) => x !== id) }));
        return next;
      });
      reloadPublic();
    },
    async saveSettings(settings) {
      const { settings: saved } = await adminApi.saveSettings(settings);
      setDb((d) => ({ ...d, settings: saved }));
      reloadPublic();
      return saved;
    },
    notify,
    handleError,
    refresh,
  };

  if (!authed) return <div className="admin-root"><Login onLogin={() => setAuthed(true)} /></div>;
  if (error)
    return (
      <div className="admin-root admin-center">
        <div className="admin-card">
          <h2>Couldn't load admin data</h2>
          <p>{error}</p>
          <button className="btn btn--primary" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  if (!db) return <Loading label="Loading admin…" />;

  const newEnquiries = db.enquiries.filter((e) => e.status === 'new').length;
  const nav = [
    { to: '/admin', label: 'Dashboard', icon: 'grid', end: true },
    { to: '/admin/products', label: 'Products', icon: 'box', count: db.products.length },
    { to: '/admin/industries', label: 'Industries', icon: 'tag', count: db.industries.length },
    { to: '/admin/case-studies', label: 'Case studies', icon: 'file', count: db.caseStudies.length },
    { to: '/admin/brands', label: 'Brands', icon: 'star', count: db.brandGroups.reduce((n, g) => n + g.brands.length, 0) },
    { to: '/admin/enquiries', label: 'Enquiries', icon: 'inbox', count: newEnquiries, highlight: newEnquiries > 0 },
    { to: '/admin/settings', label: 'Site settings', icon: 'settings' },
  ];

  return (
    <AdminContext.Provider value={{ db, ...actions }}>
      <div className="admin admin-root">
        <aside className="admin__sidebar">
          <Link to="/admin" className="admin__brand">
            <span className="logo__mark"><img src="/brand/logo-mark.png" alt="" /></span>
            <span>Admin</span>
          </Link>
          <nav className="admin__nav">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className="admin__nav-link">
                <Icon name={n.icon} size={18} />
                <span>{n.label}</span>
                {n.count != null && <span className={`admin__count ${n.highlight ? 'is-hot' : ''}`}>{n.count}</span>}
              </NavLink>
            ))}
          </nav>
          <div className="admin__sidebar-foot">
            <a href="/" target="_blank" rel="noreferrer" className="admin__nav-link">
              <Icon name="external" size={18} /> <span>View website</span>
            </a>
            <button className="admin__nav-link" onClick={logout}>
              <Icon name="logout" size={18} /> <span>Log out</span>
            </button>
          </div>
        </aside>
        <main className="admin__main">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id" element={<ProductForm />} />
            <Route path="industries" element={<IndustriesAdmin />} />
            <Route path="industries/new" element={<IndustryForm />} />
            <Route path="industries/:id" element={<IndustryForm />} />
            <Route path="case-studies" element={<CaseStudiesAdmin />} />
            <Route path="case-studies/new" element={<CaseStudyForm />} />
            <Route path="case-studies/:id" element={<CaseStudyForm />} />
            <Route path="brands" element={<BrandsAdmin />} />
            <Route path="enquiries" element={<EnquiriesAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
        {toast && (
          <div key={toast.id} className={`toast toast--${toast.type}`} role="status">
            <Icon name={toast.type === 'error' ? 'close' : 'check'} size={18} /> {toast.message}
          </div>
        )}
      </div>
    </AdminContext.Provider>
  );
}
