import { RoutePaths } from '@iuroadmap/core';

/** Router state the register and login pages pass to the email verification page */
export interface VerifyEmailLocationState {
  message?: string;
  messageType?: 'success' | 'warning';
  /** Seconds before "send a new code" is enabled */
  resendAfterSeconds?: number;
}

export function verifyEmailUrl(email: string): string {
  return `${RoutePaths.web.public.verifyEmail}?email=${encodeURIComponent(email)}`;
}
