import { UserRole } from '../enums/roles';

export type AccountStatus = 'PENDING_APPROVAL' | 'ACTIVE' | 'BANNED' | 'REJECTED';
export type SubscriptionTier = 'FREE' | 'VIP' | 'PRO';

export interface TokenProfile {
  sub: string;
  userId: string;
  email: string;
  role: UserRole;
  roles: UserRole[];
  permissions: string[];
  fullName?: string;
  status?: AccountStatus;
  subscriptionTier?: SubscriptionTier;
  subscriptionExpiresAt?: string | null;
  isSuperAdmin: boolean;
  expiresAt?: number;
  exp?: number;
  iat?: number;
}

export function parseToken(token: string): TokenProfile | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const base64Url = parts[1];

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);

    if (
      typeof payload.sub !== 'string' ||
      typeof payload.userId !== 'string' ||
      typeof payload.email !== 'string' ||
      typeof payload.role !== 'string'
    ) {
      return null;
    }

    if (typeof payload.exp === 'number' && payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    const roles = Array.isArray(payload.roles)
      ? payload.roles
      : [payload.role];
    const permissions = Array.isArray(payload.permissions)
      ? payload.permissions.filter((permission: unknown): permission is string => typeof permission === 'string')
      : typeof payload.permissions === 'string'
        ? [payload.permissions]
        : [];
    const role = payload.role as UserRole;

    return {
      sub: payload.sub,
      userId: payload.userId,
      email: payload.email,
      role,
      roles: roles.filter((value: unknown): value is UserRole => typeof value === 'string') as UserRole[],
      permissions,
      fullName: typeof payload.fullName === 'string' ? payload.fullName : payload.name,
      status: payload.status,
      subscriptionTier: payload.subscriptionTier,
      subscriptionExpiresAt: payload.subscriptionExpiresAt ?? null,
      isSuperAdmin: role === UserRole.SUPERADMIN,
      expiresAt: typeof payload.exp === 'number' ? payload.exp * 1000 : undefined,
      exp: payload.exp,
      iat: payload.iat,
    };
  } catch (e) {
    console.error('Failed to parse JWT token', e);
    return null;
  }
}
