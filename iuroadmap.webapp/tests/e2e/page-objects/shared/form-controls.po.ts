import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../../helpers/test-constants';

/**
 * Form Controls Helper
 *
 * Helpers for interacting with Ant Design form controls:
 * - Input (UiInputField)
 * - Select (UiSelectField)
 * - Checkbox
 */
export class FormControlsHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ─── Input ────────────────────────────────────────────────────

  /**
   * Fill an Ant Design Input by its label text (looks for the input within
   * the form-item that contains the label).
   */
  async fillByLabel(labelText: string, value: string) {
    const formItem = this.page
      .locator('.ant-form-item')
      .filter({ hasText: labelText })
      .first();
    const input = formItem.locator('input').first();
    await input.fill(value);
  }

  /**
   * Clear and re-fill an input by label.
   */
  async clearAndFillByLabel(labelText: string, value: string) {
    const formItem = this.page
      .locator('.ant-form-item')
      .filter({ hasText: labelText })
      .first();
    const input = formItem.locator('input').first();
    await input.click({ clickCount: 3 });
    await input.fill(value);
  }

  // ─── Select ───────────────────────────────────────────────────

  /**
   * Open an Ant Design Select by label and pick the first visible option.
   */
  async selectFirstOptionByLabel(labelText: string) {
    const formItem = this.page
      .locator('.ant-form-item')
      .filter({ hasText: labelText })
      .first();
    const select = formItem.locator('.ant-select').first();
    await select.click();
    await this.page.waitForSelector(SELECTORS.selectDropdown, { state: 'visible', timeout: TIMEOUTS.short });
    const firstOption = this.page.locator(`${SELECTORS.selectOption}:not(.ant-select-item-option-disabled)`).first();
    await firstOption.click();
  }

  /**
   * Open an Ant Design Select by label and pick option matching text.
   */
  async selectOptionByLabel(labelText: string, optionText: string) {
    const formItem = this.page
      .locator('.ant-form-item')
      .filter({ hasText: labelText })
      .first();
    const select = formItem.locator('.ant-select').first();
    await select.click();
    await this.page.waitForSelector(SELECTORS.selectDropdown, { state: 'visible', timeout: TIMEOUTS.short });
    const option = this.page
      .locator(`${SELECTORS.selectOption}`)
      .filter({ hasText: optionText })
      .first();
    await option.click();
  }

  // ─── Validation Errors ────────────────────────────────────────

  /**
   * Get all visible form validation error messages.
   */
  get formErrors(): Locator {
    return this.page.locator(SELECTORS.formError);
  }

  async expectFormError(labelText?: string) {
    if (labelText) {
      const formItem = this.page
        .locator('.ant-form-item')
        .filter({ hasText: labelText })
        .first();
      await expect(formItem.locator(SELECTORS.formError).first()).toBeVisible({
        timeout: TIMEOUTS.formSubmit,
      });
    } else {
      await expect(this.formErrors.first()).toBeVisible({ timeout: TIMEOUTS.formSubmit });
    }
  }

  // ─── Submit ───────────────────────────────────────────────────

  /**
   * Click the primary submit button (type="submit" or role="button" with primary class).
   */
  async submit() {
    const submitBtn = this.page
      .locator('button[type="submit"], button.ant-btn-primary[htmltype="submit"]')
      .first();
    await submitBtn.click();
  }

  /**
   * Click a button by its text content.
   */
  async clickButton(text: string) {
    await this.page.locator(`button:has-text("${text}")`).first().click();
  }
}
