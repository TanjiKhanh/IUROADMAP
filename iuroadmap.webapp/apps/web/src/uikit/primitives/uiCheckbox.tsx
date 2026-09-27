import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

export type UiCheckboxChangeEvent = CheckboxChangeEvent;

export interface UiCheckboxProps extends CheckboxProps {}

export const UiCheckbox: React.FC<UiCheckboxProps> = (props) => {
  return <Checkbox {...props} />;
};
