import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { features, RoutePaths } from '@iuroadmap/core';
import { authService } from '../../services/auth.service';
import logo from '../../assets/images/logo-gupjob-primary.png';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UiForm, UiInputField, UiButton, UiCard, useToast } from '../../uikit';

const authKeys = features.auth.keys;

const forgotSchema = z.object({
  email: z.string().email(),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast, toastContextHolder } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotFormValues) => {
    try {
      await authService.forgotPassword(data.email);
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Failed to request password reset');
    }
  };

  return (
    <div className="auth-page">
      {toastContextHolder}
      <UiCard className="auth-card" bordered={false}>
        <Link to="/">
          <img src={logo} alt="Logo" className="auth-logo" />
        </Link>
        <h1 className="auth-title">{t(authKeys.forgotPassword.title)}</h1>

        {submitted ? (
          <div>
            <div style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '12px 16px', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
              Password reset link sent! Check your email.
            </div>
            <UiButton block type="primary" size="large" onClick={() => navigate(RoutePaths.web.public.login)}>
              {t(authKeys.forgotPassword.backToLogin)}
            </UiButton>
          </div>
        ) : (
          <>
            <p className="auth-sub" style={{ marginBottom: '2rem' }}>
              {t(authKeys.forgotPassword.subtitle)}
            </p>
            <UiForm onFinish={handleSubmit(onSubmit)}>
              <UiInputField control={control} name="email" label={t(authKeys.login.email)} placeholder="Enter your email address" />

              <UiButton type="primary" htmlType="submit" loading={isSubmitting} block size="large" style={{ marginTop: '1rem' }}>
                {isSubmitting ? t(authKeys.login.processing) : t(authKeys.forgotPassword.submitBtn)}
              </UiButton>
            </UiForm>

            <div className="auth-footer" style={{ marginTop: '2rem' }}>
              <Link to={RoutePaths.web.public.login}>{t(authKeys.forgotPassword.backToLogin)}</Link>
            </div>
          </>
        )}
      </UiCard>
    </div>
  );
}