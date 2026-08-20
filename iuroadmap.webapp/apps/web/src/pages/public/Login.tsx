import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../styles/auth.css'; 
import { useAuth , User } from '../../auth/AuthContext';
import { useTranslation } from '../../hooks/useTranslation';
import { features } from '@iuroadmap/core';

const authKeys = features.auth.keys;

// Import logo
import logo from '../../assets/images/logo-gupjob-primary.png';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { t } = useTranslation();

  // State manage form
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // State manage show/hide password 
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if coming from registration
  useEffect(() => {
    if ((location.state as any)?.message) {
      setSuccess((location.state as any).message);
    }
  }, [location.state]);

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
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!formData.email || !formData.password) {
        throw new Error(t(authKeys.login.errorEmptyFields));
      }

      console.log("Attempting login with:", formData.email);
      
      // Call the actual login function from AuthContext
      const user = await login(formData.email, formData.password) as any;
      
      console.log("Login successful, user:", user);
      
      // Redirect based on role
      if (user?.role === 'MENTOR' && user?.status === 'PENDING_APPROVAL') {
        navigate('/application-pending', { replace: true });
      } else if (user?.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
      
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || t(authKeys.login.errorLoginFailed));
    } finally {
      setIsLoading(false);
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
              required
            />
          </label>

          <label>
            {t(authKeys.login.password)}
            <div className="password-input-wrapper">
              <input 
                /* Logic đổi type giữa text và password */
                type={showPassword ? "text" : "password"} 
                name="password" 
                placeholder={t(authKeys.login.passwordPlaceholder)}
                value={formData.password}
                onChange={handleChange}
                required
              />
              
              {/* Nút bấm toggle icon */}
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? t(authKeys.login.hidePassword) : t(authKeys.login.showPassword)}
              >
                {showPassword ? "🔓" : "🔒"} 
              </span>
            </div>
          </label>
          {/* -------------------------------------- */}

          <div className="auth-row">
            <Link to="/forgot-password" className="link-muted">
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
          {t(authKeys.login.noAccount)} <Link to="/register">{t(authKeys.login.registerNow)}</Link>
        </div>
      </div>
    </div>
  );
}