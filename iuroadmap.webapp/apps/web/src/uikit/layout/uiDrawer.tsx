import type { ComponentProps } from 'react';
import { Drawer } from 'antd';

export type UiDrawerProps = ComponentProps<typeof Drawer>;

export function UiDrawer(props: UiDrawerProps) {
  return <Drawer {...props} />;
}
