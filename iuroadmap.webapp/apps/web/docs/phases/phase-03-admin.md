# Phase 3 — Config: User CRUD, Role + Permission Matrix, Mentor Approval, Ban/Unban

## Why this is Phase 3 (before any business module)

Every later business module (Learner Portal from Phase 4 onward) references users, roles, permissions, and departments. Shipping a feature module before its master data exists means permission guards have no roles to check against, and demos can't run end-to-end.

Phase 3 lands the admin surfaces so subsequent phases can operate with real user accounts, roles, and permissions.

---

## Goal

Port the complete administration screens. This phase covers all FL-AUTH sub-flows related to admin management (FL-AUTH-06 through FL-AUTH-09) plus department management from FL-CFG.

**All backend APIs already exist.** This phase is **frontend-only**.

---

## Module breakdown

### Role Management (`FL-AUTH-06`)

- Role list with pagination (SCR-ROLE-LIST)
- Role create/edit with Permission Matrix grid (SCR-ROLE-CREATE / SCR-ROLE-EDIT)
- Role delete with safeguards (system roles protected, user-assigned roles blocked)

### User Management (`FL-AUTH-07`)

- User list with search, filter, pagination
- User create (manual account creation by admin)
- User edit (change name, role assignment)
- User detail view

### Mentor Approval (`FL-AUTH-08`)

- Pending mentor applications list
- Approve / Reject with mandatory reason

### Ban / Unban (`FL-AUTH-09`)

- Ban user with optional reason
- Unban user
- Inline actions in User list

### Department Management (`FL-CFG`)

- Department list
- Department create / edit / delete

---

## FR Coverage — Sub-flow ↔ Deliverable mapping

| FL-AUTH Sub-flow | FR IDs | Deliverable | Priority |
|---|---|---|---|
| FL-AUTH-06 Role & Permission Matrix | FR-AUTH.06.1→06.21 | `RoleListPage.tsx` + `RoleForm.tsx` + `PermissionMatrixForm.tsx` | Must |
| FL-AUTH-07 User Directory | FR-AUTH.07.1→07.9 | `UserListPage.tsx` + `UserForm.tsx` | Must |
| FL-AUTH-08 Duyệt Mentor | FR-AUTH.08.1→08.6 | `MentorApproval.tsx` | Must |
| FL-AUTH-09 Ban/Unban | FR-AUTH.09.1→09.5 | Inline actions in `UserListPage.tsx` | Must |
| FL-AUTH-05 Đổi mật khẩu | FR-AUTH.05.1→05.4 | `ChangePassword.tsx` (modal/page) | Should |

---

## Backend endpoints / Swagger tags consumed

### Role (tag: `IamRoles`)
- `GET /api/v1/iam/Role/GetByIndex` — paginated role list
- `GET /api/v1/iam/Role/getById/:id` — role detail with assigned permissions
- `GET /api/v1/iam/Role/GetAllPermission` — all permissions grouped by PermissionGroup
- `GET /api/v1/iam/Role/ForDropdown` — roles dropdown (id + name only)
- `POST /api/v1/iam/Role/create` — create role with `{ name, description, permissionIds[] }`
- `POST /api/v1/iam/Role/update` — update role
- `POST /api/v1/iam/Role/delete/:id` — delete role

### User (tag: `IamUsers`)
- `GET /api/v1/iam/User/GetByIndex` — paginated user list with search/filter
- `GET /api/v1/iam/User/getById/:id` — user detail
- `POST /api/v1/iam/User/create` — create user
- `POST /api/v1/iam/User/update` — update user
- `POST /api/v1/iam/User/softDelete/:id` — ban (soft delete)
- `POST /api/v1/iam/User/delete/:id` — hard delete (superadmin only)
- `POST /api/v1/iam/User/approve/:id` — approve mentor
- `POST /api/v1/iam/User/reject/:id` — reject mentor (with reason)

### Department (tag: `Departments`)
- `GET /api/v1/departments` — department list
- `POST /api/v1/departments` — create
- `PUT /api/v1/departments/:id` — update
- `DELETE /api/v1/departments/:id` — delete

---

## Generated artefacts expected from `@iuroadmap/api-gen`

