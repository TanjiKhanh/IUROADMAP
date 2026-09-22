import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import { ResponsiveLayout } from '../layouts/responsiveLayout';
import ProtectedRoute from '../auth/ProtectedRoute';

import authRoutes from './auth.routes';
import configRoutes from './config.routes';
import learnerRoutes from './learner.routes';
import mentorshipRoutes from './mentorship.routes';
import mentorRoutes from './mentor.routes';
import publicRoutes from './public.routes';
import roadmapRoutes from './roadmap.routes';

const protectedRouters: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <ResponsiveLayout />
      </ProtectedRoute>
    ),
    children: [
      ...learnerRoutes,
      ...roadmapRoutes,
      ...mentorshipRoutes,
      ...mentorRoutes,
      ...configRoutes,
    ],
  },
];

export const router = createBrowserRouter(
  [
    ...publicRoutes,
    ...authRoutes,
    ...protectedRouters,
    { path: '*', element: <Navigate to={RoutePaths.web.public.login} replace /> },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);
