import React from 'react';
import { Badge } from 'antd';
import type { BadgeProps } from 'antd';

export interface UiBadgeProps extends BadgeProps {}

export const UiBadge: React.FC<UiBadgeProps> = (props) => {
  return <Badge {...props} />;
};
