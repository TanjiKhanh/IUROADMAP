import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import ExploreMajors from '../views/learner/ExploreMajors';
import MacroRoadmap from '../views/learner/MacroRoadmap';
import MicroRoadmap from '../views/learner/MicroRoadmap';
import MyCourses from '../views/learner/MyCourses';

const roadmapRoutes: RouteObject[] = [
  { path: RoutePaths.web.dashboard.explore, element: <ExploreMajors /> },
  { path: RoutePaths.web.dashboard.myCourses, element: <MyCourses /> },
  { path: RoutePaths.web.dashboard.roadmap, element: <MacroRoadmap /> },
  { path: RoutePaths.web.dashboard.roadmapPreview, element: <MacroRoadmap /> },
  { path: RoutePaths.web.dashboard.microRoadmap, element: <MicroRoadmap /> },
];

export default roadmapRoutes;