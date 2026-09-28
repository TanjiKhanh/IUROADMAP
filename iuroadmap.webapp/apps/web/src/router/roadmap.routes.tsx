import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import { ExploreRoadmapsPage } from '../views/roadmap/explore/exploreRoadmapsPage';
import { RoadmapPreviewPage } from '../views/roadmap/explore/roadmapPreviewPage';
import { CourseExplorerPage } from '../views/roadmap/courses/courseExplorerPage';
import { CourseDetailPage } from '../views/roadmap/courses/courseDetailPage';
import { MicroRoadmapPage } from '../views/roadmap/viewer/microRoadmapPage';
import { MyRoadmapsPage } from '../views/roadmap/my-roadmap/myRoadmapsPage';
import { MyRoadmapPage } from '../views/roadmap/my-roadmap/myRoadmapPage';

const roadmapRoutes: RouteObject[] = [
  // Explore published curricula (FL-LRN-02)
  { path: RoutePaths.web.roadmap.exploreRoadmaps, element: <ExploreRoadmapsPage /> },
  { path: RoutePaths.web.roadmap.roadmapPreview, element: <RoadmapPreviewPage /> },

  // Course Explorer (FL-LRN-11) + topics by academic year (FL-LRN-08)
  { path: RoutePaths.web.roadmap.exploreCourses, element: <CourseExplorerPage /> },
  { path: RoutePaths.web.roadmap.courseDetail, element: <CourseDetailPage /> },
  { path: RoutePaths.web.roadmap.courseTopics, element: <MicroRoadmapPage /> },

  // My Roadmaps (FL-LRN-03..07)
  { path: RoutePaths.web.roadmap.myRoadmaps, element: <MyRoadmapsPage /> },
  { path: RoutePaths.web.roadmap.myRoadmap, element: <MyRoadmapPage /> },
];

export default roadmapRoutes;
