import type { CSSProperties, PropsWithChildren, ComponentProps } from 'react';
import { Layout } from 'antd';

interface UiLayoutPartProps extends PropsWithChildren {
  style?: CSSProperties;
}

type UiSiderProps = ComponentProps<typeof Layout.Sider>;

export function UiHeader({ children, style }: UiLayoutPartProps) {
  return <Layout.Header style={style}>{children}</Layout.Header>;
}

export function UiSider({ children, style, ...props }: UiSiderProps) {
  return <Layout.Sider style={style} {...props}>{children}</Layout.Sider>;
}

export function UiContent({ children, style }: UiLayoutPartProps) {
  return <Layout.Content style={style}>{children}</Layout.Content>;
}
