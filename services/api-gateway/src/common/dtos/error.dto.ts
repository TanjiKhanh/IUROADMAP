// gateway/src/common/dtos/error.dto.ts

export class ErrorResponse {
  status: 'error';
  code: string;
  message: string;
  timestamp: Date;
  path: string;
}