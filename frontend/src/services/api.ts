import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, setAccessToken } from '../auth/tokenStore';

// =====================================
// Axios Instance
// =====================================
const api = axios.create({
  baseURL: '', // Relies on Vite proxy defined in vite.config.ts
  withCredentials: true, // Crucial: Sends HttpOnly cookies to the backend
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
// Response Interceptor: Unwrap & Refresh
// =====================================
let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

const processQueue = (token: string | null) => {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
};

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
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (!originalRequest) return Promise.reject(error);

    // Check if it's a 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // 🛑 LOOP PROTECTION: If the failed request WAS a refresh attempt, don't retry!
      if (originalRequest.url?.includes('/auth/refresh')) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // Queueing logic for multiple simultaneous requests
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      isRefreshing = true;

      try {
        console.log('🔄 Session expired. Attempting refresh...');
        
        // Call the refresh endpoint using RAW axios (skips this interceptor)
        const resp = await axios.post('/auth/refresh', {}, { withCredentials: true });
        
        // Handle unwrapping manually for this raw request
        const payload = resp.data?.data || resp.data;
        const newAccessToken = payload.access_token || payload.accessToken;

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          processQueue(newAccessToken);

          // Update header and retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } else {
          throw new Error('No token returned');
        }
      } catch (refreshErr) {
        console.error('❌ Refresh failed. Logging out.');
        processQueue(null);
        setAccessToken(null);
        window.location.href = '/login'; // Force logout
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;