import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import { ExploreMajorsPage } from '../views/explore/exploreMajorsPage';
import { MyCoursesPage } from '../views/my-courses/myCoursesPage';
import { MacroRoadmapPage } from '../views/roadmap/viewer/macroRoadmapPage';
import { MicroRoadmapPage } from '../views/roadmap/viewer/microRoadmapPage';

const roadmapRoutes: RouteObject[] = [
  { path: RoutePaths.web.roadmap.explore, element: <ExploreMajorsPage /> },
  { path: RoutePaths.web.roadmap.myCourses, element: <MyCoursesPage /> },
  { path: RoutePaths.web.roadmap.roadmap, element: <MacroRoadmapPage /> },
  { path: RoutePaths.web.roadmap.roadmapPreview, element: <MacroRoadmapPage /> },
  { path: RoutePaths.web.roadmap.microRoadmap, element: <MicroRoadmapPage /> },
];

export default roadmapRoutes;