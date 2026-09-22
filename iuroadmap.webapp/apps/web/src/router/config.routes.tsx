import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';

import { DepartmentListPage } from '../views/config/department/departmentListPage';
import { DepartmentCreatePage } from '../views/config/department/departmentCreatePage';
import { DepartmentEditPage } from '../views/config/department/departmentEditPage';

import { MajorListPage } from '../views/config/major/majorListPage';
import { MajorCreatePage } from '../views/config/major/majorCreatePage';
import { MajorEditPage } from '../views/config/major/majorEditPage';

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

  // Major routes
  { path: RoutePaths.web.config.major.root, element: <MajorListPage /> },
  { path: RoutePaths.web.config.major.create, element: <MajorCreatePage /> },
  { path: RoutePaths.web.config.major.edit, element: <MajorEditPage /> },
];

export default configRoutes;