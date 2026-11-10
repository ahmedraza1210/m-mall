import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { ContentProvider } from './lib/content.jsx';
import './styles.css';

function CrashScreen() {
  return (
    <div className="status status--empty container">
      <h1>Something went wrong</h1>
      <p>Please reload the page. If this keeps happening, contact us by phone or email.</p>
      <button className="btn btn--primary" onClick={() => window.location.reload()}>Reload page</button>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <ContentProvider>
        <App />
      </ContentProvider>
    ),
    errorElement: <CrashScreen />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
