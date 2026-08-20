import React, { useState, useEffect, ReactNode } from 'react';
import { setAccessToken, getAccessToken } from './tokenStore';
import { AuthContext, User } from './AuthContext';
import { useAuthMutations, useAuthQueries } from './hooks/useAuthMutations';
import { LearnerRegisterRequestDto, MentorRegisterRequestDto, LoginRequestDto } from '@iuroadmap/api-gen';
import { useDispatch } from 'react-redux';
import { setAccessToken as reduxSetAccessToken, clearAuth, setInitialized } from '@iuroadmap/store';
import { parseToken } from '@iuroadmap/core';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  const authMutations = useAuthMutations();
  const authQueries = useAuthQueries();
  const { data: userProfile, refetch: refetchProfile, isError } = authQueries.useGetMe({
    enabled: false, // Don't run automatically on mount
    retry: false
  });

  const mergeProfileWithToken = (token: string, profile?: Partial<User> | null): User | null => {
    const tokenProfile = parseToken(token);
    if (!tokenProfile && !profile) return null;

    return {
      ...(tokenProfile as any),
      ...(profile as any),
      permissions: profile?.permissions ?? tokenProfile?.permissions ?? [],
      role: profile?.role ?? tokenProfile?.role,
      userId: profile?.userId ?? tokenProfile?.userId,
      email: profile?.email ?? tokenProfile?.email ?? '',
    } as User;
  };

  // 1. Check session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          dispatch(setAccessToken(token));
          // Optionally fetch fresh profile data from /me
          const { data } = await refetchProfile();
          if (data && data.data) {
            setUser(mergeProfileWithToken(token, data.data as Partial<User>));
          } else {
            // fallback to parsed profile from token
            setUser(mergeProfileWithToken(token));
          }
        }
      } catch (err) {
        console.log("Session init failed", err);
        dispatch(clearAuth());
        setAccessToken(null);
        setUser(null);
      } finally {
        dispatch(setInitialized(true));
        setLoading(false);
      }
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // 2. Login Function
  const login = async (email: string, password: string) => {
    const payload: LoginRequestDto = { email, password };
    const res = await authMutations.login.mutateAsync({ data: payload });
    
    // Check both possible response formats, considering global ResponseInterceptor wrappers
    const responseBody = res.data as any;
    const token = responseBody?.data?.access_token || responseBody?.data?.accessToken || responseBody?.access_token || responseBody?.accessToken;
    
    if (!token) {
      console.error("Invalid login response format", responseBody);
      throw new Error('Login failed: Invalid response format');
    }
    
    setAccessToken(token);
    dispatch(reduxSetAccessToken(token));

    // Fetch user profile using the new JWT token
    const { data: profileRes } = await refetchProfile();
    const profile = profileRes?.data as any;
    
    // If backend doesn't return full profile on /me, fallback to token payload
    const finalProfile = mergeProfileWithToken(token, profile);
    setUser(finalProfile);
    
    return finalProfile;
  };

  // 3. Register Function (New)
  const register = async (data: LearnerRegisterRequestDto | MentorRegisterRequestDto) => {
    // Determine which registration endpoint to use based on role
    let result;
    if ((data as any).role === 'MENTOR') {
      result = await authMutations.registerMentor.mutateAsync({ data: data as MentorRegisterRequestDto });
    } else {
      result = await authMutations.registerLearner.mutateAsync({ data: data as LearnerRegisterRequestDto });
    }
    
    return result;
  };

  // 4. Logout Function
  const logout = async () => {
    try {
      if (getAccessToken()) {
         await authMutations.logout.mutateAsync();
      }
    } catch (err) {
      console.warn('Logout failed on server', err);
    } finally {
      setAccessToken(null);
      dispatch(clearAuth());
      setUser(null);
      window.location.href = '/login';
    }
  };

  const value: any = {
    user,
    login,
    register,
    logout,
    accessToken: getAccessToken(),
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div className="auth-loading">Loading session...</div>}
    </AuthContext.Provider>
  );
};

