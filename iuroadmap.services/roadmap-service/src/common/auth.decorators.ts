import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtGuard, Role, RoleGuard, Roles } from '@iuroadmap/shared';

/** Roles allowed to manage curriculum, catalog and moderation (RM.AD). */
export const ADMIN_ROLES: string[] = [Role.ADMIN, Role.SUPERADMIN];

/** Admin-only endpoint: JWT + role check. */
export function AdminOnly() {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(JwtGuard, RoleGuard),
    Roles(...ADMIN_ROLES),
    ApiUnauthorizedResponse({ description: 'Missing or invalid token' }),
    ApiForbiddenResponse({ description: 'Admin role required' }),
  );
}

/** Any signed-in user (learner endpoints). Ownership is checked in the service. */
export function Authenticated() {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(JwtGuard),
    ApiUnauthorizedResponse({ description: 'Missing or invalid token' }),
  );
}
