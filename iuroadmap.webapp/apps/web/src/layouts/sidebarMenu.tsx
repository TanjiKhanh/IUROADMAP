import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import type { MenuProps } from 'antd';
import { UiMenu } from '../uikit';
import { useSidebarMenu, type AppMenuItem } from './menuConfig';
import { useTranslation } from '../hooks/useTranslation';

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
  
  // Convert 'lucide-layout-dashboard' to 'LayoutDashboard'
  const componentName = item.icon
    .replace(/^lucide-/, '')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
    
  const IconComponent = LucideIcons[componentName as keyof typeof LucideIcons] as React.ElementType;
  return IconComponent ? <IconComponent size={16} /> : undefined;
}

/**
 * Convert `AppMenuItem` tree → `<UiMenu>` items. Recursion handles arbitrary
 * nesting from the `appMenuConfig` (sidebar groups → items → children).
 */
function toUiMenuItems(items: AppMenuItem[], t: (key: string) => string): AntdMenuItem[] {
  return items.map((item) => {
    const translatedLabel = t(item.label);
    
    // Groups without a path act as group headers (or expandable submenus)
    if (!item.path && item.children) {
      // If exactly 1 child, render as a direct link (HSEVN style for single items)
      if (item.children.length === 1 && (!item.children[0].children || item.children[0].children.length === 0)) {
        const singleChild = item.children[0];
        return {
          key: singleChild.path ?? singleChild.key,
          label: t(singleChild.label),
          icon: renderItemIcon(singleChild) || renderItemIcon(item),
        };
      }

      // If multiple children, render as a SubMenu (HSEVN style expandable parent)
      // Omitting `type: 'group'` makes Ant Design render it as an expandable SubMenu
      return {
        key: item.key,
        label: translatedLabel,
        icon: renderItemIcon(item),
        children: toUiMenuItems(item.children, t),
      };
    }

    return {
      key: item.path ?? item.key,
      label: translatedLabel,
      icon: renderItemIcon(item),
      children: item.children ? toUiMenuItems(item.children, t) : undefined,
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
  const { t } = useTranslation();

  const tree = useSidebarMenu();
  const items = toUiMenuItems(tree, t);
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
