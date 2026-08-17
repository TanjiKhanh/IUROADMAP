import { Controller, Post, Body, Req, Res, HttpCode, UseGuards, Get, Param, NotFoundException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthenticationService } from '../services/authentication.service';
import { JwtGuard, CurrentUser, IJwtPayload } from '@iuroadmap/shared';

// Request DTOs
import { LoginRequestDto } from '../dto/requests/login.request.dto';
import { LearnerRegisterRequestDto } from '../dto/requests/learner-register.request.dto';
import { MentorRegisterRequestDto } from '../dto/requests/mentor-register.request.dto';
import { ForgotPasswordRequestDto, ResetPasswordRequestDto } from '../dto/requests/forgot-password.request.dto';

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
  @ApiOperation({ summary: 'Register a new learner user' })
  @ApiBody({ type: LearnerRegisterRequestDto })
  @ApiResponse({ status: 201, description: 'Learner registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request / Validation Error' })
  @ApiResponse({ status: 409, description: 'Email or Username already exists' })
  async register(
    @Body() dto: LearnerRegisterRequestDto, 
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.registerLearner(dto);
    return result;
  }

  // 1.2 REGISTER MENTOR
  @Post('register/mentor')
  @ApiOperation({ summary: 'Register a new mentor user' })
  @ApiBody({ type: MentorRegisterRequestDto })
  @ApiResponse({ status: 201, description: 'Mentor registered successfully along with mentor profile' })
  @ApiResponse({ status: 400, description: 'Bad Request / Validation Error' })
  @ApiResponse({ status: 409, description: 'Email or Username already exists' })
  async registerMentor(
    @Body() dto: MentorRegisterRequestDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.registerMentor(dto);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User login (returns JWT token)' })
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({ type: AuthLoginResponseDto, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() dto: LoginRequestDto
  ) {
    const result = await this.authService.login(dto);

    return { 
      access_token: result.access_token
    };
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

  // 5. GET ME / FIND USER
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
