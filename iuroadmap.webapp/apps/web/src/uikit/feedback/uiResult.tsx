import React from 'react';
import { Result } from 'antd';
import type { ResultProps } from 'antd';

export interface UiResultProps extends ResultProps {}

export const UiResult: React.FC<UiResultProps> = (props) => {
  return <Result {...props} />;
};
