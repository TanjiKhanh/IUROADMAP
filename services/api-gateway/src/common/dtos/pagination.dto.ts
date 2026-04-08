// gateway/src/common/dtos/pagination.dto.ts

export class PaginationDto {
  page?: number = 1;
  limit?: number = 10;
  skip?: number = 0;
}

export class PaginatedResponse<T> {
  status: 'success';
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}