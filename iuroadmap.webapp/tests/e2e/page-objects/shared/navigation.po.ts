import type { Page } from '@playwright/test';

/**
 * Navigation Page Object
 *
 * Thin wrapper for common navigation actions used across E2E tests.
 */
export class NavigationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async waitForNetworkIdle(timeout = 15_000) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  currentUrl(): string {
    return this.page.url();
  }

  async waitForUrl(pattern: string | RegExp, timeout = 15_000) {
    await this.page.waitForURL(pattern, { timeout });
  }
}
