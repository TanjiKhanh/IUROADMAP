import React from 'react';
import { Input, InputProps } from 'antd';

export interface UiInputProps extends InputProps {}

export const UiInput = React.forwardRef<any, UiInputProps>((props, ref) => {
  return <Input ref={ref} {...props} />;
});

UiInput.displayName = 'UiInput';
