import React from 'react';
import { InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';

export interface UiInputNumberProps extends InputNumberProps {}

export const UiInputNumber = React.forwardRef<any, UiInputNumberProps>((props, ref) => {
  return <InputNumber ref={ref} {...props} />;
});

UiInputNumber.displayName = 'UiInputNumber';
