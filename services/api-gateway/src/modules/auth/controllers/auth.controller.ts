// src/modules/auth/controllers/auth.controller.ts

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { AuthLoginResponseDto } from '../dtos/auth-login-response.dto';
import { LearnerRegisterDto } from '../dtos/learner-register.dto';
import { MentorRegisterDto } from '../dtos/mentor-register.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { UserResponseDto } from '../dtos/user-response.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login (common for all roles)
   * Gateway → Auth service /auth/login
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
  ): Promise<AuthLoginResponseDto> {
    const headers: Record<string, string> = {
      'user-agent': req.get('user-agent') || '',
      'x-forwarded-for':
        (req.headers['x-forwarded-for'] as string) ||
        req.socket.remoteAddress ||
        '',
      cookie: req.headers.cookie || '',
    };

    return this.authService.login(dto, headers);
  }

  /**
   * Register learner (STUDENT)
   * POST /api/v1/auth/register/learner
   */
  @Post('register/learner')
  @HttpCode(HttpStatus.CREATED)
  async registerLearner(
    @Body() dto: LearnerRegisterDto,
  ): Promise<any> {
    // If your auth microservice auto-sets role, no need to add it here.
    return this.authService.registerLearner(dto);
  }

  /**
   * Register mentor (MENTOR)
   * POST /api/v1/auth/register/mentor
   */
  @Post('register/mentor')
  @HttpCode(HttpStatus.CREATED)
  async registerMentor(
    @Body() dto: MentorRegisterDto,
  ): Promise<any> {
    return this.authService.registerMentor(dto);
  }

  /**
   * Refresh token
   * Gateway → Auth service /auth/refresh
   * Auth service reads refresh_token from cookie.
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request): Promise<{ access_token: string }> {
    const headers: Record<string, string> = {
      'user-agent': req.get('user-agent') || '',
      'x-forwarded-for':
        (req.headers['x-forwarded-for'] as string) ||
        req.socket.remoteAddress ||
        '',
      cookie: req.headers.cookie || '',
    };

    return this.authService.refresh(headers);
  }

  /**
   * Logout (optional in gateway)
   * Gateway → Auth service /auth/logout
   */
  @Post('logout')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request): Promise<void> {
    const headers: Record<string, string> = {
      authorization: req.headers.authorization || '',
      cookie: req.headers.cookie || '',
    };
    await this.authService.logout(headers);
    return;
  }

  /**
   * Forgot password
   */
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<any> {
    return this.authService.forgotPassword(dto);
  }

  /**
   * Reset password
   */
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<any> {
    return this.authService.resetPassword(dto);
  }

  /**
   * Get current user (proxy to /auth/:id)
   */
  @Get('me')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async me(
    @CurrentUser('userId') userId: number,
    @Req() req: Request,
  ): Promise<UserResponseDto> {
    const headers: Record<string, string> = {
      authorization: req.headers.authorization || '',
    };
    return this.authService.getUserById(userId, headers);
  }
}