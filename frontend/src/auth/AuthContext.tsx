import { createContext, useContext } from 'react';
import { LearnerRegisterPayload,MentorRegisterPayload } from '../services/auth.service';

// 1. Define the User Shape
// Ensure this matches the payload your backend returns (in the JWT or /me endpoint)
export interface User {
  id: number;
  email: string;
  name?: string;
  role: 'ADMIN' | 'MENTOR' | 'USER' | 'STUDENT'; // Add all roles used in your system
  status?: 'PENDING_APPROVAL' | 'ACTIVE' | 'APPROVED' | 'REJECTED';
}

// 2. Define the Context Shape
interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data:  LearnerRegisterPayload | MentorRegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
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