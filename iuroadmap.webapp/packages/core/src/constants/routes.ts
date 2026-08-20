// Helper function to convert web paths to mobile-friendly names
const convertPathToMobileName = (path: string): string => {
  return path
    .replace(/^\//, '') // Remove leading slash
    .replace(/[/\-:]/g, '-') // Replace /, -, : with -
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
    .replace(/^$/, 'Root'); // Handle empty string (root path)
};

interface PublicPaths {
  root: string;
  login: string;
  register: string;
  forgotPassword: string;
}

interface DashboardPaths {
  root: string;
  explore: string;
  myCourses: string;
  findMentors: string;
  roadmap: string;
  roadmapPreview: string;
  roadmapLegacy: string;
  microRoadmap: string;
}

interface AdminPaths {
  root: string;
  roadmaps: string;
  courses: string;
  departments: string;
  roadmapsDesign: string;
  roadmapsDesignSlug: string;
  courseTopicsDesign: string;
}

interface MentorPaths {
  applicationPending: string;
  dashboard: string;
}

interface LegacyPaths {
  admin: string;
  mentorDashboard: string;
}

export interface WebPathsStructure {
  public: PublicPaths;
  dashboard: DashboardPaths;
  admin: AdminPaths;
  mentor: MentorPaths;
  legacy: LegacyPaths;
}

export type MobilePathsStructure = WebPathsStructure;

export interface RoutePathsStructure {
  web: WebPathsStructure;
  mobile: MobilePathsStructure;
}

export const webPaths: WebPathsStructure = {
  public: {
    root: '/',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
  },
  dashboard: {
    root: '/dashboard',
    explore: '/dashboard/explore',
    myCourses: '/dashboard/my-courses',
    findMentors: '/dashboard/find-mentors',
    roadmap: '/dashboard/roadmap/:id',
    roadmapPreview: '/dashboard/roadmap-preview/:slug',
    roadmapLegacy: '/dashboard/roadmap-legacy/:id',
    microRoadmap: '/dashboard/roadmap/:id/micro/:courseNodeId',
  },
  admin: {
    root: '/dashboard/admin',
    roadmaps: '/dashboard/admin/roadmaps',
    courses: '/dashboard/admin/courses',
    departments: '/dashboard/admin/departments',
    roadmapsDesign: '/dashboard/admin/roadmaps/design',
    roadmapsDesignSlug: '/dashboard/admin/roadmaps/design/:slug',
    courseTopicsDesign: '/dashboard/admin/courses/:courseNodeId/topics',
  },
  mentor: {
    applicationPending: '/application-pending',
    dashboard: '/dashboard/mentor',
  },
  legacy: {
    admin: '/admin/*',
    mentorDashboard: '/mentor-dashboard',
  },
};

const createMobilePaths = (webObj: WebPathsStructure): MobilePathsStructure => {
  const mobileObj: Record<string, any> = {};

  for (const [key, value] of Object.entries(webObj)) {
    if (typeof value === 'string') {
      mobileObj[key] = convertPathToMobileName(value);
    } else if (typeof value === 'object' && value !== null) {
      mobileObj[key] = createMobilePaths(value as any);
    }
  }

  return mobileObj as MobilePathsStructure;
};

export const RoutePaths: RoutePathsStructure = {
  web: webPaths,
  mobile: createMobilePaths(webPaths),
};
