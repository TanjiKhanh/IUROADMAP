import api from './api';

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export const authService = {
  forgotPassword: async (email: string) => {
    return api.post('/api/v1/auth/forgot-password', { email });
  },
  resetPassword: async (dto: ResetPasswordDto) => {
    return api.post('/api/v1/auth/reset-password', dto);
  },
};
