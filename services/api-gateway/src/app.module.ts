import { MiddlewareConsumer, Module, NestModule, RequestMethod, Logger } from '@nestjs/common';
import fetch from 'node-fetch';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { AdminRoleMiddleware } from './common/middlewares/role.middleware';
import { createServiceProxy } from './utils/proxy.util';
import { GatewayController } from './gateway.controller';
import { JwtAuthGuard } from './common/guards/jwt.guard';

@Module({
  providers: [
    AuthMiddleware,
    AdminRoleMiddleware,
    JwtAuthGuard,
    {
      provide: 'AUTH_CLIENT',
      useFactory: () => ({
        login: async (payload: any) => {
          const target = process.env.AUTH_SERVICE_URL || 'http://localhost:3000';
          const res = await fetch(`${target}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          return res.json();
        },
      }),
    },
    {
      provide: 'ADMIN_CLIENT',
      useFactory: () => ({
        getInfo: async ({ headers }: any) => {
          const target = process.env.ADMIN_SERVICE_URL || 'http://localhost:4100';
          const res = await fetch(`${target}/admin/info`, {
            method: 'GET',
            headers,
          });
          return res.json();
        },
      }),
    },
  ],
  controllers: [GatewayController],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger('APIGateway');

  configure(consumer: MiddlewareConsumer) {
    const adminTarget = process.env.ADMIN_SERVICE_URL || 'http://localhost:4100';
    const userTarget = process.env.USER_SERVICE_URL || 'http://localhost:4000';
    const authTarget = process.env.AUTH_SERVICE_URL || 'http://localhost:3000';
    const mentorTarget = process.env.MENTOR_SERVICE_URL || 'http://localhost:4001'; 

    // 1. ADMIN ROUTES
    consumer
      .apply(
        (req, res, next) => {
          this.logger.log(`🛡️ Admin Request: ${req.method} ${req.originalUrl}`);
          next();
        },
        AuthMiddleware,
        AdminRoleMiddleware,
        createServiceProxy(adminTarget, { '^/admin': '/admin' })
      )
      .forRoutes('admin/*path');

    // 2. USER ROUTES
    consumer
      .apply(
        AuthMiddleware,
        createServiceProxy(userTarget, { '^/roadmaps': '/roadmaps' })
      )
      .forRoutes('roadmaps/*path');

    // 3. AUTH ROUTES (Public)
    consumer
      .apply(
        createServiceProxy(authTarget, { '^/auth': '/auth' })
      )
      .forRoutes('auth/*path', 'auth');

    // 4. MENTOR ROUTES 
    consumer
      .apply(
        AuthMiddleware,
        createServiceProxy(mentorTarget, { '^/mentors': '/mentors' })
      )
      .forRoutes('mentors/*path', 'mentors');

    consumer
      .apply(
        AuthMiddleware,
        createServiceProxy(mentorTarget, { '^/mentor-profiles': '/mentor-profiles' })
      )
      .forRoutes('mentor-profiles/*path', 'mentor-profiles');

    // 5. PUBLIC ROUTES
    consumer
      .apply(
        createServiceProxy(adminTarget, { '^/public': '/public' })
      )
      .forRoutes('public/*path', 'public');
  }
}