// gateway/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoadmapsModule } from './modules/roadmaps/roadmaps.module';
import {AuthModule} from './modules/auth/auth.module';  
import { RoleGuard, JwtGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RoadmapsModule,
    AuthModule
  ],
  providers: [
  ],
})
export class AppModule {}