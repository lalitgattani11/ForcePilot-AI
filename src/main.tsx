import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from "./components/ScrollToTop";

import './index.css';

import App from './App';
import { AuthProvider } from './context/AuthContext';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />

        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
} else {
  console.error('Fatal: Root container not found');
}