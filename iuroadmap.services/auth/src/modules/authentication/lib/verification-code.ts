import { randomInt } from 'crypto';
import { AppConstant, EntityConstant } from '@iuroadmap/shared';

const { CodeTtlMinutes, MaxAttempts, ResendCooldownSeconds } = AppConstant.EmailVerification;
const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;

/** Stored verification state of a user (columns emailVerificationCode / Expires / Attempts) */
export interface VerificationCodeState {
  codeHash: string | null;
  expires: Date | null;
  attempts: number;
}

/** Why a submitted code is refused before its hash is compared, or CHECK to compare it */
export type CodePrecheck = 'NO_CODE' | 'TOO_MANY_ATTEMPTS' | 'EXPIRED' | 'CHECK';

/** Uniformly random digits from a CSPRNG, zero-padded so every code has the same length */
export function generateVerificationCode(): string {
  const length = EntityConstant.VerificationCode;
  return randomInt(0, 10 ** length).toString().padStart(length, '0');
}

export function codeExpiresAt(now: Date): Date {
  return new Date(now.getTime() + CodeTtlMinutes * MS_PER_MINUTE);
}

/**
 * Seconds left before another code may be sent; 0 means now. The send time is the expiry minus
 * the code lifetime, so no extra column is needed.
 */
export function secondsUntilResend(expires: Date | null, now: Date): number {
  if (!expires) return 0;
  const availableAt = expires.getTime() - CodeTtlMinutes * MS_PER_MINUTE + ResendCooldownSeconds * MS_PER_SECOND;
  return Math.max(0, Math.ceil((availableAt - now.getTime()) / MS_PER_SECOND));
}

export function precheckCode(state: VerificationCodeState, now: Date): CodePrecheck {
  if (!state.codeHash || !state.expires) return 'NO_CODE';
  if (state.attempts >= MaxAttempts) return 'TOO_MANY_ATTEMPTS';
  if (state.expires.getTime() <= now.getTime()) return 'EXPIRED';
  return 'CHECK';
}

export function attemptsLeft(failedAttempts: number): number {
  return Math.max(0, MaxAttempts - failedAttempts);
}
