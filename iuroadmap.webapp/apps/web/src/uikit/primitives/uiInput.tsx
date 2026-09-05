import React from 'react';
import { Input, InputProps } from 'antd';

export interface UiInputProps extends InputProps {}

export const UiInput: React.FC<UiInputProps> = (props) => {
  return <Input {...props} />;
};
