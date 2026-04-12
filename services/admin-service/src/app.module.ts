import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Global Shared Modules
import { PrismaModule } from './prisma/prisma.module'; // Or from your libs path if using aliases

// Feature Modules
import {RoadmapModule} from './modules/roadmap/roadmap.module'
import { HealthController } from './health.controller';


@Module({
  imports: [
    // 1. Global Config
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Database Connection
    PrismaModule, 

    // 3. Feature Modules (These contain their own Controllers/Providers)
    RoadmapModule,

    // 4. Strategy
  ],
  controllers: [HealthController],
})
export class AppModule {}