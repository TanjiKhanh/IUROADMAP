// gateway/src/app.module.ts

import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SwaggerDocsModule } from './modules/swagger/swagger.module';
import { HealthController } from './gateway.controller';
import { createServiceProxy } from './utils/proxy.util';
import { GATEWAY_ROUTES } from './config/routes.config';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SwaggerDocsModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 1. PUBLIC routes that bypass AuthMiddleware (e.g., auth login/register)
    // We let them pass through without AuthMiddleware

    // 2. AUTHENTICATED routes requiring valid JWT
    // Gateway only decodes JWT and injects x-user-role.
    // ALL Role tracking and Authorization is handled downstream by Microservices.
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        'v1/users/*',
        'v1/mentor-profiles/*',
        'v1/admin/*', // Downstream service checks if x-user-role === ADMIN
      );

    // 4. Dynamic Proxy Routing
    for (const route of GATEWAY_ROUTES) {
      for (const prefix of route.prefixes) {
        consumer
          .apply(createServiceProxy(route.target))
          .forRoutes(
            { path: `v1/${prefix}`, method: RequestMethod.ALL },
            { path: `v1/${prefix}/*`, method: RequestMethod.ALL },
          );
      }
    }
  }
}