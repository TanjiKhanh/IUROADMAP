# Phase 2 — UI Kit & Composites

## Goal

Build the **complete set of reusable common components** before any admin or feature module is implemented. This is the component foundation that every later phase consumes. 

To maintain a clean architecture, we strictly separate generic UI components from domain-aware components. IUROADMAP uses **vanilla CSS + CSS Modules**. All components are self-contained with their own `.module.css` files. Icons come from `lucide-react`.

---

## UI Kit vs Components Architecture

### Mục đích

Cả `uikit/` và `components/` đều chứa các component có thể tái sử dụng, nhưng chúng phục vụ hai tầng khác nhau:

```text
uikit       = reusable UI / interaction
components  = reusable application / domain logic
views       = page composition + feature behavior
```

### Luồng phụ thuộc

```text
CSS Modules / Vanilla CSS
    |
    v
uikit
    |
    v
components
    |
    v
views
```

`views` có thể dùng `uikit` và `components`. `components` có thể dùng `uikit`. `uikit` không được phụ thuộc vào `components`, `views`, API domain hoặc Redux của ứng dụng.

### `uikit/`

Đặt component vào `uikit/` khi component:
- Không biết domain cụ thể như User, Role, Department.
- Không import API hooks, API models, Redux store, route definitions hoặc permission logic.
- Chỉ xử lý giao diện, layout, form hoặc interaction chung.
- Có thể dùng ở nhiều module khác nhau.

Ví dụ sử dụng:
```tsx
import { UiButton, UiSelect } from 'uikit';
```

Mọi public component và public type của UI Kit phải được export qua:
`apps/web/src/uikit/index.ts`

### `components/`

Đặt component vào `components/` khi component có logic cấp ứng dụng hoặc biết domain cụ thể:
- Dùng API model hoặc API hook cụ thể.
- Đọc Redux/store.
- Biết route, permission hiện tại.
- Kết hợp nhiều component từ `uikit` thành một workflow có ý nghĩa với app.
- Có thể reuse ở nhiều view.

Ví dụ: `UserAvatar`, `PermissionGate`.

Nếu component chỉ được dùng trong một feature, đặt gần feature đó thay vì đưa vào global `components/`:
`views/config/role/components/PermissionMatrixForm.tsx`

---

## Component Catalog

### UI Kit (`src/uikit/`)

| Component | File | Description |
|---|---|---|
| `UiButton` | `primitives/uiButton.tsx` | Standard button with primary/secondary/danger variants |
| `UiInput` | `primitives/uiInput.tsx` | Standard text input field |
| `UiCheckbox` | `primitives/uiCheckbox.tsx` | Single checkbox |
| `UiSelect` | `primitives/uiSelect.tsx` | Dropdown select |
| `UiFormItem` | `form/uiFormItem.tsx` | Form layout wrapper (label, required asterisk, error text) |
| `UiInputField` | `form/uiInputField.tsx` | Input integrated with react-hook-form |
| `UiPasswordField` | `form/uiPasswordField.tsx` | Password input with show/hide toggle |
| `UiCheckboxField`| `form/uiCheckboxField.tsx` | Checkbox integrated with react-hook-form |
| `UiTable` | `data/uiTable.tsx` | Generic table component with column defs |
| `UiPagination` | `data/uiPagination.tsx` | Page navigation |
| `UiModal` | `overlays/uiModal.tsx` | Base modal component |
| `UiTooltip` | `overlays/uiTooltip.tsx` | Hover tooltip |

### Composites (`src/components/`)

| Component | File | Description |
|---|---|---|
| `PageHeader` | `common/pageHeader.tsx` | Title + breadcrumb + actions slot. |
| `DataTable` | `common/dataTable.tsx` | Wraps `UiTable` + `UiPagination`, adds search and filter logic. |
| `StatusBadge` | `common/statusBadge.tsx` | Color-coded badge for domain statuses (`ACTIVE`, `BANNED`). |
| `RoleBadge` | `common/roleBadge.tsx` | Domain-aware role badge (`ADMIN`, `LEARNER`). |
| `ConfirmDialog` | `common/confirmDialog.tsx` | Reusable confirm dialog wrapping `UiModal`. |
| `MobileListCard`| `common/mobileListCard.tsx` | Generic card-style list row for mobile breakpoint fallback in `DataTable`. |

---

## Reused assets

- `@iuroadmap/core/i18n` — `Translations.common.*` for default labels ("No data", "Loading…", "Save", "Cancel", "Confirm").
- `lucide-react` — icons for search, filter, chevron, close, alert, check, etc.
- CSS custom properties from `src/styles/` — color tokens, spacing, typography.

---

## Responsive notes

- **DataTable**: renders `<table>` on desktop (≥ 768px), switches to `<MobileListCard>` stacked cards on mobile (< 768px). Column visibility can be configured per breakpoint.
- **UiModal**: centered card on desktop, full-screen sheet on mobile.
- **PageHeader**: breadcrumb + title + actions inline on desktop; title + actions stacked on mobile, breadcrumb hidden.

---

## Manual verification checklist

- [ ] Mount a temporary `/_dev/uikit` route that renders each component with realistic props.
- [ ] **UiTable / DataTable**: desktop shows `<table>` with pagination; resize below 768px → switches to card list.
- [ ] **ConfirmDialog**: `await confirm(...)` blocks until user clicks Confirm or Cancel; returns `true`/`false`.
- [ ] **UiInputField + UiPasswordField**: integrated with `react-hook-form` + Zod schema → validation error shows below input on blur.
- [ ] **All components**: no hard-coded strings — all user-facing text comes from i18n.
- [ ] Barrel export (`src/uikit/index.ts`) exports all uikit components.

---

## Out of scope (deferred)

- Domain-specific components that aren't globally reused (e.g. `PermissionMatrixForm`) — live in `views/<domain>/components/`.
- Chart components — Phase 8+ (if needed for dashboards).
- Rich-text editor — future phases.
