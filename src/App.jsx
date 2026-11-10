import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import { MobileActionBar } from './components/MobileHeader.jsx';
import { Loading, NotFoundBlock } from './components/Status.jsx';
import { useContent } from './lib/content.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Brands from './pages/Brands.jsx';
import Industries from './pages/Industries.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import CaseStudies from './pages/CaseStudies.jsx';
import CaseStudyDetail from './pages/CaseStudyDetail.jsx';
import Contact from './pages/Contact.jsx';
import Search from './pages/Search.jsx';

// The admin panel is loaded only when someone visits /admin.
const AdminApp = lazy(() => import('./pages/admin/AdminApp.jsx'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function PublicLayout() {
  const { loading, error, data } = useContent();
  return (
    <div className="site">
      {loading ? (
        <Loading />
      ) : error && !data ? (
        <NotFoundBlock title="Couldn't load the site" text={error} cta="Try again" to="." />
      ) : (
        <>
          <SiteHeader />
          <main>
            <Outlet />
          </main>
          <SiteFooter />
          <MobileActionBar />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<Loading label="Loading admin…" />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="brands" element={<Brands />} />
          <Route path="industries" element={<Industries />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="case-study" element={<CaseStudies />} />
          <Route path="case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<NotFoundBlock />} />
        </Route>
      </Routes>
    </>
  );
}
