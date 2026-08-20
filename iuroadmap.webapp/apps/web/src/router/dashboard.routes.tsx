import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import LearnerDashboard from '../views/learner/LearnerDashboard';
import MyCourses from '../views/learner/MyCourses';
import MacroRoadmap from '../views/learner/MacroRoadmap';
import ExploreMajors from '../views/learner/ExploreMajors';
import FindMentors from '../views/learner/FindMentors';
import MicroRoadmap from '../views/learner/MicroRoadmap';
import MentorDashboard from '../views/mentor/MentorDashboard';

const dashboardChildPath = (path: string) =>
  path.replace(`${RoutePaths.web.dashboard.root}/`, '');
import AdminDashboard from '../views/admin/AdminDashboard';
import ManageDepartments from '../views/admin/ManageDepartments';
import ManageRoadmaps from '../views/admin/ManageRoadmaps';
import ManageCourses from '../views/admin/ManageCourses';

const dashboardRoutes: RouteObject[] = [
  {
    path: RoutePaths.web.dashboard.root,
    children: [
      { index: true, element: <LearnerDashboard /> },
      {
        path: dashboardChildPath(RoutePaths.web.dashboard.explore),
        element: <ExploreMajors />,
      },
      {
        path: dashboardChildPath(RoutePaths.web.dashboard.myCourses),
        element: <MyCourses />,
      },
      {
        path: dashboardChildPath(RoutePaths.web.dashboard.findMentors),
        element: <FindMentors />,
      },
      {
        path: dashboardChildPath(RoutePaths.web.dashboard.roadmap),
        element: <MacroRoadmap />,
      },
      {
        path: dashboardChildPath(RoutePaths.web.dashboard.roadmapPreview),
        element: <MacroRoadmap />,
      },
      {
        path: dashboardChildPath(RoutePaths.web.dashboard.microRoadmap),
        element: <MicroRoadmap />,
      },
      {
        path: dashboardChildPath(RoutePaths.web.admin.root),
        element: <AdminDashboard />,
      },
      {
        path: dashboardChildPath(RoutePaths.web.admin.roadmaps),
        element: <ManageRoadmaps />,
      },
      {
        path: dashboardChildPath(RoutePaths.web.admin.courses),
        element: <ManageCourses />,
      },
      {
        path: dashboardChildPath(RoutePaths.web.admin.departments),
        element: <ManageDepartments />,
      },
      {
        path: dashboardChildPath(RoutePaths.web.mentor.dashboard),
        element: <MentorDashboard />,
      },
    ],
  },
];

export default dashboardRoutes;
