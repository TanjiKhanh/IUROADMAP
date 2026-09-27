import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as i18n from '@iuroadmap/core';

type Language = 'en' | 'vi';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string | undefined) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Helper to get nested value from object using dot notation
const getNestedValue = (obj: any, path: string): string | undefined => {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    current = current[key];
  }
  
  return typeof current === 'string' ? current : undefined;
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved === 'en' || saved === 'vi') ? saved : 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (keyPath: string | undefined): string => {
    if (!keyPath) return '';

    const translations = language === 'en' ? i18n.translations.en : i18n.translations.vi;
    const result = getNestedValue(translations, keyPath);
    
    // Debug: Log first time we see a navigation key
    if (keyPath.startsWith('navigation.') && !result) {
      console.warn(`Translation not found for: ${keyPath}`, { translations, keyPath });
    }
    
    return result || keyPath;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
