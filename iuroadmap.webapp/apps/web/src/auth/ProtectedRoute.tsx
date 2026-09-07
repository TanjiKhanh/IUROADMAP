import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoutePaths } from '@iuroadmap/core';
import {
  selectAccessToken,
  selectIsAuthenticated,
  selectTokenProfile,
  type RootState,
} from '@iuroadmap/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const accessToken = useSelector((state: RootState) => selectAccessToken(state));
  const authenticated = useSelector((state: RootState) => selectIsAuthenticated(state));
  const profile = useSelector((state: RootState) => selectTokenProfile(state));

  if (!accessToken || !authenticated || !profile) {
    return (
      <Navigate
        to={RoutePaths.web.public.login}
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
        replace
      />
    );
  }

  if (profile.status === 'BANNED' || profile.status === 'REJECTED') {
    return <Navigate to={RoutePaths.web.public.login} replace />;
  }

  return <>{children}</>;
}
