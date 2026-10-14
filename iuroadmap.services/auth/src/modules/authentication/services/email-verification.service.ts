import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { AppConstant, ErrorCodes } from '@iuroadmap/shared';

import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { ResendVerificationResponse } from '../dto/email-verification';
import { attemptsLeft, codeExpiresAt, generateVerificationCode, precheckCode, secondsUntilResend } from '../lib/verification-code';
import { VERIFICATION_EMAIL_SUBJECT, verificationEmailHtml } from '../lib/verification-email';

/** Prisma data that removes the pending code, spread into any update that settles verification */
export const CLEARED_VERIFICATION_CODE = {
  emailVerificationCode: null,
  emailVerificationExpires: null,
  emailVerificationAttempts: 0,
} as const;

interface VerificationRecipient {
  id: string;
  email: string;
  name?: string | null;
}

/** FL-AUTH-13: one-time codes that prove a password sign-up owns its email (BR-AUTH-14) */
@Injectable()
export class EmailVerificationService {
  private readonly logger = new Logger(EmailVerificationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Replaces any pending code with a new one and emails it. Returns the resend cooldown in seconds.
   * When the email cannot be sent the code is removed again, so the user can retry right away.
   */
  async sendCode(user: VerificationRecipient): Promise<number> {
    const code = generateVerificationCode();
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationCode: await bcrypt.hash(code, AppConstant.BcryptRounds),
        emailVerificationExpires: codeExpiresAt(new Date()),
        emailVerificationAttempts: 0,
      },
    });

    try {
      await this.deliver(user, code);
    } catch (error) {
      this.logger.error(`Verification email to ${user.email} failed: ${(error as Error).message}`);
      await this.prisma.user.update({ where: { id: user.id }, data: CLEARED_VERIFICATION_CODE });
      throw new ServiceUnavailableException({
        code: ErrorCodes.EMAIL_DELIVERY_FAILED,
        message: 'The verification email could not be sent. Please try again later.',
      });
    }
    return AppConstant.EmailVerification.ResendCooldownSeconds;
  }

  async resend(email: string): Promise<ResendVerificationResponse> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    // Unknown and already verified emails get the same answer, so this endpoint cannot probe accounts
    if (!user || user.emailVerifiedAt) {
      return { resendAfterSeconds: AppConstant.EmailVerification.ResendCooldownSeconds };
    }

    const wait = secondsUntilResend(user.emailVerificationExpires, new Date());
    if (wait > 0) {
      throw new HttpException(
        { code: ErrorCodes.VERIFICATION_RESEND_TOO_SOON, message: `Please wait ${wait}s before requesting a new code`, retryAfterSeconds: wait },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    return { resendAfterSeconds: await this.sendCode(user) };
  }

  /** Checks the code and marks the email verified */
  async verify(email: string, code: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw this.invalidCode();
    if (user.emailVerifiedAt) {
      throw new BadRequestException({ code: ErrorCodes.EMAIL_ALREADY_VERIFIED, message: 'This email is already verified. Please sign in.' });
    }

    const now = new Date();
    const state = { codeHash: user.emailVerificationCode, expires: user.emailVerificationExpires, attempts: user.emailVerificationAttempts };
    switch (precheckCode(state, now)) {
      case 'NO_CODE':
      case 'EXPIRED':
        throw new BadRequestException({ code: ErrorCodes.VERIFICATION_CODE_EXPIRED, message: 'The code has expired. Please request a new one.' });
      case 'TOO_MANY_ATTEMPTS':
        throw new HttpException(
          { code: ErrorCodes.VERIFICATION_TOO_MANY_ATTEMPTS, message: 'Too many wrong codes. Please request a new one.' },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      case 'CHECK':
        break;
    }

    if (!(await bcrypt.compare(code, user.emailVerificationCode!))) {
      const updated = await this.prisma.user.update({
        where: { id: user.id },
        data: { emailVerificationAttempts: { increment: 1 } },
        select: { emailVerificationAttempts: true },
      });
      throw this.invalidCode(attemptsLeft(updated.emailVerificationAttempts));
    }

    await this.prisma.user.update({ where: { id: user.id }, data: { emailVerifiedAt: now, ...CLEARED_VERIFICATION_CODE } });
  }

  private invalidCode(remaining?: number): BadRequestException {
    return new BadRequestException({
      code: ErrorCodes.VERIFICATION_CODE_INVALID,
      message: 'The code is incorrect.',
      ...(remaining === undefined ? {} : { attemptsLeft: remaining }),
    });
  }

  private async deliver(user: VerificationRecipient, code: string): Promise<void> {
    // Local development usually has no SMTP server: log the code instead of failing the sign-up
    if (!this.configService.get<string>('MAIL_HOST') && this.configService.get<string>('NODE_ENV') !== 'production') {
      this.logger.warn(`MAIL_HOST is not set, so no email was sent. Verification code for ${user.email}: ${code}`);
      return;
    }
    await this.mailerService.sendMail({
      to: user.email,
      subject: VERIFICATION_EMAIL_SUBJECT,
      html: verificationEmailHtml(user.name, code),
    });
  }
}
