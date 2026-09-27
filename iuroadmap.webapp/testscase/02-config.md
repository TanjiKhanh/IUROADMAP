# IUROADMAP — Module 02: Configuration Test Cases

**Document Version:** 1.0  
**Module Scope:** Config Module — User Management & Role Management  
**Reference:** `src/views/config/user/`, `src/views/config/role/`

---

## 1. Coverage Matrix

| # | Feature | Test ID | Pass/Fail |
|---|---|---|---|
| 1 | User — List / Paginate | `TC-USR-01` | |
| 2 | User — Filter by keyword | `TC-USR-02` | |
| 3 | User — Filter by role | `TC-USR-03` | |
| 4 | User — Create (happy path) | `TC-USR-04` | |
| 5 | User — Create (validation) | `TC-USR-05` | |
| 6 | User — View Detail | `TC-USR-06` | |
| 7 | User — Edit / Update | `TC-USR-07` | |
| 8 | User — Delete | `TC-USR-08` | |
| 9 | User — Non-existent ID | `TC-USR-09` | |
| 10 | User — Pagination boundary | `TC-USR-10` | |
| 11 | Role — List / Paginate | `TC-ROL-01` | |
| 12 | Role — Create (happy path) | `TC-ROL-02` | |
| 13 | Role — Create with permissions | `TC-ROL-03` | |
| 14 | Role — Create (validation) | `TC-ROL-04` | |
| 15 | Role — View / Edit Detail | `TC-ROL-05` | |
| 16 | Role — Edit / Update | `TC-ROL-06` | |
| 17 | Role — Update empty name | `TC-ROL-07` | |
| 18 | Role — Delete | `TC-ROL-08` | |
| 19 | Role — Permission matrix | `TC-ROL-09` | |
| 20 | Role — Non-existent ID | `TC-ROL-10` | |
| 21 | Role — Pagination boundary | `TC-ROL-11` | |

---

## 2. User Management Test Cases

