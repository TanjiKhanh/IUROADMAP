import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { features, RoutePaths } from '@iuroadmap/core';
import { EntityConstant } from '@iuroadmap/shared/constants';
import { useAuthenticationControllerRegister } from '@iuroadmap/api-gen';
import { selectIsAuthenticated } from '@iuroadmap/store';
import type { RootState } from '@iuroadmap/store';

import { useTranslation } from '../../hooks/useTranslation';
import { apiErrorMessage } from '../../api/apiResult';
import logo from '../../assets/images/logo-gupjob-primary.png';
import { GOOGLE_SIGN_IN_ENABLED, GoogleSignInButton } from '../../components/auth/GoogleSignInButton';
import { UiButton, UiCard, UiForm, UiInputField, useToast } from '../../uikit';

const authKeys = features.auth.keys;

// The generated AuthZod register body has no email / length rules yet (its @ApiProperty lacks
// format, minLength and maxLength), so the backend DTO limits are mirrored here.
const registerSchema = z.object({
    email: z.string().email().max(EntityConstant.Email),
    name: z.string().trim().min(1).max(EntityConstant.Fullname),
    password: z.string().min(EntityConstant.PasswordMin).max(EntityConstant.PasswordMax),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const DEFAULT_VALUES: RegisterFormValues = { email: '', name: '', password: '' };

/** Sign-up creates a student account; mentors are not registered here. */
export default function RegisterPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { toast, toastContextHolder } = useToast();
    const { mutateAsync: registerLearner, isPending } = useAuthenticationControllerRegister();
    const authenticated = useSelector((state: RootState) => selectIsAuthenticated(state));

    // Signing up with Google signs the learner in directly
    useEffect(() => {
        if (authenticated) navigate(RoutePaths.web.dashboard.root, { replace: true });
    }, [authenticated, navigate]);

    const { control, handleSubmit } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: DEFAULT_VALUES,
        mode: 'onTouched',
    });

    const onSubmit = handleSubmit(async (values) => {
        try {
            // The backend always creates a LEARNER account
            await registerLearner({ data: values });
            navigate(RoutePaths.web.public.login, { state: { message: t(authKeys.register.successMsg) } });
        } catch (err: unknown) {
            toast.error(apiErrorMessage(err, t, t(authKeys.register.failedMsg)));
        }
    });

    return (
        <div className="auth-page" style={{ padding: '2rem 1rem' }}>
            {toastContextHolder}
            <UiCard className="auth-card" bordered={false} style={{ maxWidth: 440, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <Link to="/">
                        <img src={logo} alt="Logo" className="auth-logo" style={{ marginBottom: 0 }} />
                    </Link>
                </div>

                <UiForm layout="vertical" onFinish={() => onSubmit()}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t(authKeys.register.createAccountTitle)}</h2>
                    <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>{t(authKeys.register.joinCommunity)}</p>

                    {GOOGLE_SIGN_IN_ENABLED ? (
                        <>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <GoogleSignInButton text="signup_with" onError={(message) => toast.error(message)} />
                            </div>

                            <div style={{ textAlign: 'center', margin: '1rem 0', color: '#94a3b8', fontSize: '0.875rem' }}>{t(authKeys.register.or)}</div>
                        </>
                    ) : null}

                    <UiInputField<RegisterFormValues>
                        control={control}
                        name="email"
                        label={t(authKeys.register.email)}
                        placeholder={t(authKeys.login.emailPlaceholder)}
                        autoComplete="username"
                        required
                    />
                    <UiInputField<RegisterFormValues>
                        control={control}
                        name="name"
                        label={t(authKeys.register.fullName)}
                        placeholder={t(authKeys.register.fullNamePlaceholder)}
                        autoComplete="name"
                        required
                    />
                    <UiInputField<RegisterFormValues>
                        control={control}
                        name="password"
                        type="password"
                        label={t(authKeys.register.password)}
                        placeholder={t(authKeys.register.passwordPlaceholder)}
                        autoComplete="new-password"
                        required
                    />

                    <UiButton type="primary" htmlType="submit" block size="large" loading={isPending} style={{ marginTop: '1rem' }}>
                        {t(authKeys.register.createBtn)}
                    </UiButton>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        {t(authKeys.register.alreadyHaveAccount)}{' '}
                        <Link to={RoutePaths.web.public.login}>{t(authKeys.register.logInLink)}</Link>
                    </div>
                </UiForm>
            </UiCard>
        </div>
    );
}
