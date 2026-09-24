# IUROADMAP — Module 02: Configuration Test Cases

**Document Version:** 1.0  
**Module Scope:** Config Module — User Management & Role Management  
**Reference:** `src/views/config/user/`, `src/views/config/role/`  
**Automation Targets:**
- API specs: `tests/api/config/user/user.spec.ts`, `tests/api/config/role/role.spec.ts`
- E2E specs: `tests/e2e/specs/config/user.spec.ts`, `tests/e2e/specs/config/role.spec.ts`

---

## 1. Coverage Matrix

| Feature | API Coverage | E2E Coverage | Test IDs |
|---|---|---|---|
| User — List / Paginate | ✅ | ✅ | `TC-USR-01` |
| User — Filter by keyword | ✅ | ✅ | `TC-USR-02` |
| User — Filter by role | ✅ | ✅ | `TC-USR-03` |
| User — Create (happy) | ✅ | ✅ | `TC-USR-04` |
| User — Create (validation) | ✅ | ✅ | `TC-USR-05` |
| User — View Detail | ✅ | ✅ | `TC-USR-06` |
| User — Edit / Update | ✅ | ✅ | `TC-USR-07` |
| User — Delete | ✅ | ✅ | `TC-USR-08` |
| User — Get Profile | ✅ | — | `TC-USR-09` |
| User — Non-existent ID | ✅ | ✅ | `TC-USR-10` |
| User — Invalid UUID format | ✅ | — | `TC-USR-11` |
| User — Pagination boundary | ✅ | ✅ | `TC-USR-12` |
| Role — List / Paginate | ✅ | ✅ | `TC-ROL-01` |
| Role — Create (happy) | ✅ | ✅ | `TC-ROL-02` |
| Role — Create with permissions | ✅ | ✅ | `TC-ROL-03` |
| Role — Create (validation) | ✅ | ✅ | `TC-ROL-04` |
| Role — View Detail (by ID) | ✅ | ✅ | `TC-ROL-05` |
| Role — Edit / Update | ✅ | ✅ | `TC-ROL-06` |
| Role — Update empty name | ✅ | ✅ | `TC-ROL-07` |
| Role — Delete | ✅ | ✅ | `TC-ROL-08` |
| Role — Get all permissions | ✅ | ✅ | `TC-ROL-09` |
| Role — Non-existent ID | ✅ | ✅ | `TC-ROL-10` |
| Role — Pagination boundary | ✅ | ✅ | `TC-ROL-11` |
| Role — Search by keySearch | ✅ | — | `TC-ROL-12` |

---

## 2. User Management Test Cases

### TC-USR-01: List Users with Pagination

- **Layer:** API + E2E
- **Preconditions:** Authenticated admin user. At least one user seeded in the system.
- **Test Steps (API):**
  1. Call `POST /user/getbyindex` with `{ currentPage: 1, rowsPerPage: 20 }`.
  2. Assert response `totalRows >= 0`, `datas` is an array.
  3. If `datas.length > 0`, assert `datas[0].id` and `datas[0].name` are defined.
- **Test Steps (E2E):**
  1. Navigate to `/config/users`.
  2. Assert the page heading is visible.
  3. Assert the table is visible with at least the header row.
  4. Assert column headers include name, email, role, and actions.
  5. Assert the "+ Thêm" add button is visible.
- **Expected Result:** User list renders with correct columns.

---

### TC-USR-02: Filter Users by Keyword

- **Layer:** API + E2E
- **Preconditions:** At least one user exists.
- **Test Steps (API):**
  1. Call `POST /user/getbyindex` with `{ currentPage: 1, rowsPerPage: 20, keyword: "test" }`.
  2. Assert response is defined.
- **Test Steps (E2E):**
  1. Navigate to `/config/users`.
  2. Type a search term in the keyword input.
  3. Click the "Tìm kiếm" button.
  4. Assert the URL updates to include the keyword query parameter.
- **Expected Result:** Filter updates the URL and re-fetches data.

