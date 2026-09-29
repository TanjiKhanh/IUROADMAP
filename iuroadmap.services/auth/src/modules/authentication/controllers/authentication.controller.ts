import { Controller, Post, Body, Req, Res, HttpCode, UseGuards, Get, Param, NotFoundException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthenticationService } from '../services/authentication.service';
import { JwtGuard, CurrentUser, IJwtPayload } from '@iuroadmap/shared';

// Request DTOs
import { LoginRequestDto } from '../dto/requests/login.request.dto';
import { GoogleLoginRequestDto } from '../dto/requests/google-login.request.dto';
import { LearnerRegisterRequestDto } from '../dto/requests/learner-register.request.dto';
import { MentorRegisterRequestDto } from '../dto/requests/mentor-register.request.dto';
import { ForgotPasswordRequestDto, ResetPasswordRequestDto } from '../dto/requests/forgot-password.request.dto';
import { RegistrationResponse, ResendVerificationRequest, ResendVerificationResponse, VerifyEmailRequest } from '../dto/email-verification';

// Response DTOs
import { AuthLoginResponseDto } from '../dto/responses/auth-login.response.dto';

// Users module (for user lookup)
import { UserResponse } from '../../users/dto/user';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  // 1.1 REGISTER LEARNER
  @Post('register/learner')
  @ApiOperation({ summary: 'Register a new learner user; a verification code is emailed and must be confirmed before login' })
  @ApiBody({ type: LearnerRegisterRequestDto })
  @ApiResponse({ status: 201, type: RegistrationResponse, description: 'Learner registered, waiting for email verification' })
  @ApiResponse({ status: 400, description: 'Bad Request / Validation Error' })
  @ApiResponse({ status: 409, description: 'EMAIL_ALREADY_EXISTS' })
  async register(
    @Body() dto: LearnerRegisterRequestDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<RegistrationResponse> {
    return this.authService.registerLearner(dto);
  }

  // 1.2 REGISTER MENTOR
  @Post('register/mentor')
  @ApiOperation({ summary: 'Register a new mentor user; a verification code is emailed and must be confirmed before login' })
  @ApiBody({ type: MentorRegisterRequestDto })
  @ApiResponse({ status: 201, type: RegistrationResponse, description: 'Mentor and mentor profile created, waiting for email verification' })
  @ApiResponse({ status: 400, description: 'Bad Request / Validation Error' })
  @ApiResponse({ status: 409, description: 'EMAIL_ALREADY_EXISTS' })
  async registerMentor(
    @Body() dto: MentorRegisterRequestDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<RegistrationResponse> {
    return this.authService.registerMentor(dto);
  }

  // 1.3 VERIFY EMAIL
  @HttpCode(HttpStatus.OK)
  @Post('verify-email')
  @ApiOperation({ summary: 'Confirm the emailed code of a password sign-up; signs the user in (returns JWT token)' })
  @ApiBody({ type: VerifyEmailRequest })
  @ApiOkResponse({ type: AuthLoginResponseDto, description: 'Email verified and signed in' })
  @ApiResponse({ status: 400, description: 'VERIFICATION_CODE_INVALID, VERIFICATION_CODE_EXPIRED or EMAIL_ALREADY_VERIFIED' })
  @ApiResponse({ status: 403, description: 'Account suspended or rejected' })
  @ApiResponse({ status: 429, description: 'VERIFICATION_TOO_MANY_ATTEMPTS: request a new code' })
  async verifyEmail(@Body() dto: VerifyEmailRequest): Promise<AuthLoginResponseDto> {
    return this.authService.verifyEmail(dto);
  }

  // 1.4 RESEND VERIFICATION CODE
  @HttpCode(HttpStatus.OK)
  @Post('resend-verification')
  @ApiOperation({ summary: 'Email a new verification code (same answer for unknown or already verified emails)' })
  @ApiBody({ type: ResendVerificationRequest })
  @ApiOkResponse({ type: ResendVerificationResponse })
  @ApiResponse({ status: 429, description: 'VERIFICATION_RESEND_TOO_SOON (retryAfterSeconds in the body)' })
  @ApiResponse({ status: 503, description: 'EMAIL_DELIVERY_FAILED' })
  async resendVerification(@Body() dto: ResendVerificationRequest): Promise<ResendVerificationResponse> {
    return this.authService.resendVerification(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User login (returns JWT token)' })
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({ type: AuthLoginResponseDto, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 403, description: 'EMAIL_NOT_VERIFIED, or account suspended / rejected' })
  async login(
    @Body() dto: LoginRequestDto
  ) {
    const result = await this.authService.login(dto);

    return {
      access_token: result.access_token
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('google')
  @ApiOperation({ summary: 'Sign in with Google; creates a learner account on the first visit (returns JWT token)' })
  @ApiBody({ type: GoogleLoginRequestDto })
  @ApiOkResponse({ type: AuthLoginResponseDto, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Invalid Google token or unverified email' })
  @ApiResponse({ status: 403, description: 'Account suspended or rejected' })
  @ApiResponse({ status: 503, description: 'GOOGLE_CLIENT_ID is not configured' })
  async loginWithGoogle(@Body() dto: GoogleLoginRequestDto): Promise<AuthLoginResponseDto> {
    return this.authService.loginWithGoogle(dto);
  }

  // 4. LOGOUT
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 204, description: 'Successfully logged out' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(
    @CurrentUser('userId') userId: string, 
    @Res({ passthrough: true }) res: Response
  ) {
    if (userId) {
      await this.authService.logout(userId);
    }

    return;
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset token via email' })
  @ApiBody({ type: ForgotPasswordRequestDto })
  @ApiResponse({ status: 200, description: 'Reset email instructions sent if email exists' })
  async forgotPassword(@Body() dto: ForgotPasswordRequestDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset user password using token' })
  @ApiBody({ type: ResetPasswordRequestDto })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiResponse({ status: 400, description: 'Invalid or expired reset token' })
  async resetPassword(@Body() dto: ResetPasswordRequestDto) {
    return this.authService.resetPassword(dto);
  }

  // 5. GET ME
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile based on JWT token' })
  @ApiResponse({ status: 200, description: 'Current user profile retrieved successfully', type: UserResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(@CurrentUser('userId') userId: string) {
    const user = await this.authService.findUserById(userId);
    
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  // 6. GET USER BY ID
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Get user profile information by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully', type: UserResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    const user = await this.authService.findUserById(id);
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