### TC-USR-01: List Users with Pagination

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-01</td>
    <td width="50%"><b>Test Case Name:</b> List Users with Pagination</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration — User Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that the User Management page displays the user list table with correct columns, data, and an add button.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>At least one user exists in the system</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the User Management page (<code>/config/users</code>)</td>
      <td>The User Management page loads successfully</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Observe the page heading</td>
      <td>The page heading "Quản lý người dùng" is displayed</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Observe the user list table</td>
      <td>The table is visible with column headers: Name, Email, Role, and Actions</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Check that user data rows are displayed</td>
      <td>At least one user row is shown in the table with name, email, and role filled</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Observe the "+ Thêm" button</td>
      <td>The add button is visible at the top of the page</td>
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
        <li>User list is displayed correctly with all expected columns and data</li>
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
    <td><b>Subsystem:</b> Configuration — User Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that users can filter the user list by entering a keyword in the search input.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>At least one user exists in the system</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the User Management page</td>
      <td>The User Management page loads with the user list</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Type a search term (e.g., "test") in the keyword input field</td>
      <td>The keyword input accepts the text</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Click the "Tìm kiếm" (Search) button</td>
      <td>The URL updates to include the keyword query parameter. The table re-fetches and displays only matching users.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Clear the keyword input and click "Tìm kiếm" again</td>
      <td>The table resets and shows all users again</td>
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
        <li>The keyword filter works correctly and the URL reflects the search state</li>
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
    <td><b>Subsystem:</b> Configuration — User Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that users can filter the user list by selecting a role from the dropdown.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>At least one role exists in the system</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the User Management page</td>
      <td>The page loads with the filter section visible</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Click the Role select dropdown</td>
      <td>The dropdown opens and displays a list of available roles</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Select the first available role from the dropdown</td>
      <td>The selected role is shown in the dropdown</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Click the "Tìm kiếm" (Search) button</td>
      <td>The URL updates to contain the <code>roleId</code> parameter. The table re-fetches and displays only users with the selected role.</td>
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
        <li>Role filter is functional and correctly filters the user list</li>
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
    <td><b>Subsystem:</b> Configuration — User Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that a new user can be created successfully with all required fields filled in correctly.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>At least one role exists for selection</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the Create User page (<code>/config/users/create</code>)</td>
      <td>The create user form is displayed with empty fields</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Fill "Họ và tên" (Full Name) with a unique name (e.g., <code>Test User 001</code>)</td>
      <td>The field accepts the input</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Fill "Email" with a valid unique email (e.g., <code>testuser001@test.com</code>)</td>
      <td>The field accepts the input</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Fill "Mật khẩu" (Password) with <code>TestPass@123</code></td>
      <td>The field accepts the input (password masked)</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Open the "Vai trò" (Role) dropdown and select the first available role</td>
      <td>The selected role is displayed in the dropdown</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">6</td>
      <td>Click the Submit button</td>
      <td>A success toast message appears. The system redirects to the User Management page (<code>/config/users</code>).</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">7</td>
      <td>Search for the newly created user name in the user list</td>
      <td>The new user is visible in the table</td>
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
        <li>New user is created and stored successfully</li>
        <li>New user appears in the user list table</li>
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
    <td><b>Subsystem:</b> Configuration — User Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that the create user form shows validation errors when required fields are left empty or filled incorrectly.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>User is on the Create User page</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the Create User page (<code>/config/users/create</code>)</td>
      <td>The create user form is displayed</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Leave all fields empty and click the Submit button</td>
      <td>System shows validation error for "Họ và tên" (Full Name) field</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Observe the Email field validation</td>
      <td>System shows validation error for "Email" field</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Observe the Password field validation</td>
      <td>System shows validation error for "Mật khẩu" (Password) field</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Verify the page has NOT navigated away</td>
      <td>The URL remains on <code>/config/users/create</code>. No success toast is shown. Form is not submitted.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">6</td>
      <td>Fill "Email" with an invalid format (e.g., <code>not-an-email</code>), leave other fields valid, then submit</td>
      <td>System shows email format validation error</td>
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
        <li>All required field validations trigger correctly</li>
        <li>Form is not submitted when validation fails</li>
        <li>No new user is created in the system</li>
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
    <td><b>Subsystem:</b> Configuration — User Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that clicking the view icon on a user row displays the user detail page with all information and action buttons.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>At least one user exists in the system</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the User Management page</td>
      <td>The user list is displayed</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Click the eye icon (view detail) for the first user row</td>
      <td>The system navigates to the user detail page. The URL changes to <code>/config/users/&lt;id&gt;</code>.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Observe the detail card content</td>
      <td>The detail card is visible and shows user information (name, email, role, etc.)</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Observe the action buttons</td>
      <td>The "Chỉnh sửa" (Edit) button and "Quay lại" (Back) button are visible</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Click the "Quay lại" (Back) button</td>
      <td>The system navigates back to the User Management list page</td>
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
        <li>User detail page displays all fields correctly</li>
        <li>Navigation between list and detail pages works</li>
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
    <td><b>Subsystem:</b> Configuration — User Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that an existing user can be edited with updated information and the changes are saved successfully.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>A user with known data exists in the system</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the User Management page</td>
      <td>The user list is displayed</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Click the edit icon (pencil) for a user row</td>
      <td>The system navigates to the edit form. The URL changes to <code>/config/users/&lt;id&gt;/edit</code>.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Observe the edit form fields</td>
      <td>The "Họ và tên" field is pre-filled with the user's current name. The "Status" and "SubscriptionTier" dropdowns are visible (edit-only fields).</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Clear the "Họ và tên" field and type a new name (e.g., <code>Updated User Name</code>)</td>
      <td>The field accepts the new input</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Click the Save button</td>
      <td>A success toast message appears. The system redirects to the User Management page (<code>/config/users</code>).</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">6</td>
      <td>Search for the updated user name in the user list</td>
      <td>The updated name is visible in the table</td>
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
        <li>User information is updated successfully</li>
        <li>Edit-only fields (Status, SubscriptionTier) are visible only in edit mode</li>
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
    <td><b>Subsystem:</b> Configuration — User Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that a user can be deleted from the system through the delete action with confirmation dialog.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>A deletable user exists (not the currently logged-in admin)</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the User Management page</td>
      <td>The user list is displayed</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Locate the user to be deleted in the table</td>
      <td>The user row is visible in the table</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Click the delete (trash) icon for that user row</td>
      <td>A confirmation dialog appears asking to confirm deletion</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Click the Confirm button in the dialog</td>
      <td>A success toast message is shown. The user row is removed from the table.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Search for the deleted user name in the list</td>
      <td>The deleted user is no longer found in the table</td>
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
        <li>User is deleted and removed from the system</li>
        <li>User no longer appears in the user list</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-09: Non-Existent User ID — Error Handling

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-09</td>
    <td width="50%"><b>Test Case Name:</b> Non-Existent User ID — Error Handling</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration — User Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that navigating to a user detail page with a non-existent ID displays an appropriate error message.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate directly to a user detail page with a fake UUID (e.g., <code>/config/users/00000000-0000-0000-0000-000000000000</code>)</td>
      <td>The system displays an error message (e.g., "Không thể tải dữ liệu") or an error result component</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Verify no crash or blank page occurs</td>
      <td>The error is handled gracefully with a user-friendly message</td>
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
        <li>Non-existent user ID is handled gracefully with an appropriate error UI</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-USR-10: Pagination Boundary

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-USR-10</td>
    <td width="50%"><b>Test Case Name:</b> Pagination Boundary</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration — User Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that pagination works correctly at boundary conditions (first page, last page, next/previous navigation).</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>Multiple users exist in the system (enough for at least 2 pages)</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the User Management page</td>
      <td>The first page of users is displayed. Pagination controls are visible.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Click the Next Page button in the pagination</td>
      <td>The page number increments. The table updates with a new set of user rows.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Click the Previous Page button</td>
      <td>The page number decrements. The table returns to the previous set of users.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Navigate to the last page using pagination controls</td>
      <td>The last page is displayed with remaining users. The Next button is disabled or hidden.</td>
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
        <li>Pagination navigates correctly at all boundaries</li>
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
    <td><b>Subsystem:</b> Configuration — Role Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that the Role Management page displays the role list table with correct columns and an add button.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>At least one role exists in the system</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the Role Management page (<code>/config/roles</code>)</td>
      <td>The Role Management page loads successfully</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Observe the page heading</td>
      <td>The page heading is displayed</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Observe the role list table</td>
      <td>The table renders with "Tên vai trò" (Role Name) and "Thao tác" (Actions) columns</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Observe the "+ Thêm" button</td>
      <td>The add button is visible at the top of the page</td>
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
        <li>Role list is displayed correctly with all expected columns</li>
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
    <td><b>Subsystem:</b> Configuration — Role Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that a new role can be created successfully with a valid name.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the Create Role page (<code>/config/roles/create</code>)</td>
      <td>The create role form is displayed with an empty name field and the permission matrix</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Fill "Tên vai trò" (Role Name) with a unique name (e.g., <code>Test Role 001</code>)</td>
      <td>The field accepts the input</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Click the Save button</td>
      <td>A success toast message appears. The system redirects to the Role Management page (<code>/config/roles</code>).</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Search for the newly created role name in the role list</td>
      <td>The new role is visible in the table</td>
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
        <li>New role is created and stored successfully</li>
        <li>New role appears in the role list table</li>
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
    <td><b>Subsystem:</b> Configuration — Role Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that a new role can be created with specific permissions selected from the permission matrix.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>At least one permission group exists in the system</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the Create Role page</td>
      <td>The create role form is displayed with the permission matrix visible</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Fill "Tên vai trò" (Role Name) with a unique name</td>
      <td>The field accepts the input</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>In the permission matrix, check one individual permission checkbox</td>
      <td>The checkbox is checked. If partially selected in a group, the group header shows an indeterminate state.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Click the Save button</td>
      <td>A success toast appears. The system redirects to the Role Management page.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Open the newly created role in edit mode</td>
      <td>The previously selected permission is still checked in the permission matrix</td>
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
        <li>Role with specific permissions is created and persisted</li>
        <li>Permissions are saved correctly and visible when editing</li>
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
    <td><b>Subsystem:</b> Configuration — Role Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that the create role form shows a validation error when the role name is left empty.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>User is on the Create Role page</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the Create Role page</td>
      <td>The create role form is displayed</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Leave the "Tên vai trò" (Role Name) field empty and click Submit</td>
      <td>System shows a validation error message for the role name field</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Verify the page has NOT navigated away</td>
      <td>The URL remains on the create role page. No success toast is shown. Form is not submitted.</td>
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
        <li>Empty name validation fires correctly</li>
        <li>No role is created in the system</li>
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
    <td><b>Subsystem:</b> Configuration — Role Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that clicking the edit icon on a role row opens the edit form pre-populated with existing role data.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>A role with known data exists in the system</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the Role Management page</td>
      <td>The role list is displayed</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Click the edit icon for a role row</td>
      <td>The system navigates to the edit form. The URL changes to <code>/config/roles/&lt;id&gt;/edit</code>.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Observe the "Tên vai trò" (Role Name) field</td>
      <td>The field is pre-populated with the role's current name</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Observe the permission matrix section</td>
      <td>The permission matrix is rendered (even if no permissions are selected)</td>
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
        <li>Edit form is correctly pre-populated with existing role data</li>
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
    <td><b>Subsystem:</b> Configuration — Role Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that an existing role's name can be updated successfully through the edit form.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>A role exists in the system</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the edit form of an existing role (<code>/config/roles/&lt;id&gt;/edit</code>)</td>
      <td>The edit form is displayed with the current role name pre-filled</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Clear the "Tên vai trò" field and type a new name (e.g., <code>Updated Role Name</code>)</td>
      <td>The field accepts the new input</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Click the Save button</td>
      <td>A success toast message appears. The system redirects to the Role Management page (<code>/config/roles</code>).</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Verify the updated role name in the role list</td>
      <td>The updated name is visible in the table</td>
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
        <li>Role name is updated successfully in the system</li>
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
    <td><b>Subsystem:</b> Configuration — Role Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that updating a role with an empty name triggers a validation error and prevents submission.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>A role exists in the system</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the edit form of an existing role</td>
      <td>The edit form is displayed with the role name pre-filled</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Clear the "Tên vai trò" field completely (leave it empty)</td>
      <td>The field is now empty</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Click the Save button</td>
      <td>System shows a validation error for the name field. No navigation occurs. No success toast is shown.</td>
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
        <li>Empty name is blocked by validation</li>
        <li>Role name is not changed in the system</li>
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
    <td><b>Subsystem:</b> Configuration — Role Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that a role can be deleted from the system through the delete action with confirmation dialog.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>A deletable role exists (not assigned to any user)</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the Role Management page</td>
      <td>The role list is displayed</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Locate the role to be deleted in the table</td>
      <td>The role row is visible</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Click the delete (trash) icon for that role row</td>
      <td>A confirmation dialog appears asking to confirm deletion</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Click the Confirm button in the dialog</td>
      <td>A success toast message is shown. The role row is removed from the table.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Search for the deleted role name in the list</td>
      <td>The deleted role is no longer found in the table</td>
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
        <li>Role is deleted and removed from the system</li>
        <li>Role no longer appears in the role list</li>
      </ul>
    </td>
  </tr>
