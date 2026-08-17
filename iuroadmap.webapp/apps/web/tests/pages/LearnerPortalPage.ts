import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { APP_ROUTES } from '../support/app-routes';

/**
 * Page Object for Learner Portal (/dashboard, /explore, /roadmap/:id, macro/micro views)
 * Handles use cases UC-03 to UC-09 and invariants BR-02, BR-03, BR-09.
 */
export class LearnerPortalPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToDashboard() {
    await this.goto(APP_ROUTES.LEARNER.DASHBOARD);
  }

  async navigateToExploreMajors() {
    await this.clickLink(/explore majors/i);
    await this.verifyHeading(/explore majors/i);
  }

  async searchMajor(keyword: string) {
    await this.fillInputByPlaceholder(/search majors/i, keyword);
  }

  async viewMajorDetails() {
    await this.clickButton(/view details/i);
    await this.verifyHeading(/curriculum & prerequisites/i);
  }

  async cloneMajor() {
    const cloneBtn = this.page.getByRole('button', { name: /clone major|enroll/i });
    if (await cloneBtn.isVisible() && await cloneBtn.isEnabled()) {
      await cloneBtn.click();
      const confirmBtn = this.page.getByRole('button', { name: /confirm enrollment/i });
      if (await confirmBtn.isVisible()) await confirmBtn.click();
    }
  }

  async openMacroCanvasView() {
    await this.goto('/dashboard/roadmaps');
    const progressBtn = this.page.getByRole('button', { name: /view progress/i }).first();
    if (await progressBtn.isVisible()) {
      await progressBtn.click();
    }
    await expect(this.page.locator('.react-flow__viewport')).toBeVisible({ timeout: 5000 });
  }

  async clickCourseNodeByStatus(status = 'AVAILABLE') {
    const node = this.page.locator(`.react-flow__node[data-status="${status}"]`).first();
    await expect(node).toBeVisible();
    await node.click();
    await this.verifyHeading(/course topics & objectives/i);
  }

  async markTopicAsCompleted() {
    const completeBtn = this.page.getByRole('button', { name: /mark as completed/i });
    if (await completeBtn.isVisible()) {
      await completeBtn.click();
      await this.verifyToastMessage(/status updated successfully/i);
      await expect(completeBtn).toHaveText(/completed/i);
    }
  }
}
