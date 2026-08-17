import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { EntityConstant } from '@iuroadmap/shared';

export class RoleCreateRequest {
  @ApiProperty({ description: 'The name of the role', example: 'EDITOR' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.ShortString)
  name!: string;

  @ApiPropertyOptional({ description: 'A short description of the role', example: 'Can edit content' })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DescriptionShort)
  description?: string;

  @ApiPropertyOptional({ description: 'List of permission IDs associated with this role', type: [String] })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  permissionIds?: string[];
}
