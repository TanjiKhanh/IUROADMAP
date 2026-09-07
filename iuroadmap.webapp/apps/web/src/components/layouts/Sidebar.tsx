import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectTokenProfile, clearAuth } from '@iuroadmap/store';
import type { RootState } from '@iuroadmap/store';
import logo from '../../assets/images/logo-gupjob-primary.png';
import { RoutePaths, MenuIconsWeb } from '@iuroadmap/core';
import { useMenu } from '../../hooks/useMenu';

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
  LogOut,
  LucideIcon,
  ChevronDown,
  ChevronRight
} from "lucide-react";

const IconMap: Record<string, LucideIcon | null> = {
  [MenuIconsWeb.layoutDashboard]: LayoutDashboard,
  [MenuIconsWeb.map]: Map,
  [MenuIconsWeb.bookOpen]: BookOpen,
  [MenuIconsWeb.folder]: Folder,
  [MenuIconsWeb.panelTop]: PanelTop,
  [MenuIconsWeb.graduationCap]: GraduationCap,
  [MenuIconsWeb.users]: Users,
  [MenuIconsWeb.messageCircle]: MessageCircle,
  [MenuIconsWeb.none]: null,
};

export default function Sidebar() {
  const user = useSelector((state: RootState) => selectTokenProfile(state));
  const dispatch = useDispatch();
  const filteredMenu = useMenu();
  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProBanner, setShowProBanner] = useState(true);

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setExpandedMenus((prev) => ({ ...prev, [title]: true }));
    } else {
      setExpandedMenus((prev) => ({ ...prev, [title]: !prev[title] }));
    }
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-link active' : 'nav-link';

  const handleLogout = () => {
    localStorage.removeItem('iuroadmap.web.token');
    dispatch(clearAuth());
    navigate(RoutePaths.web.public.login);
  };

  const userRole = user?.role || 'STUDENT';

  // Render navigation dynamically based on appMenuConfig
  const renderMenuConfig = () => {
    return filteredMenu.map((menuGroup) => {
      return (
        <React.Fragment key={menuGroup.key}>
          <div className="nav-section-label">{menuGroup.groupName}</div>
          {menuGroup.items.map((item, index) => {
            const IconComponent = IconMap[item.iconWeb] || CheckCircle; // Fallback to CheckCircle
            
            // Highlight active states for specific routes (e.g. explore majors or mentors)
            const getActiveState = ({ isActive }: { isActive: boolean }) => {
              if (isActive) return 'nav-link active';
              // Special cases for subpaths based on the main path
              if (item.path && item.path === RoutePaths.web.dashboard.explore && location.pathname.startsWith('/dashboard/roadmap-preview/')) {
                return 'nav-link active';
              }
              if (item.path && item.path === RoutePaths.web.dashboard.myCourses && location.pathname.startsWith('/dashboard/roadmap/')) {
                return 'nav-link active';
              }
              return 'nav-link';
            };

            const isExpanded = expandedMenus[item.title];
            const hasChildren = item.children && item.children.length > 0;

            if (item.isPro) {
              return (
                <div key={item.title} className="nav-link disabled" style={{ opacity: 0.5 }}>
                  <span className="nav-icon"><IconComponent size={18} /></span>
                  <span className="nav-text">
                    {item.title} <span className="badge-pro">PRO</span>
                  </span>
                </div>
              );
            }

            return (
              <div key={item.title} className="nav-item-container">
                {hasChildren ? (
                  <div className="nav-link nav-group-header" onClick={() => toggleMenu(item.title)} style={{ cursor: 'pointer' }}>
                    <span className="nav-icon"><IconComponent size={18} /></span>
                    <span className="nav-text">{item.title}</span>
                    {!isCollapsed && (
                      <span className="nav-arrow" style={{ marginLeft: 'auto' }}>
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </span>
                    )}
                  </div>
                ) : (
                  <NavLink 
                    to={item.path} 
                    end={item.path === RoutePaths.web.admin.root || item.path === RoutePaths.web.dashboard.root || item.path === RoutePaths.web.mentor.dashboard}
                    className={getActiveState}
                  >
                    <span className="nav-icon"><IconComponent size={18} /></span>
                    <span className="nav-text">{item.title}</span>
                  </NavLink>
                )}

                {hasChildren && isExpanded && !isCollapsed && (
                  <div className="nav-sub-items" style={{ paddingLeft: '1.5rem', marginTop: '0.25rem' }}>
                    {item.children!.map((child) => {
                      const ChildIcon = IconMap[child.iconWeb] || CheckCircle;
                      return (
                        <NavLink
                          key={child.title}
                          to={child.path}
                          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                          style={{ padding: '0.5rem 1rem', fontSize: '0.9em' }}
                        >
                          <span className="nav-icon"><ChildIcon size={16} /></span>
                          <span className="nav-text">{child.title}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </React.Fragment>
      );
    });
  };

  return (
    <aside className={`dashboard-sidebar ${isCollapsed ? 'collapsed' : ''}`}>

      {/* HEADER */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <img src={logo} alt="Gub Job" className="brand-icon" />
          <span className="nav-text brand-name">IUROADMAP</span>
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
        {renderMenuConfig()}
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">

        {(userRole === 'USER' || userRole === 'STUDENT') && showProBanner && !isCollapsed && (
          <div className="pro-upsell-notification">
            <button 
              className="btn-close-upsell"
              onClick={() => setShowProBanner(false)}
            >
              ×
            </button>

            <div className="upsell-content">
              <h4>IUROADMAP Pro</h4>
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