import React from 'react';
import { useMenu } from '../hooks/useMenu';
import { UiMenu } from '../uikit';
import { useLocation, useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

export const SidebarMenu = ({ mode = 'inline' }: { mode?: 'inline' | 'vertical' | 'horizontal' }) => {
  const menuConfig = useMenu();
  const location = useLocation();
  const navigate = useNavigate();

  const getLucideIcon = (iconName: string) => {
    if (!iconName) return null;
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ElementType;
    return IconComponent ? <IconComponent size={16} /> : null;
  };

  // Convert custom config to Antd Menu items
  const antdMenuItems = menuConfig.map(group => ({
    key: group.key,
    type: 'group' as const,
    label: group.groupName,
    children: group.items.map(item => ({
      key: item.path,
      label: item.title,
      icon: getLucideIcon(item.iconWeb),
      children: item.children?.map(child => ({
        key: child.path,
        label: child.title,
        icon: getLucideIcon(child.iconWeb),
      })),
    })),
  }));

  // Simple logic to find active key
  const selectedKeys = [location.pathname];
  // Simple logic to find expanded menu item
  const openKeys = menuConfig
    .flatMap(g => g.items)
    .filter(i => i.children?.some(c => location.pathname.startsWith(c.path)))
    .map(i => i.path);

  return (
    <UiMenu
      mode={mode}
      selectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      items={antdMenuItems}
      onClick={({ key }) => navigate(key)}
      style={{ borderRight: 0, backgroundColor: 'transparent' }}
    />
  );
};
