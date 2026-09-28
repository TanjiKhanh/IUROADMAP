import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health.controller';

// Roadmap v2: the v1 enrollment API (/user/roadmaps/*) moved to roadmap-service (student-roadmaps).
@Module({
  imports: [PrismaModule],
  controllers: [HealthController],
})
export class AppModule {}
