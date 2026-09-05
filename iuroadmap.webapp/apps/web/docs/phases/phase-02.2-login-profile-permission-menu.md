# Phase 2.2 - Login Profile Rehydration and Permission-Driven Menu

> **Status:** Ready for implementation review.
>
> **Scope:** Frontend authentication state, protected route composition,
> responsive layout selection, and permission-filtered navigation.

## Goal

After a successful login, the application must decode the returned JWT, persist
the access token, create the Redux profile, and use that profile to build the
navigation shown to the user.

The intended flow is:

```text
Login form
  -> POST /auth/login
  -> access token
  -> parseToken(access token)
  -> localStorage (access token)
  -> Redux (accessToken + profile)
  -> ProtectedRoute (token exists?)
  -> ResponsiveLayout (mobile or desktop)
  -> menu config / getProfileMenu(profile permissions)
  -> render allowed navigation
```

The router only registers routes. It does not generate the menu and it does not
provide per-route permission authorization. Backend authorization remains the
final security boundary.

## Current implementation anchors

| Concern | Current code | Expected responsibility |
|---|---|---|
| Login | `apps/web/src/pages/public/Login.tsx` | Submit credentials, parse token, persist token, dispatch auth state |
| Token parser | `packages/core/src/auth/jwt.ts` | Decode and validate JWT claims |
| Redux auth state | `packages/store/src/slices/appSlice.ts` | Store token and JWT-derived profile |
| Protected route | `apps/web/src/auth/ProtectedRoute.tsx` | Redirect unauthenticated users to login |
| Protected route tree | `apps/web/src/router/protected.routes.tsx` | Put `ProtectedRoute` outside the authenticated layout |
| Responsive layout | `apps/web/src/layouts/responsiveLayout.tsx` | Select desktop or mobile container |
| Menu adapter | `apps/web/src/hooks/useMenu.ts` | Build menu from the authenticated profile |
| Menu rendering | `apps/web/src/layouts/sidebarMenu.tsx` and `apps/web/src/components/layouts/Sidebar.tsx` | Render filtered menu items |

## Required route and layout structure

The authenticated route must follow this outer-to-inner order:

```tsx
<ProtectedRoute>
  <ResponsiveLayout />
</ProtectedRoute>
```

`ResponsiveLayout` selects one of:

```text
ResponsiveLayout
  -> DesktopLayout
       -> SidebarMenu
       -> Outlet
  -> MobileLayout
       -> mobile menu / SidebarMenu
       -> Outlet
```

Rules:

1. `ProtectedRoute` checks authentication only: an access token must exist in
   Redux after token rehydration or login.
2. A missing token redirects to the public login route and preserves the
   requested pathname when practical.
3. `ResponsiveLayout` decides the container from the display mode and
   breakpoint. It must not decide permissions.
4. The menu is generated only when a layout or menu component renders. Route
   registration must remain side-effect free.

## JWT and Redux contract

`parseToken()` is the single parser used by login and app startup. The parser
must return `null` for a malformed or expired token.

The profile must expose the claims needed by the web app, including:

```ts
{
  userId,
  fullName,
  email,
  role,
  roles,
  permissions,
  tenantId,
  isSuperAdmin,
  isCustomerAdmin,
  status,
  expiresAt
}
```

The role or permission claim may be a single string or an array. Normalize it
to a `string[]` before it reaches menu filtering.

After login succeeds:

1. Read the token from the API response.
2. Parse and validate it before persisting it.
3. If parsing fails, show an error and do not authenticate the Redux store.
4. Store the raw token in `localStorage` under the app token key.
5. Dispatch the Redux action that sets both `accessToken` and the JWT-derived
   profile. Do not maintain a second competing profile source for the menu.
6. Redirect to the requested path or the authenticated dashboard.

On app startup or page refresh:

1. Read the persisted token.
2. Parse it with the same parser.
3. If valid, dispatch the same Redux auth action before protected content is
   considered authenticated.
4. If invalid or expired, remove the token and leave the user unauthenticated.

On logout or a 401 response, clear both local storage and Redux auth state.

## Permission-driven menu contract

The shared navigation definition remains the source of truth for menu items.
Each item may have:

