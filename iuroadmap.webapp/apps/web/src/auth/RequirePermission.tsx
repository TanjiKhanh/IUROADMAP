import React, { ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface RequirePermissionProps {
  permissions: string[];
  children: ReactNode;
}

export default function RequirePermission({ permissions, children }: RequirePermissionProps) {
  const { user } = useAuth();
  const hasPermission = permissions.some((permission) => user?.permissions?.includes(permission));

  if (!hasPermission) {
    return <div className="permission-denied">You do not have permission to access this page.</div>;
  }

  return <>{children}</>;
}
