import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoutePaths } from '@iuroadmap/core';
import { selectIsAuthenticated } from '@iuroadmap/store';
import type { RootState } from '@iuroadmap/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to={RoutePaths.web.public.login} state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}