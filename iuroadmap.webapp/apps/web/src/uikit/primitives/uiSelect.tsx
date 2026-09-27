import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

export interface UiSelectProps extends SelectProps {}

export const UiSelect = React.forwardRef<any, UiSelectProps>((props, ref) => {
  return <Select ref={ref} {...props} />;
});

UiSelect.displayName = 'UiSelect';

// Re-export Option for backward compat
export const UiSelectOption = Select.Option;
