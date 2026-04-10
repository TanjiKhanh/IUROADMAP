// gateway/src/common/interceptors/response.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const startTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        const duration = Date.now() - startTime;

        // Some downstream services already return { success: true, data: ... }.
        // Unwrap once here to avoid nested payloads like data.data.
        const normalizedData =
          data &&
          typeof data === 'object' &&
          'success' in data &&
          'data' in data
            ? (data as { data: unknown }).data
            : data;

        this.logger.log(
          `[${request.method}] ${request.url} - ${response.statusCode} - ${duration}ms`,
        );

        return {
          status: 'success',
          data: normalizedData,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      }),
    );
  }
}