---

### TC-USR-03: Filter Users by Role

- **Layer:** API + E2E
- **Preconditions:** At least one role exists. The role dropdown in filter loads.
- **Test Steps (API):**
  1. Call `POST /user/getbyindex` with a valid `roleId`.
  2. Assert response is defined.
- **Test Steps (E2E):**
  1. Navigate to `/config/users`.
  2. Click the role select dropdown.
  3. Assert it loads role options.
  4. Select the first available role.
  5. Click "Tìm kiếm".
  6. Assert the URL contains the `roleId` parameter.
- **Expected Result:** Role filter is functional and updates URL state.

---

### TC-USR-04: Create User (Happy Path)

- **Layer:** API + E2E
- **Preconditions:** At least one role exists for selection.
- **Test Steps (API):**
  1. Call `POST /user/create` with `{ name, email, password, roleId }`.
  2. Assert no error is thrown.
  3. Cleanup: delete the user in `afterAll`.
- **Test Steps (E2E):**
  1. Navigate to `/config/users/create`.
  2. Fill "Họ và tên" with a unique name `E2E User <timestamp>`.
  3. Fill "Email" with a unique valid email `e2euser<timestamp>@test.com`.
  4. Fill "Mật khẩu" with `TestPass@123`.
  5. Open the "Vai trò" dropdown and select the first available role.
  6. Click the submit button.
  7. Assert a success toast appears.
  8. Assert the current URL is `/config/users`.
  9. Assert the new user name is visible somewhere in the table (or search for it).
- **Expected Result:** User created successfully and visible in the list.

---

### TC-USR-05: Create User — Validation Errors

- **Layer:** API + E2E
- **Preconditions:** On the create user form.
- **Test Steps (E2E):**
  1. Navigate to `/config/users/create`.
  2. Click the submit button immediately without filling any fields.
  3. Assert a validation error message appears for the "Họ và tên" field.
  4. Assert a validation error message appears for the "Email" field.
  5. Assert a validation error message appears for the "Mật khẩu" field.
  6. Assert the page has NOT navigated away.
- **Test Steps (API):**
  1. Call `POST /user/create` with `{ name: '' }` — assert error.
  2. Call `POST /user/create` with `{ email: '' }` — assert error.
- **Expected Result:** All required field validations trigger; form is not submitted.

---

### TC-USR-06: View User Detail Page

- **Layer:** API + E2E
- **Preconditions:** At least one user exists.
- **Test Steps (API):**
  1. Get a user ID from the list.
  2. Call `GET /user/getbyid/<id>`.
  3. Assert `id`, `name`, `email` are defined.
- **Test Steps (E2E):**
  1. Navigate to `/config/users`.
  2. Click the eye icon (view detail button) for the first user row.
  3. Assert the URL changes to `/config/users/<id>`.
  4. Assert the detail card is visible.
  5. Assert the "Chỉnh sửa" (Edit) button is visible.
  6. Assert the "Quay lại" (Back) button is visible.
- **Expected Result:** User detail page renders all fields correctly.

---

### TC-USR-07: Edit User (Update)

- **Layer:** API + E2E
- **Preconditions:** A user with known ID exists.
- **Test Steps (API):**
  1. Create a user.
  2. Call `POST /user/update` with modified `name`.
  3. Assert no error is thrown.
  4. Cleanup.
- **Test Steps (E2E):**
  1. Navigate to `/config/users`.
  2. Click the edit icon for a user row.
  3. Assert the URL changes to `/config/users/<id>/edit`.
  4. Assert the "Họ và tên" field is pre-filled.
  5. Assert the "Status" and "SubscriptionTier" dropdowns are visible (edit-only fields).
  6. Clear and re-type the name field with a new value.
  7. Click save.
  8. Assert success toast appears.
  9. Assert redirect to `/config/users`.
- **Expected Result:** User updated; edit-only fields visible only in edit mode.

---

### TC-USR-08: Delete User

