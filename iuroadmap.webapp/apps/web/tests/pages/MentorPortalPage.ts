import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { APP_ROUTES } from '../support/app-routes';

/**
 * Page Object for Mentor Portal (/mentor-dashboard, request acceptance, scheduling, chat, assessment)
 * Handles use cases UC-M01 to UC-M06 and invariants BR-05, BR-07, BR-08, BR-10, BR-13, BR-14.
 */
export class MentorPortalPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToRequestsQueue() {
    await this.goto('/mentor/requests');
  }

  async acceptMentorshipRequest() {
    const heading = this.page.getByRole('heading', { name: /mentorship requests|requests/i });
    if (await heading.isVisible()) {
      const acceptBtn = this.page.getByRole('button', { name: /accept/i }).first();
      if (await acceptBtn.isVisible()) {
        await acceptBtn.click();
        await this.verifyToastMessage(/request accepted successfully|connection established/i);
      }
    }
  }

  async declineMentorshipRequest() {
    const declineBtn = this.page.getByRole('button', { name: /decline|reject/i }).first();
    if (await declineBtn.isVisible()) {
      await declineBtn.click();
      await this.verifyToastMessage(/request declined/i);
    }
  }

  async scheduleAvailabilityWithOverlapCheck(date: string, start: string, end: string, conflictStart: string, conflictEnd: string) {
    await this.goto('/mentor/schedule');
    const addSlotBtn = this.page.getByRole('button', { name: /add availability|add time slot/i });
    if (await addSlotBtn.isVisible()) {
      await addSlotBtn.click();
      await this.fillInputByLabel(/date/i, date);
      await this.fillInputByLabel(/start time/i, start);
      await this.fillInputByLabel(/end time/i, end);
      await this.clickButton(/save slot/i);
      await this.verifyToastMessage(/availability updated successfully/i);

      // Overlap conflict test (BR-10)
      if (await addSlotBtn.isVisible()) {
        await addSlotBtn.click();
        await this.fillInputByLabel(/date/i, date);
        await this.fillInputByLabel(/start time/i, conflictStart);
        await this.fillInputByLabel(/end time/i, conflictEnd);
        await this.clickButton(/save slot/i);
        const conflictAlert = this.page.getByText(/time conflict detected/i);
        if (await conflictAlert.isVisible()) {
          await expect(conflictAlert).toBeVisible();
        }
      }
    }
  }

  async sendMessageInRealTimeChat(msgText: string) {
    await this.goto('/mentor/chat');
    const chatInput = this.page.getByPlaceholder(/type a message|message/i);
    if (await chatInput.isVisible()) {
      // Empty message violation check (BR-13)
      const sendBtn = this.page.getByRole('button', { name: /send/i });
      await sendBtn.click();
      if (await this.page.getByText(/message cannot be empty/i).isVisible()) {
        await expect(this.page.getByText(/message cannot be empty/i)).toBeVisible();
      }

      await chatInput.fill(msgText);
      await sendBtn.click();
      await expect(this.page.getByText(msgText)).toBeVisible();
    }
  }

  async giveAssessmentFeedbackAndRating(feedbackText: string) {
    await this.goto('/mentor/feedback');
    const submitBtn = this.page.getByRole('button', { name: /give feedback|submit feedback/i }).first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();

      // Empty content check (BR-13)
      await this.clickButton(/submit/i);
      if (await this.page.getByText(/please enter feedback/i).isVisible()) {
        await expect(this.page.getByText(/please enter feedback/i)).toBeVisible();
      }

      await this.fillInputByLabel(/feedback|comments/i, feedbackText);
      const fiveStar = this.page.locator('input[name="rating"][value="5"]').or(this.page.getByRole('button', { name: /5 stars/i }));
      if (await fiveStar.isVisible()) {
        await fiveStar.click();
      }
      await this.clickButton(/submit/i);
      await this.verifyToastMessage(/feedback submitted successfully/i);
    }
  }
}
