export class PaginatedResponseDto<T> {
  data: T[];

  meta: {
    total: number;
    limit: number;
    offset: number;
    pages: number;
  };

  message?: string;
}