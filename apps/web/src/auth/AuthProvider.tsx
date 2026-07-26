import React, { useState, useEffect, ReactNode } from 'react';
import { authService, LearnerRegisterPayload, MentorRegisterPayload } from '../services/auth.service'; // Import service
import { setAccessToken, getAccessToken } from './tokenStore';
import { AuthContext, User } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Check session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          const userProfile = await authService.me() as any;
          if (userProfile) {
            setUser(userProfile);
          } else {
            setAccessToken(null);
            setUser(null);
          }
        }
      } catch (err) {
        console.log("Session init failed", err);
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Login Function
  const login = async (email: string, password: string) => {
    const payload = await authService.login({ email, password }) as any;
    
    // Check both possible response formats
    const token = payload?.access_token || payload?.accessToken;
    
    if (!token) {
      throw new Error('Login failed: Invalid response format');
    }
    
    setAccessToken(token);

    // Fetch user profile using the new JWT token
    const userProfile = await authService.me() as any;
    setUser(userProfile);
    
    return userProfile;
  };

  // 3. Register Function (New)
  const register = async (data: LearnerRegisterPayload | MentorRegisterPayload) => {
    // Registration endpoint returns user data only (no token)
    // User must login separately to get access token
    const result = await authService.register(data);
    
    // Just validate the registration succeeded
    // Don't set tokens - registration doesn't return them
    if (!result || !result.id) {
      throw new Error('Registration failed: Invalid response');
    }
    
    // Registration successful, user will be redirected to login page
    return result;
  };

  // 4. Logout Function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('Logout failed on server', err);
    } finally {
      setAccessToken(null);
      setUser(null);
      window.location.href = '/login';
    }
  };

  const value: any = {
    user,
    login,
    register, // Expose register
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