import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../../helpers/test-constants';

/**
 * Toast / Notification component helper (Ant Design)
 */
export class ToastComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get successToast(): Locator {
    return this.page.locator(SELECTORS.toastSuccess).first();
  }

  get errorToast(): Locator {
    return this.page.locator(SELECTORS.toastError).first();
  }

  async expectSuccess(timeout = TIMEOUTS.toast) {
    await expect(this.successToast).toBeVisible({ timeout });
  }

  async expectError(timeout = TIMEOUTS.toast) {
    await expect(this.errorToast).toBeVisible({ timeout });
  }
}
