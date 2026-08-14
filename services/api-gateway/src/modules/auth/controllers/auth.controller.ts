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
import { JwtGuard } from '@iuroadmap/shared';
import { CurrentUser } from '@iuroadmap/shared';
import { UserResponseDto } from '../dtos/user-response.dto';
import { ApiTags, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login (common for all roles)
   * Gateway → Auth service /auth/login
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login (proxies to Auth service)' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: AuthLoginResponseDto, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
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
  @ApiOperation({ summary: 'Register a learner student account' })
  @ApiBody({ type: LearnerRegisterDto })
  @ApiResponse({ status: 201, description: 'Learner registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request / Validation Error' })
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
  @ApiOperation({ summary: 'Register a mentor account along with profile' })
  @ApiBody({ type: MentorRegisterDto })
  @ApiResponse({ status: 201, description: 'Mentor registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request / Validation Error' })
  async registerMentor(
    @Body() dto: MentorRegisterDto,
  ): Promise<any> {
    return this.authService.registerMentor(dto);
  }

  /**
   * Logout (optional in gateway)
   * Gateway → Auth service /auth/logout
   */
  @Post('logout')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Logout current user' })
  @ApiResponse({ status: 204, description: 'Logged out successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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
  @ApiOperation({ summary: 'Request password reset token/link' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset email requested' })
  async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<any> {
    return this.authService.forgotPassword(dto);
  }

  /**
   * Reset password
   */
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password using token' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<any> {
    return this.authService.resetPassword(dto);
  }

  /**
   * Get current user (proxy to /auth/:id)
   */
  @Get('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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