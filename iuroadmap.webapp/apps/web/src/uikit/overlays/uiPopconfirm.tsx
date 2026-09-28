import React from 'react';
import { Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';

export interface UiPopconfirmProps extends PopconfirmProps {}

export const UiPopconfirm: React.FC<UiPopconfirmProps> = (props) => {
  return <Popconfirm {...props} />;
};
