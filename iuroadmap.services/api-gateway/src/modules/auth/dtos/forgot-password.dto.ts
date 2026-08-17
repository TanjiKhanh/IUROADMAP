import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'The email address of the user requesting password reset',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    description: 'The password reset token sent via email',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: 'The new password (minimum 8 characters)',
    example: 'newStrongPassword123',
  })
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}