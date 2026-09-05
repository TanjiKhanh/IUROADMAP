import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { features, RoutePaths } from '@iuroadmap/core';
import { authService } from '../../services/auth.service';
import logo from '../../assets/images/logo-gupjob-primary.png';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UiForm, UiInputField, UiButton, UiCard, useToast } from '../../uikit';

const authKeys = features.auth.keys;

const resetSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const { toast, toastContextHolder } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: ResetFormValues) => {
    if (!token) {
      toast.error('Invalid or missing reset token');
      return;
    }
    
    try {
      await authService.resetPassword({ token, newPassword: data.password });
      setSubmitted(true);
      setTimeout(() => navigate(RoutePaths.web.public.login), 3000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Failed to reset password');
    }
  };

  return (
    <div className="auth-page">
      {toastContextHolder}
      <UiCard className="auth-card" bordered={false}>
        <Link to="/">
          <img src={logo} alt="Logo" className="auth-logo" />
        </Link>
        <h1 className="auth-title">Reset Password</h1>
        
        {submitted ? (
          <div>
            <div style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '12px 16px', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
              Password has been reset successfully! Redirecting to login...
            </div>
            <UiButton block type="primary" size="large" onClick={() => navigate(RoutePaths.web.public.login)}>
              {t(authKeys.forgotPassword.backToLogin)}
            </UiButton>
          </div>
        ) : (
          <>
            <p className="auth-sub" style={{ marginBottom: '2rem' }}>
              Enter your new password below.
            </p>
            <UiForm onFinish={handleSubmit(onSubmit)}>
              <UiInputField control={control} name="password" type="password" label="New Password" placeholder="••••••••" />
              <UiInputField control={control} name="confirmPassword" type="password" label="Confirm Password" placeholder="••••••••" />
              
              <UiButton type="primary" htmlType="submit" loading={isSubmitting} block size="large" style={{ marginTop: '1rem' }}>
                Reset Password
              </UiButton>
            </UiForm>
          </>
        )}
      </UiCard>
    </div>
  );
}
