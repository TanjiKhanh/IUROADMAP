// gateway/src/modules/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthServiceClient } from './clients/auth-service.client';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthServiceClient],
  exports: [AuthService],
})
export class AuthModule {}