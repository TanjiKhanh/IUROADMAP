import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtGuard } from '@iuroadmap/shared';

/**
 * Public endpoint that still wants to know the caller when a valid token is sent
 * (e.g. show my own hidden comment). Never rejects: an absent or invalid token = guest.
 */
@Injectable()
export class OptionalJwtGuard implements CanActivate {
  private readonly jwt = new JwtGuard();

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.headers?.authorization) return true;
    try {
      this.jwt.canActivate(context);
    } catch {
      request.user = undefined;
    }
    return true;
  }
}