- **Layer:** API + E2E
- **Preconditions:** A deletable user exists (not the currently logged-in admin).
- **Test Steps (API):**
  1. Create a user.
  2. Call `POST /user/delete/<id>`.
  3. Assert no error is thrown.
- **Test Steps (E2E):**
  1. Create a test user via API.
  2. Navigate to `/config/users`.
  3. Find the row for the test user.
  4. Click the delete (trash) icon.
  5. Assert a confirmation dialog appears.
  6. Click confirm.
  7. Assert the row is removed from the table.
  8. Assert a success toast is shown.
- **Expected Result:** User deleted and removed from list.

---

### TC-USR-09: Get Current User Profile

- **Layer:** API only
- **Preconditions:** Authenticated user.
- **Test Steps:**
  1. Call `GET /user/profile`.
  2. Assert `id` and `fullName` (or `name`) are defined strings.
- **Expected Result:** Profile returns valid user data.

---

### TC-USR-10: Non-Existent User ID — Error Handling

- **Layer:** API + E2E
- **Preconditions:** None (uses a fake UUID).
- **Test Steps (API):**
  1. Call `GET /user/getbyid/<NON_EXISTENT_UUID>` — assert error is thrown.
- **Test Steps (E2E):**
  1. Navigate to `/config/users/00000000-0000-0000-0000-000000000000`.
  2. Assert an error result component is rendered (e.g., "Không thể tải dữ liệu").
- **Expected Result:** Non-existent ID is handled gracefully with an error UI.

---

### TC-USR-11: Invalid UUID Format

- **Layer:** API only
- **Preconditions:** None.
- **Test Steps:**
  1. Call `GET /user/getbyid/not-a-valid-uuid` — assert error is thrown.
  2. Call `GET /user/getbyid/''` — assert error is thrown.
- **Expected Result:** Invalid UUID format rejected.

---

### TC-USR-12: Pagination Boundary

- **Layer:** API + E2E
- **Preconditions:** Multiple users exist.
- **Test Steps (API):**
  1. Fetch first page with `rowsPerPage: 5`.
  2. Calculate last page = `Math.ceil(totalRows / 5)`.
  3. Fetch last page and assert data is defined.
- **Test Steps (E2E):**
  1. Navigate to `/config/users`.
  2. If the pagination shows more than one page, click the next page button.
  3. Assert page number changes and table updates.
- **Expected Result:** Pagination works at boundaries.

---

## 3. Role Management Test Cases

### TC-ROL-01: List Roles with Pagination

- **Layer:** API + E2E
- **Preconditions:** Authenticated admin. At least one role seeded.
- **Test Steps (API):**
  1. Call `POST /role/GetByIndex` with `{ currentPage: 1, rowsPerPage: 20 }`.
  2. Assert `totalRows >= 0`, `datas` is array.
  3. If `datas.length > 0`, assert `datas[0].id` and `datas[0].name` are defined.
- **Test Steps (E2E):**
  1. Navigate to `/config/roles`.
  2. Assert page heading is visible.
  3. Assert the table renders with "Tên vai trò" and "Thao tác" columns.
  4. Assert the "+ Thêm" button is visible.
- **Expected Result:** Role list renders correctly.

---

### TC-ROL-02: Create Role (Happy Path)

- **Layer:** API + E2E
- **Preconditions:** None.
- **Test Steps (API):**
  1. Call `POST /role/create` with `{ name: "Test Role <timestamp>", permissionIds: [] }`.
  2. Assert returned `roleId` is a non-empty string.
  3. Cleanup: delete in `afterAll`.
- **Test Steps (E2E):**
  1. Navigate to `/config/roles/create`.
  2. Fill "Tên vai trò" with a unique name `E2E Role <timestamp>`.
  3. Click save.
  4. Assert success toast appears.
  5. Assert redirect to `/config/roles`.
  6. Assert the new role name is visible in the table.
- **Expected Result:** Role created and visible in list.

---

### TC-ROL-03: Create Role with Permissions Selected

