import React from 'react';
import { Alert } from 'antd';
import type { AlertProps } from 'antd';

export interface UiAlertProps extends AlertProps {}

export const UiAlert: React.FC<UiAlertProps> = (props) => {
  return <Alert {...props} />;
};
