import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import type { MenuProps } from 'antd';
import { UiMenu } from '../uikit';
import { useSidebarMenu, type AppMenuItem } from './menuConfig';

type AntdMenuItem = NonNullable<MenuProps['items']>[number];

export interface SidebarMenuProps {
  inlineCollapsed?: boolean;
  onNavigate?: () => void;
}

/**
 * Render a Lucide icon by name. Returns the icon component if found,
 * otherwise null.
 */
function renderItemIcon(item: AppMenuItem): ReactNode {
  if (!item.icon) return undefined;
  const IconComponent = LucideIcons[item.icon as keyof typeof LucideIcons] as React.ElementType;
  return IconComponent ? <IconComponent size={16} /> : undefined;
}

/**
 * Convert `AppMenuItem` tree → `<UiMenu>` items. Recursion handles arbitrary
 * nesting from the `appMenuConfig` (sidebar groups → items → children).
 */
function toUiMenuItems(items: AppMenuItem[]): AntdMenuItem[] {
  return items.map((item) => {
    // Groups without a path act as group headers
    if (!item.path && item.children) {
      return {
        key: item.key,
        type: 'group' as const,
        label: item.label,
        children: toUiMenuItems(item.children),
      };
    }

    return {
      key: item.path ?? item.key,
      label: item.label,
      icon: renderItemIcon(item),
      children: item.children ? toUiMenuItems(item.children) : undefined,
    };
  });
}

/**
 * Find the menu item whose `path` best matches the current pathname. Prefers
 * the longest matching prefix so `/dashboard/admin/roadmaps` still highlights
 * correctly.
 */
function findSelectedKey(items: AppMenuItem[], pathname: string): string | undefined {
  let bestPath: string | undefined;
  const visit = (list: AppMenuItem[]) => {
    for (const item of list) {
      if (item.path && (item.path === pathname || pathname.startsWith(`${item.path}/`))) {
        if (!bestPath || item.path.length > bestPath.length) bestPath = item.path;
      }
      if (item.children) visit(item.children);
    }
  };
  visit(items);
  return bestPath;
}

/**
 * Permission-filtered sidebar menu. Reads the current user's permissions from
 * Redux via `useSidebarMenu()` and renders the allowed navigation items.
 *
 * Single responsibility: menu rendering only — no auth, no layout, no user card.
 */
export function SidebarMenu({ inlineCollapsed, onNavigate }: SidebarMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const tree = useSidebarMenu();
  const items = toUiMenuItems(tree);
  const selectedKey = findSelectedKey(tree, location.pathname);

  // Find open sub-menu keys based on current path
  const openKeys = tree
    .flatMap((g) => g.children ?? [])
    .filter((i) => i.children?.some((c) => c.path && location.pathname.startsWith(c.path)))
    .map((i) => i.path ?? i.key);

  return (
    <UiMenu
      className='app-sidebar-menu'
      mode='inline'
      items={items}
      inlineCollapsed={inlineCollapsed}
      selectedKeys={selectedKey ? [selectedKey] : []}
      defaultOpenKeys={openKeys}
      onClick={({ key }) => {
        if (key.startsWith('/')) {
          navigate(key);
          onNavigate?.();
        }
      }}
      style={{ borderRight: 0, backgroundColor: 'transparent' }}
    />
  );
}
