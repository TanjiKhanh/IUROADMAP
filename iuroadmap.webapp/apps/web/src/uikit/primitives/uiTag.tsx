import React from 'react';
import { Tag } from 'antd';
import type { TagProps } from 'antd';

export interface UiTagProps extends TagProps {}

export const UiTag: React.FC<UiTagProps> = (props) => {
  return <Tag {...props} />;
};
