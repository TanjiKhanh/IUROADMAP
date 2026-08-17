import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { JSX } from 'react';

type Props = {
  allowedRoles: string[];
  children: JSX.Element;
};

export default function RequireRole({ allowedRoles, children }: Props) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
    