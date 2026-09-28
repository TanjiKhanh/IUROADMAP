import { ServiceUrls } from './service-urls.config';

export interface RouteMapping {
  prefixes: string[];
  target: string;
}

export const GATEWAY_ROUTES: RouteMapping[] = [
  {
    prefixes: ['auth', 'iam'],
    target: ServiceUrls.AUTH_SERVICE,
  },
  {
    prefixes: ['mentors', 'mentor-profiles'],
    target: ServiceUrls.MENTOR_SERVICE,
  },
  {
    // 'user' (v1 /user/roadmaps/*) was removed: learner roadmaps are 'student-roadmaps' (roadmap-service)
    prefixes: ['users'],
    target: ServiceUrls.USER_SERVICE,
  },
  {
    // Roadmap v2: catalog, curriculum by year, learner overlay, course offerings, comments
    prefixes: [
      'admin',
      'courses',
      'course-categories',
      'course-comments',
      'departments',
      'explore',
      'lecturers',
      'majors',
      'student-roadmaps',
    ],
    target: ServiceUrls.ROADMAP_SERVICE,
  },
];
