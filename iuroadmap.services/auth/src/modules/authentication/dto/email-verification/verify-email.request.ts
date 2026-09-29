import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, Length, MaxLength } from 'class-validator';
import { EntityConstant, NormalizeEmail } from '@iuroadmap/shared';

export class VerifyEmailRequest {
  @ApiProperty({ description: 'Email the code was sent to', example: 'learner@example.com', format: 'email', maxLength: EntityConstant.Email })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(EntityConstant.Email)
  @NormalizeEmail()
  email!: string;

  @ApiProperty({
    description: 'One-time code from the verification email',
    example: '123456',
    minLength: EntityConstant.VerificationCode,
    maxLength: EntityConstant.VerificationCode,
    pattern: '^[0-9]+$',
  })
  @IsNumberString({ no_symbols: true }, { message: 'The code contains digits only' })
  @Length(EntityConstant.VerificationCode, EntityConstant.VerificationCode)
  code!: string;
}
