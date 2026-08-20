import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import MacroRoadmap from '../views/learner/MacroRoadmap';
import RoadmapDesigner from '../views/admin/RoadmapDesigner';
import CourseTopicRoadmapDesigner from '../views/admin/CourseTopicRoadmapDesigner';
import ProtectedRoute from '../auth/ProtectedRoute';

const toolRoutes: RouteObject[] = [
  {
    path: RoutePaths.web.dashboard.roadmapLegacy,
    element: (
      <ProtectedRoute>
        <MacroRoadmap />
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePaths.web.admin.roadmapsDesign,
    element: (
      <ProtectedRoute>
        <RoadmapDesigner />
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePaths.web.admin.roadmapsDesignSlug,
    element: (
      <ProtectedRoute>
        <RoadmapDesigner />
      </ProtectedRoute>
    ),
  },
  {
    path: RoutePaths.web.admin.courseTopicsDesign,
    element: (
      <ProtectedRoute>
        <CourseTopicRoadmapDesigner />
      </ProtectedRoute>
    ),
  },
];

export default toolRoutes;
