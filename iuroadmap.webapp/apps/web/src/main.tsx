import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/auth.css';
import { AppBoot } from './providers/appBoot';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppBoot>
      <App />
    </AppBoot>
  </React.StrictMode>
);