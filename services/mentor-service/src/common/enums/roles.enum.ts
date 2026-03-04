/**
 * Roles Enum
 * 
 * Canonical list of all roles in the GupJob system.
 * Add new roles here; all services will reference this enum.
 */
export enum UserRole {
  ADMIN = 'ADMIN',                   // Can manage users, mentors, content
  MENTOR = 'MENTOR',                 // Can teach, manage own profile
}

/**
 * Role hierarchy (for authorization checks)
 * Higher role index = more permissions
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.ADMIN]: 3,
  [UserRole.MENTOR]: 2,
};