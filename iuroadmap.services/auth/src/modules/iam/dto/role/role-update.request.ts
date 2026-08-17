import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsUUID, MaxLength } from 'class-validator';
import { EntityConstant } from '@iuroadmap/shared';

export class RoleUpdateRequest {
  @ApiProperty({ description: 'The UUID of the role to update' })
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;

  @ApiPropertyOptional({ description: 'The new name of the role', example: 'EDITOR_V2' })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.ShortString)
  name?: string;

  @ApiPropertyOptional({ description: 'A new short description', example: 'Can edit all content' })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DescriptionShort)
  description?: string;

  @ApiPropertyOptional({ description: 'Normalized name of the role' })
  @IsString()
  @IsOptional()
  normalizedName?: string;


  @ApiPropertyOptional({ description: 'List of permission IDs associated with this role', type: [String] })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  permissionIds?: string[];
}
