import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { Clock, LogOut, Mail } from 'lucide-react';

export default function ApplicationPending() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mentorName, setMentorName] = useState<string>('Mentor');
  const [isNewRegistrant, setIsNewRegistrant] = useState(false);

  useEffect(() => {
    // Case 1: Authenticated user (logged in)
    if (user) {
      // If MENTOR role but status is ACTIVE, they got approved - go to dashboard
      if (user.role === 'MENTOR' && user.status === 'ACTIVE') {
        navigate('/mentor-dashboard', { replace: true });
        return;
      }

      // If NOT mentor or not PENDING_APPROVAL, redirect to login
      if (user.role !== 'MENTOR' || user.status !== 'PENDING_APPROVAL') {
        navigate('/login', { replace: true });
        return;
      }

      // Valid pending mentor
      setMentorName(user.name || 'Mentor');
      setIsNewRegistrant(false);
    } 
    // Case 2: No user (just registered, not logged in)
    else {
      const storedName = localStorage.getItem('mentorName');
      const storedEmail = localStorage.getItem('mentorEmail');

      if (storedName && storedEmail) {
        setMentorName(storedName);
        setIsNewRegistrant(true);
      } else {
        // No user AND no registration data = shouldn't be here
        navigate('/register', { replace: true });
      }
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '1rem' }}>
      <div style={{ backgroundColor: 'white', padding: '3rem 2rem', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
        
        {/* Icon Illustration */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: '#eff6ff', padding: '1rem', borderRadius: '50%' }}>
            <Clock size={48} color="#2563eb" />
          </div>
        </div>

        {/* Headlines & Body */}
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
          Application Received!
        </h1>
        
        {/* Different messages for new registrants vs returning login */}
        {isNewRegistrant ? (
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.5', marginBottom: '2rem' }}>
            Thanks for signing up, <strong>{mentorName}</strong>! <br/><br/>
            Your mentor profile has been submitted successfully. Our Admin team will review your application and notify you via email within 24-48 hours. 
            <br/><br/>
            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>You can close this page and check your email for updates.</span>
          </p>
        ) : (
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.5', marginBottom: '2rem' }}>
            Welcome back, <strong>{mentorName}</strong>! <br/><br/>
            Your profile is still under review by our Admin team. This process usually takes 24-48 hours. We will notify you via email once approved.
            <br/><br/>
            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>You'll automatically be redirected to your dashboard when approved.</span>
          </p>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={() => window.location.href = 'mailto:support@gupjob.com'}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.75rem', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', fontWeight: 500, border: 'none', cursor: 'pointer' }}
          >
            <Mail size={18} /> Contact Support
          </button>
          
          <button 
            onClick={() => {
              // Case 1: New registrant - clear temporary storage
              if (isNewRegistrant) {
                localStorage.removeItem('mentorName');
                localStorage.removeItem('mentorEmail');
              }
              
              // Case 2: Logged in mentor - logout from session
              if (user) {
                logout();
              }
              
              // Both cases: Navigate to login
              navigate('/login', { replace: true });
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.75rem', backgroundColor: 'transparent', color: '#64748b', border: '1px solid #cbd5e1', borderRadius: '8px', fontWeight: 500, cursor: 'pointer' }}
          >
            <LogOut size={18} /> {isNewRegistrant ? 'Go to Login' : 'Log out'}
          </button>
        </div>
      </div>
    </div>
  );
}