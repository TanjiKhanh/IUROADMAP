# Phase 0 — IUROADMAP workspace baseline

> **Status:** working draft. Documentation only; no implementation is implied by this phase.

## Goal

Document the existing IUROADMAP web workspace before feature refactoring begins. The baseline is the current `apps/web` application.

## Workspace baseline

```text
iuroadmap.webapp/
├── apps/web/                 # Vite + React web application
├── packages/api-gen/         # Generated API models, endpoints, and schemas
├── packages/core/            # Routes, menus, permissions, i18n, shared types
├── packages/store/           # Shared Redux app state and JWT token state
└── apps/mobile/              # Separate mobile consumer of shared packages
```

## Current web structure

```text
apps/web/src/
├── auth/                     # Auth context, JWT, route protection
├── components/               # Reusable UI and layout components
├── hooks/                    # Shared React hooks
├── router/                   # Composed route modules
├── services/                 # API wrappers
├── store/                    # App-specific state when required
├── styles/                   # CSS files
├── views/                    # Feature entrypoints
└── pages/                    # Legacy implementations being migrated
```

## Shared package responsibilities

- `@iuroadmap/api-gen`: generated API clients and DTO types from the IUROADMAP services.
- `@iuroadmap/core`: `RoutePaths`, navigation/menu configuration, `FeaturePms`, constants, i18n, icons, and shared auth types.
- `@iuroadmap/store`: Redux store, access token, parsed JWT profile, and initialization state.

## Baseline rules

- Keep one web dashboard shell for all authenticated roles.
- Keep route paths in `@iuroadmap/core/constants/routes`.
- Keep menu structure in shared navigation constants.
- Keep feature views under `views/<feature>/`.
- Keep route objects in separate `*.routes.tsx` modules.
- Keep backend-generated identifiers and permission codes unchanged.
- Do not copy service DTOs into handwritten frontend models when generated models exist.

## Verification

- `npm install` completes for the workspace.
- `npm run build --workspace=@iuroadmap/store` passes.
- `npm run typecheck --workspace=@iuroadmap/core` passes.
- `npm run build --workspace=iuroadmap.web` passes.
- `apps/web` starts with Vite and renders public and protected routes.

## Deferred

- Full migration of every legacy file from `pages/` into `views/`.
- Additional feature modules not yet present in IUROADMAP services.
- Mobile-specific screens; shared packages remain mobile-compatible.
