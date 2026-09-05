import React from 'react';
import { Input } from 'antd';
import type { PasswordProps } from 'antd/es/input';

export interface UiPasswordInputProps extends PasswordProps {}

export const UiPasswordInput: React.FC<UiPasswordInputProps> = (props) => {
  return <Input.Password {...props} />;
};