### Hooks
- `useIamRolesGetByIndex`, `useIamRolesGetById`, `useIamRolesGetAllPermission`, `useIamRolesForDropdown`
- `useIamRolesCreate`, `useIamRolesUpdate`, `useIamRolesDelete`
- `useIamUsersGetByIndex`, `useIamUsersGetById`
- `useIamUsersCreate`, `useIamUsersUpdate`, `useIamUsersSoftDelete`, `useIamUsersDelete`
- `useIamUsersApprove`, `useIamUsersReject`
- `useDepartmentsGetAll`, `useDepartmentsCreate`, `useDepartmentsUpdate`, `useDepartmentsDelete`

### Zod schemas
- `createRoleBody`, `updateRoleBody` — Zod for role forms
- `createUserBody`, `updateUserBody` — Zod for user forms
- `rejectMentorBody` — Zod requiring `rejectionReason`

### Cross-field refinements
- Role form: `permissionIds.length >= 1` (at least 1 permission required — FR-AUTH.06.15)
- User form: `password === confirmPassword` (if creating with password)

---

## Component Specifications

### 1. `PermissionMatrixForm.tsx` — Permission Grid (FR-AUTH.06.8→06.13)

The core component of this phase. **Domain-specific** → lives in `views/config/role/components/`, NOT in `components/common/`.

**Props:**
```typescript
interface PermissionMatrixProps {
  value: string[];                    // selected permission IDs
  onChange: (ids: string[]) => void;  // callback when selection changes
  disabled?: boolean;                 // read-only mode (for SUPERADMIN)
}
```

**Behavior (from FR):**
- Loads data from `GET /iam/Role/GetAllPermission` → `{ groups: [{ id, name, permissions: [{ id, name, displayName }] }] }`
- Grid layout: **3 columns** (responsive → 2 col tablet, 1 col mobile) — FR-AUTH.06.8
- Each group = 1 **card** with:
  - ☐ **Group header checkbox** (parent) — `PermissionGroup.name` — FR-AUTH.06.9
  - Indented list of ☐ **permission checkboxes** (children) — `Permission.displayName`
- **Parent → children:** tick group checkbox → tick ALL children. Untick group → untick ALL. — FR-AUTH.06.10
- **Children → parent:** all children ticked → parent ☑. Some ticked → parent ▣ (indeterminate). None → parent ☐. — FR-AUTH.06.11
- When `disabled=true`: all checkboxes rendered as checked + disabled (SUPERADMIN view). — FR-AUTH.06.19
- Data loads from generated hook, pre-grouped by `PermissionGroup`. — FR-AUTH.06.12

**Visual (from SRS):**
```
┌─────────────────────────────┐  ┌─────────────────────────────┐  ┌─────────────────────────────┐
│ ☐ Quản lý Hệ thống         │  │ ☐ Quản lý Roadmap           │  │ ☐ Đánh giá Giảng viên       │
│   ☐ Quản trị cấu hình      │  │   ☐ Sử dụng Roadmap         │  │   ☐ Xem và đánh giá GV      │
│     (SYS.AD)                │  │     (RM.USER)                │  │     (LR.USER)                │
│                             │  │   ☐ Quản trị Roadmap         │  │   ☐ Quản trị Đánh giá GV    │
│                             │  │     (RM.AD)                  │  │     (LR.AD)                  │
├─────────────────────────────┤  ├─────────────────────────────┤  ├─────────────────────────────┤
│ ☐ Quản lý Người dùng       │  │ ☐ Quản lý Mentor            │  │ ☐ AI Chatbot                │
│   ☐ Xem người dùng         │  │   ☐ Sử dụng Mentor Portal   │  │   ☐ Sử dụng AI Chatbot      │
│     (USER.VIEW)             │  │     (MNT.USER)               │  │     (RAG.USER)               │
│   ☐ Quản lý Users          │  │   ☐ Quản trị Mentor          │  │   ☐ Quản trị AI Chatbot     │
│     (USER.AD)               │  │     (MNT.AD)                 │  │     (RAG.AD)                 │
│   ☐ Quản trị Role          │  │                             │  │                             │
│     (ROLE.AD)               │  │                             │  │                             │
└─────────────────────────────┘  └─────────────────────────────┘  └─────────────────────────────┘
```

