import { Injectable, Logger, UnauthorizedException, ConflictException, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

// 👇 IMPORT YOUR DTOS
import { LearnerRegisterDto } from '../dto/learner-register.dto';
import { LoginDto } from '../dto/login.dto';
import { ForgotPasswordDto, ResetPasswordDto } from '../dto/forgot-password.dto';
import { PrismaService } from '../prisma/prisma.service';

// IMPORT ADMIN CLIENT  
import { AdminClientService } from '../external/admin-client/admin-client.service';
import { AccountStatus, Role } from '../generated/prisma-client';

// IMPORT USER CLIENT
import { UserClientService } from '../external/user-client/user-client.service';


// IMPORT MENTOR CLIENT
import { MentorClientService } from '../external/mentor-client/mentor-client.service';
import { MentorRegisterDto } from 'src/dto/mentor-register.dto';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

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
      role: user.role,
      // deptId have to be added to payload for Role-Based Access Control
      deptId: user.departmentId || null, 
      
      job: user.jobPriority || (user.profile as any)?.jobPriority 
    };
    return this.jwtService.sign(payload, { expiresIn: '24h' });
  }
  // 2.1 REGISTER LEARNER
  async registerLearner(dto: LearnerRegisterDto) { 
    // 1. Check Email
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('User already exists');
    }

    // 2. Hash Password
    const hashed = await bcrypt.hash(dto.password, 10);


    // 3. Create User
    const created = await this.usersService.createUser({
      email: dto.email,
      password: hashed, 
      role: dto.role, 
      name: dto.name,
      status: AccountStatus.ACTIVE
    } as any);

    // 4. Return Safe User Data (without password)
    const { password, ...safe } = (created as any);

    return {
      ...safe,
    };
  }



  // 2.2 REGITER MENTOR
  async registerMentor(dto: MentorRegisterDto) {
    // 1. Check Email
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('User already exists');
    }

    // 2. Hash Password
    const hashed = await bcrypt.hash(dto.password, 10);

    // 3. Create User with MENTOR Role
    const created = await this.usersService.createUser({
      email: dto.email,
      password: hashed,
      role: dto.role, // MENTOR
      name: dto.name,
      status: AccountStatus.PENDING_APPROVAL
    } as any);

    // 4. Create Mentor Profile in User Service 
    
    await this.mentorClientService.createMentorProfile(created.id, {
      cvUrl: dto.cvUrl,
      linkedinUrl: dto.linkedinUrl,
      industry: dto.industry,
      skills: dto.skills,
      bio: dto.bio
    });
      


    const { password, ...safe } = created;
    return safe;

  }

  // =========================================
  // 3. LOGIN
  // =========================================
  async login(dto: LoginDto, userAgent?: string, ip?: string) { 
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    
    const matched = await bcrypt.compare(dto.password, user.password);
    if (!matched) throw new UnauthorizedException('Invalid credentials');

    const accessToken = this.createAccessToken(user);

    return { 
      access_token: accessToken
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new NotFoundException('Email does not exist in the system.');

    // Create Token 
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // Save to DB
    await this.prisma.user.update({
      where: { email: dto.email },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000), // Expire 15p
      },
    });

    // Sent Mail to Google
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
  
async resetPassword(dto: ResetPasswordDto) {
    // Find user by token and check expiry
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: dto.token,
        resetPasswordExpires: { gt: new Date() }, // Token not expired
      },
    });

    if (!user) {
      throw new BadRequestException('The verification code is invalid or has expired.');
    }

    // 2. Hash new password
    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    // 3. Update password and clear reset token
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

  async logout(userId: number) {
    return { ok: true };
  }

  async findUserById(id: number) {
    return this.usersService.findById(id);
  }

}