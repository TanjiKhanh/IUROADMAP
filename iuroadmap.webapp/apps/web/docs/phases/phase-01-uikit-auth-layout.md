# Phase 01 — UI Kit, Auth, & Layout

## Goal

Deliver the **complete authentication experience** and **IAM admin screens** (Role CRUD + Permission Matrix, User CRUD) for `apps/web`. When this phase is done, every FL-AUTH sub-flow described in [`FL-AUTH-authentication-rbac.md`](../../iuroadmap.docs/srs/features/FL-AUTH-authentication-rbac.md) is functional end-to-end: a guest can register/login, an admin can manage roles with the permission matrix tickbox grid, create users and assign roles, approve/reject mentors, ban/unban accounts.

**All backend APIs already exist.** This phase is **frontend-only**.

---

## Tech Stack

| Concern | Choice | Where |
|---|---|---|
| Language | TypeScript ~5.1 | All files |
| UI runtime | React 18.2 | `apps/web/` |
| Bundler | Vite 5 | `apps/web/vite.config.ts` |
| Router | react-router-dom v6 | `src/router/` |
| Server state | TanStack Query v5 (`@tanstack/react-query`) | API calls, cache |
| API codegen | `@iuroadmap/api-gen` (Orval-generated hooks + models) | `packages/api-gen/` |
| HTTP client | axios (via `@iuroadmap/api-gen`) | Interceptors in `src/api/` |
| App state | Redux Toolkit (`@iuroadmap/store`) | `appSlice` — token, profile, language |
| Auth context | React Context (`AuthProvider`) | `src/auth/` |
| Forms | react-hook-form v7 + `@hookform/resolvers` | Login, Register, Role forms |
| Validation | Zod (generated from Swagger + custom refinements) | Form validation |
| Icons | lucide-react | UI icons |
| Token parsing | `@iuroadmap/core` (`parseToken`) | JWT decode |
| Styling | CSS Modules / vanilla CSS | `src/styles/` |

---

## How It Applies — Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  main.tsx                                                        │
│  Redux Provider → TranslationProvider → QueryClientProvider      │
│    → AuthProvider → RouterProvider                               │
└──────────────────────┬──────────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │         Router              │
        ├─────────────────────────────┤
        │ Public Routes               │  Guest only (redirect if logged in)
        │  /login                     │  → Login.tsx
        │  /register                  │  → Register.tsx
        │  /forgot-password           │  → ForgotPassword.tsx
        ├─────────────────────────────┤
        │ Protected Routes            │  ProtectedRoute guard (check token)
        │  /dashboard/...             │  → LearnerDashboard, etc.
        │  /dashboard/config/...      │  → RequirePermission guard
        │    /config/user             │  → UserListPage.tsx      [NEW]
        │    /config/user/create      │  → UserCreatePage.tsx    [NEW]
        │    /config/user/:id/edit    │  → UserEditPage.tsx      [NEW]
        │    /config/role             │  → RoleListPage.tsx      [NEW]
        │    /config/role/create      │  → RoleCreatePage.tsx    [NEW]
        │    /config/role/:id/edit    │  → RoleEditPage.tsx      [NEW]
        │    /config/mentor/pending   │  → MentorApproval.tsx    [NEW]
        └─────────────────────────────┘
```

### State Flow

```
Login Form → POST /auth/login → { accessToken, user }
                                       │
                      ┌────────────────┤
                      ▼                ▼
              localStorage       Redux store
              (token persist)    (appSlice.accessToken + profile)
                                       │
                                       ▼
                                  AuthContext
                                  (user, login, logout, register)
                                       │
                              ┌────────┴────────┐
                              ▼                 ▼
                     ProtectedRoute      RequirePermission
                     (token exists?)     (user.permissions.includes?)
