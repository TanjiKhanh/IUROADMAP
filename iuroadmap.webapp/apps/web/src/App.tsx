import React from 'react';
import { RouterProvider } from 'react-router-dom';

// Auth Components
import { AuthProvider } from './auth/AuthProvider';

// The new unified router configuration
import { router } from './router';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}