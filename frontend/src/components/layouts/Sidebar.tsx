import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext'; // Adjust path if needed
import logo from '../../assets/images/logo-gupjob-primary.png';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Helper for NavLink styling
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    isActive ? 'nav-link active' : 'nav-link';

  // --- 1. ADMIN Navigation ---
  const AdminNav = () => (
    <>
      <div className="nav-section-label">Administration</div>
      <NavLink to="/admin" end className={getNavLinkClass}>
        <span>🧠</span> Dashboard
      </NavLink>
      <NavLink to="/admin/roadmaps" className={getNavLinkClass}>
        <span>🗺️</span> Roadmaps
      </NavLink>
      <NavLink to="/admin/courses" className={getNavLinkClass}>
        <span>📚</span> Courses
      </NavLink>
      <NavLink to="/admin/departments" className={getNavLinkClass}>
        <span>📂</span> Departments
      </NavLink>

      <div className="nav-section-label">System</div>
      <NavLink to="/admin/users" className={getNavLinkClass}>
        <span>👥</span> Users
      </NavLink>
    </>
  );

  // --- 2. MENTOR Navigation ---
  const MentorNav = () => (
    <>
      <div className="nav-section-label">Mentorship</div>
      <NavLink to="/mentor/dashboard" end className={getNavLinkClass}>
        <span>🎛️</span> Mentor Hub
      </NavLink>
      <NavLink to="/mentor/requests" className={getNavLinkClass}>
        <span>✅</span> Requests
      </NavLink>
      <NavLink to="/mentor/sessions" className={getNavLinkClass}>
        <span>📅</span> Sessions
      </NavLink>
    </>
  );

  // --- 3. LEARNER Navigation (Default) ---
  const LearnerNav = () => (
    <>
      <div className="nav-section-label">Learning</div>
      
      <NavLink to="/dashboard" end className={getNavLinkClass}>
        <span>📊</span> Dashboard
      </NavLink>

      <NavLink to="/dashboard/my-courses" 
        className={({ isActive }) => 
          // Active if matches exactly OR if we are inside a roadmap detail view
          isActive || location.pathname.includes('/dashboard/roadmap') 
            ? 'nav-link active' 
            : 'nav-link'
        }
      >
        <span>🗺️</span> My Roadmaps
      </NavLink>

      <NavLink to="/dashboard/progress" className={getNavLinkClass}>
        <span>🚀</span> Progress
      </NavLink>
      
      <div className="nav-section-label">Community</div>
      <NavLink to="/dashboard/mentors" 
        className={({ isActive }) => {
          const isMentorsPage = isActive;
          const isMentorDetail = location.pathname.startsWith('/mentor/');
          return (isMentorsPage || isMentorDetail) ? 'nav-link active' : 'nav-link';
        }}
      >
        <span>👥</span> Find Mentors
      </NavLink>

      {/* Disabled/Pro Link Example */}
      <div className="nav-link disabled" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
        <span>💬</span> Chat with Mentors <span className="badge-pro">PRO</span>
      </div>
    </>
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="dashboard-sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <img src={logo} alt="Gub Job" className="brand-icon" style={{width: '24px'}} />
        <span>Gub Job</span>
      </div>
      
      {/* Navigation */}
      <nav className="sidebar-nav">
        {user?.role === 'ADMIN' && <AdminNav />}
        {user?.role === 'MENTOR' && <MentorNav />}
        {(!user?.role || user?.role === 'USER' || user?.role === 'STUDENT') && <LearnerNav />}
      </nav>

      {/* Footer / Profile */}
      <div className="sidebar-footer">
        
        {/* Pro Upsell (Only for Learners) */}
        {(user?.role === 'USER' || user?.role === 'STUDENT') && (
          <div className="pro-upsell">
            <p><strong>GUPJOB Pro</strong></p>
            <p style={{fontSize: '0.75rem', marginTop: '4px', color: '#64748b'}}>Get verified badges & unlimited chats.</p>
            <button className="btn-upgrade">Upgrade Plan</button>
          </div>
        )}
        
        <div className="user-mini-profile">
          <div className="avatar-small">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="user-info">
            <span className="user-email" title={user?.email}>{user?.email}</span>
            <span className={`badge ${user?.role?.toLowerCase() || 'basic'}`} style={{fontSize: '0.7rem'}}>
              {user?.role || 'GUEST'}
            </span>
          </div>
        </div>

        <button onClick={handleLogout} className="btn-logout">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}