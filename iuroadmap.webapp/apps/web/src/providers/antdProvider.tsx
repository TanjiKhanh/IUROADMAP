import React from 'react';
import { ConfigProvider } from 'antd';
import { useTranslation } from '../hooks/useTranslation';
import enUS from 'antd/locale/en_US';
import viVN from 'antd/locale/vi_VN';
import { defaultTheme } from './theme';

export function AntdProvider({ children }: { children: React.ReactNode }) {
  const { language } = useTranslation();

  return (
    <ConfigProvider
      theme={defaultTheme}
      locale={language === 'vi' ? viVN : enUS}
    >
      {children}
    </ConfigProvider>
  );
}
