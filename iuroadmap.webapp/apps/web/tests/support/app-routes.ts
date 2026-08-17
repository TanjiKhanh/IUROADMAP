/**
 * Centralized Route Mapping for IUROADMAP Frontend & Microservice APIs
 * Reflects exact route paths in apps/web/src/App.tsx and backend NestJS gateway (port 8080).
 */

export const APP_ROUTES = {
  // Public / Auth
  PUBLIC: {
    LANDING: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  },

  // Learner Portal
  LEARNER: {
    DASHBOARD: '/dashboard',
    EXPLORE_MAJORS: '/dashboard/explore',
    MY_COURSES: '/dashboard/my-courses',
    FIND_MENTORS: '/dashboard/find-mentors',
    MACRO_ROADMAP: (id: number | string) => `/dashboard/roadmap/${id}`,
    MACRO_ROADMAP_PREVIEW: (slug: string) => `/dashboard/roadmap-preview/${slug}`,
    MICRO_ROADMAP: (roadmapId: number | string, courseNodeId: string) =>
      `/dashboard/roadmap/${roadmapId}/micro/${courseNodeId}`,
  },

  // Admin Portal
  ADMIN: {
    DASHBOARD: '/admin',
    ROADMAPS: '/admin/roadmaps',
    COURSES: '/admin/courses',
    DEPARTMENTS: '/admin/departments',
    ROADMAP_DESIGNER: '/admin/roadmaps/design',
    ROADMAP_DESIGNER_SLUG: (slug: string) => `/admin/roadmaps/design/${slug}`,
    COURSE_TOPIC_DESIGNER: (courseNodeId: string) => `/admin/courses/${courseNodeId}/topics`,
  },

  // Mentor Portal
  MENTOR: {
    DASHBOARD: '/mentor-dashboard',
    APPLICATION_PENDING: '/application-pending',
  },
};

export const API_ROUTES = {
  BASE_URL: process.env.API_BASE_URL || 'http://localhost:8080/api/v1',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER_LEARNER: '/auth/register-learner',
  },
  LEARNER: {
    EXPLORE_MAJORS: '/explore/majors',
    ENROLL_MAJOR: (slug: string) => `/roadmaps/${slug}/enroll`,
    MY_ROADMAPS: '/user/roadmaps/my',
    ROADMAP_OVERVIEW: (roadmapId: string | number) => `/user/roadmaps/${roadmapId}/overview`,
    UPDATE_COURSE_PROGRESS: (roadmapId: string | number, courseId: string) =>
      `/user/roadmaps/${roadmapId}/courses/${courseId}`,
  },
  ADMIN: {
    DEPARTMENTS: '/admin/departments',
    DEPARTMENT_BY_ID: (id: string) => `/admin/departments/${id}`,
    MAJORS: '/admin/majors',
    MAJOR_LAYOUT: (majorId: string) => `/admin/roadmaps/${majorId}/layout`,
    MAJOR_PREREQUISITES: (majorId: string) => `/admin/roadmaps/${majorId}/prerequisites`,
    COURSE_TOPICS: (courseId: string) => `/admin/roadmaps/courses/${courseId}/topics`,
    USERS_SELF_DELETE_CHECK: (id: string) => `/admin/users/${id}`,
    REJECT_MENTOR: (mentorId: string) => `/admin/mentors/${mentorId}/reject`,
  },
  MENTOR: {
    REQUESTS: '/mentors/requests',
    ACCEPT_REQUEST: (requestId: string) => `/mentors/requests/${requestId}/accept`,
    DECLINE_REQUEST: (requestId: string) => `/mentors/requests/${requestId}/decline`,
    AVAILABILITY: '/mentors/availability',
    SEND_CHAT: '/chat/send',
    GIVE_FEEDBACK: (learnerId: string) => `/mentors/feedback/${learnerId}`,
  },
};
