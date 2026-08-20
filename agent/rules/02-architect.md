# 02 - Architecture

## Current State
IUROADMAP is designed as a microservices platform. Currently, the **auth-service** is the only active backend service, handling Authentication, Users, and IAM (Identity & Access Management).

## Active Service: Auth Service (`services/auth/`)
- Runs on `PORT: 3000`
- Swagger docs at `/docs`
- Database: PostgreSQL (Prisma ORM, `AUTH_DATABASE_URL`)
- Modules:
  - `auth/` — Login, Register, JWT tokens, Password Reset
  - `users/` — User profiles and listing (legacy pattern)
  - `iam/` — ✅ **Approved pattern** — Roles CRUD, Permissions matrix, PermissionGroup

## Shared Library (`services/shared/`)
- Published as `@iuroadmap/shared` (workspace dependency)
- Provides:
  - `getPaginationAsync()` — generic Prisma pagination with strategy/callback pattern
  - `PaginationRequest` / `PaginationResponse` — standard pagination models
  - `DropdownItemDto` — lightweight `{ id, label }` model for dropdowns
  - `JwtGuard` / `RoleGuard` — authentication & authorization guards
  - `@Roles()` / `@CurrentUser()` — decorators
  - `ResponseInterceptor` — wraps all responses in `{ status, data, timestamp, path }`
  - `CustomValidationPipe` — global validation with class-validator
  - `AccountStatus` enum — `ACTIVE`, `PENDING_APPROVAL`, `BANNED`, `REJECTED`
  - `PMS` enum + `APP_PERMISSIONS` — static permission registry with group mapping
  - `AppConstant.PMSGroup` — permission group name constants

## Response Envelope
All API responses are automatically wrapped by `ResponseInterceptor`:
```json
{
  "status": "success",
  "data": { ... },
  "timestamp": "2026-08-16T07:00:00.000Z",
  "path": "/api/v1/iam/Role/GetByIndex"
}
```

## Planned Services (Not Yet Active)
- `api-gateway` — Public-facing gateway (routing to backend services)
- `roadmap-service` — Core domain: Departments, Majors, Courses, Roadmaps
- `user-service` — User profile data, configurations
- `mentor-service` — Mentorship matching, scheduling, sessions
