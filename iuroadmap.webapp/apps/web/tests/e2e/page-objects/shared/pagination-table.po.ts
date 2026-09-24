import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { SELECTORS, TIMEOUTS } from '../../helpers/test-constants';

/**
 * Ant Design table + pagination helper
 */
export class PaginationTableComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get table(): Locator {
    return this.page.locator(SELECTORS.table).first();
  }

  get rows(): Locator {
    return this.page.locator(SELECTORS.tableRow);
  }

  get pagination(): Locator {
    return this.page.locator(SELECTORS.pagination).first();
  }

  get nextPageBtn(): Locator {
    return this.page.locator(SELECTORS.nextPageBtn).first();
  }

  get prevPageBtn(): Locator {
    return this.page.locator(SELECTORS.prevPageBtn).first();
  }

  async waitForLoad(timeout = TIMEOUTS.navigation) {
    await this.table.waitFor({ state: 'visible', timeout });
    // Wait for any skeleton/spinner to disappear
    await this.page.waitForSelector(SELECTORS.spinner, { state: 'detached', timeout }).catch(() => null);
  }

  async expectRowCount(count: number) {
    await expect(this.rows).toHaveCount(count);
  }

  async expectAtLeastOneRow(timeout = TIMEOUTS.long) {
    await expect(this.rows.first()).toBeVisible({ timeout });
  }

  async goToNextPage() {
    await this.nextPageBtn.click();
    await this.waitForLoad();
  }

  /**
   * Find a row containing the given text and return its locator
   */
  rowContaining(text: string): Locator {
    return this.page.locator(`${SELECTORS.tableRow}:has-text("${text}")`).first();
  }

  /**
   * Click the first button with the given aria-label in a specific row
   */
  async clickRowAction(rowText: string, ariaLabel: string) {
    const row = this.rowContaining(rowText);
    await row.locator(`button[aria-label="${ariaLabel}"]`).first().click();
  }
}
