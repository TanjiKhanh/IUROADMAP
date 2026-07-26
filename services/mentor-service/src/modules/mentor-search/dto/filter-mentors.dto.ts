import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterMentorsDto {
  /**
   * Comma-separated list of skills to filter by
   * @example "Node.js,TypeScript,React"
   */
  @ApiPropertyOptional({ description: 'Comma-separated list of skills to filter by', example: 'Node.js,TypeScript,React' })
  @IsOptional()
  @IsString()
  skills?: string;

  /**
   * Industry to filter by
   * @example "Tech"
   */
  @ApiPropertyOptional({ description: 'Industry to filter by', example: 'Tech' })
  @IsOptional()
  @IsString()
  industry?: string;

  /**
   * Search text (searches in bio and linkedinUrl)
   * @example "Senior Developer"
   */
  @ApiPropertyOptional({ description: 'Search text (searches in bio and linkedinUrl)', example: 'Senior Developer' })
  @IsOptional()
  @IsString()
  search?: string;

  /**
   * Number of results to return (default: 10, max: 100)
   * @example 10
   */
  @ApiPropertyOptional({ description: 'Number of results to return (default: 10, max: 100)', example: 10, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  /**
   * Number of results to skip for pagination
   * @example 0
   */
  @ApiPropertyOptional({ description: 'Number of results to skip for pagination', example: 0, default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number = 0;

  /**
   * Field to sort by (createdAt, updatedAt, industry)
   * @example "createdAt"
   */
  @ApiPropertyOptional({ description: 'Field to sort by', example: 'createdAt', default: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  /**
   * Sort order (asc or desc)
   * @example "desc"
   */
  @ApiPropertyOptional({ description: 'Sort order (asc or desc)', example: 'desc', default: 'desc' })
  @IsOptional()
  @IsString()
  order?: string = 'desc';
}