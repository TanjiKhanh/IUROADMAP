import { Module } from '@nestjs/common';

import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UsersModule } from './modules/users/users.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    AuthenticationModule,
    UsersModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}