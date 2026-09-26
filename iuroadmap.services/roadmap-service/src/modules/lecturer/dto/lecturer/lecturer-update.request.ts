import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityConstant } from '@iuroadmap/shared';
import { LecturerStatusEnum } from '../../../../common/enums';

export class LecturerUpdateRequest {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  id!: number;

  @ApiPropertyOptional({ maxLength: EntityConstant.Fullname })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.Fullname)
  fullName?: string;

  @ApiPropertyOptional({ maxLength: EntityConstant.LecturerTitle })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.LecturerTitle)
  title?: string;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  departmentId?: number;

  @ApiPropertyOptional({ maxLength: EntityConstant.Email })
  @IsEmail()
  @IsOptional()
  @MaxLength(EntityConstant.Email)
  email?: string;

  @ApiPropertyOptional({ enum: LecturerStatusEnum, enumName: 'LecturerStatus' })
  @IsEnum(LecturerStatusEnum)
  @IsOptional()
  status?: LecturerStatusEnum;
}
