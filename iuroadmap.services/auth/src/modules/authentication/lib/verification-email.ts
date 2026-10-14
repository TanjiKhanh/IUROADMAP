import { AppConstant } from '@iuroadmap/shared';

export const VERIFICATION_EMAIL_SUBJECT = '[IUROADMAP] Verify your email';

const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

/** The name is typed by whoever signed up, so it is escaped before going into the HTML */
export function verificationEmailHtml(name: string | null | undefined, code: string): string {
  const greeting = name ? `Hi ${escapeHtml(name)},` : 'Hi there,';
  const { CodeTtlMinutes } = AppConstant.EmailVerification;
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
      <h2 style="color: ${AppConstant.Color.Primary};">Verify your email</h2>
      <p>${greeting}</p>
      <p>Enter this code on the IUROADMAP verification page to finish creating your account:</p>
      <div style="background-color: #f7fafc; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #2d3748;">
        ${code}
      </div>
      <p>This code expires in ${CodeTtlMinutes} minutes.</p>
      <p>If you did not sign up for IUROADMAP, ignore this email: nobody can use the account without this code.</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 12px; color: #a0aec0;">IUROADMAP</p>
    </div>
  `;
}
