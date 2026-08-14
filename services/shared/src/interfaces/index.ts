// @iuroadmap/shared - Interfaces

export interface IJwtPayload {
  sub: number;
  userId: number;
  email: string;
  role: string;
  deptId?: number | null;
  job?: string | null;
  iat?: number;
  exp?: number;
}

export interface IServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface IPaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
