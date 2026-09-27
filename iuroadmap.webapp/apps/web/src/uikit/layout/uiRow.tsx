import React from 'react';
import { Row, RowProps } from 'antd';

export interface UiRowProps extends RowProps {}

export const UiRow: React.FC<UiRowProps> = (props) => {
  return <Row {...props} />;
};
