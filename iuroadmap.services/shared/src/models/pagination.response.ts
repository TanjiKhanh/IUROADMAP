import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationResponse<T> {
  @ApiProperty({ description: 'Number of rows per page', example: 20 })
  rowsPerPage!: number;

  @ApiProperty({ description: 'Current page number', default: 1 })
  currentPage: number = 1;

  @ApiProperty({ description: 'Total number of rows', example: 100 })
  totalRows!: number;

  // `type: Object` makes the items `{ type: object }`; without it Swagger emits `items: { type: array }`,
  // which Orval turns into an invalid `zod.array(zod.array())`. Endpoints narrow `datas` with ApiPaginatedResponse.
  @ApiPropertyOptional({ description: 'Array of data items', isArray: true, type: Object })
  datas?: T[];

  @ApiProperty({ description: 'Total number of pages', example: 5 })
  get totalPage(): number {
    if (!this.totalRows || !this.rowsPerPage) {
      return 0;
    }
    return Math.ceil(this.totalRows / this.rowsPerPage);
  }
}
