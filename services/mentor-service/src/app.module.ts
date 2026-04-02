// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { MentorProfileModule } from './modules/mentor-profile/mentor-profile.module';
import { MentorSearchModule } from './modules/mentor-search/mentor-search.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    // Loads .env from the service root (works regardless of CWD)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '.env'),
    }),
    PrismaModule,
    MentorProfileModule,
    MentorSearchModule,
  ],
  controllers: [HealthController],
  providers: [],
  
})
export class AppModule {}