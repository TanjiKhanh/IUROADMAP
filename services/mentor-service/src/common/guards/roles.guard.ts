import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../enums/roles.enum';

/**
 * RolesGuard
 * 
 * Checks if authenticated user has one of the required roles.
 * Must be used WITH JwtAuthGuard (to ensure req.user is set).
 * 
 * Usage:
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * @Roles(UserRole.ADMIN)
 * async deleteUser(...) { }
 * 
 * If no @Roles decorator present on endpoint, guard allows all authenticated users.
 * If @Roles decorator present, user must have at least ONE of the listed roles.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
    // Get required roles from @Roles decorator metadata
    const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
    
    // If no @Roles decorator, allow all authenticated users
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException('User not found in request');
    }

    const userRoles = user.roles || [user.role];
    if (!userRoles || userRoles.length === 0) {
      throw new ForbiddenException('User has no roles assigned');
    }

    // Check if user has at least ONE of the required roles
    const hasRequiredRole = requiredRoles.some((requiredRole) =>
      userRoles.includes(requiredRole),
    );

    if (!hasRequiredRole) {
      throw new ForbiddenException(
        `Insufficient permissions. Required roles: ${requiredRoles.join(', ')}. Your role: ${userRoles.join(', ')}`,
      );
    }

    return true;
  }
}