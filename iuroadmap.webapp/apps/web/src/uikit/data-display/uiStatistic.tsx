import React from 'react';
import { Statistic } from 'antd';
import type { StatisticProps } from 'antd';

export interface UiStatisticProps extends StatisticProps {}

export const UiStatistic: React.FC<UiStatisticProps> = (props) => {
  return <Statistic {...props} />;
};
