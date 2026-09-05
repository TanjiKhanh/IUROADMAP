import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@iuroadmap/store';
import { TranslationProvider, useTranslation } from '../hooks/useTranslation';
import { AntdProvider } from './antdProvider';
import { QueryProvider } from './queryProvider';
import { AuthProvider } from '../auth/AuthProvider';
import { initZodLocale, setZodLocale } from './zodLocale';
import { bootstrapApi } from '../api/bootstrap';

// Component to handle initialization that requires translation context
function Bootstrapper({ children }: { children: React.ReactNode }) {
  const { language } = useTranslation();

  useEffect(() => {
    // Initialize Zod locale mapping
    initZodLocale();
    setZodLocale(language);
    
    // Initialize Axios Interceptors with token management
    bootstrapApi();
  }, [language]);

  return <>{children}</>;
}

export function AppBoot({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <TranslationProvider>
        <Bootstrapper>
          <AntdProvider>
            <QueryProvider>
              <AuthProvider>
                {children}
              </AuthProvider>
            </QueryProvider>
          </AntdProvider>
        </Bootstrapper>
      </TranslationProvider>
    </Provider>
  );
}
