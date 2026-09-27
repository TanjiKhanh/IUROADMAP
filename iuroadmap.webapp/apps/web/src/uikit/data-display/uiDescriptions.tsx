import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

export interface UiDescriptionsProps extends DescriptionsProps {}

export const UiDescriptions: React.FC<UiDescriptionsProps> = (props) => {
  return <Descriptions {...props} />;
};
