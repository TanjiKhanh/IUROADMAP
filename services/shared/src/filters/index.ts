// @iuroadmap/shared - Exception Filters

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// ─── HTTP Exception Filter ───────────────────────────────────────────────────

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = typeof exceptionResponse === 'object'
      ? exceptionResponse
      : {
          status: 'error',
          code: 'INTERNAL_ERROR',
          message: exception.message,
        };

    this.logger.error(
      `[${request.method}] ${request.url} - ${status} - ${JSON.stringify(errorResponse)}`,
    );

    response.status(status).json({
      ...errorResponse,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

// ─── All Exceptions Filter ───────────────────────────────────────────────────

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      if (typeof response === 'string') {
        message = response;
      } else if (response && (response as any).message) {
        message = (response as any).message;
      } else if ((response as any).error) {
        message = (response as any).error;
      } else {
        message = JSON.stringify(response);
      }
    } else if (exception && exception.message) {
      message = exception.message;
    }

    this.logger.error(
      `${req.method} ${req.url} -> ${status} - ${Array.isArray(message) ? message.join(', ') : message}`,
      exception?.stack,
    );

    res.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      message,
    });
  }
}
