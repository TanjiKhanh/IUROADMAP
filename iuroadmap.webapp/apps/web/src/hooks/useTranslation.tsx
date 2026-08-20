import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as i18n from '@iuroadmap/core';

type Language = 'en' | 'vi';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Flatten features into a single dictionary
const flattenObject = (obj: any, prefix = ''): Record<string, string> => {
  return Object.keys(obj).reduce((acc: any, k: string) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};

// Build the complete translation dictionary
const allTranslations = {
  en: { ...i18n.translations.en },
  vi: { ...i18n.translations.vi },
};

// Merge features into allTranslations
Object.values(i18n.features).forEach((feature: any) => {
  if (feature.locales?.en) {
    Object.assign(allTranslations.en, flattenObject(feature.locales.en));
  }
  if (feature.locales?.vi) {
    Object.assign(allTranslations.vi, flattenObject(feature.locales.vi));
  }
});

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved === 'en' || saved === 'vi') ? saved : 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split('.');
    
    // First try the feature structure directly from features export if keyPath matches exactly
    // but the flat map is easier:
    return (allTranslations[language] as Record<string, string>)[keyPath] || keyPath;
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
