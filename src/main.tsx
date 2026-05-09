import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import App from './App';
import { AuthProvider } from './context/AuthContext';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error('Fatal: Root container not found');
}