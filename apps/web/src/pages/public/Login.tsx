import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../styles/auth.css'; 
import { useAuth , User } from '../../auth/AuthContext';

// Import logo
import logo from '../../assets/images/logo-gupjob-primary.png';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

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
        throw new Error("Please enter your full email and password.");
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
      setError(err.response?.data?.message || err.message || "Login failed. Please try again.");
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
        <h1 className="auth-title">Welcome back!</h1>
        <p className="auth-sub">Log in to continue your career journey.</p>

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
            Email
            <input 
              type="email" 
              name="email" 
              placeholder="name@company.com" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <div className="password-input-wrapper">
              <input 
                /* Logic đổi type giữa text và password */
                type={showPassword ? "text" : "password"} 
                name="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
                required
              />
              
              {/* Nút bấm toggle icon */}
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🔓" : "🔒"} 
              </span>
            </div>
          </label>
          {/* -------------------------------------- */}

          <div className="auth-row">
            <Link to="/forgot-password" className="link-muted">
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className="btn btn--primary"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register now</Link>
        </div>
      </div>
    </div>
  );
}