import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';

import { DepartmentListPage } from '../views/config/department/departmentListPage';
import { DepartmentCreatePage } from '../views/config/department/departmentCreatePage';
import { DepartmentEditPage } from '../views/config/department/departmentEditPage';

import { MajorListPage } from '../views/config/major/majorListPage';
import { MajorCreatePage } from '../views/config/major/majorCreatePage';
import { MajorEditPage } from '../views/config/major/majorEditPage';
import { MajorDetailPage } from '../views/config/major/majorDetailPage';

import { CourseCategoryListPage } from '../views/config/course-category/courseCategoryListPage';
import { CourseCategoryCreatePage } from '../views/config/course-category/courseCategoryCreatePage';
import { CourseCategoryEditPage } from '../views/config/course-category/courseCategoryEditPage';

import { CourseListPage } from '../views/config/course/courseListPage';
import { CourseCreatePage } from '../views/config/course/courseCreatePage';
import { CourseEditPage } from '../views/config/course/courseEditPage';

import { LecturerListPage } from '../views/config/lecturer/lecturerListPage';
import { LecturerCreatePage } from '../views/config/lecturer/lecturerCreatePage';
import { LecturerEditPage } from '../views/config/lecturer/lecturerEditPage';

import { GradingPage } from '../views/config/grading/gradingPage';
import { CurriculumCanvasPage } from '../views/config/roadmap/curriculumCanvasPage';
import { CourseTopicDesignPage } from '../views/config/roadmap/courseTopicDesignPage';
import { CourseOfferingListPage } from '../views/config/course-offering/courseOfferingListPage';
import { CourseOfferingEditPage } from '../views/config/course-offering/courseOfferingEditPage';
import { CommentModerationListPage } from '../views/config/comment-moderation/commentModerationListPage';

import { UserListPage } from '../views/config/user/userListPage';
import { UserCreatePage } from '../views/config/user/userCreatePage';
import { UserEditPage } from '../views/config/user/userEditPage';
import { UserDetailPage } from '../views/config/user/userDetailPage';

import { RoleListPage } from '../views/config/role/roleListPage';
import { RoleCreatePage } from '../views/config/role/roleCreatePage';
import { RoleEditPage } from '../views/config/role/roleEditPage';

const configRoutes: RouteObject[] = [
  // User routes
  { path: RoutePaths.web.config.user.root, element: <UserListPage /> },
  { path: RoutePaths.web.config.user.create, element: <UserCreatePage /> },
  { path: RoutePaths.web.config.user.edit, element: <UserEditPage /> },
  { path: RoutePaths.web.config.user.detail, element: <UserDetailPage /> },

  // Role routes
  { path: RoutePaths.web.config.role.root, element: <RoleListPage /> },
  { path: RoutePaths.web.config.role.create, element: <RoleCreatePage /> },
  { path: RoutePaths.web.config.role.edit, element: <RoleEditPage /> },

  // Department routes
  { path: RoutePaths.web.config.department.root, element: <DepartmentListPage /> },
  { path: RoutePaths.web.config.department.create, element: <DepartmentCreatePage /> },
  { path: RoutePaths.web.config.department.edit, element: <DepartmentEditPage /> },

  // Major routes (+ curricula by year)
  { path: RoutePaths.web.config.major.root, element: <MajorListPage /> },
  { path: RoutePaths.web.config.major.create, element: <MajorCreatePage /> },
  { path: RoutePaths.web.config.major.edit, element: <MajorEditPage /> },
  { path: RoutePaths.web.config.major.detail, element: <MajorDetailPage /> },
  { path: RoutePaths.web.config.curriculumCanvas, element: <CurriculumCanvasPage /> },

  // Course catalog
  { path: RoutePaths.web.config.courseCategory.root, element: <CourseCategoryListPage /> },
  { path: RoutePaths.web.config.courseCategory.create, element: <CourseCategoryCreatePage /> },
  { path: RoutePaths.web.config.courseCategory.edit, element: <CourseCategoryEditPage /> },
  { path: RoutePaths.web.config.course.root, element: <CourseListPage /> },
  { path: RoutePaths.web.config.course.create, element: <CourseCreatePage /> },
  { path: RoutePaths.web.config.course.edit, element: <CourseEditPage /> },

  // Lecturers
  { path: RoutePaths.web.config.lecturer.root, element: <LecturerListPage /> },
  { path: RoutePaths.web.config.lecturer.create, element: <LecturerCreatePage /> },
  { path: RoutePaths.web.config.lecturer.edit, element: <LecturerEditPage /> },

  // Course offerings by academic year + their topics (FL-RDM-08)
  { path: RoutePaths.web.config.courseOffering.root, element: <CourseOfferingListPage /> },
  { path: RoutePaths.web.config.courseOffering.edit, element: <CourseOfferingEditPage /> },
  { path: RoutePaths.web.config.courseOffering.topics, element: <CourseTopicDesignPage /> },

  // Grade scale + academic classification
  { path: RoutePaths.web.config.grading, element: <GradingPage /> },

  // Comment moderation (FL-RDM-10)
  { path: RoutePaths.web.config.commentModeration, element: <CommentModerationListPage /> },
];

export default configRoutes;
