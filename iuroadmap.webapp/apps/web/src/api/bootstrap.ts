import { registerClient } from '@sop/api-gen';
import { env } from '@/env';
import { store } from 'store';

const TOKEN_STORAGE_KEY = 'sop.token';

export interface BootstrapApiOptions {
  onUnauthorized?: () => void;
}

export function bootstrapApi(opts: BootstrapApiOptions = {}): void {
  registerClient({
    baseURL: env.API_BASE_URL,
    getToken: () => localStorage.getItem(TOKEN_STORAGE_KEY),

    getLanguage: () => store.getState().app.language,
    onUnauthorized: () => {
      try {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      } catch {
        /* ignore */
      }
      opts.onUnauthorized?.();
    },
  });
}

export const tokenStorage = {
  get: (): string | null => localStorage.getItem(TOKEN_STORAGE_KEY),
  set: (token: string): void => localStorage.setItem(TOKEN_STORAGE_KEY, token),
  clear: (): void => localStorage.removeItem(TOKEN_STORAGE_KEY),
};
