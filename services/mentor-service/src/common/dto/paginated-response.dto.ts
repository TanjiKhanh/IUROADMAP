import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'Array of data items', isArray: true })
  data: T[];

  @ApiProperty({
    description: 'Pagination metadata',
    example: { total: 100, limit: 10, offset: 0, pages: 10 },
  })
  meta: {
    total: number;
    limit: number;
    offset: number;
    pages: number;
  };

  @ApiPropertyOptional({ description: 'Optional response status message', example: 'Success' })
  message?: string;
}