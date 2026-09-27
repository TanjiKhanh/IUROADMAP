/**
 * E2E Test Fixtures
 *
 * Extends Playwright's base test with custom fixtures for page objects.
 * All E2E specs should import { test, expect } from this file.
 */

import { test as base, expect } from '@playwright/test';
import { SignInPage } from '../page-objects/auth/sign-in.po';
import { NavigationPage } from '../page-objects/shared/navigation.po';
import { PaginationTableComponent } from '../page-objects/shared/pagination-table.po';
import { DialogComponent } from '../page-objects/shared/dialog.po';
import { FormControlsHelper } from '../page-objects/shared/form-controls.po';
import { ToastComponent } from '../page-objects/shared/toast.po';

/**
 * Custom fixture types
 */
type E2EFixtures = {
  signInPage: SignInPage;
  nav: NavigationPage;
  table: PaginationTableComponent;
  dialog: DialogComponent;
  form: FormControlsHelper;
  toast: ToastComponent;
};

/**
 * Extended test with page object fixtures
 */
export const test = base.extend<E2EFixtures>({
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  nav: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  table: async ({ page }, use) => {
    await use(new PaginationTableComponent(page));
  },
  dialog: async ({ page }, use) => {
    await use(new DialogComponent(page));
  },
  form: async ({ page }, use) => {
    await use(new FormControlsHelper(page));
  },
  toast: async ({ page }, use) => {
    await use(new ToastComponent(page));
  },
});

export { expect };
