import { useSelector } from 'react-redux';
import { selectDisplayMode, type RootState } from '@iuroadmap/store';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { DesktopLayout } from './desktopLayout';
import { MobileLayout } from './mobileLayout';

/**
 * Selects DesktopLayout or MobileLayout based on the display mode setting
 * and the current viewport breakpoint.
 *
 * Single responsibility: layout selection only — no auth, no menu, no permissions.
 */
export const ResponsiveLayout = () => {
  const displayMode = useSelector((state: RootState) => selectDisplayMode(state));
  const { isMobile } = useBreakpoint();

  const isActuallyMobile =
    displayMode === 'mobile' ||
    (displayMode === 'auto' && isMobile);

  return isActuallyMobile ? <MobileLayout /> : <DesktopLayout />;
};
