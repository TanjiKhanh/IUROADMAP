# `apps/web` — Refactor Plan

Refactor the existing `apps/web` inside the `iuroadmap.webapp` monorepo. The existing codebase is functional but needs structural improvements to scale across all IUROADMAP modules. Built on:

- **Ant Design v5** — hidden behind a local `src/uikit/` interface. No direct antd imports in feature code.
- **TanStack Query v5** — server state.
- **Orval** — codegen from `iuroadmap.services` Swagger producing:
  - TS models
  - TanStack Query hooks
  - **Zod validation schemas** (sourced from the same OpenAPI doc — no drift)
- **react-router-dom v6**, **Redux Toolkit** (`appSlice` from `@iuroadmap/store`).
- **Responsive**: one Vite build, CSS media queries for desktop + mobile layouts.

> The SRS source of truth is at `iuroadmap.docs/srs/features/`. Each phase doc traces back to specific FR IDs.

---

## Tech stack — at a glance

| Concern | Choice | Where |
| --- | --- | --- |
| Language | TypeScript ~5.8 | All files |
| UI runtime | React 18.2 | `apps/web/` |
| Bundler | Vite 6 | `apps/web/vite.config.ts` |
| UI library (impl, hidden) | Ant Design v5 | UI Kit only |
| UI Kit (interface) | Local `src/uikit/` | `apps/web/src/uikit/` |
| Icons | `@ant-design/icons` (wrapped) | UI Kit |
| Server state | TanStack Query v5 | API calls, cache |
| API codegen | Orval (react-query + zod clients) | `packages/api-gen/` |
| HTTP client | axios (Orval mutator) | Interceptors in `src/api/` |
| Router | react-router-dom v6 | `src/router/` |
| App state | Redux Toolkit (reuses `@iuroadmap/store` only) | `appSlice` — token, profile |
| Forms | react-hook-form + `@hookform/resolvers/zod` | Login, Register, Role forms |
| Validation | Zod, generated from Swagger | Form validation |
| Dates | dayjs | Date formatting |
| i18n | i18next (reuses `@iuroadmap/core/i18n`) | Locale JSONs (en, vi) |
| Charts | `@ant-design/charts` | Chart components |
| Lint + format | Biome (repo-wide) + local `noRestrictedImports` | `biome.json` |

Explicit non-choices: no Tailwind, no Material UI, no Zustand/Jotai, no Yup (Zod replaces it), no Moment.js.

---

## Shared resources matrix (web ⇄ mobile)

| Resource | Path | Shareable with `apps/mobile`? |
| --- | --- | --- |
| Generated TS models | `packages/api-gen/src/generated/models/` | ✅ pure TS |
| Generated TanStack Query hooks | `packages/api-gen/src/generated/endpoints/` | ✅ TanStack Query works on RN |
| Generated Zod schemas | `packages/api-gen/src/generated/zod/` | ✅ pure Zod |
| Orval config | `packages/api-gen/orval.config.ts` | ✅ shared codegen |
| `appSlice` (Redux) | `@iuroadmap/store` (`appSlice`) | ✅ already shared |
| i18n + locale JSONs | `@iuroadmap/core/i18n/*` | ✅ already shared |
| `Translations` index | `@iuroadmap/core/i18n/translation.ts` | ✅ already shared |
| `RoutePaths` | `@iuroadmap/core/constants/routes.ts` | ✅ web/mobile namespaces |
| `FeaturePms` | `@iuroadmap/core/constants/featurePms.ts` | ✅ role + permission maps |
| Menus | `@iuroadmap/core/menus/*` | ✅ data only |
| JWT parsing | `@iuroadmap/core/auth/jwt.ts` | ✅ pure TS |
| Enums (UserRole) | `@iuroadmap/core/enums/roles.ts` | ✅ pure TS |
| Views / layouts / routes | `apps/web/src/{views,components,router}/` | ❌ web-only |

Every domain feature lives in **three places**:
1. **Shared data + validation** — generated hooks + Zod schemas in `@iuroadmap/api-gen`.
2. **Web UI** — `apps/web/src/views/<domain>/` (this app).
3. **Mobile UI** — `apps/mobile/src/screens/<domain>/` (future).

