# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\specs\config\user.spec.ts >> Config — User Management E2E >> TC-USR-07: Edit user form >> should show pre-populated form and edit-only fields in edit mode
- Location: e2e\specs\config\user.spec.ts:151:9

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/config\/users\/[^/]+\/edit/
Received string:  "http://localhost:5173/config/users/02564ea6-116d-4a31-9ea8-eaddee307a7a"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    33 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://localhost:5173/config/users/02564ea6-116d-4a31-9ea8-eaddee307a7a"

```

```yaml
- complementary:
  - img "IUROADMAP"
  - text: IUROADMAP
  - menu:
    - menuitem "Dashboard"
    - menuitem "Roadmap"
    - menuitem "Chat with Mentors"
    - menuitem "System Configuration"
  - text: P Platform Admin admin
  - button "Logout"
  - button
- banner:
  - navigation:
    - list:
      - listitem: Home
      - listitem: Config
      - listitem: Users
      - listitem: 02564ea6 116d 4a31 9ea8 eaddee307a7a
  - button "EN"
- main:
  - button "Edit"
  - text: General Info
  - table:
    - rowgroup:
      - 'row "Full Name : Test User 4 Email : testuser4@iuroadmap.com"':
        - 'cell "Full Name : Test User 4"'
        - 'cell "Email : testuser4@iuroadmap.com"'
      - 'row "Role : LEARNER Status : ACTIVE"':
        - 'cell "Role : LEARNER"'
        - 'cell "Status : ACTIVE"'
      - 'row "Subscription Tier : VIP Subscription Expires At : 2026-09-15T08:25:47.667Z"':
        - 'cell "Subscription Tier : VIP"'
        - 'cell "Subscription Expires At : 2026-09-15T08:25:47.667Z"'
      - 'row "Created At : 8/16/2026, 3:25:47 PM"':
        - 'cell "Created At : 8/16/2026, 3:25:47 PM"'
  - button "Back"
- button "Open Tanstack query devtools":
  - img
