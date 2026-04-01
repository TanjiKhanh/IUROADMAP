import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar'; // 👈 Đường dẫn Sidebar của bạn
import '../../styles/dashboard.css'; // 👈 Giữ nguyên file CSS của bạn

// initial props type definition
interface MainLayoutProps {
  children?: ReactNode;  // Optional - for non-route usage
  title?: string;       // Optional title for the page
  subtitle?: string;    // Optional subtitle for the page
}

// MainLayout component
export default function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  return (
    <div className="dashboard-container">
      {/* 1. Sidebar is persistent */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <main className="dashboard-main">
        
        {/* Page Header */}
        {(title || subtitle) && (
          <div className="page-header" style={{ paddingBottom: '20px', borderBottom: '1px solid #eee', marginBottom: '20px' }}>
            {title && <h1 style={{ margin: 0, fontSize: '24px' }}>{title}</h1>}
            {subtitle && <p style={{ margin: '5px 0 0', color: '#666' }}>{subtitle}</p>}
          </div>
        )}

        {/* Page Content */}
        <div className="page-content">
          {children || <Outlet />}
        </div>
        
      </main>
    </div>
  );
}