</table>

---

### TC-ROL-09: Permission Matrix — Group Toggle

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td width="50%"><b>Test Case #:</b> TC-ROL-09</td>
    <td width="50%"><b>Test Case Name:</b> Permission Matrix — Group Toggle</td>
  </tr>
  <tr>
    <td><b>System:</b> IUROADMAP</td>
    <td><b>Subsystem:</b> Configuration — Role Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that the permission matrix renders all permission groups and the group-level toggle (select all / deselect all) works correctly.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>Permissions are seeded in the system</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the Create Role page</td>
      <td>The permission matrix section is visible</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Observe the permission groups</td>
      <td>At least one permission group card is rendered (if permissions exist)</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Click a group header checkbox (select all)</td>
      <td>All child permission checkboxes within that group become checked</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">4</td>
      <td>Click the same group header checkbox again (deselect all)</td>
      <td>All child permission checkboxes within that group become unchecked</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">5</td>
      <td>Check only one individual permission within a group</td>
      <td>The group header checkbox shows an indeterminate state (partially selected)</td>
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
        <li>Permission matrix renders correctly</li>
        <li>Group-level toggle and indeterminate states work as expected</li>
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
    <td><b>Subsystem:</b> Configuration — Role Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that navigating to a role edit page with a non-existent ID displays an appropriate error message.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate directly to a role edit page with a fake UUID (e.g., <code>/config/roles/00000000-0000-0000-0000-000000000000/edit</code>)</td>
      <td>The system displays an error message (e.g., "Không thể tải dữ liệu") or an error result component</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Verify no crash or blank page occurs</td>
      <td>The error is handled gracefully with a user-friendly message</td>
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
        <li>Non-existent role ID is handled gracefully with an appropriate error UI</li>
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
    <td><b>Subsystem:</b> Configuration — Role Management</td>
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
    <td colspan="2"><b>Short Description:</b> Verify that pagination on the Role Management page works correctly at boundary conditions.</td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <tr>
    <td><b>Pre-conditions:</b><br/>
      <ul>
        <li>User is logged in as an admin</li>
        <li>Multiple roles exist in the system (enough for at least 2 pages)</li>
      </ul>
    </td>
  </tr>
