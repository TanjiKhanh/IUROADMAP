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

interface DashBoardPaths {
  root: string;
}

interface RoadMapPaths {
  root: string;
  explore: string;
  myCourses: string;
  roadmap: string;
  roadmapPreview: string;
  roadmapLegacy: string;
  microRoadmap: string;
}


interface RolePaths {
  root: string;
  create: string;
  edit: string;
}

interface UserPaths {
  root: string;
  create: string;
  edit: string;
  detail: string;
  changePassword?: string;
}

interface ConfigPaths {
  root: string;
  role: RolePaths;
  user: UserPaths;
  department: {
    root: string;
    create: string;
    edit: string;
  };
  major: {
    root: string;
    create: string;
    edit: string;
  };
  roadmap: {
    designSlug: string;
    courseTopics: string;
  };
}

export interface WebPathsStructure {
  public: PublicPaths;
  dashboard: DashBoardPaths;
  roadmap: RoadMapPaths;
  config: ConfigPaths;
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
  },
  roadmap: {
    root: '/roadmap',
    explore: '/roadmap/explore',
    myCourses: '/roadmap/my-courses',
    roadmap: '/roadmap/:id',
    roadmapPreview: '/roadmap-preview/:slug',
    roadmapLegacy: '/roadmap-legacy/:id',
    microRoadmap: '/roadmap/:id/micro/:courseNodeId',
  },
  config: {
    root: '/config',
    role: {
      root: '/config/roles',
      create: '/config/roles/create',
      edit: '/config/roles/:id/edit',
    },
    user: {
      root: '/config/users',
      create: '/config/users/create',
      edit: '/config/users/:id/edit',
      detail: '/config/users/:id',
      changePassword: '/config/users/:id/change-password',
    },
    department: {
      root: '/config/departments',
      create: '/config/departments/create',
      edit: '/config/departments/:id/edit',
    },
    major: {
      root: '/config/majors',
      create: '/config/majors/create',
      edit: '/config/majors/:id/edit',
    },
    roadmap: {
      designSlug: '/config/roadmaps/design/:slug',
      courseTopics: '/config/courses/:courseNodeId/topics',
    },
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
