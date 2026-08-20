import { useMemo } from 'react';
import { getProfileMenu, UserRole } from '@iuroadmap/core';
import { useAuth } from '../auth/AuthContext';

export function useMenu() {
  const { user } = useAuth();

  return useMemo(() => {
    const role = user?.role as UserRole | undefined;
    const roles = role ? [role] : [UserRole.STUDENT];

    if (role === UserRole.USER) roles.push(UserRole.STUDENT);
    if (role === UserRole.STUDENT) roles.push(UserRole.USER);

    return getProfileMenu(roles, 'web', user?.permissions ?? []);
  }, [user?.permissions, user?.role]);
}
