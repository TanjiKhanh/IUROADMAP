import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const E2E_HSSE_STORAGE_STATE = path.join(__dirname, '../../.auth/e2e-hsse-user.json');

setup('authenticate hsse via browser', async ({ page }) => {
  setup.setTimeout(90000);

  const phone = process.env.HSSE_USER_PHONE ?? process.env.API_USER_PHONE;
  const password = process.env.HSSE_USER_PASSWORD ?? process.env.API_USER_PASSWORD;
  const baseURL = process.env.HSSE_WEB_BASE_URL ?? process.env.WEB_BASE_URL ?? 'http://localhost:3002';

  if (!phone || !password) {
    throw new Error('HSSE_USER_PHONE/HSSE_USER_PASSWORD (or API_USER_PHONE/API_USER_PASSWORD) must be set');
  }

  const authDir = path.dirname(E2E_HSSE_STORAGE_STATE);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  await page.goto(`${baseURL}/sign-in`, { waitUntil: 'networkidle' });

  const form = page.locator('form').first();
  await form.waitFor({ state: 'visible', timeout: 30000 });

  const phoneInput = form.locator('input[autocomplete="username"], input[type="text"]').first();
  const passwordInput = form.locator('input[autocomplete="current-password"], input[type="password"]').first();

  await phoneInput.fill(phone);
  await passwordInput.fill(password);

  // Click submit và đợi navigation
  const submitButton = form.locator('button[type="submit"]').first();
  const navigationPromise = page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }).catch(() => null);
  await submitButton.click();
  await navigationPromise;

  // Kiểm tra tenant selection modal
  const tenantDialog = page.locator('.ant-modal').first();
  if (await tenantDialog.isVisible({ timeout: 5000 }).catch(() => false)) {
    console.log('Tenant modal detected, selecting first tenant...');
    const firstTenantButton = tenantDialog.locator('.ant-modal-body button[type="button"]').first();
    if (await firstTenantButton.isVisible().catch(() => false)) {
      await firstTenantButton.click();
      await tenantDialog.waitFor({ state: 'hidden', timeout: 15000 }).catch(() => { });
      // Sau khi select tenant, đợi dashboard load
      await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => null);
    }
  }

  // Kiểm tra đã redirect tới dashboard (không phải sign-in)
  const maxRetries = 5;
  let currentUrl = page.url();
  for (let i = 0; i < maxRetries && currentUrl.includes('/sign-in'); i++) {
    console.log(`Still on sign-in page, waiting... (attempt ${i + 1}/${maxRetries})`);
    await page.waitForTimeout(1000);
    currentUrl = page.url();
  }

  if (currentUrl.includes('/sign-in')) {
    throw new Error('HSSE login failed: stuck on sign-in page after 5 seconds');
  }

  // Cuối cùng, kiểm tra token trong localStorage (đã có ở đây)
  const token = await page.evaluate(() => localStorage.getItem('access_token'));
  if (!token || token.length <= 10) {
    console.warn('Token not found in localStorage after successful login redirect');
  } else {
    console.log('✓ Token found in localStorage');
  }

  // Save authentication state
  await page.context().storageState({ path: E2E_HSSE_STORAGE_STATE });
  console.log('✓ Authentication completed, storage state saved to', E2E_HSSE_STORAGE_STATE);
});
