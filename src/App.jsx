import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import { Loading, NotFoundBlock } from './components/Status.jsx';
import { useContent } from './lib/content.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import CaseStudies from './pages/CaseStudies.jsx';
import CaseStudyDetail from './pages/CaseStudyDetail.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

// The admin panel is loaded only when someone visits /admin.
const AdminApp = lazy(() => import('./pages/admin/AdminApp.jsx'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayout() {
  const { loading, error, data } = useContent();
  return (
    <>
      <Header />
      <main className="site-main">
        {loading ? (
          <Loading />
        ) : error && !data ? (
          <NotFoundBlock title="Couldn't load the site" text={error} cta="Try again" to="." />
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
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
          <Route path="products" element={<Products />} />
          <Route path="products/:slug" element={<ProductDetail />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFoundBlock />} />
        </Route>
      </Routes>
    </>
  );
}
