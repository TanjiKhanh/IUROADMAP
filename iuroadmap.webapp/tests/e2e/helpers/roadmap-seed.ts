import path from 'path';
import type { APIRequestContext, Browser, Page } from '@playwright/test';
import { roadmapApi, type RoadmapApi } from '../../api/support/roadmapApi';

/** Key under which the web app keeps the access token (apps/web/src/auth/tokenStore.ts). */
const APP_TOKEN_KEY = 'iuroadmap.web.token';
/** Written by e2e/auth/e2e-auth.setup.ts */
const STORAGE_STATE = path.join(__dirname, '../../.auth/e2e-iuroadmap-user.json');

/**
 * API client for seeding E2E data, authenticated as the logged-in browser user. Calls go through
 * the web dev server `/api` proxy, so only WEB_BASE_URL is needed.
 */
export async function apiAsBrowserUser(page: Page, request: APIRequestContext): Promise<RoadmapApi> {
  await page.goto('/');
  const token = await page.evaluate((key) => localStorage.getItem(key), APP_TOKEN_KEY);
  if (!token) throw new Error('No access token in localStorage: run the e2e-setup project first');
  return roadmapApi(request, token);
}

/**
 * Same client for `beforeAll` hooks (test-scoped `page` / `request` fixtures are not available
 * there): opens a context with the saved login, runs `seed`, then closes the context.
 */
export async function seedAsBrowserUser<T>(browser: Browser, seed: (api: RoadmapApi) => Promise<T>): Promise<T> {
  const context = await browser.newContext({
    storageState: STORAGE_STATE,
    baseURL: process.env.WEB_BASE_URL ?? 'http://localhost:5173',
  });
  try {
    const page = await context.newPage();
    return await seed(await apiAsBrowserUser(page, context.request));
  } finally {
    await context.close();
  }
}
