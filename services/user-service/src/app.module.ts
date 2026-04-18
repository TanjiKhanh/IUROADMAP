import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RoadmapsModule } from './roadmaps/roadmaps.module';
import { HealthController } from './health.controller';

@Module({
  imports: [

    PrismaModule,

    RoadmapsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}