```

### Auth Token Lifecycle

```
1. Login success → store token in localStorage + Redux
2. Every API call → axios interceptor reads token from localStorage, sets Authorization header
3. Page refresh (F5) → Redux resets → AuthProvider reads token from localStorage → calls GET /auth/me → restores profile to Redux
4. Logout → clear localStorage + Redux + redirect to /login
5. Token expired / BANNED → API returns 401/403 → interceptor clears token → redirect to /login
```

---

## Deliverables

### FR Coverage — Sub-flow ↔ Deliverable mapping

| FL-AUTH Sub-flow | FR IDs | Deliverable | Priority |
|---|---|---|---|
| FL-AUTH-01 Đăng ký Learner | FR-AUTH.01.1→01.7 | `Register.tsx` (tab Learner) | Must |
| FL-AUTH-02 Đăng ký Mentor | FR-AUTH.02.1→02.5 | `Register.tsx` (tab Mentor) | Must |
| FL-AUTH-03 Đăng nhập | FR-AUTH.03.1→03.7 | `Login.tsx` + `AuthProvider.login()` | Must |
| FL-AUTH-04 Quên/Reset Password | FR-AUTH.04.1→04.7 | `ForgotPassword.tsx` + `ResetPassword.tsx` | Must |
| FL-AUTH-05 Đổi mật khẩu | FR-AUTH.05.1→05.4 | `ChangePassword.tsx` (modal/page) | Should |
| FL-AUTH-06 Role & Permission Matrix | FR-AUTH.06.1→06.21 | `RoleListPage.tsx` + `RoleForm.tsx` + `PermissionMatrixForm.tsx` | Must |
| FL-AUTH-07 User Directory | FR-AUTH.07.1→07.10 | `UserListPage.tsx` + `UserForm.tsx` | Must |
| FL-AUTH-08 Duyệt Mentor | FR-AUTH.08.1→08.6 | `MentorApproval.tsx` | Must |
| FL-AUTH-09 Ban/Unban | FR-AUTH.09.1→09.5 | Inline actions in `UserListPage.tsx` | Must |
| FL-AUTH-10 Đăng xuất | FR-AUTH.10.1→10.4 | `AuthProvider.logout()` + Header button | Must |
| FL-AUTH-11 Guard & Profile | FR-AUTH.11.1→11.13 | `ProtectedRoute`, `RequirePermission`, axios interceptor | Must |

---

### New files

```
apps/web/src/
├── views/
│   ├── auth/
│   │   ├── Login.tsx                    [MODIFY] — add form validation, error handling
│   │   ├── Register.tsx                 [MODIFY] — add Mentor tab, password policy
│   │   ├── ForgotPassword.tsx           [MODIFY] — add 6-digit code flow
│   │   └── ResetPassword.tsx            [NEW] — new password + code validation
│   └── config/
│       ├── role/
│       │   ├── RoleListPage.tsx         [NEW] — table: STT, Role name, Action (edit/delete)
│       │   ├── RoleCreatePage.tsx       [NEW] — wraps RoleForm
│       │   ├── RoleEditPage.tsx         [NEW] — wraps RoleForm
│       │   ├── hooks/
│       │   │   └── useRoleMutations.ts  [NEW] — mutation hooks for role
│       │   └── components/
│       │       ├── RoleForm.tsx         [NEW] — name input + PermissionMatrixForm + save/cancel
│       │       └── PermissionMatrixForm.tsx [NEW] — grid 3 cột, group cards, parent/child checkbox
│       ├── user/
│       │   ├── UserListPage.tsx         [NEW] — table: name, email, role badge, status badge, actions
│       │   ├── UserCreatePage.tsx       [NEW] — wraps UserForm
│       │   ├── UserEditPage.tsx         [NEW] — wraps UserForm
│       │   └── components/
│       │       ├── UserForm.tsx         [NEW] — create/edit user, role dropdown
│       │       └── UserStatusBadge.tsx  [NEW] — color-coded status badge component
│       └── mentor/
│           └── MentorApproval.tsx       [NEW] — pending list, approve/reject with reason
├── auth/
│   ├── AuthProvider.tsx                 [MODIFY] — cleanup, add type safety
│   ├── ProtectedRoute.tsx               [MODIFY] — redirect logic + status check
│   ├── RequirePermission.tsx            [MODIFY] — add 403 page instead of inline div
│   └── hooks/
│       └── useAuthMutations.ts          [MODIFY] — add changePassword, approve/reject mentor
├── components/
│   └── ConfirmDialog.tsx                [NEW] — reusable confirm dialog (delete, ban, etc.)
├── router/
│   ├── dashboard.routes.tsx             [MODIFY] — add config/role/*, config/user/*, config/mentor/*
│   └── auth.routes.tsx                  [MODIFY] — add /reset-password route
└── hooks/
    └── usePermission.ts                 [NEW] — hook: hasPermission(code), hasAnyPermission([...])
```

---

### Component Specifications

#### 1. `PermissionMatrixForm.tsx` — Permission Grid (FR-AUTH.06.8→06.13)

The core component of this phase. Renders the permission selection UI.

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
- Grid layout: **3 columns** (responsive → 2 col tablet, 1 col mobile)
- Each group = 1 **card** with:
  - ☐ **Group header checkbox** (parent) — `PermissionGroup.name`
  - Indented list of ☐ **permission checkboxes** (children) — `Permission.displayName`
- **Parent → children:** tick group checkbox → tick ALL children. Untick group → untick ALL.
- **Children → parent:** all children ticked → parent ☑. Some ticked → parent ▣ (indeterminate). None → parent ☐.
- When `disabled=true`: all checkboxes rendered as checked + disabled (SUPERADMIN view).

**API:** `GET /api/v1/iam/Role/GetAllPermission`

#### 2. `RoleListPage.tsx` — Role List Page (FR-AUTH.06.1→06.5)

| Element | Spec |
|---|---|
| Route | `/dashboard/config/role` |
| Permission guard | `ROLE.AD` or `SYS.AD` |
| Table columns | `No.` (STT), `Role` (name), `Action` (edit ✏️ + delete 🗑️) |
| "+ Create new" button | Top-right → navigate to `/dashboard/config/role/create` |
| Edit button | Navigate to `/dashboard/config/role/:id/edit` |
| Delete button | Confirm dialog → `POST /iam/Role/delete/:id`. Blocked if role has users → show error `409`. System roles hide delete button. |
| API | `GET /api/v1/iam/Role/GetByIndex` |

#### 3. `RoleForm.tsx` (in `RoleCreatePage` / `RoleEditPage`) — Create / Edit Role (FR-AUTH.06.6→06.18)

| Element | Spec |
|---|---|
| Route | `/dashboard/config/role/create` (new) or `/dashboard/config/role/:id/edit` (edit) |
| Fields | `Role Name` (required, unique), `Description` (optional) |
| Below fields | `<PermissionMatrixForm>` component |
| Validation | Name not empty, name unique (server-side 409), ≥1 permission selected |
| Save | `POST /iam/Role/create` or `POST /iam/Role/update` with `{ name, description, permissionIds[] }` |
| Success | Redirect to RoleListPage + toast "Role created/updated successfully" |
| Cancel | Redirect to RoleListPage. If unsaved changes → confirm dialog. |
| Edit mode | Pre-populate name + tick existing permissions from `GET /iam/Role/getById/:id` |
| SUPERADMIN | PermissionMatrix rendered `disabled=true` (all ticked, non-editable) |

#### 4. `UserListPage.tsx` — User Directory (FR-AUTH.07.1→07.10)

| Element | Spec |
|---|---|
| Route | `/dashboard/config/user` |
| Permission guard | `USER.AD` |
| Table columns | Name, Email, Role (badge), Status (color badge), CreatedAt, Action |
| Status badges | `ACTIVE`=green, `PENDING_APPROVAL`=yellow, `BANNED`=red, `REJECTED`=gray |
| Search | By name/email |
| Filter | By role (dropdown), by status (dropdown) |
| Actions | Edit, Ban/Unban (toggle), Delete (superadmin only) |
| "+ Create user" button | Top-right → navigate to create form |
| Self-protection | Cannot ban/delete own account (button disabled + tooltip) |
| API | `GET /api/v1/iam/User/GetByIndex` |

#### 5. `MentorApproval.tsx` — Mentor Verification (FR-AUTH.08.1→08.6)

| Element | Spec |
|---|---|
| Route | `/dashboard/config/mentor/pending` |
| Permission guard | `USER.AD` |
| List | Users with `status=PENDING_APPROVAL AND role=MENTOR` |
| Approve | Button → `PENDING_APPROVAL → ACTIVE`. Toast notification. |
| Reject | Button → modal with **mandatory reason** textarea → `PENDING_APPROVAL → REJECTED`. |
| API | `POST /api/v1/iam/User/approve/:id`, `POST /api/v1/iam/User/reject/:id` |

---

## Verification

1. **Register flow**: Guest can register as Learner (→ ACTIVE) or Mentor (→ PENDING_APPROVAL). Validation: email unique, password policy (8+ chars, 1 upper, 1 lower, 1 digit), confirm password match. Errors display inline.
2. **Login flow**: Guest enters email + password → receives JWT → stored in localStorage + Redux → redirected to dashboard. Invalid credentials → "Invalid email or password". BANNED user → "Account has been suspended".
3. **Forgot password flow**: Enter email → receive 6-digit code → enter code + new password → password reset → redirect to login.
4. **AuthProvider restore**: After F5 (page refresh), AuthProvider reads token from localStorage, calls `GET /auth/me`, restores profile to Redux. If token invalid/expired → redirect to login.
5. **Protected routes**: Unauthenticated user visiting `/dashboard/*` → redirect to `/login`. Authenticated user without `ROLE.AD` visiting `/dashboard/config/role` → 403 page.
6. **Role CRUD**:
   - Admin visits Configuration → Roles → sees table with system roles.
   - Click "+ Create new" → enters name → sees Permission Matrix grid (3 columns, group cards).
   - Tick a group checkbox → all children auto-tick. Untick one child → group shows indeterminate (▣).
   - Save → role appears in list. Edit → permissions pre-populated. Delete → confirm dialog; blocked if users assigned.
   - SUPERADMIN role: matrix is read-only (all ticked, disabled).
7. **User CRUD**:
   - Admin sees user list with color-coded status badges.
   - Create user → assign role from dropdown → password auto-generated or manual.
   - Ban user → status changes to BANNED, user's JWT invalidated (next API call returns 403).
   - Admin cannot ban/delete themselves.
8. **Mentor approval**: Admin sees pending mentors → approve (→ ACTIVE) or reject (with mandatory reason → REJECTED).
9. **Logout**: Click logout → clear localStorage + Redux → redirect to `/login`.
10. **Existing features unchanged**: Learner dashboard, Macro/Micro Roadmap, Mentor features all still work.

---

## Out of scope (deferred)

- OAuth2 / SSO / Google Sign-in — future enhancement.
- Two-Factor Authentication (2FA) — future enhancement.
- Refresh token rotation — current: 24h access token only.
- Session management (multi-device awareness) — future enhancement.
- Account lockout (5 failed attempts → 15 min lock) — should, not must.
- Audit log viewer (admin screen to browse auth events) — Phase Admin-Config.
- Email verification after registration — future enhancement.
- Change password page — should priority, can defer to next sprint.
- Export users to Excel/CSV — could priority.
