import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import LearnerDashboard from '../views/learner/LearnerDashboard';

const learnerRoutes: RouteObject[] = [
  { path: RoutePaths.web.dashboard.root, element: <LearnerDashboard /> },
];

export default learnerRoutes;