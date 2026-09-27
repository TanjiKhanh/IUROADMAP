import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ROUTES, TIMEOUTS } from '../../helpers/test-constants';
import { SemesterCanvasComponent } from '../shared/semester-canvas.po';

/**
 * My Roadmap
 * Maps to: src/views/roadmap/my-roadmap/myRoadmapPage.tsx
 * Route:   /roadmap/my/:id
 */
export class MyRoadmapPage {
  readonly page: Page;
  readonly canvas: SemesterCanvasComponent;

  constructor(page: Page) {
    this.page = page;
    this.canvas = new SemesterCanvasComponent(page);
  }

  async goto(id: number) {
    await this.page.goto(ROUTES.roadmap.myRoadmap(id));
    await this.canvas.waitForLoad();
  }

  get editButton(): Locator {
    return this.page.getByTestId('roadmap-edit');
  }

  get saveButton(): Locator {
    return this.page.getByTestId('roadmap-save');
  }

  get summary(): Locator {
    return this.page.getByTestId('summary-bar');
  }

  async startEditing() {
    await this.editButton.click();
    await expect(this.saveButton).toBeVisible({ timeout: TIMEOUTS.short });
  }

  async save() {
    await this.saveButton.click();
    await expect(this.saveButton).toBeDisabled({ timeout: TIMEOUTS.formSubmit });
  }

  /** Term results drawer (click on a column title) */
  async openResults(termKey: string) {
    await this.canvas.laneHeader(termKey).click();
    await expect(this.page.getByTestId('results-save')).toBeVisible({ timeout: TIMEOUTS.navigation });
  }

  /** Row of the results table that shows `code` */
  resultRow(code: string): Locator {
    return this.page.locator('.ant-drawer .ant-table-row', { hasText: code });
  }

  /** Status "Graded", then weights and component scores (process / midterm / final). */
  async setGraded(code: string, weights: [number, number, number], scores: [number, number, number]) {
    const row = this.resultRow(code);
    await row.locator('.ant-select').first().click();
    // Options: not taken, studying, graded
    await this.page.locator('.ant-select-dropdown:visible .ant-select-item-option').nth(2).click();
    const inputs = row.locator('input.ant-input-number-input');
    for (const [i, value] of [...weights, ...scores].entries()) {
      await inputs.nth(i).fill(String(value));
    }
  }

  total(code: string): Locator {
    return this.page.getByTestId(`total-${code}`);
  }

  letter(code: string): Locator {
    return this.page.getByTestId(`letter-${code}`);
  }

  async saveResults() {
    const saved = this.page.waitForResponse((r) => r.request().method() === 'POST' && r.url().includes('/results/save'));
    await this.page.getByTestId('results-save').click();
    expect((await saved).ok()).toBe(true);
  }
}
