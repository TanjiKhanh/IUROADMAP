import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MentorProfileController } from './mentor-profile.controller';
import { MentorProfileService } from './mentor-profile.service';
import { MentorProfileRepository } from './mentor-profile.repository';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [MentorProfileController],
  providers: [MentorProfileService, MentorProfileRepository],
  exports: [MentorProfileService], // export so other modules can use it
})
export class MentorProfileModule {}