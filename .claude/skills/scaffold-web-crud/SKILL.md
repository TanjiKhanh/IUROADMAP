---
name: scaffold-web-crud
description: Scaffold list/create/edit pages for a backend entity in iuroadmap.webapp/apps/web using generated @iuroadmap/api-gen hooks + Zod, uikit components, RoutePaths, navigation menu and en/vi i18n. Use when the user wants the frontend/admin screen for a module ("add web page for X", "config screen for X").
argument-hint: [area] [entity]
---

# Scaffold web CRUD pages

Reference: `iuroadmap.webapp/apps/web/src/views/config/department/`. Read all 4 files first. Rules are in `.claude/rules/web/01-web-app.md`.

## Steps

1. Make sure the hooks exist: grep `iuroadmap.webapp/packages/api-gen/src/generated` for `use<Entity>sControllerGetByIndex`. If they're missing, run `npm run gen:api` (the backend must already be done).
2. Create `views/<area>/<entity>/`:
   - `components/<entity>Form.tsx`: `useForm` + `zodResolver(<Entity>sZod.…)`, fields from `uikit` (`UiInputField`, `UiTextAreaField`, `UiFormActions`, …).
   - `<entity>ListPage.tsx`: `useListUrlState` + `use…GetByIndex({ currentPage, rowsPerPage, keyword })` + `UiTable` + `useConfirmAndDelete`.
   - `<entity>CreatePage.tsx` / `<entity>EditPage.tsx`: the mutation hook, then `toast`, then `navigate(RoutePaths…root)`.
3. In `packages/core/src/constants/routes.ts`, add `root`, `create` and `edit/:id` under both `web` and `mobile`.
4. Add the menu item in `packages/core/src/constants/navigation.ts` (title from `Translations.sidebar.*`, with a permission from `featurePms.ts` if it's gated).
5. Add the i18n keys `<area>.<entity>.*` (name, description, create, edit, created, updated, loadFailed, …) to **both** `packages/core/src/i18n/locales/en` and `vi`.
6. Register the routes in `apps/web/src/router/<area>.routes.tsx`.
7. Optionally add a Playwright spec in `iuroadmap.webapp/tests/e2e/specs/<area>/` following the existing config specs.

Don't use `antd` imports directly, hardcoded strings, or hand-written Zod schemas.
