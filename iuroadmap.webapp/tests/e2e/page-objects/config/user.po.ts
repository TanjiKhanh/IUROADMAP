import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ROUTES, SELECTORS, TIMEOUTS, NON_EXISTENT_UUID } from '../../helpers/test-constants';
import { ToastComponent } from '../shared/toast.po';
import { DialogComponent } from '../shared/dialog.po';
import { FormControlsHelper } from '../shared/form-controls.po';
import { PaginationTableComponent } from '../shared/pagination-table.po';

/**
 * User List Page Object
 *
 * Maps to: src/views/config/user/userListPage.tsx
 * Route:   /config/users
 */
export class UserListPage {
  readonly page: Page;
  readonly toast: ToastComponent;
  readonly dialog: DialogComponent;
  readonly form: FormControlsHelper;
  readonly table: PaginationTableComponent;

  constructor(page: Page) {
    this.page = page;
    this.toast = new ToastComponent(page);
    this.dialog = new DialogComponent(page);
    this.form = new FormControlsHelper(page);
    this.table = new PaginationTableComponent(page);
  }

  // ─── Navigation ───────────────────────────────────────────────

  async goto() {
    await this.page.goto(ROUTES.config.users);
    await this.table.waitForLoad();
  }

  get addButton(): Locator {
    return this.page.locator('button:has-text("Thêm"), button:has-text("Add")').first();
  }

  // ─── Filter form ──────────────────────────────────────────────

  get keywordInput(): Locator {
    return this.page.locator(
      'input[name="keyword"], input[aria-label="Search by keyword"], input[placeholder*="Tìm"], input[placeholder*="tim"], input[placeholder*="search"], .ant-card input.ant-input'
    ).first();
  }

  get roleFilterSelect(): Locator {
    return this.page.locator('.ant-select').first();
  }

  get searchButton(): Locator {
    return this.page.locator('button:has-text("Tìm kiếm"), button:has-text("Search")').first();
  }

  async filterByKeyword(keyword: string) {
    await this.keywordInput.fill(keyword);
    await this.searchButton.click();
    await this.table.waitForLoad();
  }

  async filterByRole() {
    await this.roleFilterSelect.click();
    await this.page.waitForSelector(SELECTORS.selectDropdown, { state: 'visible', timeout: TIMEOUTS.short });
    const firstOption = this.page.locator(`${SELECTORS.selectOption}:not(.ant-select-item-option-disabled)`).first();
    await firstOption.click();
    await this.searchButton.click();
    await this.table.waitForLoad();
  }

  // ─── Row actions ──────────────────────────────────────────────

  /**
   * Click the eye (view detail) icon for a row matching the given text.
   * The button renders as a small icon button — we target SVG-based buttons.
   */
  async clickViewDetail(rowText: string) {
    const row = this.table.rowContaining(rowText);
    // View detail: first action icon button in the row
    await row.locator('button').nth(0).click();
  }

  async clickEdit(rowText: string) {
    const row = this.table.rowContaining(rowText);
    // Edit: second action icon button in the row
    await row.locator('button').nth(1).click();
  }

