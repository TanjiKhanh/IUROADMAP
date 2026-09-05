import React from 'react';
import { useSelector } from 'react-redux';
import { selectDisplayMode } from '@iuroadmap/store';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { DesktopLayout } from './desktopLayout';
import { MobileLayout } from './mobileLayout';

export const ResponsiveLayout = () => {
  const displayMode = useSelector(selectDisplayMode);
  const { isMobile } = useBreakpoint();

  const isActuallyMobile = 
    displayMode === 'mobile' || 
    (displayMode === 'auto' && isMobile);

  return isActuallyMobile ? <MobileLayout /> : <DesktopLayout />;
};
