export const APP_TOKEN_KEY = 'iuroadmap.web.token';

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(APP_TOKEN_KEY);
};

export const setAccessToken = (token: string | null) => {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem(APP_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(APP_TOKEN_KEY);
  }
};

export const removeAccessToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(APP_TOKEN_KEY);
};
