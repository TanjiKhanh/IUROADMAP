import { Injectable, Logger, UnauthorizedException, ForbiddenException, ConflictException, NotFoundException, BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { MailerService } from '@nestjs-modules/mailer';

// DTOs
import { LearnerRegisterRequestDto } from '../dto/requests/learner-register.request.dto';
import { LoginRequestDto } from '../dto/requests/login.request.dto';
import { GoogleLoginRequestDto } from '../dto/requests/google-login.request.dto';
import { ForgotPasswordRequestDto, ResetPasswordRequestDto } from '../dto/requests/forgot-password.request.dto';
import { MentorRegisterRequestDto } from '../dto/requests/mentor-register.request.dto';
import { RegistrationResponse, ResendVerificationRequest, ResendVerificationResponse, VerifyEmailRequest } from '../dto/email-verification';
import { AuthLoginResponseDto } from '../dto/responses/auth-login.response.dto';

// Infrastructure
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { MentorClientService } from '@iuroadmap/shared';

// Users module
import { UsersService } from '../../users/services/users.service';
import { RegisterMentorSaga } from '../sagas/register-mentor.saga';
import { CLEARED_VERIFICATION_CODE, EmailVerificationService } from './email-verification.service';

// Shared
import { AccountStatus, AppConstant, ErrorCodes, normalizeEmail } from '@iuroadmap/shared';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  /** Verifies Google ID tokens against Google's public keys (no client secret needed) */
  private readonly googleClient = new OAuth2Client();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private prisma: PrismaService,
    private mentorClientService: MentorClientService,
    private registerMentorSaga: RegisterMentorSaga,
    private configService: ConfigService,
    private emailVerification: EmailVerificationService,
  ) {}

  // HELPER: BANNED / REJECTED accounts cannot sign in, whatever the method
  private assertCanSignIn(user: { status: string }) {
    if (user.status === AccountStatus.BANNED) {
      throw new ForbiddenException('Account has been suspended');
    }

    if (user.status === AccountStatus.REJECTED) {
      throw new ForbiddenException('Account application was rejected');
    }
  }

  // HELPER: CREATE TOKENS
  private createAccessToken(user: any) {
    const payload = { 
      sub: user.id, 
      userId: user.id,
      email: user.email, 
      name: user.name,
      role: user.role?.name || user.role,
      permissions: user.role?.permissions?.map((p: any) => p.name) || [],
      status: user.status,
      subscriptionTier: user.subscriptionTier,
      subscriptionExpiresAt: user.subscriptionExpiresAt,
      isSuperAdmin: user.role?.name === 'SUPERADMIN',
      deptId: user.departmentId || null, 
      job: user.jobPriority || (user.profile as any)?.jobPriority 
    };
    return this.jwtService.sign(payload, { expiresIn: '24h' });
  }

  // HELPER: nobody knows this password; the owner can set one later with "forgot password"
  private async unusablePassword(): Promise<string> {
    return bcrypt.hash(randomBytes(32).toString('hex'), AppConstant.BcryptRounds);
  }

  // 2.1 REGISTER LEARNER: the account exists right away but signs in only after FL-AUTH-13
  async registerLearner(dto: LearnerRegisterRequestDto): Promise<RegistrationResponse> {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException({ code: ErrorCodes.EMAIL_ALREADY_EXISTS, message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(dto.password, AppConstant.BcryptRounds);

    let created: any;
    try {
      created = await this.usersService.createUser({
        email: dto.email,
        password: hashed,
        role: {
          connectOrCreate: {
            where: { name: AppConstant.RoleName.Learner },
            create: { name: AppConstant.RoleName.Learner },
          },
        },
        name: dto.name,
        status: AccountStatus.ACTIVE
      } as any);
    } catch (error: any) {
      // Two sign-ups with the same email at the same time: the second hits the unique index
      if (error?.code === 'P2002') {
        throw new ConflictException({ code: ErrorCodes.EMAIL_ALREADY_EXISTS, message: 'User already exists' });
      }
      throw error;
    }

    return this.startEmailVerification(created);
  }

  // 2.2 REGISTER MENTOR (Driven by Saga Orchestrator)
  async registerMentor(dto: MentorRegisterRequestDto): Promise<RegistrationResponse> {
    const created = await this.registerMentorSaga.execute(dto);
    return this.startEmailVerification(created);
  }

  // HELPER: sends the first code. If that email fails the account is kept: the verification
  // page offers "resend code".
  private async startEmailVerification(user: any): Promise<RegistrationResponse> {
    let resendAfterSeconds = 0;
    try {
      resendAfterSeconds = await this.emailVerification.sendCode(user);
    } catch (error) {
      this.logger.error(`Sign-up of ${user.email} saved, but the first verification email failed: ${(error as Error).message}`);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name ?? undefined,
      status: user.status,
      emailVerificationRequired: true,
      resendAfterSeconds,
    };
  }

  // 3. LOGIN
  async login(dto: LoginRequestDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const matched = await bcrypt.compare(dto.password, user.password);
    if (!matched) throw new UnauthorizedException('Invalid credentials');

    this.assertCanSignIn(user);

    // Checked after the password, so this answer never reveals anything about an email to a stranger
    if (!user.emailVerifiedAt) {
      throw new ForbiddenException({
        code: ErrorCodes.EMAIL_NOT_VERIFIED,
        message: 'Please verify your email before signing in',
        email: user.email,
      });
    }

    const accessToken = this.createAccessToken(user);

    return {
      access_token: accessToken
    };
  }

  // 3.2 VERIFY EMAIL (FL-AUTH-13): a correct code verifies the email and signs the user in
  async verifyEmail(dto: VerifyEmailRequest): Promise<AuthLoginResponseDto> {
    await this.emailVerification.verify(dto.email, dto.code);

    const user = await this.usersService.findByEmail(dto.email);
    this.assertCanSignIn(user);

    return {
      access_token: this.createAccessToken(user),
    };
  }

  // 3.3 RESEND VERIFICATION CODE
  async resendVerification(dto: ResendVerificationRequest): Promise<ResendVerificationResponse> {
    return this.emailVerification.resend(dto.email);
  }

  // 3.1 LOGIN WITH GOOGLE: signs in the account with the same verified email, or creates a
  // learner account on the first visit
  async loginWithGoogle(dto: GoogleLoginRequestDto) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    if (!clientId) throw new ServiceUnavailableException('Google sign-in is not configured');

    let email: string | undefined;
    let name: string | undefined;
    try {
      const ticket = await this.googleClient.verifyIdToken({ idToken: dto.idToken, audience: clientId });
      const payload = ticket.getPayload();
      if (payload?.email_verified && payload.email) {
        email = normalizeEmail(payload.email);
        name = payload.name;
      }
    } catch (error) {
      this.logger.warn(`Google ID token rejected: ${(error as Error).message}`);
    }
    if (!email) throw new UnauthorizedException('Invalid Google account');

    let user = await this.usersService.findByEmail(email);
    if (!user) {
      await this.usersService.createUser({
        email,
        password: await this.unusablePassword(),
        name,
        role: {
          connectOrCreate: {
            where: { name: AppConstant.RoleName.Learner },
            create: { name: AppConstant.RoleName.Learner },
          },
        },
        status: AccountStatus.ACTIVE,
        emailVerifiedAt: new Date(),
      } as any);
      // Reload with the role and its permissions, which go into the JWT
      user = await this.usersService.findByEmail(email);
    } else if (!user.emailVerifiedAt) {
      // BR-AUTH-14: Google proved who owns this email. Whoever set the unverified password never
      // did, so that password stops working (the owner can set a new one with "forgot password").
      await this.prisma.user.update({
        where: { id: user.id },
        data: { emailVerifiedAt: new Date(), password: await this.unusablePassword(), ...CLEARED_VERIFICATION_CODE },
      });
    }

    this.assertCanSignIn(user);

    return {
      access_token: this.createAccessToken(user),
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

    const hashedPassword = await bcrypt.hash(dto.newPassword, AppConstant.BcryptRounds);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
        // The reset code was emailed, so whoever used it owns this email (BR-AUTH-14)
        emailVerifiedAt: user.emailVerifiedAt ?? new Date(),
        ...CLEARED_VERIFICATION_CODE,
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
