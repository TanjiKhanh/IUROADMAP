import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityConstant } from '@iuroadmap/shared';
import { LecturerStatusEnum } from '../../../../common/enums';

export class LecturerCreateRequest {
  @ApiProperty({ description: 'Full name', example: 'Nguyen Van A', maxLength: EntityConstant.Fullname })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.Fullname)
  fullName!: string;

  @ApiPropertyOptional({ description: 'Academic title', example: 'TS', maxLength: EntityConstant.LecturerTitle })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.LecturerTitle)
  title?: string;

  @ApiProperty({ description: 'Department ID', example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  departmentId!: number;

  @ApiPropertyOptional({ description: 'Contact email (unique)', maxLength: EntityConstant.Email })
  @IsEmail()
  @IsOptional()
  @MaxLength(EntityConstant.Email)
  email?: string;

  @ApiPropertyOptional({ enum: LecturerStatusEnum, enumName: 'LecturerStatus', default: LecturerStatusEnum.ACTIVE })
  @IsEnum(LecturerStatusEnum)
  @IsOptional()
  status?: LecturerStatusEnum;
}
