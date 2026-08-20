import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';

const redirectRoutes: RouteObject[] = [
  {
    path: RoutePaths.web.legacy.admin,
    element: <Navigate to={RoutePaths.web.admin.root} replace />,
  },
  {
    path: RoutePaths.web.legacy.mentorDashboard,
    element: <Navigate to={RoutePaths.web.mentor.dashboard} replace />,
  },
  {
    path: '*',
    element: <div>Page Not Found</div>,
  },
];

export default redirectRoutes;
