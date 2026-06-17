// gateway/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoadmapsModule } from './modules/roadmaps/roadmaps.module';
import {AuthModule} from './modules/auth/auth.module';  
import {  AdminModule } from './modules/admin/admin.module';
import { HealthController } from './gateway.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RoadmapsModule,
    AuthModule,
    AdminModule
  ],
  controllers: [HealthController],
  providers: [
  ],
})
export class AppModule {}