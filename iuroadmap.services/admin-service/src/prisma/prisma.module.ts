import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 1. Makes it available everywhere without re-importing in every sub-module
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 2. Critical: Allows other modules to use the service
})
export class PrismaModule {}