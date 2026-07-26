import { Controller, Post, Body, Req, Res, HttpCode, UseGuards, Get, Param, NotFoundException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { LearnerRegisterDto } from '../dto/learner-register.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ForgotPasswordDto, ResetPasswordDto } from '../dto/forgot-password.dto';
import { MentorRegisterDto } from '../dto/mentor-register.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { AuthLoginResponseDto } from '../dto/auth-login-response.dto';


@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  // 1.1 REGISTER LEARNER
  @Post('register/learner')
  @ApiOperation({ summary: 'Register a new learner user' })
  @ApiBody({ type: LearnerRegisterDto })
  @ApiResponse({ status: 201, description: 'Learner registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request / Validation Error' })
  @ApiResponse({ status: 409, description: 'Email or Username already exists' })
  async register(
    @Body() dto: LearnerRegisterDto, 
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.registerLearner(dto);
    return result;
  }

  // 1.2 REGISTER MENTOR
  @Post('register/mentor')
  @ApiOperation({ summary: 'Register a new mentor user' })
  @ApiBody({ type: MentorRegisterDto })
  @ApiResponse({ status: 201, description: 'Mentor registered successfully along with mentor profile' })
  @ApiResponse({ status: 400, description: 'Bad Request / Validation Error' })
  @ApiResponse({ status: 409, description: 'Email or Username already exists' })
  async registerMentor(
    @Body() dto: MentorRegisterDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.registerMentor(dto);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User login (returns JWT token)' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: AuthLoginResponseDto, description: 'Successful login' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() dto: LoginDto, 
    @Req() req: Request
  ) {
    const userAgent = req.get('user-agent') || '';
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
    
    const result = await this.authService.login(dto, userAgent, ip);

    return { 
      access_token: result.access_token
    };
  }

  // 4. LOGOUT
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 204, description: 'Successfully logged out' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(
    @Req() req: any, 
    @Res({ passthrough: true }) res: Response
  ) {
    const userId = req.user?.userId; // Get from JWT Payload
    if (userId) {
      await this.authService.logout(userId);
    }

    // Clear legacy refresh cookie if any
    res.clearCookie('refresh_token', { path: '/' });
    return;
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset token via email' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ status: 200, description: 'Reset email instructions sent if email exists' })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset user password using token' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password successfully reset' })
  @ApiResponse({ status: 400, description: 'Invalid or expired reset token' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  // 5. GET ME / FIND USER
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Get user profile information by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully', type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    const user = await this.authService.findUserById(Number(id));
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Security: Remove password before sending
    const { password, ...result } = user;
    return result;
  }
}