import { getAccessToken, removeAccessToken } from '../auth/tokenStore';
import { clearAuth, store } from '@iuroadmap/store';
import { RoutePaths } from '@iuroadmap/core';
import { ApiError } from './apiResult';

export interface BootstrapApiOptions {
  onUnauthorized?: () => void;
}

export function bootstrapApi(opts: BootstrapApiOptions = {}): void {
  const originalFetch = window.fetch;

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    let url = input.toString();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const isApiCall = url.startsWith('/api');
    if (isApiCall && apiUrl) {
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

      // The generated client never rejects on HTTP errors; throw so mutations/queries fail properly.
      if (isApiCall && !response.ok) {
        const body = await response.clone().json().catch(() => undefined);
        throw new ApiError(response.status, body);
      }

      return response;
    } catch (error) {
      throw error;
    }
  };
}
