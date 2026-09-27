import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationRequest } from '@iuroadmap/shared';

export class MajorFilterRequest extends PaginationRequest {
  @ApiPropertyOptional({ description: 'Only majors of this department' })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  departmentId?: number;
}
