import React, { useState } from 'react';
import { Layout, Button, Drawer, Dropdown } from 'antd';
import { MenuOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { SidebarMenu } from './sidebarMenu';
import { DisplayModeToggle } from './displayModeToggle';
import { useAuth } from '../auth/AuthContext';
import { RoutePaths } from '@iuroadmap/core';
import { useNavigate, Outlet } from 'react-router-dom';
import logo from '../assets/images/logo-gupjob-primary.png';

const { Header, Content } = Layout;

export const MobileLayout = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
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
      <Header style={{ padding: '0 16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{ fontSize: '18px', marginRight: 16 }}
          />
          <img src={logo} alt="Logo" style={{ height: 28 }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <DisplayModeToggle />
          <Dropdown menu={userMenu} placement="bottomRight" trigger={['click']}>
            <Button type="text" icon={<UserOutlined />} shape="circle" />
          </Dropdown>
        </div>
      </Header>
      
      <Drawer
        title={<img src={logo} alt="Logo" style={{ height: 24 }} />}
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={260}
        styles={{ body: { padding: 0 } }}
      >
        <div onClick={() => setDrawerVisible(false)}>
          <SidebarMenu />
        </div>
      </Drawer>

      <Content style={{ padding: '16px', background: '#f5f5f5' }}>
        <div style={{ background: '#fff', padding: 16, borderRadius: 8, minHeight: 'calc(100vh - 100px)' }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};