### 2. `RoleListPage.tsx` — Role List Page (FR-AUTH.06.1→06.5)

| Element | Spec |
|---|---|
| Route | `/dashboard/config/role` |
| Permission guard | `ROLE.AD` or `SYS.AD` |
| Uses | `<DataTable>` from Phase 2 |
| Table columns | `No.` (STT), `Role` (name), `Description`, `Action` (edit ✏️ + delete 🗑️) |
| "Create new" button | Top-right → navigate to `/dashboard/config/role/create` |
| Edit button | Navigate to `/dashboard/config/role/:id/edit` |
| Delete button | `<ConfirmDialog>` → API delete. Blocked if role has users → show error `409`. System roles (SUPERADMIN, ADMIN, LEARNER, MENTOR) hide delete button. |
| API | `GET /api/v1/iam/Role/GetByIndex` |

### 3. `RoleForm.tsx` (in `RoleCreatePage` / `RoleEditPage`) — Create / Edit Role (FR-AUTH.06.6→06.18)

| Element | Spec |
|---|---|
| Route | `/dashboard/config/role/create` or `/dashboard/config/role/:id/edit` |
| Fields | `Role Name` (required, unique), `Description` (optional) |
| Below fields | `<PermissionMatrixForm>` component |
| Validation | Name not empty, name unique (server-side 409), ≥1 permission selected |
| Save | `POST /iam/Role/create` or `POST /iam/Role/update` with `{ name, description, permissionIds[] }` |
| Success | Redirect to RoleListPage + toast "Role created/updated successfully" |
| Cancel | Redirect to RoleListPage. If unsaved changes → `<ConfirmDialog>`. (FR-AUTH.06.18) |
| Edit mode | Pre-populate name + tick existing permissions from `GET /iam/Role/getById/:id` (FR-AUTH.06.13) |
| SUPERADMIN | PermissionMatrixForm rendered `disabled=true` (all ticked, non-editable) (FR-AUTH.06.19) |
| JWT update | Permission changes reflect at next login only (FR-AUTH.06.17) |

### 4. `UserListPage.tsx` — User Directory (FR-AUTH.07.1→07.9)

| Element | Spec |
|---|---|
| Route | `/dashboard/config/user` |
| Permission guard | `USER.AD` |
| Uses | `<DataTable>` + `<StatusBadge>` + `<RoleBadge>` from Phase 2 |
| Table columns | Name, Email, Role (`<RoleBadge>`), Status (`<StatusBadge>`), CreatedAt, Action |
| Status badges | `ACTIVE`=green, `PENDING_APPROVAL`=yellow, `BANNED`=red, `REJECTED`=gray (FR-AUTH.09.4) |
| Search | By name/email |
| Filter | By role (dropdown from `GET /iam/Role/ForDropdown`), by status (dropdown) |
| Actions | Edit, Ban/Unban (toggle), Delete (superadmin only) |
| "Create user" button | Top-right → navigate to create form |
| Self-protection | Cannot ban/delete own account (button disabled + tooltip) (FR-AUTH.07.7) |
| SUPERADMIN protection | Admin KHÔNG THỂ sửa/xóa SUPERADMIN accounts (no exception) (FR-AUTH.07.8) |
| API | `GET /api/v1/iam/User/GetByIndex` |

### 5. `UserForm.tsx` (in `UserCreatePage` / `UserEditPage`) — Create / Edit User (FR-AUTH.07.3→07.4)

| Element | Spec |
|---|---|
| Route | `/dashboard/config/user/create` or `/dashboard/config/user/:id/edit` |
| Create fields | `Email` (unique), `Name`, `Password` (auto-generate or manual), **Role** (dropdown), `Status` (default ACTIVE) |
| Edit fields | `Name` (editable), **Role** (dropdown, changeable), `SubscriptionTier`. **Email is immutable** (disabled). |
| Role dropdown | Data from `GET /iam/Role/ForDropdown` (FR-AUTH.06.20) |
| Validation | Email format + unique (409), name required, password policy (FR-AUTH.01.7) |
| Password | Hash on backend. Frontend validates policy: ≥ 8 chars, 1 upper, 1 lower, 1 digit. |
| Save | `POST /iam/User/create` or `POST /iam/User/update` |
| Success | Redirect to UserListPage + toast |

