// gateway/src/common/dtos/response.dto.ts

export class ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  code?: string;
  message?: string;
  timestamp?: Date;
  path?: string;
}