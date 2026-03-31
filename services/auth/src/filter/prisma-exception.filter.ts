import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma-client';

/**
 * Catches common Prisma client errors and maps them to HTTP responses.
 * Add any Prisma error codes you want to handle explicitly (P2002, P2025, etc).
 */
@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientInitializationError,
)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaClientExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    // Log full error for ops, redact in responses
    this.logger.error({
      message: exception?.message,
      code: exception?.code,
      meta: exception,
    });

    // Known request errors (constraint violations / not found)
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      let status = HttpStatus.BAD_REQUEST;
      let message = exception.message;

      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'Duplicate record (unique constraint failed)';
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Record not found';
          break;
        // add other Prisma codes you want to map specifically
        default:
          status = HttpStatus.BAD_REQUEST;
      }

      return res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
        error: message,
        // include code to help frontend map responses if desired
        code: exception.code,
      });
    }

    // Validation / initialization errors are treated as 500
    if (
      exception instanceof Prisma.PrismaClientValidationError ||
      exception instanceof Prisma.PrismaClientInitializationError
    ) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: req.url,
        error: 'Database initialization/validation error',
      });
    }

    // Fallback: not a Prisma error, let other filters handle it
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: req.url,
      error: 'Database error',
    });
  }
}