### 6. `MentorApproval.tsx` — Pending Mentor Applications (FR-AUTH.08.1→08.6)

| Element | Spec |
|---|---|
| Route | `/dashboard/config/mentor/pending` |
| Permission guard | `USER.AD` |
| List | Users with `status=PENDING_APPROVAL AND role=MENTOR` (FR-AUTH.08.1) |
| Detail view | Mentor profile: specializations, bio, experience (FR-AUTH.08.2) |
| Approve | Button → `PENDING_APPROVAL → ACTIVE` (T3). Toast notification. (FR-AUTH.08.3) |
| Reject | Button → `<Modal>` with **mandatory reason** textarea → `PENDING_APPROVAL → REJECTED`. (FR-AUTH.08.4) |
| Tracking | Uses Base CRUD (`updatedAt`, `updatedBy`) for last approver/rejector. (FR-AUTH.08.6) |
| API | `POST /api/v1/iam/User/approve/:id`, `POST /api/v1/iam/User/reject/:id` |

### 7. `ChangePassword.tsx` — Change Password (FR-AUTH.05.1→05.4)

| Element | Spec |
|---|---|
| Route | `/dashboard/change-password` (or modal from profile page) |
| Fields | `Current Password`, `New Password`, `Confirm New Password` |
| Validation | (a) current password correct (server-side 400); (b) new === confirm; (c) policy; (d) new ≠ current |
| API | `POST /api/v1/auth/change-password` |
| Success | Toast + redirect to login ("Please log in again") (FR-AUTH.05.4) |

---

## New files in `apps/web/src/`

```
views/config/
├── role/
│   ├── RoleListPage.tsx                 # table: STT, Role name, Description, Action
│   ├── RoleListPage.module.css
│   ├── RoleCreatePage.tsx               # wraps RoleForm
│   ├── RoleEditPage.tsx                 # wraps RoleForm
│   ├── hooks/
│   │   └── useRoleMutations.ts          # mutation hooks
│   └── components/
│       ├── RoleForm.tsx                 # name + description + PermissionMatrixForm + save/cancel
│       ├── RoleForm.module.css
│       ├── PermissionMatrixForm.tsx     # grid 3 cột, group cards, parent/child checkbox
│       └── PermissionMatrixForm.module.css
├── user/
│   ├── UserListPage.tsx                 # table: name, email, role badge, status badge, actions
│   ├── UserListPage.module.css
│   ├── UserCreatePage.tsx               # wraps UserForm
│   ├── UserEditPage.tsx                 # wraps UserForm
│   └── components/
│       ├── UserForm.tsx                 # create/edit user, role dropdown
│       ├── UserForm.module.css
│       └── UserStatusActions.tsx        # ban/unban/delete action buttons with guards
├── mentor/
│   ├── MentorApproval.tsx               # pending list, approve/reject with reason
│   ├── MentorApproval.module.css
│   └── components/
│       ├── MentorDetailModal.tsx        # mentor profile preview
│       └── RejectReasonModal.tsx        # mandatory reason textarea
├── department/
│   ├── DepartmentList.tsx
│   ├── DepartmentList.module.css
│   ├── DepartmentForm.tsx
│   └── DepartmentForm.module.css
└── ChangePassword.tsx                   # change password form

router/
├── config.routes.tsx                    # [NEW] config route definitions
└── dashboard.routes.tsx                 # [MODIFY] add config/* and change-password routes
```

---

## Route additions

```typescript
// router/config.routes.tsx (NEW)
export const configRoutes = [
  { path: 'role', element: <RoleListPage /> },
  { path: 'role/create', element: <RoleCreatePage /> },
  { path: 'role/:id/edit', element: <RoleEditPage /> },
  { path: 'user', element: <UserListPage /> },
  { path: 'user/create', element: <UserCreatePage /> },
  { path: 'user/:id/edit', element: <UserEditPage /> },
  { path: 'mentor/pending', element: <MentorApproval /> },
  { path: 'department', element: <DepartmentList /> },
  { path: 'department/create', element: <DepartmentForm /> },
  { path: 'department/:id/edit', element: <DepartmentForm /> },
];
```

