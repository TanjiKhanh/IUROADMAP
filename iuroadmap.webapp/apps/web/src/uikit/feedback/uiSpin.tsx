import React from 'react';
import { Spin } from 'antd';
import type { SpinProps } from 'antd';

export interface UiSpinProps extends SpinProps {}

export const UiSpin: React.FC<UiSpinProps> = (props) => {
  return <Spin {...props} />;
};
