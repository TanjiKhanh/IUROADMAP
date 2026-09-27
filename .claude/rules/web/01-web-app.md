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
| `views/config/shared/` | Config list helpers: `ConfigListShell`, `RowActions`, `KeywordFilter`, `useConfigListState` (filters in the URL) |
| `router/<area>.routes.tsx` | `RouteObject[]` built with `RoutePaths.web.*` from `@iuroadmap/core` |
| `uikit/` | `Ui*` wrappers around Antd (`UiTable`, `UiButton`, `UiForm`, `UiInputField`, `UiNumberField`, `UiSwitchField`, `UiColorField`, `UiModal`, `UiTabs`, `UiTag`, `UiAlert`, `useToast`, …). **Import from `uikit`, never from `antd` directly.** Add a wrapper when one is missing |
| `components/semester-canvas/` | Semester canvas (React Flow) shared by the admin curriculum editor, the curriculum preview and My Roadmap |
| `components/course/`, `components/topic-graph/` | Course page (offering, curricula, comments) and topic graph |
| `hooks/` | `useTranslation`, `useListUrlState`, `useConfirmAndDelete`, `useMenu`, `useMasterDataOptions` (department / major / lecturer / category / course pickers) |
| `pages/`, `services/` | Legacy; don't add new code there |

Canonical references: `views/config/department/` (simple CRUD), `views/config/course/` (CRUD with filters + pickers), `views/config/role/` (CRUD + permission matrix).

## Data & forms

- API access goes **only** through `@iuroadmap/api-gen` hooks: `use<Name>ControllerGetByIndex / GetById / Create / Update / Delete`. Don't use raw axios, and don't use the legacy `@iuroadmap/api` / `adminService` in new code.
- The backend wraps every body as `{ status, data }`; read the payload with `unwrapData<T>(raw)` from `api/apiResult` (a list is `{ datas, totalRows }`).
- `api/bootstrap.ts` makes non-2xx `/api` responses throw an `ApiError` (`err.response.data` = `{ code, message, ... }`), so mutations and queries fail normally. Show errors with `apiErrorMessage(err, t, fallback)`: it uses the translation `errors.<CODE>` when one exists.
- Forms use `react-hook-form` + `zodResolver(<Name>Zod.<schema>)` from `api-gen`, and the form value types come from the generated models. Don't hand-write Zod or Yup rules. If one is missing, fix the backend DTO and run `npm run gen:api`. For a table editor, validate the payload with `<Schema>.safeParse` before sending.
- Rules shared with the backend (semester order, cycles, grade totals and GPA, row layout) come from `@iuroadmap/shared/roadmap-engine`; lengths and limits from `@iuroadmap/shared/constants` (`EntityConstant`, `AppConstant`). Don't re-implement them in the web app.
- Never edit files under `packages/api-gen/src/generated/`. They are regenerated.
- Mutations use `try { await update({ data }); toast.success(t(...)); navigate(...) } catch (err) { toast.error(apiErrorMessage(err, t, t(...))) }`. Render `toastContextHolder` from `useToast()` on the page.

## Routes, menu, i18n, permissions (`packages/core`)

- Add route paths to `constants/routes.ts` (both `web` and `mobile`), add the menu entry to `constants/navigation.ts`, and register the page in `router/<area>.routes.tsx`.
- `@iuroadmap/core` is consumed from `dist/`: run `npm run build --workspace=@iuroadmap/core` after changing it.
- All UI text goes through `t('area.feature.key', { param })` (`{param}` placeholders), with keys added to **both** `i18n/locales/en` and `i18n/locales/vi`. Menu titles use `Translations.*`. Error codes are translated in `errors.json`, canvas / curriculum strings in `roadmap.json`.
- Permission keys for gating are in `constants/featurePms.ts`, and must mirror the backend `PMS`. Canvas geometry is `RoadmapCanvas` in `constants/roadmapCanvas.ts`.

## Tests (`iuroadmap.webapp/tests/`)

Playwright projects: `api` (`tests/api/<area>/`) and `e2e` (`tests/e2e/specs/<area>/` with `page-objects/`, `fixtures/`, `helpers/`). Run `npm run test:api` / `npm run test:e2e` from `iuroadmap.webapp/tests`. Roadmap v2 API specs use `tests/api/support/roadmapApi.ts` (request fixture + stored token) and run alone with `npm run test:api:roadmap`.
