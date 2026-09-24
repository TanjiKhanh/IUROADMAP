import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../../helpers/test-constants';

/**
 * Ant Design confirmation modal / popconfirm helper
 */
export class DialogComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get modal(): Locator {
    return this.page.locator(SELECTORS.confirmModal).first();
  }

  get okButton(): Locator {
    return this.page.locator(SELECTORS.confirmOkBtn).first();
  }

  get cancelButton(): Locator {
    return this.page.locator(SELECTORS.confirmCancelBtn).first();
  }

  async confirm(timeout = TIMEOUTS.formSubmit) {
    await this.okButton.waitFor({ state: 'visible', timeout });
    await this.okButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async expectVisible(timeout = TIMEOUTS.formSubmit) {
    await expect(this.modal).toBeVisible({ timeout });
  }
}
