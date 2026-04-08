// src/modules/auth/services/auth.service.ts

import { Injectable } from '@nestjs/common';
import { AuthServiceClient } from '../clients/auth-service.client';
import { LoginDto } from '../dtos/login.dto';
import { LearnerRegisterDto } from '../dtos/learner-register.dto';
import { MentorRegisterDto } from '../dtos/mentor-register.dto';
import { AuthLoginResponseDto } from '../dtos/auth-login-response.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authClient: AuthServiceClient) {}

  // 1. Register Learner (STUDENT)
  registerLearner(dto: LearnerRegisterDto): Promise<any> {
    // Auth service knows how to handle learner payload
    return this.authClient.registerLearner(dto);
  }

  // 2. Register Mentor (MENTOR)
  registerMentor(dto: MentorRegisterDto): Promise<any> {
    return this.authClient.registerMentor(dto);
  }

  // 3. Login – forwards headers (user-agent, x-forwarded-for, cookies)
  login(
    dto: LoginDto,
    headers: Record<string, string>,
  ): Promise<AuthLoginResponseDto> {
    return this.authClient.login(dto, headers);
  }

  // 4. Refresh – gateway just forwards headers (cookies) to auth
  refresh(headers: Record<string, string>): Promise<{ access_token: string }> {
    return this.authClient.refresh(headers);
  }

  // 5. Logout – forwards headers so auth can read JWT & cookies
  logout(headers: Record<string, string>): Promise<void> {
    return this.authClient.logout(headers);
  }

  // 6. Forgot password
  forgotPassword(dto: ForgotPasswordDto): Promise<any> {
    return this.authClient.forgotPassword(dto);
  }

  // 7. Reset password
  resetPassword(dto: ResetPasswordDto): Promise<any> {
    return this.authClient.resetPassword(dto);
  }

  // 8. Get current user / user by id
  getUserById(
    id: number,
    headers: Record<string, string>,
  ): Promise<UserResponseDto> {
    return this.authClient.getUserById(id, headers);
  }
}