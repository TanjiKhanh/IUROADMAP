// @iuroadmap/shared - Guards

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ROLES_KEY } from '../decorators';

// ─── JWT Guard ────────────────────────────────────────────────────────────────

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
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!, {
        algorithms: ['HS256'],
      });

      decoded.userId = decoded.userId ?? decoded.sub;
      decoded.sub = decoded.sub ?? decoded.userId;

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

// ─── Role Guard ───────────────────────────────────────────────────────────────

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as any;

    if (!user) {
      throw new ForbiddenException({
        status: 'error',
        code: 'NO_USER',
        message: 'User not found',
      });
    }

    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException({
        status: 'error',
        code: 'INSUFFICIENT_ROLE',
        message: `Required role: ${requiredRoles.join(', ')}`,
      });
    }

    return true;
  }
}
