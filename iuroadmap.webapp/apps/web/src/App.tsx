import React from 'react';
import { RouterProvider } from 'react-router-dom';

// The new unified router configuration
import { router } from './router';

export default function App() {
  return <RouterProvider router={router} />;
}