import React from 'react';
import { Divider } from 'antd';
import type { DividerProps } from 'antd';

export interface UiDividerProps extends DividerProps {}

export const UiDivider: React.FC<UiDividerProps> = (props) => {
  return <Divider {...props} />;
};
