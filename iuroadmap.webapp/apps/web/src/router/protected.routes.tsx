import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import { ResponsiveLayout } from '../layouts/responsiveLayout';
import dashboardRoutes from './dashboard.routes';

const protectedRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <ResponsiveLayout />
      </ProtectedRoute>
    ),
    children: dashboardRoutes,
  },
];

export default protectedRoutes;
