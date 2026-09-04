# Phase 2.1 — Prebuild: JWT Profile, Permission-Driven Sidebar, Profile Page

## Why this phase exists (between Phase 2 and Phase 3)

Phase 1 wires login + auth guards with a basic `TokenProfile`. Phase 2 ships the common component library. Phase 3 needs to start authoring **admin screens** (User CRUD, Role + Permission Matrix) that:

1. **Filter the sidebar by permissions** — `navigation` config in `@iuroadmap/core/menus/menu.ts` already declares `roles` and `permissions` on every entry; the sidebar reads them but the filtering logic needs to be robust. Phase 3 cannot ship an "Admin → Roles" menu item that's admin-only without that filter being solid.
2. **Decode the full JWT profile** — Phase 1 parses the JWT into `TokenProfile` (`sub`, `userId`, `email`, `role`, `permissions[]`). Phase 3 needs this profile to gate admin actions (e.g. "Admin cannot modify SUPERADMIN accounts", "Admin cannot delete self").
3. **Show a profile page** — before User CRUD (Phase 3), the "View my profile" entry in the user menu needs a destination.
4. **Provide a `usePermission` hook** — every admin page needs `hasPermission('ROLE.AD')`, `hasAnyPermission(['USER.AD', 'SYS.AD'])` checks. Landing this as infrastructure keeps Phase 3 focused on screens.

These concerns are tightly coupled (all read the JWT, all read permissions), small in scope, and entirely **infrastructure**. Bundling them as a half-step between the component library and the first admin module keeps Phase 3 focused on UI screens, not auth plumbing.

---

## Goal

- Promote `TokenProfile` to a **fully-typed, robust** JWT profile parsed once at sign-in (and on every page reload from the rehydrated token).
- Build the `usePermission` hook for permission-based UI gating.
- Enable **sidebar menu filtering** using the parsed `permissions[]` and `role` from the JWT.
- Add a **Profile Page** where authenticated users can view their own information.
- Add `useBreakpoint` hook for responsive layout detection (used by Phase 2 components and layouts).

---

## Feature list (mapped from SRS)

| Concern | SRS Reference | Source | Target |
| --- | --- | --- | --- |
| JWT parsing | FR-AUTH.00.6, FR-AUTH.03.4 | `@iuroadmap/core/auth/jwt.ts` | Verify + harden `parseToken()` |
| Permission guard | FR-AUTH.11.2, FR-AUTH.00.7 | `src/auth/RequirePermission.tsx` | Add `usePermission` hook |
| Sidebar filtering | FR-AUTH.00.7 | `@iuroadmap/core/menus/menu.ts` | Filter sidebar items by permissions |
| User profile | FR-AUTH.11.5 | — | `src/views/profile/ProfilePage.tsx` |
| Profile update | FR-AUTH.11.6 | — | Name + avatar update form |

---

## Backend endpoints / Swagger tags consumed

- `GET /api/v1/auth/me` — current user profile (id, email, name, role, permissions, status, subscriptionTier, createdAt). Already consumed by Phase 1 `AuthProvider`; this phase renders the response in a profile page.
- `PUT /api/v1/auth/me` (or `POST /api/v1/auth/update-profile`) — update name, avatar. (FR-AUTH.11.6, Should priority)

---

## Generated artefacts expected from `@iuroadmap/api-gen`

- Hooks: `useAuthMe` (already generated in Phase 0), `useAuthUpdateProfile` (mutation, verify operationId exists)
- Zod schemas: `updateProfileBody` (Zod for the profile form, if endpoint exists in Swagger)
- If `PUT /auth/me` is not yet in the backend Swagger, the profile page is **view-only** in this phase.

---

## JWT claim contract

Already defined in `@iuroadmap/core/auth/jwt.ts`:

```typescript
export interface TokenProfile {
  sub: string;
  userId: string;
  email: string;
  role: UserRole;            // single role name (e.g. 'ADMIN')
  roles: UserRole[];         // convenience array: [role]
  permissions: string[];     // permission codes from JWT payload (e.g. ['RM.USER', 'SYS.AD'])
  exp?: number;              // expiry (seconds since epoch)
  iat?: number;              // issued at
}
```

**Phase 2.1 tasks:**
- Verify `parseToken()` gracefully handles malformed tokens (returns `null`, logs error).
- Add expired-token check: `exp <= now()` → return `null` and dispatch `clearAuth()`.
- Ensure `permissions` field is correctly parsed from JWT payload (verify backend encodes `permissions[]` into JWT per FR-AUTH.00.6).

---

## `usePermission` hook

New hook at `src/hooks/usePermission.ts`:

```typescript
export function usePermission() {
  const profile = useAppSelector(selectTokenProfile);

  const hasPermission = (code: string): boolean => {
    if (!profile) return false;
    if (profile.role === UserRole.ADMIN) return true; // ADMIN short-circuit (FR-AUTH.11.3 — SUPERADMIN)
    return profile.permissions.includes(code);
  };

  const hasAnyPermission = (codes: string[]): boolean => {
    return codes.some((code) => hasPermission(code));
  };

  const hasAllPermissions = (codes: string[]): boolean => {
    return codes.every((code) => hasPermission(code));
  };

  return { hasPermission, hasAnyPermission, hasAllPermissions, profile };
}
```

> **Note:** SUPERADMIN short-circuit: per FR-AUTH.11.3, SUPERADMIN always passes every permission guard. The hook handles this by checking `profile.role`. (If SUPERADMIN is added to `UserRole` enum in a later phase, update the check.)

---

## Sidebar menu filtering

