import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: '.',
  /* Global setup for all tests */
  globalSetup: require.resolve('./global-setup.ts'),
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['json', { outputFile: 'test-results/results.json' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.WEB_BASE_URL || 'http://localhost:3002',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // ─── API Tests ─────────────────────────────────────────
    {
      name: 'api-setup',
      testMatch: /api\/auth\/auth\.setup\.ts/,
    },
    {
      name: 'api',
      testMatch: /api\/(?!auth).*\.spec\.ts/,
      dependencies: ['api-setup'],
    },
    // PTW specs are fully self-contained (they log in themselves and create every fixture),
    // so they do not need the shared `api-setup` auth state.
    {
      name: 'api-ptw',
      testMatch: /api\/ptw\/.*\.spec\.ts/,
    },

    // ─── E2E Browser Tests ─────────────────────────────────
    {
      name: 'e2e-setup',
      testMatch: /e2e\/auth\/e2e-auth\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'e2e',
      testMatch: /e2e\/specs\/.*\.spec\.ts/,
      dependencies: ['e2e-setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/e2e-hsse-user.json',
      },
    },

    // ─── E2E Browser Tests (HSSE / Ant Design) ─────────────
    {
      name: 'e2e-hsse-setup',
      testMatch: /e2e-hsse\/auth\/e2e-auth\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.HSSE_WEB_BASE_URL || process.env.WEB_BASE_URL || 'http://localhost:3002',
      },
    },
    {
      name: 'e2e-hsse',
      testMatch: /e2e-hsse\/specs\/.*\.spec\.ts/,
      dependencies: ['e2e-hsse-setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.HSSE_WEB_BASE_URL || process.env.WEB_BASE_URL || 'http://localhost:3002',
        storageState: '.auth/e2e-hsse-user.json',
      },
    },

    // ─── E2E Mobile Viewport ───────────────────────────────
    // {
    //   name: 'e2e-mobile',
    //   testMatch: /e2e\/specs\/.*\.spec\.ts/,
    //   dependencies: ['e2e-setup'],
    //   use: {
    //     ...devices['Pixel 5'],
    //     storageState: '.auth/e2e-user.json',
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'cd .. && yarn web:start:dev',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});
