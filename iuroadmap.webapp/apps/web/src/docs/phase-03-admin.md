# Phase 3 — IUROADMAP administration and content management

> **Status:** working draft. This document describes the current IUROADMAP web application and is intentionally left editable before implementation work begins.

## Scope

Phase 3 covers the administration and content-management surfaces that already exist in IUROADMAP:

- Admin overview dashboard.
- Department management.
- Major and roadmap management.
- Course management.
- Roadmap and course-topic designers.
- User and role management contracts exposed by `auth-service`.

The application uses one authenticated dashboard shell. The visible menu is derived from the shared menu configuration and the user's JWT claims. Backend services remain the authorization boundary for every API endpoint.

## Current application structure

Feature pages are exposed through `views/` entrypoints. Existing implementations may still live under `pages/` during the migration, but new route definitions should import from `views/`.

```text
apps/web/src/
├── components/               # Reusable UI and layout components
├── hooks/                    # Auth, menu, data, and interaction hooks
├── router/                   # Feature route modules and composition
├── store/                    # App-level state when needed
├── styles/                   # Global and feature styles
├── uikit/                    # Future shared UI wrappers
├── views/
│   ├── admin/                # Admin dashboard and management views
│   ├── learner/              # Learner roadmap and course views
│   ├── mentor/               # Mentor views
│   └── public/               # Landing and auth views
└── services/                # API wrappers and generated API adapters
```

## Admin feature breakdown

### Admin overview

Route: `RoutePaths.web.admin.root`

View: `views/admin/AdminDashboard.tsx`

Responsibilities:

- Show operational counts from Admin Service.
- Link to roadmap, course, department, and user-management workflows.
- Display loading, empty, and API error states.

### Departments

Route: `RoutePaths.web.admin.departments`

View: `views/admin/ManageDepartments.tsx`

Fields and actions:

- Department name.
- Slug.
- Description.
- Create, edit, delete, and reload.
- Duplicate and API failure feedback.

### Majors and roadmaps

Route: `RoutePaths.web.admin.roadmaps`

View: `views/admin/ManageRoadmaps.tsx`

Responsibilities:

- List and edit majors.
- Maintain major metadata and required credits.
- Open the roadmap designer.
- Display course count and roadmap state.

Designer routes:

- `RoutePaths.web.admin.roadmapsDesign`
- `RoutePaths.web.admin.roadmapsDesignSlug`

View: `views/admin/RoadmapDesigner.tsx`

Designer responsibilities:

- Create, edit, and remove roadmap nodes.
- Edit node title, slug, description, credits, and status.
- Manage prerequisite edges.
- Persist graph positions and relationships.
- Handle invalid node and edge operations without losing the current graph.

### Courses and topic roadmaps

Route: `RoutePaths.web.admin.courses`

View: `views/admin/ManageCourses.tsx`

Fields and actions:

- Course name.
- Course slug.
- Credits.
- Description.
- Search and select a course.
- Update course metadata.
- Open the topic roadmap designer.

Topic designer route: `RoutePaths.web.admin.courseTopicsDesign`

View: `views/admin/CourseTopicRoadmapDesigner.tsx`

### Users and roles

The auth service owns the IAM data model:

- `User`.
- `Role`.
- `PermissionGroup`.
- `Permission`.

The auth service places these claims in the JWT:

```ts
{
  sub: string;
  userId: string;
  email: string;
  role: string;
  permissions: string[];
}
```

The current permission registry includes:

- `SYS.AD` — system administration.
- `RM.USER` — learner roadmap usage.
- `RM.AD` — roadmap administration.
- `LR.USER` — lecturer-review usage.
- `LR.AD` — lecturer-review administration.
- `USER.AD` — user administration.

User and role screens should consume generated auth endpoints and keep permission identifiers unchanged. Locale files may provide display labels, but must never replace identifiers sent to the API.

## Route organization

Each route module owns only its feature route objects and uses a default export:

```text
router/
├── auth.routes.tsx
├── dashboard.routes.tsx
├── protected.routes.tsx
├── public.routes.tsx
├── redirect.routes.tsx
├── tool.routes.tsx
└── index.tsx                 # composition only
```

The outer protected route owns authentication and the shared layout. Feature route modules do not repeat role or permission wrappers. The menu is a navigation projection of the same feature configuration, while endpoint authorization is enforced by the backend.

## Shared configuration

Use shared constants instead of repeating domain strings:

- `@iuroadmap/core/constants/routes` for web and mobile paths.
- `@iuroadmap/core/constants/navigation` for menu structure.
- `@iuroadmap/core/constants/featurePms` for role and permission metadata.
- `@iuroadmap/core/constants/entityConstant` for validation limits.
- `@iuroadmap/core/constants/colorCommon` for status and role colors.
- `@iuroadmap/core/i18n` for English and Vietnamese labels.

## State and authentication rules

- Redux stores the access token and parsed token profile.
- `ProtectedRoute` reads authentication state from Redux.
- `AuthProvider` synchronizes local token storage, Redux, and the `/me` profile.
- JWT permissions are merged with the `/me` profile when the profile omits them.
- `useMenu` filters the shared menu using role and permission claims.
- Hiding a menu item is only a UX optimization; it is not a security boundary.
- API `401` and `403` responses must remain visible as user-facing error states.

## Reusable UI responsibilities

Reusable components should remain outside feature views when they do not know IUROADMAP domain rules:

- Buttons and loading states.
- Search and filter controls.
- Confirmation dialogs.
- Empty and error states.
- Table and responsive list primitives.
- Form field wrappers.

Permission matrices, roadmap graph editors, and course-topic editors remain feature-specific because they understand domain models and workflow rules.

## i18n requirements

Admin labels belong in both `en` and `vi` locale trees. At minimum, cover:

- Admin overview.
- Departments, majors, courses, and roadmaps.
- Create, edit, update, delete, save, and cancel.
- Search, loading, empty, success, and error states.
- Role labels and permission group/action labels.
- Roadmap node statuses: `AVAILABLE`, `IN_PROGRESS`, `COMPLETED`, `SKIPPED`, `LOCKED`.

Technical values such as `RM.AD` and `PENDING_APPROVAL` remain stable identifiers. Only their display text is translated.

## Manual verification checklist

- [ ] Unauthenticated users are redirected to `RoutePaths.web.public.login` for protected routes.
- [ ] An authenticated user receives one shared dashboard shell regardless of role.
- [ ] Menu items are filtered from JWT role and permission claims.
- [ ] Direct API calls still receive backend authorization responses.
- [ ] Admin can load the overview dashboard.
- [ ] Admin can create, edit, delete, and reload departments.
- [ ] Admin can edit major and course metadata.
- [ ] Admin can open both roadmap designers.
- [ ] Empty, loading, `401`, `403`, and server-error states are handled.
- [ ] English and Vietnamese labels exist for admin fields and actions.
- [ ] Route modules use centralized path constants.

## Out of scope for this phase

- Multi-organization administration not present in the current IUROADMAP services.
- Unscheduled legacy domains outside the current learner, mentor, roadmap, course, and administration scope.
- Replacing generated API clients with hand-written endpoint contracts.
- Moving every legacy implementation from `pages/` into `views/` in one change.
- Backend permission policy changes.