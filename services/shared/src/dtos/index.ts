// @iuroadmap/shared - Shared DTOs

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export * from './base.entity';

// ─── Pagination Request DTO ──────────────────────────────────────────────────

export class PaginationDto {
  @ApiPropertyOptional({ description: 'Page number (1-indexed)', example: 1, default: 1 })
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', example: 10, default: 10 })
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Number of items to skip', example: 0, default: 0 })
  skip?: number = 0;
}

// ─── Paginated Response ──────────────────────────────────────────────────────

export class PaginatedResponse<T> {
  @ApiProperty({ description: 'Response status', example: 'success' })
  status: 'success';

  @ApiProperty({ description: 'Array of data items', isArray: true })
  data: T[];

  @ApiProperty({
    description: 'Pagination metadata',
    example: { page: 1, limit: 10, total: 100, pages: 10 },
  })
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ─── Error Response ──────────────────────────────────────────────────────────

export class ErrorResponse {
  @ApiProperty({ description: 'Response status', example: 'error' })
  status: 'error';

  @ApiProperty({ description: 'Error code', example: 'VALIDATION_ERROR' })
  code: string;

  @ApiProperty({ description: 'Error message', example: 'Invalid request payload' })
  message: string;

  @ApiProperty({ description: 'Error timestamp', example: '2026-07-11T00:00:00.000Z' })
  timestamp: Date;

  @ApiProperty({ description: 'Request path where error occurred', example: '/api/v1/roadmaps' })
  path: string;
}
