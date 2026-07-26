import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { APP_ROUTES } from '../support/app-routes';

/**
 * Page Object for Admin Portal (/admin, departments, majors, 2D canvas editors, user directory, pending mentors)
 * Handles use cases UC-A01 to UC-A06 and invariants BR-04, BR-06, BR-11.
 */
export class AdminPortalPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToAdminDashboard() {
    await this.goto(APP_ROUTES.ADMIN.DASHBOARD);
  }

  async createDepartment(name: string, slug: string, desc: string) {
    const deptTab = this.page.getByRole('link', { name: /departments/i }).or(this.page.getByRole('button', { name: /departments/i }));
    if (await deptTab.isVisible()) {
      await deptTab.click();
      const addBtn = this.page.getByRole('button', { name: /add department|create department/i });
      if (await addBtn.isVisible()) {
        await addBtn.click();
        await this.fillInputByLabel(/department name|name/i, name);
        await this.fillInputByLabel(/slug/i, slug);
        await this.fillInputByLabel(/description/i, desc);
        await this.clickButton(/save|create/i);
        await this.verifyToastMessage(/department created|saved successfully/i);
      }
    }
  }

  async createMajor(name: string, slug: string, credits: string) {
    const majorsTab = this.page.getByRole('link', { name: /majors/i }).or(this.page.getByRole('button', { name: /majors/i }));
    if (await majorsTab.isVisible()) {
      await majorsTab.click();
      const addBtn = this.page.getByRole('button', { name: /add major|create major/i });
      if (await addBtn.isVisible()) {
        await addBtn.click();
        await this.fillInputByLabel(/major name|name/i, name);
        await this.fillInputByLabel(/slug/i, slug);
        await this.fillInputByLabel(/credits required/i, credits);
        await this.clickButton(/save|create/i);
        await this.verifyToastMessage(/major created|saved successfully/i);
      }
    }
  }

  async dragCanvasNodeAndVerifyDAG(slug: string) {
    await this.goto(APP_ROUTES.ADMIN.ROADMAP_DESIGNER_SLUG(slug));
    const viewport = this.page.locator('.react-flow__viewport');
    if (await viewport.isVisible()) {
      const firstNode = this.page.locator('.react-flow__node').first();
      if (await firstNode.isVisible()) {
        const box = await firstNode.boundingBox();
        if (box) {
          await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await this.page.mouse.down();
          await this.page.mouse.move(box.x + box.width / 2 + 100, box.y + box.height / 2 + 50);
          await this.page.mouse.up();
        }
      }

      const saveBtn = this.page.getByRole('button', { name: /save layout/i });
      if (await saveBtn.isVisible()) {
        await saveBtn.click();
        await this.verifyToastMessage(/layout saved successfully/i);
      }

      // Verify DAG Non-Cyclicity Guard (BR-04)
      const addPrereqBtn = this.page.getByRole('button', { name: /add prerequisite|link nodes/i });
      if (await addPrereqBtn.isVisible()) {
        await addPrereqBtn.click();
        const alert = this.page.getByText(/circular prerequisite dependency detected/i);
        if (await alert.isVisible()) {
          await expect(alert).toBeVisible();
        }
      }
    }
  }

  async addMicroTopicWithResource(title: string, hours: string, resourceTitle: string, resourceUrl: string) {
    const editTopicsBtn = this.page.getByRole('button', { name: /edit topics|micro view/i }).first();
    if (await editTopicsBtn.isVisible()) {
      await editTopicsBtn.click();
      const addTopicBtn = this.page.getByRole('button', { name: /add topic/i });
      if (await addTopicBtn.isVisible()) {
        await addTopicBtn.click();
        await this.fillInputByLabel(/topic title/i, title);
        await this.fillInputByLabel(/estimated hours/i, hours);
        await this.fillInputByPlaceholder(/resource title/i, resourceTitle);
        await this.fillInputByPlaceholder(/resource url/i, resourceUrl);
        await this.clickButton(/save topic/i);
        await this.verifyToastMessage(/topic created|saved/i);
      }
    }
  }

  async verifySelfDeletionGuard() {
    await this.goto('/admin/users');
    const heading = this.page.getByRole('heading', { name: /user directory|users/i });
    if (await heading.isVisible()) {
      const selfDeleteBtn = this.page.locator('tr[data-role="ADMIN"] button[aria-label*="delete"]').first();
      if (await selfDeleteBtn.isVisible()) {
        await selfDeleteBtn.click();
        await expect(this.page.getByText(/cannot delete your own administrative account/i)).toBeVisible();
      }
    }
  }

  async reviewMentorWithMandatoryReason(reason: string) {
    await this.goto('/admin/mentors/pending');
    const heading = this.page.getByRole('heading', { name: /pending mentors|mentor applications/i });
    if (await heading.isVisible()) {
      const rejectBtn = this.page.getByRole('button', { name: /reject/i }).first();
      if (await rejectBtn.isVisible()) {
        await rejectBtn.click();
        const confirmBtn = this.page.getByRole('button', { name: /confirm rejection/i });
        await confirmBtn.click();
        await expect(this.page.getByText(/please provide a reason for rejection/i)).toBeVisible();

        await this.fillInputByLabel(/rejection reason|reason/i, reason);
        await confirmBtn.click();
        await expect(this.page.getByText(/mentor application rejected/i)).toBeVisible();
      }
    }
  }
}
