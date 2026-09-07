import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import { ResponsiveLayout } from '../layouts/responsiveLayout';
import ProtectedRoute from '../auth/ProtectedRoute';

import authRoutes from './auth.routes';
import publicRoutes from './public.routes';
import dashboardRoutes from './dashboard.routes';

const protectedRouters: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <ResponsiveLayout />
      </ProtectedRoute>
    ),
    children: [
      ...dashboardRoutes,
    ],
  },
];

export const router = createBrowserRouter(
  [
    ...publicRoutes,
    ...authRoutes,
    ...protectedRouters,
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
