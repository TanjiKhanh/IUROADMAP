// src/modules/auth/dtos/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user (minimum 6 characters)',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  password: string;
}