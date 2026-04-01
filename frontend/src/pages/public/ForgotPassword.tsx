import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import '../../styles/auth.css';
import logo from '../../assets/images/logo-gupjob-primary.png';
import axios from 'axios';
import { authService } from '../../services/auth.service';

type Step = 'REQUEST' | 'SENT' | 'RESET';

export default function ForgotPassword() {
  const navigate = useNavigate(); // Hook để điều hướng
  const [step, setStep] = useState<Step>('REQUEST');
  const [email, setEmail] = useState('');
  const [emailToken, setEmailToken] = useState(''); // ✅ Cần thêm state này
  const [isLoading, setIsLoading] = useState(false);
  
  // States Reset Password
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Backend sẽ tạo token và gửi vào email người dùng
      await authService.forgotPassword(email);
      setStep('SENT');
    } catch (error) {
      alert("Email does not exist or server error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/auth/reset-password', {
        token: emailToken, // ✅ Token người dùng nhập vào
        newPassword: newPassword
      });

      if (response.data.success) {
        alert("Password updated successfully!");
        navigate('/login');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Invalid or expired code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* --- STEP 1: REQUEST EMAIL --- */}
      {step === 'REQUEST' && (
        <div className="auth-card">
          <Link to="/"><img src={logo} alt="GUPJOB Logo" className="auth-logo" /></Link>
          <h1 className="auth-title">Forgot Password?</h1>
          <p className="auth-sub">Enter the email associated with your account.</p>
          <form className="auth-form" onSubmit={handleSendRequest}>
            <label> Email
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <button type="submit" className="btn btn--primary" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          <div className="auth-footer">
            <Link to="/login" className="link-muted">← Back to Login</Link>
          </div>
        </div>
      )}

      {/* --- STEP 2: EMAIL SENT SUCCESS --- */}
      {step === 'SENT' && (
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div className="success-circle" style={{ margin: '0 auto 20px', backgroundColor: '#e6fffa', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <span style={{ color: '#38a169', fontSize: '24px' }}>✓</span>
          </div>
          <h1 className="auth-title">Reset Code Sent!</h1>
          <p className="auth-sub">Check your inbox at <strong>{email}</strong></p>
          <button className="btn btn--primary" onClick={() => setStep('RESET')}>
            I have the code
          </button>
        </div>
      )}

      {/* --- STEP 3: SET NEW PASSWORD --- */}
      {step === 'RESET' && (
        <div className="auth-card">
          <h1 className="auth-title">Set a New Password</h1>
          <p className="auth-sub">Enter the 6-digit code from your email and your new password.</p>

          <form className="auth-form" onSubmit={handleUpdatePassword}>
            {/* ✅ Thêm Input nhập Mã Token 6 số */}
            <label>
              Verification Code
              <input 
                type="text" 
                placeholder="Ex: 123456" 
                maxLength={6}
                value={emailToken} 
                onChange={(e) => setEmailToken(e.target.value)} 
                required 
              />
            </label>

            <label>
              New Password
              <div className="password-input-wrapper" style={{ position: 'relative' }}>
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                  {showPassword ? "🔓" : "🔒"}
                </span>
              </div>
            </label>

            <label>
              Confirm New Password
              <div className="password-input-wrapper" style={{ position: 'relative' }}>
                <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}>
                  {showConfirmPassword ? "🔓" : "🔒"}
                </span>
              </div>
            </label>

            <div className="password-requirements">
               <div style={{ color: newPassword.length >= 8 ? '#05c34e' : '#718096' }}>○ Must be at least 8 characters</div>
               <div style={{ color: /[0-9!@#$%^&*]/.test(newPassword) ? '#05c34e' : '#718096' }}>○ Contains a number or symbol</div>
               <div style={{ color: /[A-Z]/.test(newPassword) ? '#05c34e' : '#718096' }}>○ Contains an uppercase letter</div>
            </div>

            <button type="submit" className="btn btn--primary" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}