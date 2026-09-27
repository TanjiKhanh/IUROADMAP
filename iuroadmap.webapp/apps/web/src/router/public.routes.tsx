import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import Landing from '../views/public/Landing';
import ApplicationPending from '../views/mentor/ApplicationPending';

const publicRoutes: RouteObject[] = [
  {
    path: RoutePaths.web.public.root,
    element: <Landing />,
  },

];

export default publicRoutes;
