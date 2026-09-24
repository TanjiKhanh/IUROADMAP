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
- **Preconditions:** Au<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-01</td>
    <td width="50%"><b>Test Case Name:</b> List Users with Pagination</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test list users with pagination</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>Authenticated admin user</li>
  <li>At least one user seeded in the system</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `POST /user/getbyindex` with `{ currentPage: 1, rowsPerPage: 20 }`.</td>
      <td>Assert response `totalRows >= 0`, `datas` is an array. If `datas.length > 0`, assert `datas[0].id` and `datas[0].name` are defined.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Navigate to `/config/users`.</td>
      <td>Assert the page heading is visible. Assert the table is visible with at least the header row. Assert column headers include name, email, role, and actions. Assert the "+ Thêm" add button is visible.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>User list renders with correct columns.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-02: Filter Users by Keyword

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-02</td>
    <td width="50%"><b>Test Case Name:</b> Filter Users by Keyword</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test filter users by keyword</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>At least one user exists</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `POST /user/getbyindex` with `{ currentPage: 1, rowsPerPage: 20, keyword: "test" }`.</td>
      <td>Assert response is defined.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Navigate to `/config/users`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Type a search term in the keyword input.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Click the "Tìm kiếm" button.</td>
      <td>Assert the URL updates to include the keyword query parameter.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Filter updates the URL and re-fetches data.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-03: Filter Users by Role

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-03</td>
    <td width="50%"><b>Test Case Name:</b> Filter Users by Role</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test filter users by role</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>At least one role exists</li>
  <li>The role dropdown in filter loads</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `POST /user/getbyindex` with a valid `roleId`.</td>
      <td>Assert response is defined.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Navigate to `/config/users`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Click the role select dropdown.</td>
      <td>Assert it loads role options.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Select the first available role.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Click "Tìm kiếm".</td>
      <td>Assert the URL contains the `roleId` parameter.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Role filter is functional and updates URL state.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-04: Create User (Happy Path)

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-04</td>
    <td width="50%"><b>Test Case Name:</b> Create User (Happy Path)</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test create user (happy path)</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>At least one role exists for selection</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `POST /user/create` with `{ name, email, password, roleId }`.</td>
      <td>Assert no error is thrown.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Cleanup: delete the user in `afterAll`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Navigate to `/config/users/create`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Fill "Họ và tên" with a unique name `E2E User <timestamp>`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Fill "Email" with a unique valid email `e2euser<timestamp>@test.com`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">6</td>
      <td>Fill "Mật khẩu" with `TestPass@123`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">7</td>
      <td>Open the "Vai trò" dropdown and select the first available role.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">8</td>
      <td>Click the submit button.</td>
      <td>Assert a success toast appears. Assert the current URL is `/config/users`. Assert the new user name is visible somewhere in the table (or search for it).</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>User created successfully and visible in the list.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-05: Create User — Validation Errors

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-05</td>
    <td width="50%"><b>Test Case Name:</b> Create User — Validation Errors</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test create user — validation errors</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>On the create user form</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to `/config/users/create`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Click the submit button immediately without filling any fields.</td>
      <td>Assert a validation error message appears for the "Họ và tên" field. Assert a validation error message appears for the "Email" field. Assert a validation error message appears for the "Mật khẩu" field. Assert the page has NOT navigated away.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Call `POST /user/create` with `{ name: '' }` — assert error.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Call `POST /user/create` with `{ email: '' }` — assert error.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>All required field validations trigger; form is not submitted.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-06: View User Detail Page

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-06</td>
    <td width="50%"><b>Test Case Name:</b> View User Detail Page</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test view user detail page</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>At least one user exists</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Get a user ID from the list.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Call `GET /user/getbyid/<id>`.</td>
      <td>Assert `id`, `name`, `email` are defined.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Navigate to `/config/users`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Click the eye icon (view detail button) for the first user row.</td>
      <td>Assert the URL changes to `/config/users/<id>`. Assert the detail card is visible. Assert the "Chỉnh sửa" (Edit) button is visible. Assert the "Quay lại" (Back) button is visible.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>User detail page renders all fields correctly.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-07: Edit User (Update)

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-07</td>
    <td width="50%"><b>Test Case Name:</b> Edit User (Update)</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test edit user (update)</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>A user with known ID exists</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Create a user.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Call `POST /user/update` with modified `name`.</td>
      <td>Assert no error is thrown.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Cleanup.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Navigate to `/config/users`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Click the edit icon for a user row.</td>
      <td>Assert the URL changes to `/config/users/<id>/edit`. Assert the "Họ và tên" field is pre-filled. Assert the "Status" and "SubscriptionTier" dropdowns are visible (edit-only fields).</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">6</td>
      <td>Clear and re-type the name field with a new value.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">7</td>
      <td>Click save.</td>
      <td>Assert success toast appears. Assert redirect to `/config/users`.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>User updated; edit-only fields visible only in edit mode.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-08: Delete User

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-08</td>
    <td width="50%"><b>Test Case Name:</b> Delete User</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test delete user</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>A deletable user exists (not the currently logged-in admin)</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Create a user.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Call `POST /user/delete/<id>`.</td>
      <td>Assert no error is thrown.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Create a test user via API.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Navigate to `/config/users`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Find the row for the test user.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">6</td>
      <td>Click the delete (trash) icon.</td>
      <td>Assert a confirmation dialog appears.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">7</td>
      <td>Click confirm.</td>
      <td>Assert the row is removed from the table. Assert a success toast is shown.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>User deleted and removed from list.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-09: Get Current User Profile

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-09</td>
    <td width="50%"><b>Test Case Name:</b> Get Current User Profile</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test get current user profile</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>Authenticated user</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `GET /user/profile`.</td>
      <td>Assert `id` and `fullName` (or `name`) are defined strings.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Profile returns valid user data.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-10: Non-Existent User ID — Error Handling

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-10</td>
    <td width="50%"><b>Test Case Name:</b> Non-Existent User ID — Error Handling</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test non-existent user id — error handling</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>None (uses a fake UUID)</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `GET /user/getbyid/<NON_EXISTENT_UUID>` — assert error is thrown.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Navigate to `/config/users/00000000-0000-0000-0000-000000000000`.</td>
      <td>Assert an error result component is rendered (e.g., "Không thể tải dữ liệu").</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Non-existent ID is handled gracefully with an error UI.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-11: Invalid UUID Format

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-11</td>
    <td width="50%"><b>Test Case Name:</b> Invalid UUID Format</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test invalid uuid format</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>None</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `GET /user/getbyid/not-a-valid-uuid` — assert error is thrown.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Call `GET /user/getbyid/''` — assert error is thrown.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Invalid UUID format rejected.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-12: Pagination Boundary

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-12</td>
    <td width="50%"><b>Test Case Name:</b> Pagination Boundary</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test pagination boundary</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>Multiple users exist</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Fetch first page with `rowsPerPage: 5`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Calculate last page = `Math.ceil(totalRows / 5)`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Fetch last page and assert data is defined.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Navigate to `/config/users`.</td>
      <td>If the pagination shows more than one page, click the next page button. Assert page number changes and table updates.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Pagination works at boundaries.</li>
      </ul>
    </td>
  </tr>
