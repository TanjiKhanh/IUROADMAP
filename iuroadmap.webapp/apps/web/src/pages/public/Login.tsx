import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { features, RoutePaths } from '@iuroadmap/core';
import logo from '../../assets/images/logo-gupjob-primary.png';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  UiButton,
  UiCard,
  UiForm,
  UiIcon,
  UiInputField,
  UiSpace,
  useToast,
} from '../../uikit';
import { useBreakpoint } from '../../hooks/useBreakpoint';

import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, setAccessToken } from '@iuroadmap/store';
import type { RootState } from '@iuroadmap/store';
import { authenticationControllerLogin } from '@iuroadmap/api-gen';

const authKeys = features.auth.keys;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const DEFAULT_VALUES: LoginFormValues = { email: '', password: '' };

interface LocationStateWithFrom {
  from?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const authenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
  const { t } = useTranslation();
  const { isMobile } = useBreakpoint();
  const { toast, toastContextHolder } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const redirectTarget = (location.state as LocationStateWithFrom | null)?.from ?? RoutePaths.web.dashboard.root;

  useEffect(() => {
    if (authenticated) {
      navigate(redirectTarget, { replace: true });
    }
  }, [authenticated, navigate, redirectTarget]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const res = await authenticationControllerLogin(values);
      if (res.status === 200 && res.data?.access_token) {
        localStorage.setItem('iuroadmap.web.token', res.data.access_token);
        dispatch(setAccessToken(res.data.access_token));
        toast.success('Logged in successfully');
      } else {
        toast.error(t(authKeys.login.errorLoginFailed));
      }
    } catch (error: any) {
      toast.error(error.message || t(authKeys.login.errorLoginFailed));
    }
  });

  return (
    <div className="auth-page">
      {toastContextHolder}
      <UiCard
        style={{
          width: isMobile ? '100%' : 420,
          maxWidth: 460,
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          border: 'none',
        }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img
            src={logo}
            alt='Logo'
            width={72}
            height={72}
            style={{ display: 'inline-block', borderRadius: 16, marginBottom: 8 }}
          />
          <div style={{ fontSize: 18, fontWeight: 600 }}>{t(authKeys.login.welcomeTitle)}</div>
          <div style={{ color: '#888', marginTop: 4 }}>{t(authKeys.login.welcomeSub)}</div>
        </div>
        
        <UiForm form={form} onSubmit={onSubmit}>
          <UiSpace direction='vertical' size='medium' style={{ width: '100%' }}>
            <UiInputField<LoginFormValues>
              name='email'
              control={form.control}
              label={t(authKeys.login.email)}
              placeholder={t(authKeys.login.emailPlaceholder)}
              prefix={<UiIcon name="Mail" size={18} />}
              autoComplete='username'
              autoFocus
              required
            />
            <UiInputField<LoginFormValues>
              name='password'
              control={form.control}
              type='password'
              label={t(authKeys.login.password)}
              placeholder={t(authKeys.login.passwordPlaceholder)}
              prefix={<UiIcon name="Lock" size={18} />}
              autoComplete='current-password'
              required
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -8 }}>
              <Link to={RoutePaths.web.public.forgotPassword} style={{ fontSize: 14 }}>
                {t(authKeys.login.forgotPassword)}
              </Link>
            </div>

            <UiButton
              type='primary'
              size='large'
              htmlType='submit'
              block
              loading={form.formState.isSubmitting}>
              {t(authKeys.login.loginBtn)}
            </UiButton>
          </UiSpace>
        </UiForm>
        
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #f0f0f0', textAlign: 'center', fontSize: 14 }}>
          {t(authKeys.login.noAccount)}{' '}
          <Link to={RoutePaths.web.public.register}>{t(authKeys.login.registerNow)}</Link>
        </div>
      </UiCard>
    </div>
  );
}