/** BR-AUTH-01: emails are stored and compared trimmed and lowercase */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
