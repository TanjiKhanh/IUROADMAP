import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import MainLayout from '../components/layouts/MainLayout';
import dashboardRoutes from './dashboard.routes';

const protectedRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: dashboardRoutes,
  },
];

export default protectedRoutes;
