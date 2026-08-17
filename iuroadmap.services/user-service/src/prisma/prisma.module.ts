import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 Makes PrismaService available everywhere in the app
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 Exports the service for other modules to use
})
export class PrismaModule {}