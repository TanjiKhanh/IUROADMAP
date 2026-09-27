import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { timingSafeEqual } from 'crypto';

export const INTERNAL_API_KEY_HEADER = 'x-api-key';

/**
 * Service-to-service calls (e.g. auth purging a deleted user). The key is ROADMAP_SERVICE_API_KEY;
 * when it is not configured every call is refused. These routes have no gateway prefix, so they
 * are reachable only inside the cluster.
 */
@Injectable()
export class InternalApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const expected = process.env.ROADMAP_SERVICE_API_KEY;
    const provided = context.switchToHttp().getRequest().headers?.[INTERNAL_API_KEY_HEADER];
    if (!expected || typeof provided !== 'string') throw new UnauthorizedException('Invalid internal API key');
    const a = Buffer.from(provided);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) throw new UnauthorizedException('Invalid internal API key');
    return true;
  }
}
