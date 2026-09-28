import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import FindMentors from '../views/learner/FindMentors';

const mentorshipRoutes: RouteObject[] = [
  { path: RoutePaths.web.dashboard.findMentors, element: <FindMentors /> },
];

export default mentorshipRoutes;