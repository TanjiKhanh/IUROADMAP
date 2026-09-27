# Phase 3.1 — Config: Department CRUD (views/config migration)

## Why this is Phase 3.1

Phase 3 defined the department management surfaces but only landed a skeleton (`return null`) for the `views/config/department/` pages. Phase 3.1 fills in the actual implementation, migrating the business logic from the legacy `pages/admin/ManageDepartments.tsx` into the new `views/config/` structure.

---

## Goal

Implement the Department List, Create, and Edit pages under `views/config/department/` using the same patterns established by the Role and User modules in Phase 3:

- **Ant Design** components (`Table`, `Card`, `Form`, `Button`, etc.)
- **Generated API hooks** from `@iuroadmap/api-gen` (`useDepartmentsController*`)
- **Zod validation** via `DepartmentsZod.DepartmentsControllerCreateBody`
- **`react-hook-form`** + `zodResolver` for form state management
- **Shared hooks** (`useListUrlState`, `useConfirmAndDelete`)

**All backend APIs already exist.** This phase is **frontend-only**.

---

## Backend endpoints consumed

| Method | Endpoint | Hook |
|---|---|---|
| GET | `/api/v1/departments/GetByIndex` | `useDepartmentsControllerGetByIndex` |
| GET | `/api/v1/departments/getById/:id` | `useDepartmentsControllerGetById` |
| POST | `/api/v1/departments/create` | `useDepartmentsControllerCreate` |
| POST | `/api/v1/departments/update` | `useDepartmentsControllerUpdate` |
| POST | `/api/v1/departments/delete/:id` | `useDepartmentsControllerDelete` |

---

## Deliverables

### New / Updated files

```
views/config/department/
├── components/
│   └── departmentForm.tsx          # [UPDATED] Shared form: name, slug, description
├── departmentListPage.tsx          # [UPDATED] Paginated table with edit/delete actions
├── departmentCreatePage.tsx        # [UPDATED] Wraps DepartmentForm for creation
└── departmentEditPage.tsx          # [UPDATED] Fetches by ID, wraps DepartmentForm for editing
```

### Routing (already wired — no changes needed)

Routes were already defined in `router/config.routes.tsx`:

| Route | Component |
|---|---|
| `/dashboard/config/departments` | `DepartmentListPage` |
| `/dashboard/config/departments/create` | `DepartmentCreatePage` |
| `/dashboard/config/departments/:id/edit` | `DepartmentEditPage` |

---

## Component Specifications

### 1. `DepartmentForm` — Shared Create/Edit Form

| Element | Spec |
|---|---|
| Library | `react-hook-form` + `zodResolver` (same as `RoleForm`) |
| Zod schema | `DepartmentsZod.DepartmentsControllerCreateBody` |
| Fields | `name` (required), `slug` (required), `description` (optional) |
| Layout | Ant Design `Card` > `Row`/`Col` grid (name + slug side-by-side, description full width) |
| Props | `defaultValues`, `loading`, `submitLabel`, `onSubmit`, `onCancel` |
| Edit mode | Pre-populates fields via `defaultValues` + `reset()` |

### 2. `DepartmentListPage` — Paginated Department Table

| Element | Spec |
|---|---|
| Table columns | ID, Department Name (bold), Slug (code), Description (ellipsis), Actions |
| Pagination | `useListUrlState` hook (URL-synced page state, same as `RoleListPage`) |
| "Add" button | Top-right → navigates to create page |
| Edit action | `EditOutlined` icon → navigates to `/dashboard/config/departments/:id/edit` |
| Delete action | `DeleteOutlined` icon → `useConfirmAndDelete` modal → API delete |
| API | `useDepartmentsControllerGetByIndex({ currentPage, rowsPerPage, keyword })` |

### 3. `DepartmentCreatePage` — Create Department

| Element | Spec |
|---|---|
| Wraps | `DepartmentForm` inside `Card title="Create Department"` |
| API | `useDepartmentsControllerCreate` |
| Success | `message.success` + navigate back to list |
| Cancel | Navigate back to list |

### 4. `DepartmentEditPage` — Edit Department

| Element | Spec |
|---|---|
| URL param | `:id` (numeric) |
| Fetch | `useDepartmentsControllerGetById(numericId)` |
| Loading | `Skeleton` placeholder |
| Error | `Result status='error'` |
| Wraps | `DepartmentForm` inside `Card title="Edit Department"` |
| API | `useDepartmentsControllerUpdate` with `{ ...values, id: numericId }` |
| Success | `message.success` + navigate back to list |
| Cancel | Navigate back to list |

---

## Pattern conformance checklist

- [x] Uses `@iuroadmap/api-gen` generated hooks (NOT `adminService`)
- [x] Uses `react-hook-form` + `zodResolver` (NOT custom `useForm` hook)
- [x] Uses Ant Design components (NOT custom HTML/inline styles)
- [x] Uses `useListUrlState` for paginated list (URL-synced)
- [x] Uses `useConfirmAndDelete` for delete confirmation
- [x] Uses `RoutePaths.web.config.department.*` for navigation
- [x] Follows `camelCase` file naming (`departmentListPage.tsx`)
- [x] Exports named functions (`export function DepartmentListPage`)
- [x] Form component lives in `components/` subdirectory
- [x] Same structure as role module: `listPage` + `createPage` + `editPage` + `components/form`

---

## Migration mapping (old → new)

| Old (`pages/admin/ManageDepartments.tsx`) | New (`views/config/department/`) |
|---|---|
| `adminService.getAllDepartments()` | `useDepartmentsControllerGetByIndex()` |
| `adminService.createDepartment(values)` | `useDepartmentsControllerCreate({ data })` |
| `adminService.updateDepartment(id, values)` | `useDepartmentsControllerUpdate({ data: { ...values, id } })` |
| `adminService.deleteDepartment(id)` | `useDepartmentsControllerDelete({ id })` |
| Custom `useForm` hook | `react-hook-form` + `zodResolver` |
| Custom `Notification` component | Ant Design `message.success/error` |
| Inline delete confirmation modal | `useConfirmAndDelete` (Ant `Modal.confirm`) |
| Single-page create+edit+list | Separate pages: list / create / edit |

---

## Manual verification checklist

- [ ] Navigate to `/dashboard/config/departments` → see paginated table with existing departments
- [ ] Click "Add" → form opens with empty name, slug, description fields
- [ ] Fill in name + slug → click "Create" → success toast, redirected to list, new row appears
- [ ] Leave name empty → submit → validation error shown inline
- [ ] Click edit (✏️) on a department → form pre-populated with existing values
- [ ] Modify name → click "Save" → success toast, redirected to list, name updated
- [ ] Click delete (🗑️) on a department → confirmation modal appears
- [ ] Confirm delete → success toast, row removed from table
- [ ] Duplicate slug → server returns 409 → error message displayed
- [ ] Pagination works when > 20 departments exist

---

## Out of scope

- Department search/filter by keyword (filter UI not included; backend supports it)
- Department hierarchy / org tree (deferred per Phase 3)
- Bulk operations
