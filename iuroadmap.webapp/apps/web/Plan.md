# `apps/hsse` — Refactor Plan

A new web app inside the `sop.webapp` monorepo that runs **alongside** the existing `apps/web`. Built on:

- **Ant Design v5** — isolated behind a local UI Kit. Feature code never imports `antd` directly.
- **TanStack Query v5** — server state.
- **Orval** — codegen from sop.api Swagger producing:
  - TS models
  - TanStack Query hooks
  - **Zod validation schemas** (sourced from the same OpenAPI doc — no drift)
- **react-router-dom v6**, **Redux Toolkit** (only `appSlice` from `@sop/core`).
- **Responsive**: one Vite build, two layouts (desktop + mobile) — NOT React Native.

`apps/web` is unchanged. Both apps live side by side until `apps/hsse` reaches feature parity.

> The full agent design doc (with rationale, alternatives, and step-by-step) is at `.claude/plans/in-mono-repo-sop-webapp-validated-boole.md`. This file is the **user-facing summary** + phase index.

---

## Tech stack — at a glance

| Concern | Choice |
| --- | --- |
| Language | TypeScript ~5.8 |
| UI runtime | React 18.2 |
| Bundler | Vite 6 |
| UI library (impl, hidden) | Ant Design v5 |
| UI Kit (interface) | Local `src/uikit/` |
| Icons | `@ant-design/icons` (wrapped) |
| Server state | TanStack Query v5 |
| API codegen | Orval (`react-query` + `zod` clients) |
| HTTP client | axios (Orval mutator) |
| Router | react-router-dom v6 |
| App state | Redux Toolkit (reuses `@sop/core/store/appSlice` only) |
| Forms | react-hook-form + `@hookform/resolvers/zod` |
| Validation | **Zod, generated from Swagger** |
| Dates | dayjs |
| i18n | i18next (reuses `@sop/core/i18n`) |
| Charts | `@ant-design/charts` |
| Lint + format | Biome (repo-wide) + local `noRestrictedImports` override |

Explicit non-choices: no Tailwind, no Zustand/Jotai, no Yup (Zod replaces it for `apps/hsse` only), no `react-toastify`, no Moment.js, **no direct `antd` imports** outside the UI Kit.

---

## Shared resources matrix (web ⇄ mobile)

| Resource | Path | Shareable with `apps/mobile`? |
| --- | --- | --- |
| Generated TS models | `packages/api-gen/src/generated/models/` | ✅ pure TS |
| Generated TanStack Query hooks | `packages/api-gen/src/generated/endpoints/` | ✅ TanStack Query works on RN |
| Generated Zod schemas | `packages/api-gen/src/generated/zod/` | ✅ pure Zod |
| Orval mutator (axios) | `packages/api-gen/src/client/customInstance.ts` | ✅ axios works on RN |
| `registerClient` | `packages/api-gen/src/client/registerClient.ts` | ✅ each app registers its own token getter |
| `appSlice` (Redux) | `@sop/core/store/appSlice` | ✅ already shared |
| i18n + locale JSONs | `@sop/core/i18n/*` | ✅ already shared |
| `Translations` index | `@sop/core/i18n/translation.ts` | ✅ already shared |
| `RoutePaths` | `@sop/core/constants/routePaths.ts` | ✅ web/mobile namespaces |
| Menus | `@sop/core/menus/*` | ✅ data only |
| **UI Kit** | `apps/hsse/src/uikit/` | ⬜ web-only today; lift to `packages/ui-kit/` later |
| **Yup factories** | `@sop/core/validations/*` | N/A for `apps/hsse` — replaced by generated Zod |
| Features / layouts / routes | `apps/hsse/src/{features,layouts,router}/` | ❌ web-only |

Every domain feature lives in **three places**:
1. **Shared data + validation** — generated hooks + Zod schemas in `@sop/api-gen`.
2. **Web UI** — `apps/hsse/src/views/<domain>/` (this app).
3. **Mobile UI** — `apps/mobile/src/screens/<domain>/` (future).

(1) is never duplicated; (2) and (3) wrap the same hooks.

---

## Responsive layout strategy

Single Vite build serving both desktop and phone browsers via Antd's breakpoint utilities. Boundary between layouts is **`md` (768px)**:

| Breakpoint | Layout |
| --- | --- |
| `xs` / `sm` (<768px) | Mobile layout — Drawer-based menu |
| `md` and above | Desktop layout — persistent Sider |

`layouts/responsiveLayout.tsx` reads `Grid.useBreakpoint()` and renders either `<DesktopLayout>` or `<MobileLayout>`. Both render `<Outlet />` so a single routing tree serves both.

---

## Phase index

The work is broken into phases. Each phase has its own document at `docs/phases/phase-NN-<name>.md` that the user reviews **before code lands**. The phase doc is the contract for what the phase delivers.




