import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './styles/auth.css';
import { TranslationProvider } from './hooks/useTranslation';

import { Provider } from 'react-redux';
import { store } from '@iuroadmap/store';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <TranslationProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </TranslationProvider>
    </Provider>
  </React.StrictMode>
);