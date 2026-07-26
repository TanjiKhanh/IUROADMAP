import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // redirect to login and keep the return url
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}