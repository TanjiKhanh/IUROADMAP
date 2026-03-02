import { Controller, Post, Body, Req, Res, HttpCode, UseGuards, Get, Param, NotFoundException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import {  LearnerRegisterDto } from '../dto/learner-register.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ForgotPasswordDto, ResetPasswordDto } from '../dto/forgot-password.dto';
import { MentorRegisterDto } from '../dto/mentor-register.dto';
import { UserResponseDto } from '../dto/user-response.dto';


const REFRESH_COOKIE = 'refresh_token';
const REFRESH_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 1.1 REGISTER LEARNER
  @Post('register/learner')
  async register(
    @Body() dto: LearnerRegisterDto, 
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.registerLearner(dto);
    return result;
  }

  //1.2 REGISTER MENTOR
  @Post('register/mentor')
  async registerMentor(
    @Body() dto: MentorRegisterDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.authService.registerMentor(dto);
    return result;
  }

  // 2. LOGIN (Set Cookie)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto, 
    @Res({ passthrough: true }) res: Response, 
    @Req() req: Request
  ) {
    const userAgent = req.get('user-agent') || '';
    // Get IP (Nginx/Cloudflare)
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
    
    const result = await this.authService.login(dto, userAgent, ip);

    // Save Refresh Token into HTTP-Only Cookie 
    res.cookie(REFRESH_COOKIE, result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax', 
      path: '/',
      maxAge: REFRESH_MAX_AGE,
    });

    // Return Access Token & User Info
    return { 
      access_token: result.access_token, 
      user: result.user 
    };
  }

  // 3. REFRESH (Read Cookie)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Request, 
    @Res({ passthrough: true }) res: Response
  ) {
    // Get Refresh Token from Cookie
    const token = req.cookies?.[REFRESH_COOKIE];
    
    const userAgent = req.get('user-agent') || '';
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
    
    // Call Service to Refresh
    const result = await this.authService.refreshToken(token, userAgent, ip);

    // Set New Refresh Token in Cookie
    res.cookie(REFRESH_COOKIE, result.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: REFRESH_MAX_AGE,
    });

    return { 
      access_token: result.access_token, 
    };
  }

  // 4. LOGOUT (Clear Cookie)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
  @Post('logout')
  async logout(
    @Req() req: any, 
    @Res({ passthrough: true }) res: Response
  ) {
    const userId = req.user?.userId; // Get from JWT Payload
    if (userId) {
      await this.authService.logout(userId);
    }

    // Clear Cookie
    res.clearCookie(REFRESH_COOKIE, { path: '/' });
    return;
  }

    @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }


  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  // 5. GET ME / FIND USER
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
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