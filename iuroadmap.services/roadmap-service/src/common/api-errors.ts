import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ErrorCodes } from '@iuroadmap/shared';

type Extra = Record<string, unknown>;

/** Body shape understood by HttpExceptionFilter: { status, code, message, ...extra } */
function body(code: string, message: string, extra?: Extra) {
  return { status: 'error', code, message, ...(extra ?? {}) };
}

export const ApiErrors = {
  badRequest: (code: string, message: string, extra?: Extra) => new BadRequestException(body(code, message, extra)),
  conflict: (code: string, message: string, extra?: Extra) => new ConflictException(body(code, message, extra)),
  notFound: (message: string) => new NotFoundException(body(ErrorCodes.NOT_FOUND, message)),
  forbidden: (message = 'You do not own this resource') => new ForbiddenException(body(ErrorCodes.FORBIDDEN, message)),
  tooManyRequests: (code: string, message: string, extra?: Extra) =>
    new HttpException(body(code, message, extra), 429),
};

/**
 * Maps Prisma known errors to HTTP errors (P2002 unique → 409, P2025 missing → 404,
 * P2003 FK → 409). Anything else is logged and rethrown.
 */
export function handlePrismaError(logger: Logger, error: any, entity: string, operation: string, id?: number | string): never {
  if (error instanceof HttpException) throw error;
  if (error?.code === 'P2002') {
    const fields = Array.isArray(error?.meta?.target) ? error.meta.target.join(', ') : error?.meta?.target;
    throw ApiErrors.conflict(ErrorCodes.CONFLICT, `${entity} already exists with the same ${fields ?? 'unique fields'}`);
  }
  if (error?.code === 'P2025') {
    throw ApiErrors.notFound(`${entity}${id !== undefined ? ` with id ${id}` : ''} not found`);
  }
  if (error?.code === 'P2003') {
    throw ApiErrors.conflict(ErrorCodes.CONFLICT, `${entity}${id !== undefined ? ` ${id}` : ''} is referenced by other records`);
  }
  logger.error(`${operation} ${entity} failed: ${error?.message}`, error?.stack);
  throw error;
}