- **Layer:** API + E2E
- **Preconditions:** At least one permission group/item exists.
- **Test Steps (API):**
  1. Call `GET /role/GetAllPermissions` to get available permissions.
  2. If permissions exist, create role with `permissionIds: [first_permission_id]`.
  3. Assert `roleId` returned.
  4. Fetch role by ID and verify permission is assigned.
  5. Cleanup.
- **Test Steps (E2E):**
  1. Navigate to `/config/roles/create`.
  2. Fill role name.
  3. In the permission matrix, check one individual permission checkbox.
  4. Assert that group card shows an indeterminate state (if partially selected).
  5. Click save.
  6. Assert success and redirect.
- **Expected Result:** Role with permissions created and persisted.

---

### TC-ROL-04: Create Role — Validation Error (Empty Name)

- **Layer:** API + E2E
- **Preconditions:** On the create role form.
- **Test Steps (API):**
  1. Call `POST /role/create` with `{ name: '', permissionIds: [] }` — assert error.
  2. Call `POST /role/create` with `{ name: '   \t  ', permissionIds: [] }` — assert error.
- **Test Steps (E2E):**
  1. Navigate to `/config/roles/create`.
  2. Click submit without entering a name.
  3. Assert validation error appears for the "Tên vai trò" field.
  4. Assert the URL did NOT change.
- **Expected Result:** Empty name validation fires; form not submitted.

---

### TC-ROL-05: View Role Data in Edit Form

- **Layer:** API + E2E
- **Preconditions:** A role with known ID exists.
- **Test Steps (API):**
  1. Create a role.
  2. Call `GET /role/getbyid/<id>`.
  3. Assert `id`, `name`, `permissionGroups` are defined.
  4. Cleanup.
- **Test Steps (E2E):**
  1. Navigate to `/config/roles`.
  2. Click the edit icon for a role row.
  3. Assert the URL changes to `/config/roles/<id>/edit`.
  4. Assert the "Tên vai trò" field is pre-populated with the role's name.
  5. Assert the permission matrix is rendered (even if empty).
- **Expected Result:** Edit form is pre-populated with existing role data.

---

### TC-ROL-06: Edit Role Name (Update)

- **Layer:** API + E2E
- **Preconditions:** A role exists.
- **Test Steps (API):**
  1. Create a role.
  2. Fetch by ID to get current `permissionIds`.
  3. Call `POST /role/update` with a new `name`.
  4. Fetch again and assert `name` changed.
  5. Cleanup.
- **Test Steps (E2E):**
  1. Navigate to `/config/roles/<id>/edit`.
  2. Clear the "Tên vai trò" field and type a new name.
  3. Click save.
  4. Assert success toast shown.
  5. Assert redirect to `/config/roles`.
  6. Assert the updated name is visible in the list.
- **Expected Result:** Role name updated successfully.

---

### TC-ROL-07: Update Role with Empty Name — Validation

- **Layer:** API + E2E
- **Preconditions:** A role exists.
- **Test Steps (API):**
  1. Create a role.
  2. Call `POST /role/update` with `{ id, name: '', permissionIds: [] }` — assert error.
  3. Cleanup.
- **Test Steps (E2E):**
  1. Navigate to `/config/roles/<id>/edit`.
  2. Clear the name field completely.
  3. Click save.
  4. Assert validation error for the name field.
  5. Assert no navigation occurred.
- **Expected Result:** Empty name blocked by validation.

---

### TC-ROL-08: Delete Role

- **Layer:** API + E2E
- **Preconditions:** A deletable role exists (not assigned to any user).
- **Test Steps (API):**
  1. Create a role.
  2. Call `POST /role/delete/<id>`.
  3. Assert no error.
  4. Assert `GET /role/getbyid/<id>` throws.
- **Test Steps (E2E):**
  1. Create a test role via API.
  2. Navigate to `/config/roles`.
  3. Find the test role row.
  4. Click the delete (trash) icon.
  5. Confirm deletion in the dialog.
  6. Assert row removed from table.
  7. Assert success toast shown.
