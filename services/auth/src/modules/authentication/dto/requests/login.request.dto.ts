import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { EntityConstant } from '@iuroadmap/shared';

export class LoginRequestDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(EntityConstant.Email)
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(EntityConstant.PasswordMin, { message: `Password must be at least ${EntityConstant.PasswordMin} characters long` })
  @MaxLength(EntityConstant.PasswordMax)
  password: string;
}
