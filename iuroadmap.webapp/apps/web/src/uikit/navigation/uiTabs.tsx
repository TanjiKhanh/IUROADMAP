import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

export interface UiTabsProps extends TabsProps {}

export const UiTabs: React.FC<UiTabsProps> = (props) => {
  return <Tabs {...props} />;
};