- **Expected Result:** Role deleted and removed from list.

---

### TC-ROL-09: Permission Matrix Renders All Groups

- **Layer:** API + E2E
- **Preconditions:** Permissions are seeded in the system.
- **Test Steps (API):**
  1. Call `GET /role/GetAllPermissions`.
  2. Assert array length `>= 0`.
  3. If not empty, assert `groupName` and `permissions` array in first group.
- **Test Steps (E2E):**
  1. Navigate to `/config/roles/create`.
  2. Assert the permission matrix section is visible.
  3. If permissions exist, assert at least one group card is rendered.
  4. Assert group header checkboxes are clickable.
  5. Click a group header checkbox — assert all child permissions become checked.
  6. Click again — assert all child permissions become unchecked.
- **Expected Result:** Permission matrix renders and group-toggle works.

---

### TC-ROL-10: Non-Existent Role ID — Error Handling

- **Layer:** API + E2E
- **Preconditions:** None.
- **Test Steps (API):**
  1. Call `GET /role/getbyid/<NON_EXISTENT_UUID>` — assert error.
  2. Call `POST /role/update` with `id: NON_EXISTENT_UUID` — assert error.
  3. Call `POST /role/delete/<NON_EXISTENT_UUID>` — assert error.
- **Test Steps (E2E):**
  1. Navigate to `/config/roles/00000000-0000-0000-0000-000000000000/edit`.
  2. Assert an error result component or "Không thể tải dữ liệu" message is shown.
- **Expected Result:** Non-existent ID handled gracefully.

---

### TC-ROL-11: Role Pagination Boundary

- **Layer:** API + E2E
- **Preconditions:** Multiple roles exist.
- **Test Steps (API):**
  1. Get `totalRows` from first page with `rowsPerPage: 5`.
  2. Navigate to last page (`Math.ceil(totalRows / 5)`).
  3. Assert data is defined.
- **Test Steps (E2E):**
  1. Navigate to `/config/roles`.
  2. If multiple pages exist, click the next page pagination button.
  3. Assert page number changes.
- **Expected Result:** Pagination navigates correctly.

---

### TC-ROL-12: Search Roles by Keyword (API Only)

- **Layer:** API only
- **Preconditions:** None.
- **Test Steps:**
  1. Call `POST /role/GetByIndex` with `{ currentPage: 1, rowsPerPage: 10, keySearch: 'Admin' }`.
  2. Assert `totalRows >= 0` and `datas` is array.
  3. If results returned, assert each role name is defined.
- **Expected Result:** Keyword search works without error.

---

## 4. Test Environment Requirements

| Requirement | Detail |
|---|---|
| Auth (API) | Seeded admin user; token stored in `tests/.auth/user.json` via `auth.setup.ts` |
| Auth (E2E) | Browser session stored in `tests/.auth/e2e-hsse-user.json` via `e2e-auth.setup.ts` |
| Base URL (API) | `process.env.API_BASE_URL` → default `http://localhost:8080` |
| Base URL (E2E) | `process.env.WEB_BASE_URL` → default `http://localhost:5173` |
| Seed data | At least 1 role, 1 admin user in the database |
| Cleanup | All created records deleted in `afterAll` or via API before assertions |

---

## 5. Test Commands

```bash
# Run User API tests
npx playwright test --project=api tests/api/config/user/user.spec.ts --reporter=list

# Run Role API tests
npx playwright test --project=api tests/api/config/role/role.spec.ts --reporter=list

# Run all config API tests
npx playwright test --project=api tests/api/config/ --reporter=list

# Run User E2E tests
npx playwright test --project=e2e tests/e2e/specs/config/user.spec.ts --reporter=list

# Run Role E2E tests
npx playwright test --project=e2e tests/e2e/specs/config/role.spec.ts --reporter=list

# Run all config E2E tests
npx playwright test --project=e2e tests/e2e/specs/config/ --reporter=list
```
