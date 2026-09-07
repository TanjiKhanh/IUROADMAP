import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

export const appColors = {
  primary: '#4f46e5',
  onPrimary: '#ffffff',
  surface: '#f8fafc',
  sidebarBg: '#ffffff',
  sidebarBorder: '#e5e7eb',
  borderOnPrimary: 'rgba(255, 255, 255, 0.2)',
  border: '#e5e7eb',
} as const;

export const themeTokens: ThemeConfig['token'] = {
  colorPrimary: '#4f46e5',
  colorSuccess: '#10b981',
  colorWarning: '#f59e0b',
  colorError: '#ef4444',
  colorInfo: '#3b82f6',
  borderRadius: 8,
  fontFamily: "'Inter', sans-serif",
};

export const themeComponents: ThemeConfig['components'] = {
  Button: {
    controlHeight: 40,
    borderRadius: 8,
    fontWeight: 500,
  },
  Input: {
    controlHeight: 40,
    borderRadius: 8,
  },
  Select: {
    controlHeight: 40,
    borderRadius: 8,
  },
  Card: {
    borderRadius: 12,
  },
};

export const defaultTheme: ThemeConfig = {
  token: themeTokens,
  components: themeComponents,
  algorithm: theme.defaultAlgorithm,
};