`@iuroadmap/core/menus/menu.ts` already defines `IURoadmapMenuItem` with `roles` and `permissions?` fields. The sidebar component needs to filter items before rendering:

```typescript
function isItemAllowed(item: IURoadmapMenuItem, profile: TokenProfile | null): boolean {
  if (!profile) return false;

  // Check role-based access
  if (item.roles && item.roles.length > 0) {
    if (!item.roles.includes(profile.role)) return false;
  }

  // Check permission-based access (if specified)
  if (item.permissions && item.permissions.length > 0) {
    const hasAny = item.permissions.some((p) => profile.permissions.includes(p));
    if (!hasAny) return false;
  }

  return true;
}
```

**Children filtering:** recursive — a parent with no surviving children AND no `path` of its own is hidden.

**Phase 3 onward:** every new menu entry declares its `roles` and `permissions` and the sidebar respects it without extra wiring.

---

## New files in `apps/web/src/`

```
hooks/
├── usePermission.ts                # hasPermission, hasAnyPermission, hasAllPermissions
├── useBreakpoint.ts                # isMobile (< 768px), isDesktop (>= 768px)
└── useUnsavedChanges.ts            # blocks navigation if form has unsaved changes (Phase 3 needs)

views/profile/
├── ProfilePage.tsx                 # user profile page
├── ProfilePage.module.css
└── components/
    ├── ProfileInfoCard.tsx         # avatar + name + email + role badge
    ├── ProfileInfoCard.module.css
    ├── ProfileEditForm.tsx         # edit name + avatar (if backend supports PUT /auth/me)
    └── ProfileEditForm.module.css

components/layout/
├── Sidebar/
│   ├── Sidebar.tsx                 # [MODIFY] add permission filtering logic
│   └── SidebarMenuItem.tsx         # recursive menu item with permission check
└── Header/
    └── UserMenu.tsx                # [MODIFY] add "My Profile" link + language switcher
```

---

## Route additions

```typescript
// router/dashboard.routes.tsx — add:
{
  path: 'profile',
  element: <ProfilePage />,
}
```

Add to `@iuroadmap/core/constants/routes.ts`:

```typescript
// In DashboardPaths interface + webPaths.dashboard:
profile: '/dashboard/profile',
```

---

## Reused `@iuroadmap/core` assets

- `TokenProfile`, `parseToken` from `@iuroadmap/core/auth`
- `UserRole` from `@iuroadmap/core/enums/roles`
- `FeaturePms` from `@iuroadmap/core/constants/featurePms`
- `navigation` (menu config) from `@iuroadmap/core/menus/menu`
- `Translations.common.*`, `Translations.sidebar.*`
- `RoutePaths.web.dashboard.*`

---

## i18n keys to add or verify

- `profile.title` — "My Profile" / "Hồ sơ của tôi"
- `profile.editProfile` — "Edit Profile" / "Chỉnh sửa hồ sơ"
- `profile.name` — "Full Name" / "Họ và tên"
- `profile.email` — "Email" / "Email"
- `profile.role` — "Role" / "Vai trò"
- `profile.status` — "Status" / "Trạng thái"
- `profile.joinedDate` — "Joined" / "Ngày tham gia"
- `profile.updateSuccess` — "Profile updated successfully" / "Cập nhật hồ sơ thành công"
- `header.myProfile` — "My Profile" / "Hồ sơ của tôi"
- `header.logout` — "Logout" / "Đăng xuất"
- `header.switchLanguage` — "Switch Language" / "Đổi ngôn ngữ"

---

## Responsive notes

- **Profile page**
  - Desktop: two-column layout — left column is the info card (avatar + basic info), right column is the edit form (if available). `<DataTable>` for activity history if applicable.
  - Mobile: everything stacks (`width: 100%`). Avatar + name block collapses to centered small avatar.
- **Sidebar**: already handled by existing layout. Permission filtering is data-only, no UI change needed.

---

## Manual verification checklist

- [ ] Login as **ADMIN** → sidebar shows all items including Administration section.
- [ ] Login as **LEARNER** → sidebar hides Administration items (no `SYS.AD` / `USER.AD` permission).
- [ ] Login as **MENTOR** → sidebar shows Mentor Hub, hides admin.
- [ ] `usePermission().hasPermission('ROLE.AD')` returns `true` for ADMIN, `false` for LEARNER.
- [ ] `usePermission().hasAnyPermission(['USER.AD', 'SYS.AD'])` returns `true` for ADMIN.
- [ ] Visit `/dashboard/profile` → renders profile info card with name, email, role badge, status badge, joined date.
- [ ] If `PUT /auth/me` exists: edit name → save → success toast → profile info updates.
- [ ] `useBreakpoint().isMobile` returns `true` below 768px, `false` above.
- [ ] Sidebar filtering: add a temporary menu item with `permissions: ['NONEXISTENT.PERM']` → it disappears for all users. Remove after verifying.
- [ ] Navigate away from edit form with unsaved changes → `useUnsavedChanges` shows browser confirm dialog.
- [ ] Tamper `localStorage` token so `exp < now()` → on reload, `parseToken` returns `null`, user is redirected to login.
- [ ] Malformed JWT in localStorage → `parseToken` returns `null` (no crash), redirected to login.

---

## Out of scope (deferred)

- **Change password** — Phase 3 (User management context).
- **Avatar upload** — deferred until backend supports file upload for user profile.
- **Activity log / login history** — not a current requirement (simplified audit approach).
- **Per-role theming / branding** — not applicable.
- **SUPERADMIN role addition to UserRole enum** — Phase 3 (when admin screens land and SUPERADMIN logic is needed).
