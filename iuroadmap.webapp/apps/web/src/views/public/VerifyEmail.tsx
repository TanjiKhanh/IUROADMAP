import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { features, RoutePaths } from '@iuroadmap/core';
import { AppConstant, EntityConstant } from '@iuroadmap/shared/constants';
import {
    AuthZod,
    useAuthenticationControllerResendVerification,
    useAuthenticationControllerVerifyEmail,
    type AuthLoginResponseDto,
    type ResendVerificationResponse,
    type VerifyEmailRequest,
} from '@iuroadmap/api-gen';
import { selectIsAuthenticated, setAccessToken } from '@iuroadmap/store';
import type { RootState } from '@iuroadmap/store';

import { useTranslation } from '../../hooks/useTranslation';
import { apiErrorBody, apiErrorMessage, unwrapData } from '../../api/apiResult';
import { setAccessToken as persistAccessToken } from '../../auth/tokenStore';
import type { VerifyEmailLocationState } from '../../auth/verifyEmailLink';
import logo from '../../assets/images/logo-gupjob-primary.png';
import { UiAlert, UiButton, UiCard, UiForm, UiInputField } from '../../uikit';

const authKeys = features.auth.keys;
const verifyKeys = authKeys.verifyEmail;
const SECOND_MS = 1000;

interface Notice {
    type: 'success' | 'warning' | 'error';
    text: string;
}

/**
 * FL-AUTH-13: a password sign-up enters the emailed code here. A correct code verifies the
 * email and signs the user in. The email comes from ?email= (set by the register and login pages).
 */
export default function VerifyEmailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const authenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
    const { mutateAsync: verifyEmail, isPending: isVerifying } = useAuthenticationControllerVerifyEmail();
    const { mutateAsync: resendVerification, isPending: isResending } = useAuthenticationControllerResendVerification();

    const email = searchParams.get('email')?.trim().toLowerCase() ?? '';
    const locationState = location.state as VerifyEmailLocationState | null;
    const [notice, setNotice] = useState<Notice | null>(
        locationState?.message ? { type: locationState.messageType ?? 'success', text: locationState.message } : null,
    );
    const [cooldown, setCooldown] = useState(locationState?.resendAfterSeconds ?? 0);

    // A correct code stores the token; leave once the store is authenticated
    useEffect(() => {
        if (authenticated) navigate(RoutePaths.web.dashboard.root, { replace: true });
    }, [authenticated, navigate]);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = window.setTimeout(() => setCooldown((seconds) => seconds - 1), SECOND_MS);
        return () => window.clearTimeout(timer);
    }, [cooldown]);

    const { control, handleSubmit } = useForm<VerifyEmailRequest>({
        resolver: zodResolver(AuthZod.AuthenticationControllerVerifyEmailBody),
        defaultValues: { email, code: '' },
    });

    const onSubmit = handleSubmit(async (values) => {
        setNotice(null);
        try {
            const token = unwrapData<AuthLoginResponseDto>(await verifyEmail({ data: values }))?.access_token;
            if (!token) {
                setNotice({ type: 'error', text: t(verifyKeys.failed) });
                return;
            }
            persistAccessToken(token);
            dispatch(setAccessToken(token));
        } catch (err: unknown) {
            const message = apiErrorMessage(err, t, t(verifyKeys.failed));
            const attemptsLeft = apiErrorBody(err)?.attemptsLeft;
            setNotice({
                type: 'error',
                text: typeof attemptsLeft === 'number' ? `${message}. ${t(verifyKeys.attemptsLeft, { count: attemptsLeft })}` : message,
            });
        }
    });

    const onResend = async () => {
        setNotice(null);
        try {
            const result = unwrapData<ResendVerificationResponse>(await resendVerification({ data: { email } }));
            setCooldown(result?.resendAfterSeconds ?? AppConstant.EmailVerification.ResendCooldownSeconds);
            setNotice({ type: 'success', text: t(verifyKeys.resent) });
        } catch (err: unknown) {
            const retryAfterSeconds = apiErrorBody(err)?.retryAfterSeconds;
            if (typeof retryAfterSeconds === 'number') setCooldown(retryAfterSeconds);
            setNotice({ type: 'error', text: apiErrorMessage(err, t, t(verifyKeys.resendFailed)) });
        }
    };

    return (
        <div className="auth-page" style={{ padding: '2rem 1rem' }}>
            <UiCard className="auth-card" bordered={false} style={{ maxWidth: 440, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <Link to="/">
                        <img src={logo} alt="Logo" className="auth-logo" style={{ marginBottom: 0 }} />
                    </Link>
                </div>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t(verifyKeys.title)}</h2>

                {email ? (
                    <>
                        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                            {t(verifyKeys.subtitle, { email, minutes: AppConstant.EmailVerification.CodeTtlMinutes })}
                        </p>

                        {notice && <UiAlert type={notice.type} message={notice.text} showIcon style={{ marginBottom: '1rem' }} />}

                        <UiForm layout="vertical" onFinish={() => onSubmit()}>
                            <UiInputField<VerifyEmailRequest>
                                control={control}
                                name="code"
                                label={t(verifyKeys.codeLabel)}
                                placeholder={t(verifyKeys.codePlaceholder)}
                                autoComplete="one-time-code"
                                inputMode="numeric"
                                maxLength={EntityConstant.VerificationCode}
                                autoFocus
                                required
                            />
                            <UiButton type="primary" htmlType="submit" block size="large" loading={isVerifying}>
                                {t(verifyKeys.verifyBtn)}
                            </UiButton>
                        </UiForm>

                        <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#64748b' }}>
                            {t(verifyKeys.didNotGetCode)}{' '}
                            <UiButton
                                type="link"
                                style={{ padding: 0, height: 'auto' }}
                                disabled={cooldown > 0}
                                loading={isResending}
                                onClick={onResend}
                            >
                                {cooldown > 0 ? t(verifyKeys.resendIn, { seconds: cooldown }) : t(verifyKeys.resendBtn)}
                            </UiButton>
                        </div>
                    </>
                ) : (
                    <UiAlert type="warning" showIcon message={t(verifyKeys.missingEmail)} style={{ margin: '1rem 0' }} />
                )}

                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <Link to={RoutePaths.web.public.login}>{t(authKeys.forgotPassword.backToLogin)}</Link>
                </div>
            </UiCard>
        </div>
    );
}
