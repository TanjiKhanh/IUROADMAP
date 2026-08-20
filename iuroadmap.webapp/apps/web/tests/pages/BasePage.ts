import { Page, Locator, expect } from '@playwright/test';

/**
 * Base Page Object Model containing reusable UI interaction helpers,
 * assertions, toast validation, and navigation waits.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async verifyPageTitle(regex: RegExp) {
    await expect(this.page).toHaveTitle(regex);
  }

  async verifyHeading(text: RegExp | string) {
    await expect(this.page.getByRole('heading', { name: text }).first()).toBeVisible();
  }

  async verifyToastMessage(text: RegExp | string) {
    const toast = this.page.getByText(text).first();
    await expect(toast).toBeVisible({ timeout: 5000 });
  }

  async clickButton(name: RegExp | string) {
    await this.page.getByRole('button', { name }).first().click();
  }

  async clickLink(name: RegExp | string) {
    await this.page.getByRole('link', { name }).first().click();
  }

  async fillInputByLabel(label: RegExp | string, value: string) {
    await this.page.getByLabel(label).first().fill(value);
  }

  async fillInputByPlaceholder(placeholder: RegExp | string, value: string) {
    await this.page.getByPlaceholder(placeholder).first().fill(value);
  }
}
