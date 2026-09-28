import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ROUTES, TIMEOUTS } from '../../helpers/test-constants';
import { SemesterCanvasComponent } from '../shared/semester-canvas.po';

/**
 * Admin curriculum canvas
 * Maps to: src/views/config/roadmap/curriculumCanvasPage.tsx
 * Route:   /config/curricula/:versionId/canvas
 */
export class CurriculumCanvasPage {
  readonly page: Page;
  readonly canvas: SemesterCanvasComponent;

  constructor(page: Page) {
    this.page = page;
    this.canvas = new SemesterCanvasComponent(page);
  }

  async goto(versionId: number) {
    await this.page.goto(ROUTES.config.curriculumCanvas(versionId));
    await this.canvas.waitForLoad();
  }

  get saveButton(): Locator {
    return this.page.getByTestId('canvas-save');
  }

  get publishButton(): Locator {
    return this.page.getByTestId('canvas-publish');
  }

  issue(code: string): Locator {
    return this.page.getByTestId(`issue-${code}`);
  }

  /** "+" of a catalog course: adds it at the bottom of the column chosen in the toolbar. */
  async addFromCatalog(code: string) {
    await (await this.canvas.findInCatalog(code)).getByRole('button').click();
  }

  /** Confirm the relation-type dialog opened after a connection (default: prerequisite). */
  async confirmRelation() {
    const dialog = this.page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: TIMEOUTS.short });
    await dialog.getByRole('button').last().click();
    await expect(dialog).toBeHidden({ timeout: TIMEOUTS.short });
  }

  async save() {
    await this.saveButton.click();
    await expect(this.saveButton).toBeDisabled({ timeout: TIMEOUTS.formSubmit });
  }

  async publishAcknowledgingWarnings() {
    await this.publishButton.click();
    const dialog = this.page.getByRole('dialog');
    await expect(dialog).toBeVisible({ timeout: TIMEOUTS.short });
    const acknowledge = this.page.getByTestId('publish-acknowledge');
    const ok = dialog.getByRole('button').last();
    // Issues load asynchronously: either warnings to acknowledge appear, or OK becomes enabled
    await expect(acknowledge.or(ok.and(this.page.locator('button:not([disabled])')))).toBeVisible({ timeout: TIMEOUTS.formSubmit });
    if (await acknowledge.isVisible()) await acknowledge.check();
    await ok.click();
    await expect(dialog).toBeHidden({ timeout: TIMEOUTS.formSubmit });
  }
}
