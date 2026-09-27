import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { appColors } from '../providers/theme';
import { UiAppLayout, UiButton, UiContent, UiDrawer, UiHeader, UiIcon } from '../uikit';
import { SidebarMenu } from './sidebarMenu';
import { HeaderUserChip, LanguageSwitcher, NotificationPopover } from '../components/layout/layoutSlots';

/**
 * Mobile layout: sticky header with hamburger menu + drawer sidebar + scrollable content.
 *
 * Single responsibility: structural layout only.
 * - Menu filtering is handled by `SidebarMenu` → `useSidebarMenu` → core `getProfileMenu`.
 * - User actions are handled by `HeaderUserChip`.
 */
export function MobileLayout() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <UiAppLayout style={{ minHeight: '100vh' }}>
      <UiHeader
        style={{
          padding: '0 16px',
          background: appColors.primary,
          color: appColors.onPrimary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <UiButton
          variant='text'
          icon={<UiIcon name='Menu' />}
          onClick={() => setDrawerVisible(true)}
          aria-label='Open navigation'
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: appColors.onPrimary }}>
          <LanguageSwitcher />
          <NotificationPopover />
          <HeaderUserChip />
        </div>
      </UiHeader>
      <UiDrawer
        title='IUROADMAP'
        placement='left'
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={260}
        styles={{ body: { padding: 0 } }}>
        <SidebarMenu onNavigate={() => setDrawerVisible(false)} />
      </UiDrawer>
      <UiContent style={{ padding: 16, background: appColors.surface, minHeight: 'calc(100vh - 64px)' }}>
        <Outlet />
      </UiContent>
    </UiAppLayout>
  );
}
