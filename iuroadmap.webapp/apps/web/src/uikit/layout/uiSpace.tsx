import React from 'react';
import { Space, SpaceProps } from 'antd';

export interface UiSpaceProps extends SpaceProps {}

export const UiSpace: React.FC<UiSpaceProps> = (props) => {
  return <Space {...props} />;
};
