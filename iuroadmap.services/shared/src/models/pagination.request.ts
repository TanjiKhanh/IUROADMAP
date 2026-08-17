import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AppConstant } from '../constants/app.constant';

export class PaginationRequest {
  @ApiPropertyOptional({ description: 'Number of rows per page', default: AppConstant.Pagination.DefaultRowsPerPage })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  rowsPerPage?: number = AppConstant.Pagination.DefaultRowsPerPage;

  @ApiPropertyOptional({ description: 'Current page number', default: AppConstant.Pagination.DefaultPage })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  currentPage?: number = AppConstant.Pagination.DefaultPage;

  @ApiPropertyOptional({ description: 'Search keyword', example: 'keyword' })
  @IsOptional()
  @IsString()
  keyword?: string;

  public setDefaultValue(): void {
    if (!this.rowsPerPage) {
      this.rowsPerPage = AppConstant.Pagination.DefaultRowsPerPage;
    }
    if (!this.currentPage) {
      this.currentPage = AppConstant.Pagination.DefaultPage;
    }
  }
}

export class PaginationRequestWithFilter<T> extends PaginationRequest {
  @ApiPropertyOptional({ description: 'Filter object' })
  @IsOptional()
  filter?: T;
}
