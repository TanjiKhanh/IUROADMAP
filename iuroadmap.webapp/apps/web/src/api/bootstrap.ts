import { getAccessToken, removeAccessToken } from '../auth/tokenStore';
import { clearAuth, store } from '@iuroadmap/store';
import { RoutePaths } from '@iuroadmap/core';

export interface BootstrapApiOptions {
  onUnauthorized?: () => void;
}

export function bootstrapApi(opts: BootstrapApiOptions = {}): void {
  const originalFetch = window.fetch;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    let url = input.toString();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    if (url.startsWith('/api') && apiUrl) {
      url = `${apiUrl}${url}`;
    }

    const token = getAccessToken();
    const language = store.getState().app.language || 'en';

    const headers = new Headers(init?.headers);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Accept-Language', language);

    const newInit: RequestInit = {
      ...init,
      headers,
    };

    try {
      const response = await originalFetch(url, newInit);

      if (response.status === 401 || response.status === 403) {
        removeAccessToken();
        store.dispatch(clearAuth());
        opts.onUnauthorized?.();
        if (window.location.pathname !== RoutePaths.web.public.login) {
          window.location.href = RoutePaths.web.public.login;
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  };
}
