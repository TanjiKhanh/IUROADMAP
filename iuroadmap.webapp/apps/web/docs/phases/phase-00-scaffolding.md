# Phase 0 — Scaffolding & Monorepo Verification

## Goal

Verify that the existing monorepo (`iuroadmap.webapp/`) is healthy and all shared packages compile and interoperate correctly. Ensure Orval codegen produces the expected output. Write the master `PLAN.md` and phase docs so the user can review the full refactor plan before any feature code lands.

**No feature code in this phase.** The app dev server runs and renders the existing UI unchanged.

---

## Deliverables

### 1. Verify existing shared package — `packages/api-gen/` (`@iuroadmap/api-gen`)

```
packages/api-gen/
├── package.json              # name: @iuroadmap/api-gen
├── tsconfig.json
├── orval.config.ts           # two projects: iuroadmapApi (hooks+models) + iuroadmapZod (zod)
└── src/
    ├── index.ts              # barrel export
    └── generated/
        ├── endpoints/        # Orval TanStack Query hooks (tags-split)
        ├── models/           # Orval TS models
        └── zod/              # Orval Zod schemas
```

**Check:**
- `orval.config.ts` points to correct Swagger spec: `../../../iuroadmap.services/api-gateway/swagger-spec.json`
- Running `npm run gen:api` regenerates endpoints, models, and zod schemas
- Generated output includes at minimum: `auth/`, `iam-roles/`, `iam-users/`, `departments/`, `courses/`, `roadmaps/`, `explore/`, `mentor-profile/`, `mentor-search/`, `user-roadmaps/`, `majors/`, `admin-majors/`, `admin-roadmaps/`

### 2. Verify existing shared package — `packages/core/` (`@iuroadmap/core`)

```
packages/core/src/
├── index.ts              # barrel
├── auth/
│   ├── jwt.ts            # TokenProfile interface + parseToken()
│   └── index.ts
├── constants/
│   ├── routes.ts         # RoutePaths (web + mobile)
│   ├── featurePms.ts     # FeaturePms (role-based + permission-based access)
│   ├── iconsWeb.ts       # MenuIconsWeb (lucide icon names)
│   ├── iconsMobile.ts    # MenuIconsMobile
│   ├── colorCommon.ts    # Shared color tokens
│   ├── entityConstant.ts # Entity constants
│   └── navigation.ts     # Navigation constants
├── enums/
│   └── roles.ts          # UserRole enum (ADMIN, MENTOR, LEARNER, USER, STUDENT)
├── i18n/
│   ├── index.ts          # i18next init
│   ├── translation.ts    # Translations keys (typed)
│   ├── locales/          # en/*.json, vi/*.json
│   └── features/
├── menus/
│   ├── menu.ts           # navigation config (IURoadmapMenu[], IURoadmapMenuItem)
│   └── menuHelper.ts
├── types/
├── helpers/
└── extensions/
```

**Check:**
- `TokenProfile` interface has: `sub`, `userId`, `email`, `role`, `roles`, `permissions[]`, `exp`, `iat`
- `FeaturePms` maps features to roles + permission codes
- `Translations` keys cover: `common.*`, `sidebar.*`, `navigation.*`, `role.*`, `permission.*`
- `RoutePaths` covers: `public.*`, `dashboard.*`, `admin.*`, `mentor.*`

### 3. Verify existing shared package — `packages/store/` (`@iuroadmap/store`)

```
packages/store/src/
├── index.ts
└── slices/
    └── appSlice.ts       # AppState: accessToken, profile (TokenProfile), isInitialized
```

**Check:**
- `setAccessToken` action parses JWT via `parseToken()` and stores `TokenProfile`
- `clearAuth` resets token + profile
- Selectors: `selectAccessToken`, `selectIsAuthenticated`, `selectTokenProfile`

### 4. Verify existing app — `apps/web/` (`iuroadmap.web`)

**Check:**
- `npm run web:dev` starts Vite dev server
- Provider stack: `Redux Provider → TranslationProvider → QueryClientProvider → App`
- Router has public routes (`/login`, `/register`, `/forgot-password`) and protected routes (`/dashboard/*`)
- Auth flow: `AuthProvider` + `ProtectedRoute` + `RequirePermission` + `RequireRole`

### 5. Write plan docs

- `PLAN.md` — master refactor plan
- `docs/phases/phase-00-scaffolding.md` (this file)
- `docs/phases/phase-01-authentication-iam.md` (update existing)
- `docs/phases/phase-02-common-components.md`
- `docs/phases/phase-02.1-prebuild.md`
- `docs/phases/phase-03-admin.md`

### 6. Root scripts verification

Existing scripts in root `package.json` that should work:

```jsonc
{
  "gen:api": "npm run gen:spec && npm run generate --workspace=@iuroadmap/api-gen",
  "gen:api:hooks": "npm run gen:spec && npm run generate:hooks --workspace=@iuroadmap/api-gen",
  "gen:api:zod": "npm run gen:spec && npm run generate:zod --workspace=@iuroadmap/api-gen",
  "web:dev": "turbo run dev --filter=iuroadmap.web"
}
```

---

## Verification

1. `npm install` succeeds; `iuroadmap.web`, `@iuroadmap/api-gen`, `@iuroadmap/core`, `@iuroadmap/store` all appear in workspace listing.
2. `npm run gen:api` (with backend Swagger spec available) produces files under `packages/api-gen/src/generated/{endpoints,models,zod}/`.
3. `npm run web:dev` opens the app in browser and renders the existing UI.
4. `apps/mobile` unchanged — `npm run mobile:start` still works.
5. `PLAN.md` exists at `apps/web/PLAN.md`.
6. `apps/web/docs/phases/` has 5 files: `phase-00` through `phase-03` (with `phase-02.1`).
7. TypeScript compiles with no errors across all shared packages.

---

## Out of scope (deferred)

- Any new UI components — Phase 2.
- Any auth flow changes — Phase 1.
- Routing changes — Phase 1.
- Admin screens — Phase 3.
- Business modules (Roadmap, Lecturer Review, Mentor, AI Chatbot) — Phase 4+.
- Codegen customization (custom Orval mutator, axios interceptors) — Phase 1 if needed.
