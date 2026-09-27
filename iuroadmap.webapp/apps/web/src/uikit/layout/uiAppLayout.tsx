import type { CSSProperties, PropsWithChildren } from 'react';
import { Layout } from 'antd';

export interface UiAppLayoutProps extends PropsWithChildren {
  hasSider?: boolean;
  style?: CSSProperties;
}

export function UiAppLayout({ children, hasSider, style }: UiAppLayoutProps) {
  return <Layout hasSider={hasSider} style={style}>{children}</Layout>;
}
