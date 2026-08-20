export interface IServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  meta: {
    total: number;
    page?: number;
    pages?: number;
    limit?: number;
    offset?: number;
    [key: string]: any;
  };
  message?: string;
}
