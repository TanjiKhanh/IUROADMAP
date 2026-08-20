import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationRequest } from '@iuroadmap/shared';
import { IsOptional, IsString } from 'class-validator';

export class PermissionFilterRequest extends PaginationRequest {
  @ApiPropertyOptional({ description: 'Search by permission name' })
  @IsOptional()
  @IsString()
  keyword?: string;
}