</table>

<br/>

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Step</th>
      <th>Action</th>
      <th>Expected System Response</th>
      <th>Pass/Fail</th>
      <th>Comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center;">1</td>
      <td>Navigate to the Role Management page</td>
      <td>The first page of roles is displayed. Pagination controls are visible.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">2</td>
      <td>Click the Next Page button in the pagination</td>
      <td>The page number increments. The table updates with a new set of role rows.</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style="text-align: center;">3</td>
      <td>Navigate to the last page using pagination controls</td>
      <td>The last page is displayed with remaining roles. The Next button is disabled or hidden.</td>
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
        <li>Pagination navigates correctly at all boundaries</li>
      </ul>
    </td>
  </tr>
</table>

---

## 4. Test Environment Requirements

<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #4472C4; color: white;">
      <th>Requirement</th>
      <th>Detail</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Authentication</td>
      <td>Seeded admin user with valid credentials</td>
    </tr>
    <tr>
      <td>Base URL</td>
      <td>Default: <code>http://localhost:5173</code></td>
    </tr>
    <tr>
      <td>Seed data</td>
      <td>At least 1 role and 1 admin user in the database</td>
    </tr>
    <tr>
      <td>Cleanup</td>
      <td>All test-created records should be deleted after test execution</td>
    </tr>
  </tbody>
</table>
