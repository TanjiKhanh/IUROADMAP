import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import logo from '../../assets/images/logo-gupjob-primary.png';

import {
  LayoutDashboard,
  Map,
  BookOpen,
  Folder,
  Users,
  CheckCircle,
  Calendar,
  Rocket,
  GraduationCap,
  MessageCircle,
  PanelLeftClose,
  PanelLeftOpen,
  PanelTop,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProBanner, setShowProBanner] = useState(true);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-link active' : 'nav-link';

  // --- ADMIN ---
  const AdminNav = () => (
    <>
      <div className="nav-section-label">Administration</div>

      <NavLink to="/admin" end className={getNavLinkClass}>
        <span className="nav-icon"><LayoutDashboard size={18} /></span>
        <span className="nav-text">Dashboard</span>
      </NavLink>

      <NavLink to="/admin/roadmaps" className={getNavLinkClass}>
        <span>🗺️</span> Roadmaps
      </NavLink>

      <NavLink to="/admin/courses" className={getNavLinkClass}>
        <span>📚</span> Courses
      </NavLink>

      <NavLink to="/admin/departments" className={getNavLinkClass}>
        <span className="nav-icon"><Folder size={18} /></span>
        <span className="nav-text">Departments</span>
      </NavLink>

      <div className="nav-section-label">System</div>

      <NavLink to="/admin/users" className={getNavLinkClass}>
        <span className="nav-icon"><Users size={18} /></span>
        <span className="nav-text">Users</span>
      </NavLink>
    </>
  );

  // --- MENTOR ---
  const MentorNav = () => (
    <>
      <div className="nav-section-label">Mentorship</div>

      <NavLink to="/mentor/dashboard" end className={getNavLinkClass}>
        <span className="nav-icon"><PanelTop size={18} /></span>
        <span className="nav-text">Mentor Hub</span>
      </NavLink>

      <NavLink to="/mentor/requests" className={getNavLinkClass}>
        <span className="nav-icon"><CheckCircle size={18} /></span>
        <span className="nav-text">Requests</span>
      </NavLink>

      <NavLink to="/mentor/sessions" className={getNavLinkClass}>
        <span className="nav-icon"><Calendar size={18} /></span>
        <span className="nav-text">Sessions</span>
      </NavLink>
    </>
  );

  // --- LEARNER ---
  const LearnerNav = () => (
    <>
      <div className="nav-section-label">Learning</div>

      <NavLink to="/dashboard" end className={getNavLinkClass}>
        <span className="nav-icon"><LayoutDashboard size={18} /></span>
        <span className="nav-text">Dashboard</span>
      </NavLink>

      <NavLink
        to="/dashboard/explore"
        className={({ isActive }) =>
          isActive || location.pathname.startsWith('/dashboard/roadmap-preview/')
            ? 'nav-link active'
            : 'nav-link'
        }
      >
        <span className="nav-icon"><GraduationCap size={18} /></span>
        <span className="nav-text">Explore Majors</span>
      </NavLink>

      <NavLink
        to="/dashboard/my-courses"
        className={({ isActive }) =>
          isActive || location.pathname.startsWith('/dashboard/roadmap/')
            ? 'nav-link active'
            : 'nav-link'
        }
      >
        <span className="nav-icon"><Map size={18} /></span>
        <span className="nav-text">My Roadmaps</span>
      </NavLink>

      <NavLink to="/dashboard/progress" className={getNavLinkClass}>
        <span className="nav-icon"><Rocket size={18} /></span>
        <span className="nav-text">Progress</span>
      </NavLink>

      <div className="nav-section-label">Community</div>

      <NavLink
        to="/dashboard/find-mentors"
        className={({ isActive }) => {
          const isMentorsPage = isActive;
          const isMentorDetail = location.pathname.startsWith('/dashboard/find-mentors');
          return (isMentorsPage || isMentorDetail)
            ? 'nav-link active'
            : 'nav-link';
        }}
      >
        <span className="nav-icon"><Users size={18} /></span>
        <span className="nav-text">Find Mentors</span>
      </NavLink>

      <div className="nav-link disabled" style={{ opacity: 0.5 }}>
        <span className="nav-icon"><MessageCircle size={18} /></span>
        <span className="nav-text">
          Chat with Mentors <span className="badge-pro">PRO</span>
        </span>
      </div>
    </>
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>

      {/* HEADER */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <img src={logo} alt="Gub Job" className="brand-icon" />
          <span className="nav-text brand-name">Gub Job</span>
        </div>

        <button
          className="btn-toggle-sidebar"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed
            ? <PanelLeftClose size={20} />
            : <PanelLeftOpen size={20} />
          }
        </button>
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        {user?.role === 'ADMIN' && <AdminNav />}
        {user?.role === 'MENTOR' && <MentorNav />}
        {(!user?.role || user?.role === 'USER' || user?.role === 'STUDENT') && <LearnerNav />}
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">

        {(user?.role === 'USER' || user?.role === 'STUDENT') && showProBanner && !isCollapsed && (
          <div className="pro-upsell-notification">
            <button 
              className="btn-close-upsell"
              onClick={() => setShowProBanner(false)}
            >
              ✕
            </button>

            <div className="upsell-content">
              <h4>GUPJOB Pro</h4>
              <p>Get verified badges & unlimited chats.</p>
              <button className="btn-upgrade">Upgrade Plan</button>
            </div>
          </div>
        )}

        <div className="user-mini-profile">
          <div className="avatar-small">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>

          <div className="user-info nav-text">
            <span className="user-email">{user?.email}</span>
            <span className={`badge ${user?.role?.toLowerCase() || 'student'}`}>
              {user?.role || 'STUDENT'}
            </span>
          </div>
        </div>

        <button onClick={handleLogout} className="btn-logout">
          <LogOut size={18} />
          <span className="nav-text">Logout</span>
        </button>

      </div>
    </aside>
  );
}