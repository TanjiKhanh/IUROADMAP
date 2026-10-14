import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccountStatus } from '@iuroadmap/shared';

export class RegistrationResponse {
  @ApiProperty({ description: 'New user ID', format: 'uuid' })
  id!: string;

  @ApiProperty({ description: 'Email the verification code was sent to (trimmed, lowercase)', example: 'learner@example.com' })
  email!: string;

  @ApiPropertyOptional({ description: 'Full name' })
  name?: string;

  @ApiProperty({ description: 'ACTIVE for a learner, PENDING_APPROVAL for a mentor', enum: AccountStatus })
  status!: AccountStatus;

  @ApiProperty({ description: 'Always true: the account signs in only after POST /auth/verify-email' })
  emailVerificationRequired!: boolean;

  @ApiProperty({ description: 'Seconds before POST /auth/resend-verification accepts a request (0 when the first email could not be sent)', example: 60 })
  resendAfterSeconds!: number;
}
