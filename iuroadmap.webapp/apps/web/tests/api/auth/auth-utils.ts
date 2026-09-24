import fs from 'fs';
import path from 'path';

/**
 * Authentication state interface
 * Stores the access token and tenant ID for API requests
 */
export interface AuthState {
  accessToken: string;
  tenantId: string;
  companyId: string;
  areaId: string;
  loginUserId: string;
}

const AUTH_FILE_PATH = path.join(__dirname, '../../.auth/user.json');

/**
 * Store authentication state to file
 * @param state The authentication state to store
 */
export function storeAuthState(state: AuthState): void {
  const authDir = path.dirname(AUTH_FILE_PATH);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }
  fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(state, null, 2));
}

/**
 * Get stored authentication state from file
 * @returns The stored authentication state or null if not found
 */
export function getStoredAuthState(): AuthState | null {
  if (!fs.existsSync(AUTH_FILE_PATH)) {
    return null;
  }
  const data = fs.readFileSync(AUTH_FILE_PATH, 'utf-8');
  return JSON.parse(data) as AuthState;
}

/**
 * Get stored access token
 * @returns The access token or null if not found
 */
export function getStoredAuthToken(): string | null {
  const state = getStoredAuthState();
  return state?.accessToken ?? null;
}

/**
 * Get stored tenant ID
 * @returns The tenant ID or null if not found
 */
export function getStoredTenantId(): string | null {
  const state = getStoredAuthState();
  return state?.tenantId ?? null;
}

/**
 * Clear stored authentication state
 */
export function clearAuthState(): void {
  if (fs.existsSync(AUTH_FILE_PATH)) {
    fs.unlinkSync(AUTH_FILE_PATH);
  }
}
