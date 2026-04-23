import api from './api';

// Define the payload types for better type safety
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LearnerRegisterPayload {
  email: string;
  password: string;
  name: string;
  role: string;
  // ✅ NOTE: Course enrollment happens via priorityJob field, but it's handled in LearnerProfile after registration
}

export interface MentorRegisterPayload {
  email: string;
  password: string;
  name: string;
  role: string;
  linkedinUrl: string;
  industry: string;
  skills: string[];
  bio: string;
  cvUrl: string;
}

export const authService = {
  login: async (credentials: LoginPayload) => {
    // The interceptor in api.ts returns response.data directly
    return api.post('/api/v1/auth/login', credentials);
  },

  register: async (data: LearnerRegisterPayload) => {
    return api.post('/api/v1/auth/register/learner', data);
  },

  forgotPassword: async (email: string) => {
  return api.post('/api/v1/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, newPassword: string) => {
    return api.post('/api/v1/auth/reset-password', { token, newPassword });
  },

  registerMentor: async (data: MentorRegisterPayload) => {
    return api.post('/api/v1/auth/register/mentor', data);
  },

  refresh: async () => {
    return api.post('/api/v1/auth/refresh', {});
  },

  logout: async () => {
    return api.post('/api/v1/auth/logout', {});
  },
};
