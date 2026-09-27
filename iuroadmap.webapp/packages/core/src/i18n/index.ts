import * as features from './features';
import translationEN from './locales/en';
import translationVI from './locales/vi';

export const translations = {
  en: translationEN,
  vi: translationVI,
};

export const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI },
};

export const getTranslation = (lang: 'en' | 'vi', key: string) => {
  const locale = translations[lang] as Record<string, unknown>;
  const fallback = translations.en as Record<string, unknown>;
  const resolve = (source: Record<string, unknown>) => key.split('.').reduce<unknown>((value, part) => {
    return value && typeof value === 'object' ? (value as Record<string, unknown>)[part] : undefined;
  }, source);

  return resolve(locale) || resolve(fallback) || key;
};

export { features };
