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
    prefixes: ['users'],
    target: ServiceUrls.USER_SERVICE,
  },
  {
    prefixes: ['roadmaps', 'admin', 'courses', 'departments', 'explore'],
    target: ServiceUrls.ROADMAP_SERVICE,
  },
];
