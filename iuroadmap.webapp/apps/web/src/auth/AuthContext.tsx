import { createContext, useContext } from 'react';
import { LearnerRegisterRequestDto, MentorRegisterRequestDto } from '@iuroadmap/api-gen';
import { UserRole } from '@iuroadmap/core';

// 1. Define the User Shape
// Ensure this matches the payload your backend returns (in the JWT or /me endpoint)
export interface User {
  userId?: string;
  id?: number | string; // Keep for backward compatibility if used elsewhere
  email: string;
  name?: string;
  role: UserRole; 
  permissions?: string[];
  status?: 'PENDING_APPROVAL' | 'ACTIVE' | 'APPROVED' | 'REJECTED' | 'BANNED';
}

// 2. Define the Context Shape
interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (data: LearnerRegisterRequestDto | MentorRegisterRequestDto) => Promise<any>;
  logout: () => Promise<void>;
}

// 3. Create the Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Export the Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};