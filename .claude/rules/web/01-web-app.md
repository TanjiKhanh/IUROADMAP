---
paths:
  - "iuroadmap.webapp/apps/web/**"
  - "iuroadmap.webapp/packages/**"
  - "iuroadmap.webapp/tests/**"
---

# Web app (React + Vite)

## Layout (`apps/web/src/`)

| Folder | Purpose |
|---|---|
| `views/<area>/<feature>/` | Pages: `<feature>ListPage.tsx`, `<feature>CreatePage.tsx`, `<feature>EditPage.tsx`, `components/<feature>Form.tsx` (camelCase filenames, named exports) |
| `router/<area>.routes.tsx` | `RouteObject[]` built with `RoutePaths.web.*` from `@iuroadmap/core` |
| `uikit/` | `Ui*` wrappers around Antd (`UiTable`, `UiButton`, `UiForm`, `UiInputField`, `UiCard`, `useToast`, …). **Import from `uikit`, never from `antd` directly.** |
| `hooks/` | `useTranslation`, `useListUrlState` (filter/page in URL), `useConfirmAndDelete`, `useMenu` |
| `pages/`, `components/roadmap/`, `services/` | Legacy / being restructured (see `implementation_plan.md`); don't add new code there |

Canonical references: `views/config/department/` (simple CRUD) and `views/config/role/` (CRUD + permission matrix).

## Data & forms

- API access goes **only** through `@iuroadmap/api-gen` hooks: `use<Name>ControllerGetByIndex / GetById / Create / Update / Delete`. Don't use raw axios, and don't use the legacy `@iuroadmap/api` / `adminService` in new code.
- Responses are wrapped by the backend: a list is `(raw?.data as any)?.data` → `{ datas, totalRows }`, and a single record is `raw?.data`.
- Forms use `react-hook-form` + `zodResolver(<Name>Zod.<schema>)` from `api-gen`, and the form value types come from the generated models. Don't hand-write Zod or Yup rules. If one is missing, fix the backend DTO and run `npm run gen:api`.
- Never edit files under `packages/api-gen/src/generated/`. They are regenerated.
- Mutations use `try { await update({ data }) ; toast.success(t(...)); navigate(...) } catch (err) { toast.error(err?.response?.data?.message ?? t(...)) }`.

## Routes, menu, i18n, permissions (`packages/core`)

- Add route paths to `constants/routes.ts` (both `web` and `mobile`), add the menu entry to `constants/navigation.ts`, and register the page in `router/<area>.routes.tsx`.
- All UI text goes through `t('area.feature.key')`, with keys added to **both** `i18n/locales/en` and `i18n/locales/vi`. Menu titles use `Translations.*`.
- Permission keys for gating are in `constants/featurePms.ts`, and must mirror the backend `PMS`. Lengths are in `constants/entityConstant.ts`, mirroring the backend `EntityConstant`.

## Tests (`iuroadmap.webapp/tests/`)

Playwright projects: `api` (`tests/api/<area>/`) and `e2e` (`tests/e2e/specs/<area>/` with `page-objects/`, `fixtures/`, `helpers/`). Run `npm run test:api` / `npm run test:e2e` from `iuroadmap.webapp/tests`.