Add to `@iuroadmap/core/constants/routes.ts`:

```typescript
// In ConfigPaths interface:
user: string;
userCreate: string;
userEdit: string;
role: string;
roleCreate: string;
roleEdit: string;
mentorPending: string;
```

---

## Sidebar menu additions

Add to `@iuroadmap/core/menus/menu.ts` under the `system-menu` group:

```typescript
// Administration group — new items:
{
  roles: FeaturePms.system.admin,
  permissions: ['ROLE.AD', 'SYS.AD'],
  path: RoutePaths.web.config.role,
  title: Translations.sidebar.roles,    // "Roles" / "Vai trò"
  iconWeb: MenuIconsWeb.shield,
  // ...
},
{
  roles: FeaturePms.system.admin,
  permissions: ['USER.AD', 'SYS.AD'],
  path: RoutePaths.web.config.user,
  title: Translations.sidebar.users,    // "Users" / "Người dùng"
  iconWeb: MenuIconsWeb.users,
  // ...
},
{
  roles: FeaturePms.system.admin,
  permissions: ['USER.AD'],
  path: RoutePaths.web.config.mentorPending,
  title: 'navigation.mentorApproval',   // "Mentor Approval" / "Duyệt Mentor"
  iconWeb: MenuIconsWeb.userCheck,
  // ...
},
```

---

## Reused `@iuroadmap/core` assets

- `RoutePaths.web.admin.*` — verify + extend with new paths
- `FeaturePms` — extend with `roleAdmin`, `userAdmin` permission entries
- `Translations.sidebar.*` — add `roles`, `users`, `mentorApproval`
- `UserRole` enum — may need to add `SUPERADMIN` if not already present

---

## i18n keys to add or verify

### Role management
- `role.list.title` — "Role Management" / "Quản lý vai trò"
- `role.create.title` — "Create Role" / "Tạo vai trò mới"
- `role.edit.title` — "Edit Role" / "Chỉnh sửa vai trò"
- `role.form.name` — "Role Name" / "Tên vai trò"
- `role.form.description` — "Description" / "Mô tả"
- `role.form.permissions` — "Permissions" / "Quyền hạn"
- `role.form.atLeastOnePermission` — "Select at least one permission" / "Chọn ít nhất một quyền"
- `role.deleteBlocked` — "Cannot delete role. {count} users are assigned." / "Không thể xóa vai trò. {count} người dùng đang sử dụng."
- `role.systemRoleProtected` — "Cannot delete system role" / "Không thể xóa vai trò hệ thống"
- `role.createSuccess` — "Role created successfully" / "Tạo vai trò thành công"
- `role.updateSuccess` — "Role updated successfully" / "Cập nhật vai trò thành công"

### User management
- `user.list.title` — "User Management" / "Quản lý người dùng"
- `user.create.title` — "Create User" / "Tạo người dùng"
- `user.edit.title` — "Edit User" / "Chỉnh sửa người dùng"
- `user.form.email` — "Email"
- `user.form.name` — "Full Name" / "Họ và tên"
- `user.form.password` — "Password" / "Mật khẩu"
- `user.form.role` — "Role" / "Vai trò"
- `user.ban.confirm` — "Ban this user?" / "Cấm người dùng này?"
- `user.unban.confirm` — "Unban this user?" / "Mở khóa người dùng này?"
- `user.cannotModifySelf` — "Cannot modify your own account" / "Không thể thay đổi tài khoản của chính bạn"
- `user.insufficientPrivileges` — "Insufficient privileges" / "Không đủ quyền hạn"

### Mentor approval
- `mentor.approval.title` — "Mentor Applications" / "Đơn đăng ký Mentor"
- `mentor.approval.approve` — "Approve" / "Duyệt"
- `mentor.approval.reject` — "Reject" / "Từ chối"
- `mentor.approval.rejectReason` — "Rejection Reason (required)" / "Lý do từ chối (bắt buộc)"
- `mentor.approval.approveSuccess` — "Mentor approved successfully" / "Duyệt mentor thành công"
- `mentor.approval.rejectSuccess` — "Mentor rejected" / "Đã từ chối mentor"

