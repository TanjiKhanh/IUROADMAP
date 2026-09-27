import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getProfileMenu, type IURoadmapMenu, type IURoadmapMenuItem } from '@iuroadmap/core';
import { selectTokenProfile, type RootState } from '@iuroadmap/store';

/**
 * Flat menu item used by sidebar and layout components.
 * Decouples layout rendering from the core IURoadmapMenu structure.
 */
export interface AppMenuItem {
  key: string;
  label: string;
  path?: string;
  icon?: string;
  iconUrl?: string;
  isPro?: boolean;
  children?: AppMenuItem[];
}

/**
 * Convert a core `IURoadmapMenuItem` to a layout-friendly `AppMenuItem`.
 */
function itemToAppMenu(item: IURoadmapMenuItem): AppMenuItem {
  return {
    key: item.path || item.title,
    label: item.title,
    path: item.path || undefined,
    icon: item.iconWeb || undefined,
    isPro: item.isPro,
    children: item.children?.map(itemToAppMenu),
  };
}

/**
 * Convert a core `IURoadmapMenu` group to a layout-friendly `AppMenuItem`.
 * Groups become top-level items whose children are the group's menu items.
 */
function groupToAppMenu(group: IURoadmapMenu): AppMenuItem {
  return {
    key: group.key,
    label: group.groupName,
    icon: group.iconWeb || undefined,
    children: group.items.map(itemToAppMenu),
  };
}

/**
 * Build the sidebar menu tree from the user's permissions.
 * Delegates to core `getProfileMenu` which filters `appMenuConfig`
 * against the user's PMS codes.
 */
export function buildSidebarMenu(
  permissions: string[],
  isSuperAdmin = false,
): AppMenuItem[] {
  const groups = getProfileMenu(permissions, 'web', isSuperAdmin);
  return groups.map(groupToAppMenu);
}

/**
 * React hook that returns the filtered sidebar menu for the current user.
 * Reads profile from Redux and rebuilds on profile changes.
 */
export function useSidebarMenu(): AppMenuItem[] {
  const profile = useSelector((state: RootState) => selectTokenProfile(state));

  return useMemo(
    () =>
      buildSidebarMenu(
        profile?.permissions ?? [],
        profile?.isSuperAdmin ?? false,
      ),
    [profile],
  );
}
