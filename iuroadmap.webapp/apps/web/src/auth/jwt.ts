/**
 * JWT model + parser for `apps/hsse`.
 *
 * Single source of truth = `@sop/core` (`packages/core/src/auth/jwt.ts`) — the
 * exact same model + parser used by `apps/mobile`. Re-exported here so the
 * existing `import { parseToken } from 'auth/jwt'` call sites keep working
 * without churn. Do NOT redeclare the types or parse logic here.
 */
export { parseToken } from '@iuroadmap/core';
export type { TokenProfile } from '@iuroadmap/core';
