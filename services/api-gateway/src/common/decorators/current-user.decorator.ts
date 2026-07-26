// gateway/src/common/decorators/current-user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface UserPayload {
  userId?: number;
  sub?: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

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