- `path`: destination URL.
- `roles` or `permissions`: required access codes.
- `ignorePms`: show regardless of permission checks.
- platform/display flags such as web visibility.
- child items that must be filtered recursively.

The menu adapter must:

1. Read the profile from Redux, not from a route declaration.
2. Pass the profile permission list to the shared menu helper.
3. Keep items marked `ignorePms`.
4. Keep items without required permissions.
5. Keep an item when the user has at least one required permission.
6. Remove empty groups after filtering.
7. Rebuild when the profile or permission list changes.
8. Resolve labels and icons only after filtering.

Super-admin behavior must be explicit. If the product rule is that a
super-admin sees every web menu item, pass `profile.isSuperAdmin` to the menu
helper and test that behavior. Omitting the flag means the super-admin is
filtered like a regular user.

Menu visibility is not route authorization. A hidden menu item must not be
treated as proof that a direct URL is protected.

## Implementation checklist

### Authentication state

- [ ] Confirm the API response token field and normalize it in one place.
- [ ] Harden `parseToken()` for malformed, missing, and expired tokens.
- [ ] Normalize role/permission claims to arrays.
- [ ] Persist the token only after parsing succeeds.
- [ ] Dispatch one Redux action that sets the token and profile together.
- [ ] Rehydrate Redux from the persisted token before protected content renders.
- [ ] Clear storage and Redux state on logout and unauthorized responses.
- [ ] Confirm the menu does not depend on a stale `AuthContext` profile.

### Route and layout

- [ ] Keep `ProtectedRoute` as the outer authenticated guard.
- [ ] Render `ResponsiveLayout` inside `ProtectedRoute`.
- [ ] Verify desktop and mobile layouts both render the same filtered menu data.
- [ ] Keep route registration separate from menu generation.
- [ ] Preserve the original requested path on unauthenticated redirects.

### Menu filtering

- [ ] Read the canonical profile selector from Redux.
- [ ] Pass permissions and the super-admin flag to the shared menu helper.
- [ ] Filter nested children and remove empty parent groups.
- [ ] Recompute menu data after login, logout, and profile changes.
- [ ] Verify labels and icons are resolved only for visible items.

## Acceptance scenarios

| Scenario | Expected result |
|---|---|
| Valid login with permissions `ROADMAP.VIEW` | Token is persisted, Redux profile is populated, and only allowed roadmap items appear. |
| Valid login with one role string | Profile normalizes it to a one-item array and menu filtering works. |
| Valid login with a role/permission array | All permitted items are available; unauthorized items are absent. |
| Missing token | `ProtectedRoute` redirects to login with the requested pathname preserved. |
| Malformed token | Login/startup rejects it, does not render protected content, and clears stale auth state. |
| Expired token | User is unauthenticated and the persisted token is removed. |
| Page refresh with a valid token | Redux is rehydrated and the same menu appears without another manual login. |
| Permission changes in Redux | Menu rebuilds and reflects the new permission set. |
| Super-admin login | Behavior matches the explicitly selected bypass rule and is covered by a test. |
| Desktop viewport | `DesktopLayout` renders the filtered menu. |
| Mobile viewport or forced mobile mode | `MobileLayout` renders the same filtered menu. |
| Direct navigation to a hidden route | Frontend menu filtering does not replace backend authorization. |

## Suggested focused tests

1. `parseToken()` tests for a valid token, a single claim, an array claim, an
   expired token, and malformed input.
2. Login integration test verifying `localStorage`, Redux token, and Redux
   profile after a successful response.
3. Startup rehydration test verifying a refresh restores the profile.
4. `ProtectedRoute` tests for authenticated and unauthenticated states.
5. Menu helper tests for allowed, denied, ignored, nested, empty-group, and
   super-admin cases.
6. Responsive layout tests verifying desktop/mobile selection does not change
   permission results.

## Definition of done

- [ ] The login flow follows the sequence in this document.
- [ ] The Redux profile is the single profile input used by menu generation.
- [ ] A refresh restores valid authentication and invalidates stale tokens.
- [ ] Desktop and mobile layouts render permission-filtered navigation.
- [ ] Focused tests cover token parsing, state persistence, guards, and menu
  filtering.
- [ ] The implementation does not claim that hidden menu items are protected
  routes; backend authorization remains authoritative.