// MainLayout.tsx
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';
import '../../styles/dashboard.css';

interface MainLayoutProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollIdleTimerRef = useRef<number | undefined>(undefined);

  const handleContentScroll = useCallback(() => {
    setIsScrolling(true);

    if (scrollIdleTimerRef.current) {
      window.clearTimeout(scrollIdleTimerRef.current);
    }

    scrollIdleTimerRef.current = window.setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollIdleTimerRef.current) {
        window.clearTimeout(scrollIdleTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        {(title || subtitle) && (
          <div
            className="page-header"
            style={{
              paddingBottom: '20px',
              borderBottom: '1px solid #eee',
              marginBottom: '20px',
            }}
          >
            {title && <h1 style={{ margin: 0, fontSize: '24px' }}>{title}</h1>}
            {subtitle && (
              <p style={{ margin: '5px 0 0', color: '#666' }}>{subtitle}</p>
            )}
          </div>
        )}

        <div className={`page-content ${isScrolling ? 'is-scrolling' : ''}`} onScroll={handleContentScroll}>
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}