import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminRoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('🛡️ [RoleMiddleware] Checking permissions for:', req.originalUrl);

    const user = req.user;
    console.log('👤 [RoleMiddleware] User found in request:', user);

    if (!user) {
      console.error(
        '[RoleMiddleware] Access Denied: No user attached to request (AuthMiddleware failed?)',
      );
      throw new ForbiddenException('Access denied: User not authenticated');
    }

    const userRole = (user.role || '').toUpperCase();
    if (userRole !== 'ADMIN') {
      console.error(
        `[RoleMiddleware] Access Denied: Role mismatch. Required: ADMIN, Found: ${user.role}`,
      );
      throw new ForbiddenException('Access denied: Admins only');
    }

    console.log('✅ [RoleMiddleware] Access Granted. Proceeding to Proxy.');
    next();
  }
}