  async clickDelete(rowText: string) {
    const row = this.table.rowContaining(rowText);
    // Delete: third action icon button (danger)
    await row.locator('button').nth(2).click();
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
 * User Create Page Object
 *
 * Maps to: src/views/config/user/userCreatePage.tsx
 * Route:   /config/users/create
 */
export class UserCreatePage {
  readonly page: Page;
  readonly toast: ToastComponent;
  readonly form: FormControlsHelper;

  constructor(page: Page) {
    this.page = page;
    this.toast = new ToastComponent(page);
    this.form = new FormControlsHelper(page);
  }

  async goto() {
    await this.page.goto(ROUTES.config.userCreate);
  }

  get nameInput(): Locator {
    return this.page.locator('input#name, input[name="name"]').first();
  }

  get emailInput(): Locator {
    return this.page.locator('input#email, input[name="email"]').first();
  }

  get passwordInput(): Locator {
    return this.page.locator('input[type="password"]').first();
  }

  get roleSelect(): Locator {
    return this.page.locator('.ant-select').first();
  }

  get submitButton(): Locator {
    return this.page.locator('button[type="submit"]').first();
  }

  get cancelButton(): Locator {
    return this.page.locator('button:has-text("Hủy"), button:has-text("Cancel")').first();
  }

  async fillForm(opts: { name: string; email: string; password: string }) {
    await this.nameInput.fill(opts.name);
    await this.emailInput.fill(opts.email);
    await this.passwordInput.fill(opts.password);
    await this.roleSelect.click();
    await this.page.waitForSelector(SELECTORS.selectDropdown, { state: 'visible', timeout: TIMEOUTS.short });
    const firstOption = this.page.locator(`${SELECTORS.selectOption}:not(.ant-select-item-option-disabled)`).first();
    await firstOption.click();
  }

  async submit() {
    await this.submitButton.click();
  }

  async fillAndSubmit(opts: { name: string; email: string; password: string }) {
    await this.fillForm(opts);
    await this.submit();
  }

  // ─── Assertions ───────────────────────────────────────────────

  async expectOnPage() {
    await expect(this.submitButton).toBeVisible({ timeout: TIMEOUTS.navigation });
  }

  async expectValidationErrors() {
    await this.form.expectFormError();
  }

  async expectSuccess() {
    await this.page.waitForURL(ROUTES.config.users, { timeout: TIMEOUTS.navigation });
  }
}

/**
 * User Detail Page Object
 *
 * Maps to: src/views/config/user/userDetailPage.tsx
 * Route:   /config/users/:id
 */
export class UserDetailPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(id: string) {
    await this.page.goto(ROUTES.config.userDetail(id));
  }

  get editButton(): Locator {
    return this.page.locator('button:has-text("Chỉnh sửa"), button:has-text("Edit")').first();
  }

  get backButton(): Locator {
    return this.page.locator('button:has-text("Quay lại"), button:has-text("Back")').first();
  }

  get errorResult(): Locator {
    return this.page.locator('.ant-result-error').first();
  }

  // ─── Assertions ───────────────────────────────────────────────

  async expectOnPage() {
    await expect(this.page.locator('.ant-card').first()).toBeVisible({ timeout: TIMEOUTS.navigation });
  }

  async expectEditButtonVisible() {
    await expect(this.editButton).toBeVisible();
  }

  async expectBackButtonVisible() {
    await expect(this.backButton).toBeVisible();
  }

  async expectErrorShown() {
    await expect(this.errorResult).toBeVisible({ timeout: TIMEOUTS.navigation });
  }
}

/**
 * User Edit Page Object
 *
 * Maps to: src/views/config/user/userEditPage.tsx
 * Route:   /config/users/:id/edit
 */
export class UserEditPage {
  readonly page: Page;
  readonly toast: ToastComponent;
  readonly form: FormControlsHelper;

  constructor(page: Page) {
    this.page = page;
    this.toast = new ToastComponent(page);
    this.form = new FormControlsHelper(page);
  }

  async goto(id: string) {
    await this.page.goto(ROUTES.config.userEdit(id));
  }

  get nameInput(): Locator {
    return this.page.locator('input#name, input[name="name"]').first();
  }

  get statusSelect(): Locator {
    return this.page.locator('.ant-select').nth(1);
  }

  get subscriptionTierSelect(): Locator {
    return this.page.locator('.ant-select').nth(2);
  }

  get submitButton(): Locator {
    return this.page.locator('button[type="submit"]').first();
  }

  async updateName(newName: string) {
    await this.form.fillByLabel('Họ và tên', newName);
    await this.submitButton.click();
  }

  // ─── Assertions ───────────────────────────────────────────────

  async expectPrePopulated() {
    const nameInput = this.nameInput;
    const value = await nameInput.inputValue();
    expect(value).not.toBe('');
  }

  async expectEditOnlyFieldsVisible() {
    // Status and SubscriptionTier selects are only shown in edit mode
    await expect(this.page.locator('.ant-form-item').filter({ hasText: 'Trạng thái' })).toBeVisible();
    await expect(this.page.locator('.ant-form-item').filter({ hasText: 'Gói' })).toBeVisible();
  }

  async expectSuccess() {
    await this.toast.expectSuccess();
    await this.page.waitForURL(ROUTES.config.users, { timeout: TIMEOUTS.navigation });
  }
}
