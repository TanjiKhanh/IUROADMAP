import api from './api';

// Define the payload types for better type safety
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  role: string;
}

export const authService = {
  login: async (credentials: LoginPayload) => {
    // The interceptor in api.ts returns response.data directly
    return api.post('/api/v1/auth/login', credentials);
  },

  register: async (data: RegisterPayload) => {
    return api.post('/api/v1/auth/register', data);
  },

  refresh: async () => {
    return api.post('/api/v1/auth/refresh', {});
  },

  logout: async () => {
    return api.post('/api/v1/auth/logout', {});
  },
};