</table>

---

## 3. Role Management Test Cases

### TC-ROL-01: List Roles with Pagination

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-01</td>
    <td width="50%"><b>Test Case Name:</b> List Roles with Pagination</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test list roles with pagination</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>Authenticated admin</li>
  <li>At least one role seeded</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `POST /role/GetByIndex` with `{ currentPage: 1, rowsPerPage: 20 }`.</td>
      <td>Assert `totalRows >= 0`, `datas` is array. If `datas.length > 0`, assert `datas[0].id` and `datas[0].name` are defined.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Navigate to `/config/roles`.</td>
      <td>Assert page heading is visible. Assert the table renders with "Tên vai trò" and "Thao tác" columns. Assert the "+ Thêm" button is visible.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Role list renders correctly.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-ROL-02: Create Role (Happy Path)

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-02</td>
    <td width="50%"><b>Test Case Name:</b> Create Role (Happy Path)</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test create role (happy path)</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>None</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `POST /role/create` with `{ name: "Test Role <timestamp>", permissionIds: [] }`.</td>
      <td>Assert returned `roleId` is a non-empty string.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Cleanup: delete in `afterAll`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Navigate to `/config/roles/create`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Fill "Tên vai trò" with a unique name `E2E Role <timestamp>`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Click save.</td>
      <td>Assert success toast appears. Assert redirect to `/config/roles`. Assert the new role name is visible in the table.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Role created and visible in list.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-ROL-03: Create Role with Permissions Selected

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-03</td>
    <td width="50%"><b>Test Case Name:</b> Create Role with Permissions Selected</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test create role with permissions selected</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>At least one permission group/item exists</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `GET /role/GetAllPermissions` to get available permissions.</td>
      <td>If permissions exist, create role with `permissionIds: [first_permission_id]`. Assert `roleId` returned.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Fetch role by ID and verify permission is assigned.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Cleanup.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Navigate to `/config/roles/create`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Fill role name.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">6</td>
      <td>In the permission matrix, check one individual permission checkbox.</td>
      <td>Assert that group card shows an indeterminate state (if partially selected).</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">7</td>
      <td>Click save.</td>
      <td>Assert success and redirect.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Role with permissions created and persisted.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-ROL-04: Create Role — Validation Error (Empty Name)

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-04</td>
    <td width="50%"><b>Test Case Name:</b> Create Role — Validation Error (Empty Name)</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test create role — validation error (empty name)</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>On the create role form</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `POST /role/create` with `{ name: '', permissionIds: [] }` — assert error.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Call `POST /role/create` with `{ name: '   \t  ', permissionIds: [] }` — assert error.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Navigate to `/config/roles/create`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Click submit without entering a name.</td>
      <td>Assert validation error appears for the "Tên vai trò" field. Assert the URL did NOT change.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Empty name validation fires; form not submitted.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-ROL-05: View Role Data in Edit Form

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-05</td>
    <td width="50%"><b>Test Case Name:</b> View Role Data in Edit Form</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test view role data in edit form</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>A role with known ID exists</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Create a role.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Call `GET /role/getbyid/<id>`.</td>
      <td>Assert `id`, `name`, `permissionGroups` are defined.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Cleanup.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Navigate to `/config/roles`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Click the edit icon for a role row.</td>
      <td>Assert the URL changes to `/config/roles/<id>/edit`. Assert the "Tên vai trò" field is pre-populated with the role's name. Assert the permission matrix is rendered (even if empty).</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Edit form is pre-populated with existing role data.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-ROL-06: Edit Role Name (Update)

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-06</td>
    <td width="50%"><b>Test Case Name:</b> Edit Role Name (Update)</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test edit role name (update)</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>A role exists</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Create a role.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Fetch by ID to get current `permissionIds`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Call `POST /role/update` with a new `name`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Fetch again and assert `name` changed.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Cleanup.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">6</td>
      <td>Navigate to `/config/roles/<id>/edit`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">7</td>
      <td>Clear the "Tên vai trò" field and type a new name.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">8</td>
      <td>Click save.</td>
      <td>Assert success toast shown. Assert redirect to `/config/roles`. Assert the updated name is visible in the list.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Role name updated successfully.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-ROL-07: Update Role with Empty Name — Validation

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-07</td>
    <td width="50%"><b>Test Case Name:</b> Update Role with Empty Name — Validation</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test update role with empty name — validation</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>A role exists</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Create a role.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Call `POST /role/update` with `{ id, name: '', permissionIds: [] }` — assert error.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Cleanup.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Navigate to `/config/roles/<id>/edit`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Clear the name field completely.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">6</td>
      <td>Click save.</td>
      <td>Assert validation error for the name field. Assert no navigation occurred.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Empty name blocked by validation.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-ROL-08: Delete Role

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-08</td>
    <td width="50%"><b>Test Case Name:</b> Delete Role</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test delete role</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>A deletable role exists (not assigned to any user)</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Create a role.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Call `POST /role/delete/<id>`.</td>
      <td>Assert no error. Assert `GET /role/getbyid/<id>` throws.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Create a test role via API.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Navigate to `/config/roles`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Find the test role row.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">6</td>
      <td>Click the delete (trash) icon.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">7</td>
      <td>Confirm deletion in the dialog.</td>
      <td>Assert row removed from table. Assert success toast shown.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Role deleted and removed from list.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-ROL-09: Permission Matrix Renders All Groups

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-09</td>
    <td width="50%"><b>Test Case Name:</b> Permission Matrix Renders All Groups</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test permission matrix renders all groups</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>Permissions are seeded in the system</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `GET /role/GetAllPermissions`.</td>
      <td>Assert array length `>= 0`. If not empty, assert `groupName` and `permissions` array in first group.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Navigate to `/config/roles/create`.</td>
      <td>Assert the permission matrix section is visible. If permissions exist, assert at least one group card is rendered. Assert group header checkboxes are clickable.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Click a group header checkbox — assert all child permissions become checked.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Click again — assert all child permissions become unchecked.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Permission matrix renders and group-toggle works.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-ROL-10: Non-Existent Role ID — Error Handling

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-10</td>
    <td width="50%"><b>Test Case Name:</b> Non-Existent Role ID — Error Handling</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test non-existent role id — error handling</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>None</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `GET /role/getbyid/<NON_EXISTENT_UUID>` — assert error.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Call `POST /role/update` with `id: NON_EXISTENT_UUID` — assert error.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Call `POST /role/delete/<NON_EXISTENT_UUID>` — assert error.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Navigate to `/config/roles/00000000-0000-0000-0000-000000000000/edit`.</td>
      <td>Assert an error result component or "Không thể tải dữ liệu" message is shown.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Non-existent ID handled gracefully.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-ROL-11: Role Pagination Boundary

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-11</td>
    <td width="50%"><b>Test Case Name:</b> Role Pagination Boundary</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test role pagination boundary</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>Multiple roles exist</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Get `totalRows` from first page with `rowsPerPage: 5`.</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Navigate to last page (`Math.ceil(totalRows / 5)`).</td>
      <td>Assert data is defined.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Navigate to `/config/roles`.</td>
      <td>If multiple pages exist, click the next page pagination button. Assert page number changes.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Pagination navigates correctly.</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-ROL-12: Search Roles by Keyword (API Only)

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-12</td>
    <td width="50%"><b>Test Case Name:</b> Search Roles by Keyword (API Only)</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration</td>
  </tr>
  <tr>
    <td><b>Designed by:</b> Le Hoang Khanh</td>
    <td><b>Design Date:</b> April 17, 2026</td>
  </tr>
  <tr>
    <td><b>Executed by:</b> Nguyen Tan Khanh</td>
    <td><b>Execution Date:</b> </td>
  </tr>
  <tr>
    <td colspan="2"><b>Short Description:</b> Test search roles by keyword (api only)</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/><ul>
  <li>None</li>
</ul></td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/ Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Call `POST /role/GetByIndex` with `{ currentPage: 1, rowsPerPage: 10, keySearch: 'Admin' }`.</td>
      <td>Assert `totalRows >= 0` and `datas` is array. If results returned, assert each role name is defined.</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Post-conditions:</b><br/>
      <ul>
        <li>Keyword search works without error.</li>
      </ul>
    </td>
  </tr>
</table>
role, 1 admin user in the database |
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
