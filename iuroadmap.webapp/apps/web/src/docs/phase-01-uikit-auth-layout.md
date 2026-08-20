# Phase 1 — IUROADMAP auth, layout, and shared UI foundation

> **Status:** working draft. This phase describes the current foundation and future cleanup work; it does not implement anything automatically.

## Goal

Keep the web foundation consistent across all IUROADMAP roles while removing duplicated role-specific dashboard shells.

The target is one authenticated layout with:

- Redux-backed JWT session state.
- A shared sidebar driven by `@iuroadmap/core` menu configuration.
- Public and protected route modules.
- Responsive desktop/mobile behavior inside the web app.
- Reusable UI components under `components/` and future `uikit/` exports.
- Vietnamese and English translations from `@iuroadmap/core/i18n`.

## Current auth flow

1. Login calls the generated auth client.
2. The access token is written to local token storage and Redux.
3. JWT claims are parsed into a token profile.
4. `/me` data is merged with the JWT profile; permissions fall back to JWT claims when `/me` omits them.
5. `ProtectedRoute` reads Redux authentication state.
6. Logout clears local storage, Redux, and the in-memory auth context.

JWT claims used by the web app:

```ts
{
  sub: string;
  userId: string;
  email: string;
  role: string;
  permissions: string[];
  exp?: number;
  iat?: number;
}
```

## Layout structure

```text
apps/web/src/
├── components/layouts/
│   ├── MainLayout.tsx
│   └── Sidebar.tsx
├── hooks/
│   └── useMenu.ts
├── auth/
│   ├── AuthContext.tsx
│   ├── AuthProvider.tsx
│   ├── ProtectedRoute.tsx
│   └── RequirePermission.tsx
├── router/
│   ├── auth.routes.tsx
│   ├── dashboard.routes.tsx
│   ├── protected.routes.tsx
│   ├── public.routes.tsx
│   ├── redirect.routes.tsx
│   ├── tool.routes.tsx
│   └── index.tsx
└── views/
    ├── public/
    ├── learner/
    ├── mentor/
    └── admin/
```

`protected.routes.tsx` owns the authenticated layout wrapper. Feature route modules contain route objects only and do not repeat authentication or permission wrappers. Backend services remain responsible for endpoint authorization.

## Shared menu and permissions

Menu data lives in `@iuroadmap/core`:

- `constants/navigation.ts` — menu tree and route references.
- `constants/featurePms.ts` — role and backend permission metadata.
- `menus/menuHelper.ts` — role/permission filtering.
- `hooks/useMenu.ts` — web adapter that passes JWT claims into the filter.

Current backend permission codes:

- `SYS.AD`
- `RM.USER`
- `RM.AD`
- `LR.USER`
- `LR.AD`
- `USER.AD`

Menu filtering improves the user experience. It must not be treated as endpoint security; unauthorized API calls must still be rejected by the backend.

## Shared UI responsibilities

Reusable components belong in `components/` or a future `uikit/` package when they are domain-neutral:

- Buttons, inputs, selects, dialogs, badges, and loading states.
- Empty and error states.
- Responsive layout primitives.
- Table/list wrappers.
- Form field wrappers.

Feature-specific controls, such as roadmap graph editors and permission matrices, stay within their feature view folder.

## i18n

Translations are split into JSON by feature and loaded through `@iuroadmap/core/i18n`:

- `auth`.
- `public`.
- `navigation`.
- `learner`.
- `mentor`.
- `admin-portal`.
- `permission`.
- `core`.

Every user-visible feature label should have `en` and `vi` values. Technical values such as role names and permission codes remain stable.

## Manual verification checklist

- [ ] Login stores the access token in Redux and local storage.
- [ ] Refreshing the page restores the session from the stored token.
- [ ] Unauthenticated access to `/dashboard` redirects to the login route.
- [ ] Every role uses the same `MainLayout` and dashboard shell.
- [ ] Sidebar entries are filtered by JWT role and permissions.
- [ ] Logout clears Redux and local token state.
- [ ] Login errors and API `401` responses are visible to the user.
- [ ] English and Vietnamese labels render from the shared locale package.
- [ ] Desktop and mobile layouts do not duplicate route definitions.

## Out of scope

- Vendor-specific UI rules that are not part of the current IUROADMAP component contract.
- Multi-organization selection and organization headers; IUROADMAP currently uses the auth-service user/role contract.
- New business modules.
- Rewriting generated API clients by hand.