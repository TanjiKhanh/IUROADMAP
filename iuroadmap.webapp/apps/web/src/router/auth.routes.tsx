import type { RouteObject } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import { AuthLayout } from '../layouts/authLayout';
import Login from '../views/public/Login';
import Register from '../views/public/Register';
import ForgotPassword from '../views/public/ForgotPassword';
import ResetPassword from '../views/public/ResetPassword';

const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      { path: RoutePaths.web.public.login, element: <Login /> },
      { path: RoutePaths.web.public.register, element: <Register /> },
      { path: RoutePaths.web.public.forgotPassword, element: <ForgotPassword /> },
      { path: RoutePaths.web.public.resetPassword, element: <ResetPassword /> },
    ],
  },
];

export default authRoutes;