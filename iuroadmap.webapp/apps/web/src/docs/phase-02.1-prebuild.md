# Phase 2.1 — IUROADMAP prebuild: JWT, menu permissions, and route cleanup

> **Status:** working draft. This phase documents infrastructure alignment before additional feature work; it does not change backend authorization policy.

## Why this phase exists

The current IUROADMAP app already has the main pieces of authentication and navigation, but they must remain aligned:

1. The auth service puts `role` and `permissions` in the JWT.
2. Redux stores the access token and parsed profile.
3. The shared menu configuration describes feature visibility.
4. The route tree is split into feature modules.
5. The backend is the final authorization boundary.

This phase keeps those responsibilities separate and prevents route files from duplicating permission wrappers that belong to shared infrastructure or backend policy.

## JWT contract

The auth service creates a token with the following relevant fields:

```ts
{
  sub: string;
  userId: string;
  email: string;
  role: string;
  permissions: string[];
  deptId?: string | null;
  job?: string | null;
  exp?: number;
  iat?: number;
}
```

The web app parses the token through `@iuroadmap/core` and merges its claims with the `/me` response. If `/me` does not include permissions, the JWT permissions remain the source for menu projection.

## Redux session state

`@iuroadmap/store` owns the shared session state:

```ts
interface AppState {
  accessToken: string | null;
  profile: TokenProfile | null;
  isInitialized: boolean;
}
```

Required actions/selectors:

- `setAccessToken(token)` — stores the token and parses its profile.
- `clearAuth()` — clears token and profile.
- `setInitialized(value)` — marks session restoration complete.
- `selectIsAuthenticated(state)` — returns whether a token exists.
- `selectAccessToken(state)` — exposes the token to request setup when needed.

Local storage may persist the token for reload support, but Redux is the runtime source consumed by route protection.

## Route protection

`ProtectedRoute` is the only authentication wrapper for protected web routes. It reads `selectIsAuthenticated` and redirects unauthenticated users to `RoutePaths.web.public.login`, preserving the return path.

```text
router/
├── auth.routes.tsx           # login, register, forgot password
├── public.routes.tsx         # landing and public pending state
├── protected.routes.tsx      # ProtectedRoute + MainLayout wrapper
├── dashboard.routes.tsx      # dashboard feature route objects
├── tool.routes.tsx           # fullscreen tool route objects
├── redirect.routes.tsx       # legacy redirects and fallback
└── index.tsx                 # route composition only
```

Feature route modules should contain plain route objects. They should not repeat `RequireRole` or `RequirePermission` wrappers when access is already represented by the shared menu and backend authorization. `ProtectedRoute` remains an authentication concern, not a feature permission concern.

## Menu permission projection

The shared menu is configured in `@iuroadmap/core`:

- `constants/navigation.ts` — menu tree, labels, icons, and paths.
- `constants/featurePms.ts` — feature roles and permission codes.
- `menus/menuHelper.ts` — recursive filtering.
- `apps/web/src/hooks/useMenu.ts` — supplies the current JWT claims.

Current permission codes:

- `SYS.AD`.
- `RM.USER`.
- `RM.AD`.
- `LR.USER`.
- `LR.AD`.
- `USER.AD`.

Filtering rules:

- A missing permission requirement means the item is available to the allowed role.
- A permission requirement is matched against JWT `permissions`.
- Children are filtered recursively.
- A group with no visible items is omitted.
- A parent with no path and no visible children is omitted.

Menu filtering is only a UX optimization. It does not hide or secure HTTP endpoints. The backend must continue returning `401` or `403` for unauthorized requests.

## Route path source of truth

All route modules use `@iuroadmap/core/constants/routes`:

- Public/auth paths under `RoutePaths.web.public`.
- Dashboard paths under `RoutePaths.web.dashboard`.
- Admin paths under `RoutePaths.web.admin`.
- Mentor paths under `RoutePaths.web.mentor`.
- Legacy redirects under `RoutePaths.web.legacy`.

Changing a URL should require changing the route constant, not searching route files for string literals.

## API and error handling

- Generated clients in `@iuroadmap/api-gen` remain the preferred API contract.
- `401` handling clears the session and returns the user to login.
- `403` handling remains a visible permission error.
- Feature views own loading, empty, and error presentation.
- Backend validation messages must not be silently replaced by frontend assumptions.

## Manual verification checklist

- [ ] Login stores the JWT in Redux and local storage.
- [ ] Reload restores the Redux session from the stored token.
- [ ] Protected route redirects unauthenticated users to the centralized login path.
- [ ] One dashboard layout is used for all authenticated roles.
- [ ] Sidebar filtering changes when JWT permissions change.
- [ ] Feature route files contain route objects without repeated role/permission wrappers.
- [ ] Route paths come from `RoutePaths`.
- [ ] A direct unauthorized API request is rejected by the backend.
- [ ] Logout clears Redux, local storage, and auth context.

## Out of scope

- Multi-organization selection or organization headers.
- New authorization rules in backend services.
- Replacing the generated API client.
- Implementing new learner, mentor, or admin features.