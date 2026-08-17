import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

export type UserPayload = IJwtPayload;

export const CurrentUser = createParamDecorator(
  (data: keyof IJwtPayload | string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = (request as any).user as any;

    if (!user) {
      return null;
    }

    if (data === 'userId' || data === 'sub') {
      return user.userId ?? user.sub;
    }

    return data ? user[data] : user;
  },
);
