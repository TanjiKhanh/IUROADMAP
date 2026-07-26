export const translations = {
  en: {
    welcome: 'Welcome to IUROADMAP',
    description: 'AI-Powered Career Roadmap Platform'
  },
  vi: {
    welcome: 'Chào mừng đến với IUROADMAP',
    description: 'Nền tảng lộ trình nghề nghiệp hỗ trợ bởi AI'
  }
};

export const getTranslation = (lang: 'en' | 'vi', key: keyof typeof translations.en) => {
  return translations[lang]?.[key] || translations.en[key];
};
