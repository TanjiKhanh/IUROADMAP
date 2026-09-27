import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ROUTES, TIMEOUTS } from '../../helpers/test-constants';

/**
 * Sign-In Page Object
 *
 * Note: React Hook Form + PrimeReact InputText does NOT render `name` attributes
 * on the <input> DOM elements. We target inputs by type and position within the form.
 */
export class SignInPage {
  readonly page: Page;
  readonly form: Locator;
  readonly phoneInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly validationErrors: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('form');
    // First text input in the form is the phone/username field
    this.phoneInput = this.form.locator('input.p-inputtext').first();
    // Password input is identifiable by type
    this.passwordInput = this.form.locator('input[type="password"]');
    this.submitButton = this.form.locator('button[type="submit"]');
    this.errorMessage = page.locator('.p-toast-message-error, .invalid-feedback');
    this.validationErrors = this.form.locator('.invalid-feedback');
  }

  async goto() {
    await this.page.goto(ROUTES.signIn);
    await this.phoneInput.waitFor({ state: 'visible', timeout: TIMEOUTS.navigation });
  }

  async login(phone: string, password: string) {
    await this.phoneInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async loginAndWaitForRedirect(phone: string, password: string) {
    await this.login(phone, password);
    await this.page.waitForURL((url) => !url.pathname.includes('/sign-in'), {
      timeout: TIMEOUTS.navigation,
    });
  }

  async submitEmpty() {
    await this.phoneInput.clear();
    await this.passwordInput.clear();
    await this.submitButton.click();
  }

  // ─── Assertions ────────────────────────────────────────

  async expectOnSignInPage() {
    await expect(this.phoneInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async expectRedirectedAway() {
    await expect(this.page).not.toHaveURL(/\/sign-in/);
  }

  async expectValidationError() {
    await expect(this.errorMessage.first()).toBeVisible({ timeout: TIMEOUTS.toast });
  }

  async expectFieldValidationErrors() {
    await expect(this.validationErrors.first()).toBeVisible({ timeout: TIMEOUTS.formSubmit });
  }
}
