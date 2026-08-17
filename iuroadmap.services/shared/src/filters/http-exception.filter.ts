import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: Record<string, any>;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      errorResponse = typeof res === 'object' ? (res as Record<string, any>) : { message: res };
    } else if (exception instanceof Error) {
      this.logger.error(
        `Unhandled Exception: ${exception.message}`,
        exception.stack,
      );
      errorResponse = {
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: exception.message || 'Internal server error',
      };
    } else {
      this.logger.error(`Unknown Exception: ${JSON.stringify(exception)}`);
      errorResponse = {
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      };
    }

    this.logger.error(
      `[${request.method}] ${request.url} - ${status} - ${JSON.stringify(errorResponse)}`,
    );

    response.status(status).json({
      status: errorResponse.status || 'error',
      code: errorResponse.code || (status === 500 ? 'INTERNAL_ERROR' : undefined),
      ...errorResponse,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

/**
 * Backward compatibility alias for AllExceptionsFilter
 */
export const AllExceptionsFilter = HttpExceptionFilter;
export type AllExceptionsFilter = HttpExceptionFilter;
