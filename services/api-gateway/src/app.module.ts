// gateway/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoadmapsModule } from './modules/roadmaps/roadmaps.module';
import {AuthModule} from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RoadmapsModule,
    AuthModule
  ],
})
export class AppModule {}