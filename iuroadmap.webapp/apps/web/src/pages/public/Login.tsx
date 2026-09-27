import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { features, RoutePaths } from '@iuroadmap/core';
import { selectIsAuthenticated, setAccessToken } from '@iuroadmap/store';
import type { RootState } from '@iuroadmap/store';
import { useAuthenticationControllerLogin, type AuthLoginResponseDto } from '@iuroadmap/api-gen';
import { useTranslation } from '../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../api/apiResult';
import { setAccessToken as persistAccessToken } from '../../auth/tokenStore';

// Import logo
import logo from '../../assets/images/logo-gupjob-primary.png';

const authKeys = features.auth.keys;

interface LoginLocationState {
  /** Page to return to after signing in (set by ProtectedRoute) */
  from?: string;
  /** Message from the registration page */
  message?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const authenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
  const { mutateAsync: login, isPending: isLoading } = useAuthenticationControllerLogin();

  const locationState = location.state as LoginLocationState | null;
  const redirectTarget = locationState?.from ?? RoutePaths.web.dashboard.root;

  // State manage form
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State manage show/hide password
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Signed in (now or from a stored token): leave the login page
  useEffect(() => {
    if (authenticated) {
      navigate(redirectTarget, { replace: true });
    }
  }, [authenticated, navigate, redirectTarget]);

  // Check if coming from registration
  useEffect(() => {
    if (locationState?.message) {
      setSuccess(locationState.message);
    }
  }, [locationState?.message]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.email || !formData.password) {
      setError(t(authKeys.login.errorEmptyFields));
      return;
    }

    try {
      const token = unwrapData<AuthLoginResponseDto>(await login({ data: formData }))?.access_token;
      if (!token) {
        setError(t(authKeys.login.errorLoginFailed));
        return;
      }
      persistAccessToken(token);
      // The redirect happens in the effect above once the store is authenticated
      dispatch(setAccessToken(token));
    } catch (err: unknown) {
      setError(apiErrorMessage(err, t, t(authKeys.login.errorLoginFailed)));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/">
          <img src={logo} alt="GUPJOB Logo" className="auth-logo" />
        </Link>
        <h1 className="auth-title">{t(authKeys.login.welcomeTitle)}</h1>
        <p className="auth-sub">{t(authKeys.login.welcomeSub)}</p>

        {error && (
          <div className="auth-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        {success && (
          <div style={{ backgroundColor: '#d4edda', border: '1px solid #c3e6cb', color: '#155724', padding: '12px 16px', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.95rem' }}>
            <span>✅ {success}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>

          <label>
            {t(authKeys.login.email)}
            <input
              type="email"
              name="email"
              placeholder={t(authKeys.login.emailPlaceholder)}
              value={formData.email}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </label>

          <label>
            {t(authKeys.login.password)}
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

              {/* Show / hide password */}
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? t(authKeys.login.hidePassword) : t(authKeys.login.showPassword)}
              >
                {showPassword ? "🔓" : "🔒"}
              </span>
            </div>
          </label>

          <div className="auth-row">
            <Link to={RoutePaths.web.public.forgotPassword} className="link-muted">
              {t(authKeys.login.forgotPassword)}
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            disabled={isLoading}
          >
            {isLoading ? t(authKeys.login.processing) : t(authKeys.login.loginBtn)}
          </button>
        </form>

        <div className="auth-footer">
          {t(authKeys.login.noAccount)} <Link to={RoutePaths.web.public.register}>{t(authKeys.login.registerNow)}</Link>
        </div>
      </div>
    </div>
  );
}
