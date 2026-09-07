import { appMenuConfig, IURoadmapMenu, IURoadmapMenuItem } from './menu';
import { UserRole } from '../enums/roles';

function filterItems(
  items: IURoadmapMenuItem[],
  userRoles: UserRole[],
  userPermissions: string[],
  isSuperAdmin: boolean,
): IURoadmapMenuItem[] {
  return items.reduce<IURoadmapMenuItem[]>((acc, item) => {
    const hasRole = !item.roles || item.roles.length === 0 || item.roles.some((role) => userRoles.includes(role as UserRole));
    const hasPermission =
      isSuperAdmin ||
      item.ignorePms ||
      !item.permissions ||
      item.permissions.length === 0 ||
      item.permissions.some((permission) => userPermissions.includes(permission));

    if ((isSuperAdmin || hasRole) && hasPermission) {
      if (item.children && item.children.length > 0) {
        const filteredChildren = filterItems(item.children, userRoles, userPermissions, isSuperAdmin);
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
  userRoles: UserRole[],
  platform: 'web' | 'mobile' = 'web',
  userPermissions: string[] = [],
  isSuperAdmin = false,
): IURoadmapMenu[] {
  const filteredMenu: IURoadmapMenu[] = [];

  for (const group of appMenuConfig) {
    const accessibleItems = filterItems(group.items, userRoles, userPermissions, isSuperAdmin);

    if (accessibleItems.length > 0) {
      filteredMenu.push({
        ...group,
        items: accessibleItems,
      });
    }
  }

  return filteredMenu;
}
