import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import Login from '../views/public/Login';
import Register from '../views/public/Register';
import ForgotPassword from '../views/public/ForgotPassword';

const authRoutes: RouteObject[] = [
  { path: RoutePaths.web.public.login, element: <Login /> },
  { path: RoutePaths.web.public.register, element: <Register /> },
  { path: RoutePaths.web.public.forgotPassword, element: <ForgotPassword /> },
];

export default authRoutes;