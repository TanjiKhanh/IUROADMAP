import React from 'react';
import { Popover } from 'antd';
import type { PopoverProps } from 'antd';

export interface UiPopoverProps extends PopoverProps {}

export const UiPopover: React.FC<UiPopoverProps> = (props) => {
  return <Popover {...props} />;
};
