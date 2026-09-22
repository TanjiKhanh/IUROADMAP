import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsUUID, MaxLength, MinLength } from 'class-validator';
import { EntityConstant } from '@iuroadmap/shared';

export class UserCreateRequest {
  @ApiProperty({ description: 'Email address', example: 'user@iuroadmap.com', format: 'email', maxLength: EntityConstant.Email })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(EntityConstant.Email)
  email!: string;

  @ApiProperty({ description: 'Password (min 6 characters)', example: 'SecurePass123', minLength: EntityConstant.PasswordMin, maxLength: EntityConstant.PasswordMax })
  @IsString()
  @IsNotEmpty()
  @MinLength(EntityConstant.PasswordMin)
  @MaxLength(EntityConstant.PasswordMax)
  password!: string;

  @ApiProperty({ description: 'Full name', example: 'Nguyen Van A', minLength: 1, maxLength: EntityConstant.Fullname })
  @IsString()
  @MaxLength(EntityConstant.Fullname)
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'Role ID to assign', example: 'uuid-role-id', format: 'uuid' })
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  roleId!: string;
}
