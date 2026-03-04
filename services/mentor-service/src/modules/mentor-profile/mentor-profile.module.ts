import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MentorProfileController } from './controllers/mentor-profile.controller';
import { MentorProfileService } from './services/mentor-profile.service';
import { MentorProfileRepository } from './repositories/mentor-profile.repository';
import { PrismaModule } from '../../prisma/prisma.module';
import { MentorProfileInternalController } from './controllers/mentor-profile.internal.controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [MentorProfileController, MentorProfileInternalController],
  providers: [MentorProfileService, MentorProfileRepository],
  exports: [MentorProfileService], // export so other modules can use it
})
export class MentorProfileModule {}