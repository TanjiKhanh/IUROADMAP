import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsUUID, MaxLength, MinLength } from 'class-validator';
import { EntityConstant } from '@iuroadmap/shared';

export class UserCreateRequest {
  @ApiProperty({ description: 'Email address', example: 'user@iuroadmap.com' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(EntityConstant.Email)
  email!: string;

  @ApiProperty({ description: 'Password (min 6 characters)', example: 'SecurePass123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(EntityConstant.PasswordMin)
  @MaxLength(EntityConstant.PasswordMax)
  password!: string;

  @ApiPropertyOptional({ description: 'Full name', example: 'Nguyen Van A' })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.Fullname)
  name?: string;

  @ApiProperty({ description: 'Role ID to assign', example: 'uuid-role-id' })
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  roleId!: string;
}
