import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterMentorsDto {
  /**
   * Comma-separated list of skills to filter by
   * @example "Node.js,TypeScript,React"
   */
  @IsOptional()
  @IsString()
  skills?: string;

  /**
   * Industry to filter by
   * @example "Tech"
   */
  @IsOptional()
  @IsString()
  industry?: string;

  /**
   * Search text (searches in bio and linkedinUrl)
   * @example "Senior Developer"
   */
  @IsOptional()
  @IsString()
  search?: string;

  /**
   * Number of results to return (default: 10, max: 100)
   * @example 10
   */
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
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number = 0;

  /**
   * Field to sort by (createdAt, updatedAt, industry)
   * @example "createdAt"
   */
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  /**
   * Sort order (asc or desc)
   * @example "desc"
   */
  @IsOptional()
  @IsString()
  order?: string = 'desc';
}