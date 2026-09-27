import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ROUTES, TIMEOUTS } from '../../helpers/test-constants';

/**
 * Course Explorer and course page
 * Maps to: src/views/roadmap/courses/courseExplorerPage.tsx, courseDetailPage.tsx
 */
export class CourseExplorerPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(ROUTES.roadmap.exploreCourses);
  }

  async search(keyword: string) {
    const box = this.page.getByPlaceholder(/code or name|mã hoặc tên/i).first();
    await box.fill(keyword);
    await box.press('Enter');
  }

  card(code: string): Locator {
    return this.page.getByTestId(`course-card-${code}`);
  }

  async openCourse(code: string) {
    await this.card(code).click();
    await expect(this.page.getByTestId('course-detail')).toBeVisible({ timeout: TIMEOUTS.navigation });
  }

  async chooseYear(label: string) {
    await this.page.getByTestId('course-year-select').click();
    await this.page.locator('.ant-select-dropdown:visible .ant-select-item-option', { hasText: label }).click();
  }

  tab(name: RegExp): Locator {
    return this.page.getByRole('tab', { name });
  }

  async postComment(text: string) {
    const thread = this.page.getByTestId('comment-thread');
    await thread.locator('textarea').first().fill(text);
    await this.page.getByTestId('comment-submit').first().click();
    await expect(thread.getByText(text)).toBeVisible({ timeout: TIMEOUTS.formSubmit });
  }
}
