import React from 'react';
import { Switch } from 'antd';
import type { SwitchProps } from 'antd';

export interface UiSwitchProps extends SwitchProps {}

export const UiSwitch = React.forwardRef<any, UiSwitchProps>((props, ref) => {
  return <Switch ref={ref} {...props} />;
});

UiSwitch.displayName = 'UiSwitch';
