import React from 'react';
import { Col, ColProps } from 'antd';

export interface UiColProps extends ColProps {}

export const UiCol: React.FC<UiColProps> = (props) => {
  return <Col {...props} />;
};
