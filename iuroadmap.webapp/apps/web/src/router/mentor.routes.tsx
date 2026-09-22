import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import MentorDashboard from '../views/mentor/MentorDashboard';

const mentorRoutes: RouteObject[] = [
  { path: RoutePaths.web.dashboard.root, element: <MentorDashboard /> },
];

export default mentorRoutes;