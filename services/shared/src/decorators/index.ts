// @iuroadmap/shared - Decorators

import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Request } from 'express';

// ─── User Payload Interface ───────────────────────────────────────────────────

export interface UserPayload {
  userId?: number;
  sub?: number;
  email: string;
  role: string;
  deptId?: number | null;
  job?: string | null;
  iat: number;
  exp: number;
}

// ─── @CurrentUser() Decorator ─────────────────────────────────────────────────

export const CurrentUser = createParamDecorator(
  (data: keyof UserPayload | string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as any;

    if (!user) {
      return null;
    }

    if (data === 'userId' || data === 'sub') {
      return user.userId ?? user.sub;
    }

    return data ? user[data] : user;
  },
);

// ─── @Roles() Decorator ──────────────────────────────────────────────────────

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
