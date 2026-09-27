import React from 'react';
import { Progress } from 'antd';
import type { ProgressProps } from 'antd';

export interface UiProgressProps extends ProgressProps {}

export const UiProgress: React.FC<UiProgressProps> = (props) => {
  return <Progress {...props} />;
};