(1) is never duplicated; (2) and (3) wrap the same hooks.

---

## Responsive layout strategy

Single Vite build serving both desktop and phone browsers via CSS media queries. Boundary between layouts is **768px**:

| Breakpoint | Layout |
| --- | --- |
| < 768px | Mobile layout — hamburger menu, stacked content |
| ≥ 768px | Desktop layout — persistent sidebar, multi-column grids |

`src/hooks/useBreakpoint.ts` (or `useMediaQuery`) detects the viewport width and the layout components render accordingly. Both layouts render `<Outlet />` so a single routing tree serves both.

---

## Phase index

The work is broken into phases. Each phase has its own document at `docs/phases/phase-NN-<name>.md` that the user reviews **before code lands**. The phase doc is the contract for what the phase delivers.

| Phase | Name | Doc | Status |
| --- | --- | --- | --- |
| 0 | Scaffolding & monorepo verification | [`phase-00-scaffolding.md`](docs/phases/phase-00-scaffolding.md) | 🔲 |
| 1 | UI Kit, Auth, & Layout | [`phase-01-uikit-auth-layout.md`](docs/phases/phase-01-uikit-auth-layout.md) | 🔲 |
| 2 | UI Kit & Composites | [`phase-02-uikit-composite.md`](docs/phases/phase-02-uikit-composite.md) | 🔲 |
| 2.1 | Prebuild — JWT → typed profile, permission-driven sidebar, profile page | [`phase-02.1-prebuild.md`](docs/phases/phase-02.1-prebuild.md) | 🔲 |
| 3 | Admin — User CRUD, Role + Permission Matrix, Mentor Approval, Ban/Unban | [`phase-03-admin.md`](docs/phases/phase-03-admin.md) | 🔲 |
| 4 | Learner Portal (Explore Majors, Clone Roadmap, Track Progress) | *stub — TBD* | 🔲 |
| 5 | Roadmap Management (Admin CRUD: Departments, Majors, Courses, Roadmap Designer) | *stub — TBD* | 🔲 |
| 6 | Lecturer Review & Assessment | *stub — TBD* | 🔲 |
| 7 | Mentor Portal | *stub — TBD* | 🔲 |
| 8 | AI Chatbot (RAG) | *stub — TBD* | 🔲 |
| 9 | E2E tests + production hardening | *stub — TBD* | 🔲 |

> **Ordering rules:**
> 1. **Common Components (Phase 2) before any admin/feature module.** Feature work picks reusable components off the shelf; if a gap appears, fix it inside `src/components/common/` — never inline one-off implementations in a feature file.
> 2. **Prebuild (Phase 2.1) before any admin screen.** Phase 3 menus / permission gates / "view my profile" all assume a parsed JWT and permission-driven sidebar. Land them as infrastructure first so Phase 3 stays focused on screens.
> 3. **Admin (Phase 3) before any business module (Phase 4+).** Business modules reference users, roles, departments. Without those records, demos and E2E tests can't run end-to-end.

### Phase doc skeleton

```
# Phase NN — <name>

## Goal
## Feature list (mapped from SRS FR IDs)
## Backend endpoints / Swagger tags consumed
## Generated artefacts expected from @iuroadmap/api-gen
  - Hooks: useXyz, useXyzMutation, ...
  - Zod schemas: xyzCreateRequestSchema, ...
  - Cross-field refinements needed (if any)
## New / modified files in apps/web/src/
## Reused @iuroadmap/core assets (i18n keys, RoutePaths entries, menus)
## i18n keys to add or verify (en + vi)
## Responsive notes (desktop vs mobile breakpoint behaviour per screen)
## Manual verification checklist (golden path + edge cases)
## Out of scope (deferred to which later phase)
```

---

## Running locally

```bash
# from project root (IUROADMAP/)
npm install
npm run gen:api          # requires backend running (swagger-spec.json)
npm run web:dev          # → http://localhost:5173 (or Vite default)
```

`apps/mobile` continues to work unchanged (`npm run mobile:start`).
