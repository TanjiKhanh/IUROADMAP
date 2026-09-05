import React from 'react';
import { Card, CardProps } from 'antd';

export interface UiCardProps extends CardProps {}

export const UiCard: React.FC<UiCardProps> = (props) => {
  return <Card {...props} />;
};
