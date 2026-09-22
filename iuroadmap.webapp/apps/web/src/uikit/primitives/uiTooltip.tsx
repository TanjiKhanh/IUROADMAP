import React from 'react';
import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';

export interface UiTooltipProps extends TooltipProps {}

export const UiTooltip: React.FC<UiTooltipProps> = (props) => {
  return <Tooltip {...props} />;
};
