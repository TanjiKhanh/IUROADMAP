import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dropdown, Breadcrumb, type MenuProps } from 'antd';
import { LogOut, User, Globe, Bell } from 'lucide-react';
import { selectTokenProfile, clearAuth, type RootState } from '@iuroadmap/store';
import { RoutePaths } from '@iuroadmap/core';
import logo from '../../assets/images/logo-gupjob-primary.png';
import { appColors } from '../../providers/theme';
import { removeAccessToken } from '../../auth/tokenStore';
import { useTranslation } from '../../hooks/useTranslation';

export function SidebarBrand({ collapsed }: { collapsed?: boolean }) {
  return (
    <div
      style={{
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        padding: collapsed ? '0 12px' : '0 20px',
        gap: 12,
        borderBottom: `1px solid ${appColors.sidebarBorder}`,
        flexShrink: 0,
      }}
    >
      <img src={logo} alt="IUROADMAP" style={{ height: 28, width: 28, objectFit: 'contain' }} />
      {!collapsed && (
        <span
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: appColors.primary,
            letterSpacing: 0.5,
            whiteSpace: 'nowrap',
          }}
        >
          IUROADMAP
        </span>
      )}
    </div>
  );
}

export function SidebarUserCard({ collapsed }: { collapsed?: boolean }) {
  const user = useSelector((state: RootState) => selectTokenProfile(state));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessToken();
    dispatch(clearAuth());
    navigate(RoutePaths.web.public.login);
  };

  if (collapsed) {
    return (
      <div
        style={{
          padding: '12px 0',
          display: 'flex',
          justifyContent: 'center',
          borderTop: `1px solid ${appColors.sidebarBorder}`,
        }}
      >
        <button
          onClick={handleLogout}
          title="Logout"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666',
            padding: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '12px 16px',
        borderTop: `1px solid ${appColors.sidebarBorder}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: appColors.primary,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {user?.fullName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: '#1f2937',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user?.fullName || user?.email || 'User'}
          </div>
          <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'capitalize' }}>
            {user?.role?.toLowerCase() || 'Student'}
          </div>
        </div>
      </div>
      <button
        onClick={handleLogout}
        title="Logout"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#9ca3af',
          padding: 6,
          display: 'flex',
          alignItems: 'center',
          borderRadius: 4,
          transition: 'color 0.2s',
        }}
      >
        <LogOut size={16} />
      </button>
    </div>
  );
}

export function HeaderUserChip() {
  const user = useSelector((state: RootState) => selectTokenProfile(state));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessToken();
    dispatch(clearAuth());
    navigate(RoutePaths.web.public.login);
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'user-info',
      disabled: true,
      label: (
        <div style={{ padding: '4px 0' }}>
          <div style={{ fontWeight: 600, color: '#111' }}>{user?.fullName || user?.email}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{user?.role}</div>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogOut size={14} />,
      label: 'Logout',
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: 20,
          padding: '4px 12px',
          color: 'inherit',
          cursor: 'pointer',
          fontSize: 13,
        }}
      >
        <User size={15} />
        <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user?.fullName || user?.email || 'Account'}
        </span>
      </button>
    </Dropdown>
  );
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      style={{
        background: 'transparent',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: 13,
        padding: '4px 8px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
      }}
      title={`Switch to ${language === 'en' ? 'Vietnamese' : 'English'}`}
    >
      <Globe size={14} />
      <span>{language.toUpperCase()}</span>
    </button>
  );
}

export function LayoutBreadcrumb() {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(Boolean);

  const breadcrumbItems = [
    { title: 'Home' },
    ...pathSnippets.map((snippet) => ({
      title: snippet.charAt(0).toUpperCase() + snippet.slice(1).replace(/-/g, ' '),
    })),
  ];

  return (
    <Breadcrumb
      items={breadcrumbItems}
      style={{ color: 'inherit' }}
    />
  );
}

export function NotificationPopover() {
  return (
    <button
      style={{
        background: 'transparent',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        padding: 6,
        display: 'inline-flex',
        alignItems: 'center',
      }}
      title="Notifications"
    >
      <Bell size={16} />
    </button>
  );
}

export function TenantSwitcher() {
  return null;
}
