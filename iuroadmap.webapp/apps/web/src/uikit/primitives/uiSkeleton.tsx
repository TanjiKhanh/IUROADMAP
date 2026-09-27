import React from 'react';
import { Skeleton, SkeletonProps } from 'antd';

export interface UiSkeletonProps extends SkeletonProps {}

export const UiSkeleton: React.FC<UiSkeletonProps> = (props) => {
  return <Skeleton {...props} />;
};
