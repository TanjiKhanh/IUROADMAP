import { appMenuConfig, IURoadmapMenu, IURoadmapMenuItem } from './menu';

function filterItems(
  items: IURoadmapMenuItem[],
  userPermissions: string[],
  isSuperAdmin: boolean,
): IURoadmapMenuItem[] {
  return items.reduce<IURoadmapMenuItem[]>((acc, item) => {
    const hasAccess =
      isSuperAdmin ||
      item.ignorePms ||
      !item.roles ||
      item.roles.length === 0 ||
      item.roles.some((pms) => userPermissions.includes(pms));

    if (hasAccess) {
      if (item.children && item.children.length > 0) {
        const filteredChildren = filterItems(item.children, userPermissions, isSuperAdmin);
        // Only include parent if it has a valid path itself, OR it has accessible children
        if (filteredChildren.length > 0 || item.path) {
          acc.push({
            ...item,
            children: filteredChildren
          });
        }
      } else {
        acc.push(item);
      }
    }
    return acc;
  }, []);
}

export function getProfileMenu(
  userPermissions: string[],
  platform: 'web' | 'mobile' = 'web',
  isSuperAdmin = false,
): IURoadmapMenu[] {
  const filteredMenu: IURoadmapMenu[] = [];

  for (const group of appMenuConfig) {
    const accessibleItems = filterItems(group.items, userPermissions, isSuperAdmin);

    if (accessibleItems.length > 0) {
      filteredMenu.push({
        ...group,
        items: accessibleItems,
      });
    }
  }

  return filteredMenu;
}
