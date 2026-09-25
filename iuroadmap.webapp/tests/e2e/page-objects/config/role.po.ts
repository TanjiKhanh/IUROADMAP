import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ROUTES, SELECTORS, TIMEOUTS } from '../../helpers/test-constants';
import { ToastComponent } from '../shared/toast.po';
import { DialogComponent } from '../shared/dialog.po';
import { FormControlsHelper } from '../shared/form-controls.po';
import { PaginationTableComponent } from '../shared/pagination-table.po';

/**
 * Role List Page Object
 *
 * Maps to: src/views/config/role/roleListPage.tsx
 * Route:   /config/roles
 */
export class RoleListPage {
  readonly page: Page;
  readonly toast: ToastComponent;
  readonly dialog: DialogComponent;
  readonly table: PaginationTableComponent;

  constructor(page: Page) {
    this.page = page;
    this.toast = new ToastComponent(page);
    this.dialog = new DialogComponent(page);
    this.table = new PaginationTableComponent(page);
  }

  async goto() {
    await this.page.goto(ROUTES.config.roles);
    await this.table.waitForLoad();
  }

  get addButton(): Locator {
    return this.page.locator('button:has-text("Thêm"), button:has-text("Add")').first();
  }

  async clickAdd() {
    await this.addButton.click();
    await this.page.waitForURL(/\/config\/roles\/create/, { timeout: TIMEOUTS.navigation });
  }

  async clickEdit(rowText: string) {
    const row = this.table.rowContaining(rowText);
    // Edit: first action icon button in role list rows
    await row.locator('button').first().click();
  }

  async clickDelete(rowText: string) {
    const row = this.table.rowContaining(rowText);
    // Delete: second action icon button (danger)
    await row.locator('button').nth(1).click();
  }

  async deleteAndConfirm(rowText: string) {
    await this.clickDelete(rowText);
    await this.dialog.confirm();
    await this.table.waitForLoad();
  }

  // ─── Assertions ───────────────────────────────────────────────

  async expectOnPage() {
    await expect(this.table.table).toBeVisible({ timeout: TIMEOUTS.navigation });
  }

  async expectAddButtonVisible() {
    await expect(this.addButton).toBeVisible();
  }

  async expectRowVisible(text: string) {
    await expect(this.table.rowContaining(text)).toBeVisible({ timeout: TIMEOUTS.long });
  }

  async expectRowNotVisible(text: string) {
    await expect(this.table.rowContaining(text)).not.toBeVisible();
  }
}

/**
 * Role Create Page Object
 *
 * Maps to: src/views/config/role/roleCreatePage.tsx
 * Route:   /config/roles/create
 */
export class RoleCreatePage {
  readonly page: Page;
  readonly toast: ToastComponent;
  readonly form: FormControlsHelper;

  constructor(page: Page) {
    this.page = page;
    this.toast = new ToastComponent(page);
    this.form = new FormControlsHelper(page);
  }

  async goto() {
    await this.page.goto(ROUTES.config.roleCreate);
  }

  get nameInput(): Locator {
    return this.page.locator('input#name, input[name="name"]').first();
  }

  get submitButton(): Locator {
    return this.page.locator('button[type="submit"]').first();
  }

  get cancelButton(): Locator {
    return this.page.locator('button:has-text("Hủy"), button:has-text("Cancel")').first();
  }

  // Permission matrix helpers

  /** All permission group cards in the matrix */
  get permissionGroupCards(): Locator {
    return this.page.locator('.ant-card:has(> .ant-card-head .ant-checkbox)');
  }

  /** Get the first group header checkbox */
  get firstGroupHeaderCheckbox(): Locator {
    return this.permissionGroupCards.first().locator('.ant-checkbox-input').first();
  }

  /** Get first individual permission checkbox (not the group header) */
  get firstPermissionCheckbox(): Locator {
    return this.permissionGroupCards.first().locator('.ant-card-body .ant-checkbox-input').first();
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  async submit() {
    await this.submitButton.click();
  }

  async fillAndSubmit(name: string) {
    await this.fillName(name);
    await this.submit();
  }

  async toggleFirstGroupPermissions() {
    await this.firstGroupHeaderCheckbox.click();
  }

  async checkFirstPermission() {
    await this.firstPermissionCheckbox.click();
  }

  // ─── Assertions ───────────────────────────────────────────────

  async expectOnPage() {
    await expect(this.nameInput).toBeVisible({ timeout: TIMEOUTS.navigation });
  }

  async expectPermissionMatrixVisible() {
    // Permission matrix card should exist
    await expect(this.page.locator('.ant-card').filter({ hasText: 'Phân quyền' }).first()).toBeVisible({
      timeout: TIMEOUTS.long,
    });
  }

  async expectValidationError() {
    await this.form.expectFormError();
  }

  async expectSuccess() {
    await this.page.waitForURL(ROUTES.config.roles, { timeout: TIMEOUTS.navigation });
  }
}

/**
 * Role Edit Page Object
 *
 * Maps to: src/views/config/role/roleEditPage.tsx
 * Route:   /config/roles/:id/edit
 */
export class RoleEditPage {
  readonly page: Page;
  readonly toast: ToastComponent;
  readonly form: FormControlsHelper;

  constructor(page: Page) {
    this.page = page;
    this.toast = new ToastComponent(page);
    this.form = new FormControlsHelper(page);
  }

  async goto(id: string) {
    await this.page.goto(ROUTES.config.roleEdit(id));
  }

  get nameInput(): Locator {
    return this.page.locator('input#name, input[name="name"]').first();
  }

  get submitButton(): Locator {
    return this.page.locator('button[type="submit"]').first();
  }

  get errorResult(): Locator {
    return this.page.locator('.ant-result-error').first();
  }

  async updateName(newName: string) {
    const input = this.nameInput;
    await input.click({ clickCount: 3 });
    await input.fill(newName);
    await this.submitButton.click();
  }

  async clearNameAndSubmit() {
    const input = this.nameInput;
    await input.click({ clickCount: 3 });
    await input.fill('');
    await this.submitButton.click();
  }

  // ─── Assertions ───────────────────────────────────────────────

  async expectPrePopulated() {
    await this.nameInput.waitFor({ state: 'visible', timeout: TIMEOUTS.navigation });
    const value = await this.nameInput.inputValue();
    expect(value.trim()).not.toBe('');
  }

  async expectErrorShown() {
    await expect(this.page.locator('.ant-result').first()).toBeVisible({ timeout: TIMEOUTS.navigation });
  }

  async expectValidationError() {
    await this.form.expectFormError();
  }

  async expectSuccess() {
    await this.page.waitForURL(ROUTES.config.roles, { timeout: TIMEOUTS.navigation });
  }
}
