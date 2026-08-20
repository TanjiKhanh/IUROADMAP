/// <reference types="vite/client" />
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, setAccessToken } from '../auth/tokenStore';

// =====================================
// Axios Instance
// =====================================
const BASE_URL = import.meta.env.VITE_API_URL || '';
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// =====================================
// Request Interceptor: Attach Token
// =====================================
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    //Debug logs to verify token attachment
    // console.groupCollapsed(`🌐 API Request: ${config.url}`);
    // console.log('Token:', token ? 'Present' : 'Missing');
    // console.groupEnd();

    if (token) {
      if (!config.headers) {
        config.headers = {} as any;
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =====================================
// Response Interceptor: Unwrap & Handle 401
// =====================================
api.interceptors.response.use(
  // 1. SUCCESS: Unwrap the response
  // If backend returns { data: [...], meta: {...} } (paginated), keep structure
  // If backend returns { data: { ... } }, we return the inner { ... }
  // If backend returns { ... } (no data field), we return { ... }
  (response) => {
    const body = response.data;
    // Preserve paginated responses that have both data and meta
    if (body?.data && body?.meta) {
      return body;
    }
    return body?.data ?? body;
  },

  // 2. ERROR: Handle 401 (Unauthorized)
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (!originalRequest) return Promise.reject(error);

    // If session expired or unauthorized on protected route, clear token
    if (error.response?.status === 401 && !originalRequest.url?.includes('/auth/login')) {
      console.warn('🔒 Session expired or unauthorized. Clearing session.');
      setAccessToken(null);
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

