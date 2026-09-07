import { useMemo } from 'react';
import { getProfileMenu, UserRole } from '@iuroadmap/core';
import { useSelector } from 'react-redux';
import { selectTokenProfile } from '@iuroadmap/store';
import type { RootState } from '@iuroadmap/store';

export function useMenu() {
  const profile = useSelector((state: RootState) => selectTokenProfile(state));

  return useMemo(() => {
    const role = profile?.role as UserRole | undefined;
    const roles = role ? [role] : [UserRole.STUDENT];

    if (role === UserRole.USER) roles.push(UserRole.STUDENT);
    if (role === UserRole.STUDENT) roles.push(UserRole.USER);

    return getProfileMenu(roles, 'web', profile?.permissions ?? [], profile?.isSuperAdmin ?? false);
  }, [profile]);
}
