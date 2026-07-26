import React, { JSX } from 'react';
import { useAuth } from './AuthContext';

export default function PublicOnly({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  // Allow users to see login/register pages even if logged in
  // They can explicitly log out if needed
  // If they want to redirect after login, do it in the Login/Register component logic
  
  return children;
}