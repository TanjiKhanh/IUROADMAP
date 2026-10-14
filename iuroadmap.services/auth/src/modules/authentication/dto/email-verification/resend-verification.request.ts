import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';
import { EntityConstant, NormalizeEmail } from '@iuroadmap/shared';

export class ResendVerificationRequest {
  @ApiProperty({ description: 'Email of the account waiting for verification', example: 'learner@example.com', format: 'email', maxLength: EntityConstant.Email })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(EntityConstant.Email)
  @NormalizeEmail()
  email!: string;
}
