import { Injectable, Logger, UnauthorizedException, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

// DTOs
import { LearnerRegisterRequestDto } from '../dto/requests/learner-register.request.dto';
import { LoginRequestDto } from '../dto/requests/login.request.dto';
import { ForgotPasswordRequestDto, ResetPasswordRequestDto } from '../dto/requests/forgot-password.request.dto';
import { MentorRegisterRequestDto } from '../dto/requests/mentor-register.request.dto';

// Infrastructure
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { AdminClientService, UserClientService, MentorClientService } from '@iuroadmap/shared';

// Users module
import { UsersService } from '../../users/services/users.service';

// Shared
import { AccountStatus } from '@iuroadmap/shared';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService,
    private mailerService: MailerService,
    private prisma: PrismaService,
    private adminClientService: AdminClientService,
    private userClientService: UserClientService,
    private mentorClientService: MentorClientService
  ) {}

  // HELPER: CREATE TOKENS
  private createAccessToken(user: any) {
    const payload = { 
      sub: user.id, 
      userId: user.id,
      email: user.email, 
      role: user.role?.name || user.role,
      permissions: user.role?.permissions?.map((p: any) => p.name) || [],
      deptId: user.departmentId || null, 
      job: user.jobPriority || (user.profile as any)?.jobPriority 
    };
    return this.jwtService.sign(payload, { expiresIn: '24h' });
  }

  // 2.1 REGISTER LEARNER
  async registerLearner(dto: LearnerRegisterRequestDto) { 
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const created = await this.usersService.createUser({
      email: dto.email,
      password: hashed, 
      role: dto.role, 
      name: dto.name,
      status: AccountStatus.ACTIVE
    } as any);

    const { password, ...safe } = (created as any);

    return {
      ...safe,
    };
  }

  // 2.2 REGISTER MENTOR
  async registerMentor(dto: MentorRegisterRequestDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const created = await this.usersService.createUser({
      email: dto.email,
      password: hashed,
      role: dto.role,
      name: dto.name,
      status: AccountStatus.PENDING_APPROVAL
    } as any);

    await this.mentorClientService.createMentorProfile(created.id as any, {
      cvUrl: dto.cvUrl,
      linkedinUrl: dto.linkedinUrl,
      industry: dto.industry,
      skills: dto.skills,
      bio: dto.bio
    });

    const { password, ...safe } = created;
    return safe;
  }

  // 3. LOGIN
  async login(dto: LoginRequestDto) { 
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    
    const matched = await bcrypt.compare(dto.password, user.password);
    if (!matched) throw new UnauthorizedException('Invalid credentials');

    const accessToken = this.createAccessToken(user);

    return { 
      access_token: accessToken
    };
  }

  async forgotPassword(dto: ForgotPasswordRequestDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new NotFoundException('Email does not exist in the system.');

    const token = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.user.update({
      where: { email: dto.email },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    await this.mailerService.sendMail({
      to: dto.email,
      subject: '[GupJob] Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
          <h2 style="color: #05c34e;">Password Reset Request</h2>
          <p>Hi there,</p>
          <p>We received a request to reset your password. Use the code below to proceed:</p>
          <div style="background-color: #f7fafc; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #2d3748;">
            ${token}
          </div>
          <p>This code will expire in 15 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #a0aec0;">Team GupJob</p>
        </div>
      `,
    });

    return { message: 'The verification code has been sent to your email.' };
  }
  
  async resetPassword(dto: ResetPasswordRequestDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: dto.token,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('The verification code is invalid or has expired.');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return { success: true, message: 'Password has been updated successfully.' };
  }

  async logout(userId: string) {
    return { ok: true };
  }

  async findUserById(id: string) {
    return this.usersService.findById(id);
  }
}
