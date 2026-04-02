import { MiddlewareConsumer, Module, NestModule, RequestMethod, Logger } from '@nestjs/common';
import fetch from 'node-fetch';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { AdminRoleMiddleware } from './common/middlewares/role.middleware';
import { createServiceProxy } from './utils/proxy.util';
import { JwtAuthGuard } from './common/guards/jwt.guard';
import { HealthController } from './gateway.controller';

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
  ],
  controllers: [HealthController],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger('APIGateway');

  configure(consumer: MiddlewareConsumer) {
    const adminTarget = process.env.ADMIN_SERVICE_URL || 'http://localhost:4100';
    const userTarget = process.env.USER_SERVICE_URL || 'http://localhost:4000';
    const authTarget = process.env.AUTH_SERVICE_URL || 'http://localhost:3000';
    const mentorTarget = process.env.MENTOR_SERVICE_URL || 'http://localhost:4001';

    // 1. ADMIN ROUTES (requires auth + admin role)
    consumer
      .apply(
        (req, res, next) => {
          this.logger.log(`[ADMIN] ${req.method} ${req.originalUrl}`);
          next();
        },
        AuthMiddleware,
        AdminRoleMiddleware,
        createServiceProxy(adminTarget, { '^/admin': '/admin' })
      )
      .forRoutes({
        path: 'admin/*',
        method: RequestMethod.ALL,
      });


    // 2. USER ROUTES
    consumer
      .apply(
        AuthMiddleware, 
        createServiceProxy(userTarget, { '^/user': '/user' })
      )
      .forRoutes({
        path: 'user/*',
        method: RequestMethod.ALL,
      });


    // 3. AUTH ROUTES (Public)
    consumer
      .apply(
        createServiceProxy(authTarget, { '^/auth': '/auth' }) 
      )
      .forRoutes(
        {
          path: 'auth/*',
          method: RequestMethod.ALL,
        }
      );

    // 4. MENTOR ROUTES
    consumer
      .apply(
        AuthMiddleware,
        createServiceProxy(mentorTarget, { '^/mentors': '/mentors' })
      )
      .forRoutes({
        path: 'mentors', 
        
        method: RequestMethod.ALL,
      });

    consumer
      .apply(
        AuthMiddleware,
        createServiceProxy(mentorTarget, { '^/mentor-profiles': '/mentor-profiles' })
      )
      .forRoutes({
        path: 'mentor-profiles/*',
        method: RequestMethod.ALL,
      });

    // 5. PUBLIC ROUTES (Public)
    consumer
      .apply(
        createServiceProxy(adminTarget, { '^/public': '/public' }) 
      )
      .forRoutes('public/*path', 'public');
  }
}