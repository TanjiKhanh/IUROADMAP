import { createBrowserRouter } from 'react-router-dom';
import authRoutes from './auth.routes';
import publicRoutes from './public.routes';
import protectedRoutes from './protected.routes';
import redirectRoutes from './redirect.routes';
import toolRoutes from './tool.routes';

export const router = createBrowserRouter(
  [...publicRoutes, ...authRoutes, ...protectedRoutes, ...toolRoutes, ...redirectRoutes],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);
