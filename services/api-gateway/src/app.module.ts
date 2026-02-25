import { MiddlewareConsumer, Module, NestModule, RequestMethod, Logger } from '@nestjs/common';
import fetch from 'node-fetch';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { AdminRoleMiddleware } from './common/middlewares/role.middleware';
import { createServiceProxy } from './utils/proxy.util';

// controllers & guards we add for testing
import { GatewayController } from './gateway.controller';
import { JwtAuthGuard } from './common/guards/jwt.guard';

@Module({
  // Providers ensure NestJS creates these as managed singletons
  providers: [
    AuthMiddleware,
    AdminRoleMiddleware,
    JwtAuthGuard,
    // default clients (will be overridden in tests)
    {
      provide: 'AUTH_CLIENT',
      useFactory: () => {
        // simple fetch-based implementation for runtime
        return {
          login: async (payload: any) => {
            const target = process.env.AUTH_SERVICE_URL || 'http://localhost:3000';
            const res = await fetch(`${target}/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });
            return res.json();
          },
        };
      },
    },
    {
      provide: 'ADMIN_CLIENT',
      useFactory: () => {
        return {
          getInfo: async ({ headers }: any) => {
            const target = process.env.ADMIN_SERVICE_URL || 'http://localhost:4100';
            const res = await fetch(`${target}/admin/info`, {
              method: 'GET',
              headers,
            });
            return res.json();
          },
        };
      },
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

    // 1. ADMIN ROUTES (The Secure Chain)
    consumer
      .apply(
        // 1. Log the Request
        (req, res, next) => {
           this.logger.log(`🛡️ Admin Request: ${req.method} ${req.originalUrl}`);
           next();
        },
        // 2. Auth Middleware (Passed as CLASS, not function/adapter)
        AuthMiddleware, 
        // 3. Role Middleware (Passed as CLASS)
        AdminRoleMiddleware,
        // 4. Proxy
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

    // 4. PUBLIC ROUTES (Public)
    consumer
      .apply(
        createServiceProxy(adminTarget, { '^/public': '/public' }) 
      )
      .forRoutes('public/*path', 'public');
  }
}