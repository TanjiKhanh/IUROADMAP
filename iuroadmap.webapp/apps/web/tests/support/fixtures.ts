import { test as baseTest, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { LearnerPortalPage } from '../pages/LearnerPortalPage';
import { AdminPortalPage } from '../pages/AdminPortalPage';
import { MentorPortalPage } from '../pages/MentorPortalPage';
import { AuthApiClient } from '../api-clients/AuthApiClient';
import { LearnerApiClient } from '../api-clients/LearnerApiClient';
import { AdminApiClient } from '../api-clients/AdminApiClient';
import { MentorApiClient } from '../api-clients/MentorApiClient';

/**
 * Custom Playwright Fixture Architecture
 * Provides initialized Page Objects and API Clients injected automatically into test specs.
 */
type CustomFixtures = {
  // Page Objects
  authPage: AuthPage;
  learnerPage: LearnerPortalPage;
  adminPage: AdminPortalPage;
  mentorPage: MentorPortalPage;

  // API Clients
  authApi: AuthApiClient;
  learnerApi: LearnerApiClient;
  adminApi: AdminApiClient;
  mentorApi: MentorApiClient;
};

export const test = baseTest.extend<CustomFixtures>({
  authPage: async ({ page }, use) => {
    await use(new AuthPage(page));
  },
  learnerPage: async ({ page }, use) => {
    await use(new LearnerPortalPage(page));
  },
  adminPage: async ({ page }, use) => {
    await use(new AdminPortalPage(page));
  },
  mentorPage: async ({ page }, use) => {
    await use(new MentorPortalPage(page));
  },
  authApi: async ({ request }, use) => {
    await use(new AuthApiClient(request));
  },
  learnerApi: async ({ request }, use) => {
    await use(new LearnerApiClient(request));
  },
  adminApi: async ({ request }, use) => {
    await use(new AdminApiClient(request));
  },
  mentorApi: async ({ request }, use) => {
    await use(new MentorApiClient(request));
  },
});

export { expect };
