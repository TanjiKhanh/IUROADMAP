import React from 'react';
import { Menu, MenuProps } from 'antd';

export interface UiMenuProps extends MenuProps {}

export const UiMenu: React.FC<UiMenuProps> = (props) => {
  return <Menu {...props} />;
};
