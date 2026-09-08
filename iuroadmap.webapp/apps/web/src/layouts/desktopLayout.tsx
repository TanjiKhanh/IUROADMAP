import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { appColors } from '../providers/theme';
import { UiAppLayout, UiButton, UiContent, UiHeader, UiIcon, UiSider } from '../uikit';
import { SidebarMenu } from './sidebarMenu';
import {
  LanguageSwitcher,
  LayoutBreadcrumb,
  SidebarBrand,
  SidebarUserCard,
} from '../components/layout/layoutSlots';

/**
 * Desktop layout: fixed sidebar (collapsible) + header + scrollable content.
 *
 * Single responsibility: structural layout only.
 * - Menu filtering is handled by `SidebarMenu` → `useSidebarMenu` → core `getProfileMenu`.
 * - User card is handled by `SidebarUserCard`.
 * - Breadcrumb is handled by `LayoutBreadcrumb`.
 */
export function DesktopLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <UiAppLayout hasSider style={{ height: '100vh', overflow: 'hidden' }}>
      <UiSider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        width={300}
        collapsedWidth={68}
        theme='light'
        style={{
          background: appColors.sidebarBg,
          borderRight: `1px solid ${appColors.sidebarBorder}`,
          height: '100vh',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            background: appColors.sidebarBg,
          }}>
          <SidebarBrand collapsed={collapsed} />
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            <SidebarMenu inlineCollapsed={collapsed} />
          </div>
          <SidebarUserCard collapsed={collapsed} />
          <div
            style={{
              padding: '8px 12px',
              borderTop: `1px solid ${appColors.sidebarBorder}`,
              background: appColors.sidebarBg,
              display: 'flex',
              justifyContent: collapsed ? 'center' : 'flex-end',
              flexShrink: 0,
            }}>
            <UiButton
              variant='text'
              size='small'
              icon={<UiIcon name={collapsed ? 'PanelLeftOpen' : 'PanelLeftClose'} />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        </div>
      </UiSider>
      <UiAppLayout style={{ background: appColors.surface, height: '100vh', overflow: 'hidden' }}>
        <UiHeader
          style={{
            background: appColors.primary,
            color: appColors.onPrimary,
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            borderBottom: `1px solid ${appColors.borderOnPrimary}`,
            height: 52,
            lineHeight: '52px',
            flexShrink: 0,
            borderRadius: '4px 0 0 4px',
          }}>
          <div style={{ minWidth: 0, flex: 1, overflow: 'hidden', color: appColors.onPrimary }}>
            <LayoutBreadcrumb />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flexShrink: 0,
              color: appColors.onPrimary,
            }}>
            <LanguageSwitcher />
          </div>
        </UiHeader>
        <UiContent style={{ padding: 20, background: appColors.surface, overflow: 'auto', flex: 1 }}>
          <Outlet />
        </UiContent>
      </UiAppLayout>
    </UiAppLayout>
  );
}
