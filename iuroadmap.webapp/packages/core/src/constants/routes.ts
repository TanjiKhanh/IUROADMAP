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
  findMentors: string;
}

interface RoadMapPaths {
  root: string;
  /** Explore published curricula (FL-LRN-02) */
  exploreRoadmaps: string;
  /** Read-only preview of a major's curriculum: ?cohortYear= */
  roadmapPreview: string;
  /** Course Explorer (FL-LRN-11) */
  exploreCourses: string;
  /** Course page: ?academicYear= */
  courseDetail: string;
  /** Topics of a course for an academic year (micro roadmap) */
  courseTopics: string;
  myRoadmaps: string;
  myRoadmap: string;
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

interface CrudPaths {
  root: string;
  create: string;
  edit: string;
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
  major: CrudPaths & { detail: string };
  courseCategory: CrudPaths;
  course: CrudPaths;
  lecturer: CrudPaths;
  courseOffering: {
    root: string;
    edit: string;
    topics: string;
  };
  curriculumCanvas: string;
  grading: string;
  commentModeration: string;
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
    findMentors: '/dashboard/find-mentors',
  },
  roadmap: {
    root: '/roadmap',
    exploreRoadmaps: '/roadmap/explore',
    roadmapPreview: '/roadmap/explore/:majorSlug',
    exploreCourses: '/roadmap/courses',
    courseDetail: '/roadmap/courses/:courseId',
    courseTopics: '/roadmap/courses/:courseId/topics',
    myRoadmaps: '/roadmap/my',
    myRoadmap: '/roadmap/my/:id',
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
      detail: '/config/majors/:id',
    },
    courseCategory: {
      root: '/config/course-categories',
      create: '/config/course-categories/create',
      edit: '/config/course-categories/:id/edit',
    },
    course: {
      root: '/config/courses',
      create: '/config/courses/create',
      edit: '/config/courses/:id/edit',
    },
    lecturer: {
      root: '/config/lecturers',
      create: '/config/lecturers/create',
      edit: '/config/lecturers/:id/edit',
    },
    courseOffering: {
      root: '/config/course-offerings',
      edit: '/config/course-offerings/:id',
      topics: '/config/course-offerings/:id/topics',
    },
    curriculumCanvas: '/config/curricula/:versionId/canvas',
    grading: '/config/grading',
    commentModeration: '/config/comment-moderation',
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