---

## Responsive notes

- **Permission Matrix**: 3-column grid on desktop → 2 columns on tablet → 1 column on mobile. Each group card scrolls internally if many permissions. (FR-AUTH.06.8)
- **RoleList / UserList**: `<DataTable>` handles responsive switching (table → card list on mobile).
- **RoleForm**: two-section layout on desktop (name/description top, matrix bottom, both full-width). Same stacked layout on mobile.
- **MentorApproval**: list view on desktop, card view on mobile. Detail view opens in `<Modal>` (full-screen on mobile).
- **RejectReasonModal**: centered modal on desktop, bottom sheet on mobile.
- **ChangePassword**: centered card on desktop, full-width stacked on mobile.

---

## Manual verification checklist

### Role CRUD
- [ ] Admin visits Administration → Roles → sees table with system roles (SUPERADMIN, ADMIN, LEARNER, MENTOR).
- [ ] Click "Create new" → enters name → sees Permission Matrix grid (3 columns, group cards).
- [ ] Tick a group checkbox → all children auto-tick. Untick one child → group shows indeterminate (▣).
- [ ] Save with empty name → validation error inline. Save with no permissions → error.
- [ ] Save → role appears in list. Edit → permissions pre-populated. (FR-AUTH.06.13)
- [ ] Delete role → confirm dialog; blocked if users assigned (409 error displayed). (FR-AUTH.06.4)
- [ ] System roles (SUPERADMIN, ADMIN, LEARNER, MENTOR) hide delete button. (FR-AUTH.06.5)
- [ ] SUPERADMIN role: matrix is read-only (all ticked, disabled). (FR-AUTH.06.19)
- [ ] Duplicate role name → server returns 409 → error displayed inline. (FR-AUTH.06.6)
- [ ] Cancel with unsaved changes → confirm dialog. (FR-AUTH.06.18)

### User CRUD
- [ ] Admin sees user list with color-coded status badges and role badges.
- [ ] Search by name/email works. Filter by role/status works.
- [ ] Create user → assign role from dropdown → saves successfully.
- [ ] Edit user → change role → saves. Email field is disabled (immutable). (FR-AUTH.07.4)
- [ ] Admin cannot ban/delete themselves → button disabled with tooltip. (FR-AUTH.07.7)
- [ ] Admin cannot modify SUPERADMIN accounts (no exception). (FR-AUTH.07.8)

### Mentor Approval
- [ ] Admin sees pending mentors list.
- [ ] Approve → status changes to ACTIVE, toast shown. (FR-AUTH.08.3)
- [ ] Reject → modal opens, reason textarea required (cannot submit empty). (FR-AUTH.08.4)
- [ ] After reject → mentor cannot login. (FR-AUTH.08.5)

### Ban/Unban
- [ ] Ban user → status changes to BANNED (red badge). (FR-AUTH.09.1)
- [ ] Banned user's next API call returns 403. (FR-AUTH.09.2)
- [ ] Unban user → status changes to ACTIVE (green badge). (FR-AUTH.09.3)

### Change Password
- [ ] Wrong current password → error "Current password is incorrect".
- [ ] New password = current → error.
- [ ] Password policy violation → inline validation.
- [ ] Success → toast + redirect to login.

### Existing features
- [ ] Learner dashboard, Roadmap, Mentor features all still work unchanged.

---

## Out of scope (deferred)

- Audit log viewer (admin screen to browse events) — simplified to Base CRUD per FR-AUTH.11.8.
- Bulk user import — TBD.
- Export users to Excel/CSV — Could priority (FR-AUTH.07.9 removed).
- OAuth2 / SSO / Google Sign-in — future enhancement.
- Two-Factor Authentication (2FA) — future enhancement.
- Account lockout (5 failed attempts → 15 min lock) — Should priority, deferred.
- Advanced department management (hierarchy, org tree) — Phase 5+ if needed.
