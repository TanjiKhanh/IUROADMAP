import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationResponse<T> {
  @ApiProperty({ description: 'Number of rows per page', example: 20 })
  rowsPerPage!: number;

  @ApiProperty({ description: 'Current page number', default: 1 })
  currentPage: number = 1;

  @ApiProperty({ description: 'Total number of rows', example: 100 })
  totalRows!: number;

  @ApiPropertyOptional({ description: 'Array of data items', isArray: true })
  datas?: T[];

  @ApiProperty({ description: 'Total number of pages', example: 5 })
  get totalPage(): number {
    if (!this.totalRows || !this.rowsPerPage) {
      return 0;
    }
    return Math.ceil(this.totalRows / this.rowsPerPage);
  }
}
