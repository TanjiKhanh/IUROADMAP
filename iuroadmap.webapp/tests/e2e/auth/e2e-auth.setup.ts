import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const E2E_STORAGE_STATE = path.join(__dirname, '../../.auth/e2e-iuroadmap-user.json');

setup('authenticate via browser', async ({ page }) => {
  setup.setTimeout(90000);

  const email = process.env.API_USER_EMAIL;
  const password = process.env.API_USER_PASSWORD;
  const baseURL = process.env.WEB_BASE_URL ?? 'http://localhost:5173/';

  if (!email || !password) {
    throw new Error('API_USER_EMAIL and API_USER_PASSWORD must be set in .env');
  }

  const authDir = path.dirname(E2E_STORAGE_STATE);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  await page.goto(`${baseURL}/login`, { waitUntil: 'networkidle' });

  const form = page.locator('form').first();
  await form.waitFor({ state: 'visible', timeout: 30000 });

  // Use email input instead of phone
  const emailInput = form.locator('input[type="email"], input[autocomplete="username"], input[type="text"]').first();
  const passwordInput = form.locator('input[autocomplete="current-password"], input[type="password"]').first();

  await emailInput.fill(email);
  await passwordInput.fill(password);

  // Click submit and wait for navigation
  const submitButton = form.locator('button[type="submit"]').first();
  const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(() => null);
  await submitButton.click();
  await navigationPromise;

  // Check if we redirected away from sign-in
  const maxRetries = 5;
  let currentUrl = page.url();
  for (let i = 0; i < maxRetries && currentUrl.includes('/login'); i++) {
    console.log(`Still on sign-in page, waiting... (attempt ${i + 1}/${maxRetries})`);
    await page.waitForTimeout(1000);
    currentUrl = page.url();
  }

  if (currentUrl.includes('/login')) {
    throw new Error('Login failed: stuck on sign-in page after 5 seconds');
  }

  // Verify token in localStorage (if the app uses it)
  const token = await page.evaluate(() => localStorage.getItem('access_token') || localStorage.getItem('token'));
  if (!token || token.length <= 10) {
    console.warn('Token not found in localStorage after successful login redirect (may be stored elsewhere)');
  } else {
    console.log('✓ Token found in localStorage');
  }

  // Save authentication state
  await page.context().storageState({ path: E2E_STORAGE_STATE });
  console.log('✓ Authentication completed, storage state saved to', E2E_STORAGE_STATE);
});
