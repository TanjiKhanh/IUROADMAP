import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationRequest } from '@iuroadmap/shared';
import { LecturerStatusEnum } from '../../../../common/enums';

/** `keyword` matches the full name or email. */
export class LecturerFilterRequest extends PaginationRequest {
  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  departmentId?: number;

  @ApiPropertyOptional({ enum: LecturerStatusEnum, enumName: 'LecturerStatus' })
  @IsEnum(LecturerStatusEnum)
  @IsOptional()
  status?: LecturerStatusEnum;
}
