import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for IUROADMAP Web Application & API Gateway E2E/API Testing
 * Reference: QA_MASTER_TEST_CASES.md (Module 01, Module 02, Module 03)
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Run sequentially or controlled to preserve database transaction invariants
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Single worker prevents test contamination across DB instances during local testing
  reporter: [
    ['list'],
    ['html', { open: 'always', outputFolder: 'playwright-report' }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    trace: 'on',
    screenshot: 'on',
    video: 'retain-on-failure',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
