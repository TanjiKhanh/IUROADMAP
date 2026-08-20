# Phase 2 — IUROADMAP reusable UI components

> **Status:** working draft. This is a design and maintenance guide for reusable components; implementation is intentionally deferred.

## Goal

Create a small, consistent set of reusable UI components for the current IUROADMAP web features without coupling generic UI to roadmap, course, mentor, or admin business rules.

The app currently uses React, CSS, `react-hook-form`, Lucide icons, and feature-level styles. A future shared UI kit can wrap the selected implementation, but feature code should depend on local interfaces rather than a vendor library.

## Component boundaries

### Generic reusable components

These belong in `apps/web/src/components/ui/` or a future `packages/ui-kit/`:

- Button variants and icon buttons.
- Text input, select, textarea, and number input wrappers.
- Loading indicator and skeleton.
- Empty state and error state.
- Confirm dialog.
- Modal and drawer shells.
- Badge and status pill.
- Table, pagination, and responsive list primitives.
- Form field and validation message wrappers.

### Feature-specific components

These remain under their feature view because they know IUROADMAP domain models:

- Roadmap node cards and graph editors.
- Course-topic roadmap designer.
- Major roadmap editor.
- Permission matrix.
- Mentor profile and mentor request controls.

## Suggested structure

```text
apps/web/src/
├── components/
│   ├── layouts/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── LoadingState.tsx
│   │   ├── Select.tsx
│   │   └── StatusBadge.tsx
│   └── forms/
├── views/
│   ├── admin/components/
│   ├── learner/components/
│   └── mentor/components/
└── uikit/                  # optional future package boundary
```

## Required component contracts

### Data display

- `PageHeader`: title, optional subtitle, and action slot.
- `DataTable<T>`: typed rows, columns, loading, empty, error, and pagination states.
- `StatCard`: label, value, optional trend, and semantic color.
- `MobileListItem<T>`: compact alternative for narrow screens.

### Forms

- `FormField`: label, hint, error, and required state.
- `FormActions`: submit, cancel, loading, and disabled states.
- `ConfirmDialog`: async confirm action and destructive styling.

### Feedback

- `LoadingState` for page and control-level loading.
- `EmptyState` with an optional action.
- `ErrorState` with retry support.
- `StatusBadge` mapped to shared `ColorCommon` values.

## Shared constants and translations

- Use `ColorCommon` for role, account, enrollment, and roadmap-node status colors.
- Use `EntityConstant` for shared validation limits.
- Use `Translations` and locale JSON files for all visible labels.
- Do not translate backend identifiers such as `RM.AD`, `ACTIVE`, or `COMPLETED`; translate only their display labels.

## Responsive behavior

- Tables should provide a compact list/card fallback on narrow screens.
- Form actions should remain reachable without overlapping content.
- Dialogs and drawers must fit mobile viewport dimensions.
- Components must not change their outer size when loading, error, or validation text appears.

## Accessibility requirements

- Icon-only buttons need an accessible label or tooltip.
- Inputs must have associated labels.
- Dialogs must manage focus and expose a clear title.
- Status colors must be accompanied by text, not used as the only signal.
- Loading and error updates should use appropriate live-region semantics.

## Manual verification checklist

- [ ] Generic components can be used by admin, learner, and mentor views without domain imports.
- [ ] Data tables cover loading, empty, error, pagination, and mobile states.
- [ ] Form fields display localized validation messages.
- [ ] Status badges use `ColorCommon` and remain readable in both languages.
- [ ] Destructive actions require confirmation.
- [ ] Icon-only actions have accessible labels.
- [ ] No feature component duplicates a generic button, modal, or empty state.

## Out of scope

- Replacing the current CSS system with a mandatory third-party design system.
- Domain-specific graph, permission, or mentor widgets.
- Charts and analytics components not required by current dashboards.