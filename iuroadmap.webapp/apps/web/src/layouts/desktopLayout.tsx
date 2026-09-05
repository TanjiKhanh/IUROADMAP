import React, { useState } from 'react';
import { Layout, Button, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { SidebarMenu } from './sidebarMenu';
import { DisplayModeToggle } from './displayModeToggle';
import { useAuth } from '../auth/AuthContext';
import { RoutePaths } from '@iuroadmap/core';
import { useNavigate, Outlet } from 'react-router-dom';
import logo from '../assets/images/logo-gupjob-primary.png';

const { Header, Sider, Content } = Layout;

export const DesktopLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(RoutePaths.web.public.login);
  };

  const userMenu = {
    items: [
      { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
      { key: 'logout', label: 'Logout', icon: <LogoutOutlined />, onClick: handleLogout },
    ],
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <img src={logo} alt="Logo" style={{ height: 32 }} />
          {!collapsed && <span style={{ marginLeft: 8, fontWeight: 'bold' }}>IUROADMAP</span>}
        </div>
        <div style={{ padding: '8px 0', overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
          <SidebarMenu />
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <DisplayModeToggle />
            <Dropdown menu={userMenu} placement="bottomRight">
              <Button type="text" icon={<UserOutlined />}>
                {user?.email}
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 8, minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
