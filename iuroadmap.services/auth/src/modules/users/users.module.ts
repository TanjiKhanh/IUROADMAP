import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { RoadmapClientModule } from '@iuroadmap/shared';

@Module({
  imports: [PrismaModule, RoadmapClientModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exported so AuthenticationModule can use it
})
export class UsersModule {}
