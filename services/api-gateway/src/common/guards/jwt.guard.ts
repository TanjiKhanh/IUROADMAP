// gateway/src/common/guards/jwt.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException({
        status: 'error',
        code: 'NO_TOKEN',
        message: 'No token provided',
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS256'],
      });

      request.user = decoded;
      return true;
    } catch (error: any) {
      this.logger.error(`JWT verification failed: ${error.message}`);
      throw new UnauthorizedException({
        status: 'error',
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token',
      });
    }
  }

  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer') return null;

    return token;
  }
}