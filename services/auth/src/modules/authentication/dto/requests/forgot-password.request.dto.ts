import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { EntityConstant } from '@iuroadmap/shared';

export class ForgotPasswordRequestDto {
  @ApiProperty({
    description: 'User email address to send reset instructions',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(EntityConstant.Email)
  email: string;
}

export class ResetPasswordRequestDto {
  @ApiProperty({
    description: 'Token received via email',
    example: 'abc123token',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: 'New password',
    example: 'newSecurePassword123!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(EntityConstant.PasswordMin)
  @MaxLength(EntityConstant.PasswordMax)
  newPassword: string;
}
