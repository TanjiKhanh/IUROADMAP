import { UserRole } from '../enums/roles';

export interface TokenProfile {
  sub: string;
  userId: string;
  email: string;
  role: UserRole;
  roles: UserRole[]; // Added for convenience to map to array-based menus
  permissions: string[];
  exp?: number;
  iat?: number;
}

export function parseToken(token: string): TokenProfile | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    
    return {
      sub: payload.sub,
      userId: payload.userId,
      email: payload.email,
      role: payload.role as UserRole,
      roles: payload.role ? [payload.role as UserRole] : [],
      permissions: payload.permissions || [],
      exp: payload.exp,
      iat: payload.iat,
    };
  } catch (e) {
    console.error('Failed to parse JWT token', e);
    return null;
  }
}
