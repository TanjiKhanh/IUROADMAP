import React from 'react';
import { Input } from 'antd';
import type { PasswordProps } from 'antd/es/input';

export interface UiPasswordInputProps extends PasswordProps {}

export const UiPasswordInput = React.forwardRef<any, UiPasswordInputProps>((props, ref) => {
  return <Input.Password ref={ref} {...props} />;
});

UiPasswordInput.displayName = 'UiPasswordInput';
