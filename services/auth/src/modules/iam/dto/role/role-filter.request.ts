import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationRequest } from '@iuroadmap/shared';
import { IsOptional, IsString } from 'class-validator';

export class RoleFilterRequest extends PaginationRequest {
  @ApiPropertyOptional({ description: 'Search by role name' })
  @IsOptional()
  @IsString()
  keyword?: string;
}
