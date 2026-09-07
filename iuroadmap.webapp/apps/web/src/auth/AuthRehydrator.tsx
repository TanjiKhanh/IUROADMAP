import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, clearAuth, setInitialized } from '@iuroadmap/store';
import { parseToken } from '@iuroadmap/core';
import type { RootState } from '@iuroadmap/store';

export function AuthRehydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

  useEffect(() => {
    const token = localStorage.getItem('iuroadmap.web.token');
    
    if (token) {
      const profile = parseToken(token);
      if (profile) {
        dispatch(setAccessToken(token));
      } else {
        localStorage.removeItem('iuroadmap.web.token');
        dispatch(clearAuth());
      }
    } else {
      dispatch(clearAuth());
    }
    
    dispatch(setInitialized(true));
  }, [dispatch]);

  // Don't render children until we've checked authentication state
  // to prevent flashing protected content or unauthenticated redirects.
  if (!isInitialized) return null;

  return <>{children}</>;
}