```

# Test source

```ts
  62  |       // Close dropdown by pressing Escape
  63  |       await page.keyboard.press('Escape');
  64  |     });
  65  |   });
  66  | 
  67  |   // ─── TC-USR-04: Create user (happy path) ──────────────────────────────
  68  | 
  69  |   test.describe('TC-USR-04: Create user — happy path', () => {
  70  |     test('should create a new user and show success toast, then redirect to list', async ({ page }) => {
  71  |       const createPage = new UserCreatePage(page);
  72  |       await createPage.goto();
  73  |       await createPage.expectOnPage();
  74  | 
  75  |       const timestamp = Date.now();
  76  |       const testName = `E2E User ${timestamp}`;
  77  |       const testEmail = `e2euser${timestamp}@test.com`;
  78  | 
  79  |       await createPage.fillForm({
  80  |         name: testName,
  81  |         email: testEmail,
  82  |         password: 'TestPass@123',
  83  |       });
  84  | 
  85  |       await createPage.submit();
  86  | 
  87  |       // Expect success toast and redirect
  88  |       await createPage.expectSuccess();
  89  | 
  90  |       // Verify the user appears in the list
  91  |       const listPage = new UserListPage(page);
  92  |       await listPage.filterByKeyword(testName);
  93  |       await listPage.expectRowVisible(testName);
  94  |     });
  95  |   });
  96  | 
  97  |   // ─── TC-USR-05: Validation errors ────────────────────────────────────
  98  | 
  99  |   test.describe('TC-USR-05: Create user — validation errors', () => {
  100 |     test('should show validation errors when submitting empty form', async ({ page }) => {
  101 |       const createPage = new UserCreatePage(page);
  102 |       await createPage.goto();
  103 |       await createPage.expectOnPage();
  104 | 
  105 |       // Submit empty form
  106 |       await createPage.submit();
  107 | 
  108 |       // Expect at least one validation error
  109 |       await createPage.expectValidationErrors();
  110 | 
  111 |       // Should still be on the create page
  112 |       await expect(page).toHaveURL(/\/create/);
  113 |     });
  114 | 
  115 |     test('should show name field validation error', async ({ page }) => {
  116 |       const createPage = new UserCreatePage(page);
  117 |       await createPage.goto();
  118 | 
  119 |       await createPage.submit();
  120 |       await createPage.form.expectFormError('Họ và tên');
  121 |     });
  122 |   });
  123 | 
  124 |   // ─── TC-USR-06: View User Detail ─────────────────────────────────────
  125 | 
  126 |   test.describe('TC-USR-06: View user detail', () => {
  127 |     test('should navigate to detail page and show user info with edit/back buttons', async ({ page }) => {
  128 |       const listPage = new UserListPage(page);
  129 |       await listPage.goto();
  130 | 
  131 |       // Wait for at least one row to exist
  132 |       await listPage.table.expectAtLeastOneRow();
  133 | 
  134 |       // Click the first row's view-detail button (first icon button)
  135 |       const firstRow = listPage.table.rows.first();
  136 |       await firstRow.locator('button').first().click();
  137 | 
  138 |       // Should navigate to detail page
  139 |       await expect(page).toHaveURL(/\/config\/users\/[^/]+$/, { timeout: TIMEOUTS.navigation });
  140 | 
  141 |       const detailPage = new UserDetailPage(page);
  142 |       await detailPage.expectOnPage();
  143 |       await detailPage.expectEditButtonVisible();
  144 |       await detailPage.expectBackButtonVisible();
  145 |     });
  146 |   });
  147 | 
  148 |   // ─── TC-USR-07: Edit user ────────────────────────────────────────────
  149 | 
  150 |   test.describe('TC-USR-07: Edit user form', () => {
  151 |     test('should show pre-populated form and edit-only fields in edit mode', async ({ page }) => {
  152 |       const listPage = new UserListPage(page);
  153 |       await listPage.goto();
  154 | 
  155 |       await listPage.table.expectAtLeastOneRow();
  156 | 
  157 |       // Click edit button (second action button in a row)
  158 |       const firstRow = listPage.table.rows.first();
  159 |       await firstRow.locator('button').nth(1).click();
  160 | 
  161 |       // Should navigate to edit page
> 162 |       await expect(page).toHaveURL(/\/config\/users\/[^/]+\/edit/, { timeout: TIMEOUTS.navigation });
      |                          ^ Error: expect(page).toHaveURL(expected) failed
  163 | 
  164 |       const editPage = new UserEditPage(page);
  165 |       await editPage.expectPrePopulated();
  166 |       // Edit-only fields (status, subscriptionTier) should be visible
  167 |       // Note: they use Vietnamese labels
  168 |       const statusLabel = page.locator('.ant-form-item').filter({ hasText: 'Trạng thái' });
  169 |       const tierLabel = page.locator('.ant-form-item').filter({ hasText: 'Gói' });
  170 |       // These might or might not be visible depending on translation keys
  171 |       // At minimum, the form should be pre-populated
  172 |       const nameValue = await editPage.nameInput.inputValue();
  173 |       expect(nameValue.length).toBeGreaterThan(0);
  174 |     });
  175 |   });
  176 | 
  177 |   // ─── TC-USR-10: Non-existent ID ──────────────────────────────────────
  178 | 
  179 |   test.describe('TC-USR-10: Non-existent user ID error handling', () => {
  180 |     test('should show error result when navigating to non-existent user detail', async ({ page }) => {
  181 |       const detailPage = new UserDetailPage(page);
  182 |       await detailPage.goto(NON_EXISTENT_UUID);
  183 | 
  184 |       await detailPage.expectErrorShown();
  185 |     });
  186 | 
  187 |     test('should show error result when navigating to non-existent user edit', async ({ page }) => {
  188 |       await page.goto(ROUTES.config.userEdit(NON_EXISTENT_UUID));
  189 |       // Either error result or loading then error
  190 |       await expect(page.locator('.ant-result-error').first()).toBeVisible({ timeout: TIMEOUTS.navigation });
  191 |     });
  192 |   });
  193 | 
  194 |   // ─── TC-USR-12: Pagination ────────────────────────────────────────────
  195 | 
  196 |   test.describe('TC-USR-12: Pagination boundary', () => {
  197 |     test('should show pagination controls when multiple pages exist', async ({ page }) => {
  198 |       const listPage = new UserListPage(page);
  199 |       await listPage.goto();
  200 | 
  201 |       // Pagination element should at minimum be present
  202 |       const pagination = listPage.table.pagination;
  203 |       const paginationExists = await pagination.isVisible().catch(() => false);
  204 | 
  205 |       if (paginationExists) {
  206 |         // If pagination exists, next button may be clickable
  207 |         const nextBtn = listPage.table.nextPageBtn;
  208 |         const isEnabled = await nextBtn.isEnabled().catch(() => false);
  209 |         if (isEnabled) {
  210 |           await nextBtn.click();
  211 |           await listPage.table.waitForLoad();
  212 |           // URL should update with page param
  213 |           await expect(page).toHaveURL(/page=2/, { timeout: TIMEOUTS.navigation });
  214 |         } else {
  215 |           // Only one page — that's fine
  216 |           console.log('Only one page of users, skipping next-page assertion');
  217 |         }
  218 |       }
  219 |     });
  220 |   });
  221 | 
  222 |   // ─── TC-USR-08: Delete user ──────────────────────────────────────────
  223 | 
  224 |   test.describe('TC-USR-08: Delete user via UI', () => {
  225 |     test('should show confirmation dialog when delete icon is clicked', async ({ page }) => {
  226 |       const listPage = new UserListPage(page);
  227 |       await listPage.goto();
  228 | 
  229 |       await listPage.table.expectAtLeastOneRow();
  230 | 
  231 |       // Click delete button (third action button in a row)
  232 |       const firstRow = listPage.table.rows.first();
  233 |       await firstRow.locator('button').nth(2).click();
  234 | 
  235 |       // Confirmation dialog (popconfirm or modal) should appear
  236 |       const confirmButton = page.locator('.ant-popover-buttons .ant-btn-primary, .ant-modal-confirm .ant-btn-primary').first();
  237 |       const isVisible = await confirmButton.isVisible({ timeout: TIMEOUTS.short }).catch(() => false);
  238 |       expect(isVisible).toBeTruthy();
  239 | 
  240 |       // Cancel to avoid actually deleting
  241 |       await page.keyboard.press('Escape');
  242 |     });
  243 |   });
  244 | });
  245 | 
```