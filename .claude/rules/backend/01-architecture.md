---
paths:
  - "iuroadmap.services/**"
---

# Backend architecture (NestJS microservices)

## Service layout (approved pattern)

```
iuroadmap.services/<service>/
├── prisma/schema.prisma        # this service's own DB schema (+ seed.ts in auth)
└── src/
    ├── main.ts / app.module.ts
    ├── infrastructure/prisma/  # PrismaService + PrismaModule (auth); other services: src/prisma/
    └── modules/<module>/
        ├── <module>.module.ts
        ├── controllers/<entity>s.controller.ts
        ├── services/<entity>s.service.ts
        └── dto/<entity>/        # flat, one folder per entity (see 03-dto-validation)
```

Reference: `auth/src/modules/iam/` (controller `roles.controller.ts`, service `roles.service.ts`, DTOs `dto/role/`).

Roadmap v2 modules of `roadmap-service` (`department`, `major`, `course-catalog`, …) follow the same pattern; pure logic that must be unit-tested without a database sits in `modules/<module>/lib/` (e.g. `student-roadmap/lib/merge.ts`).

**Legacy code (do not copy, migrate when touched):** `auth/src/modules/users/` and `mentor-service/*/repositories/`.

## Boundaries

- Each service owns its Prisma schema. **Never query another service's DB.** For cross-service calls, use the HTTP clients in `@iuroadmap/shared/src/clients/*` (`mentor-client`, `roadmap-client`) or the saga helpers in `shared/src/saga`.
- Service-to-service endpoints live under `internal/*`: no gateway prefix, `@ApiExcludeController()` so they stay out of the FE Swagger, and an API-key check (`x-api-key`; roadmap-service: `InternalApiKeyGuard` + `ROADMAP_SERVICE_API_KEY`). Example: auth deleting a user calls `roadmap-client.purgeUser()`.
- `api-gateway` has no business logic. It verifies the JWT (`middlewares/auth.middleware.ts`), then proxies requests by URL prefix according to `config/routes.config.ts`. A new top-level controller path needs a prefix entry there.
- Swagger for the FE is exported from the gateway (`npm run gen:spec`), so every endpoint needs full `@nestjs/swagger` decorators.

## `@iuroadmap/shared`

| Need | Use |
|---|---|
| Auth | `JwtGuard`, `RoleGuard`, `@Roles(...)`, `@CurrentUser('userId')` |
| Pagination | `PaginationRequest`, `PaginationResponse<T>`, `getPaginationAsync(prismaDelegate, filter, whereFn, { include })` |
| Dropdown | `DropdownItemDto` `{ id, label }` |
| Constants | `EntityConstant` (lengths), `AppConstant` (`RoleName`, `Pagination`, `PMSGroup`, `DateFormat`), `CacheTtl`, error constants |
| Enums | `Role`, `AccountStatus`, `PMS` + `APP_PERMISSIONS`, enrollment enums |
| Global | `ResponseInterceptor` wraps every response as `{ status, data, timestamp, path }`; `HttpExceptionFilter`; `CustomValidationPipe` |
| Roadmap logic | `roadmap-engine` (pure TS: `findCycle`, `checkPlacement`, `validateCurriculum`, `layoutColumn` / `orderForSlot`, `computeTotal` / `summarizeResults`, `resolveOffering`). Used by roadmap-service **and** the web app |

`shared` is consumed from source (`main: ./src/index.ts`), so services see a change without a rebuild.

Two dependency-free subpaths exist for the web app (never import NestJS there): `@iuroadmap/shared/roadmap-engine` and `@iuroadmap/shared/constants` (`AppConstant`, `EntityConstant`, `ErrorCodes`). Business rules that both sides need (DAG, semester order, grading) live once in `roadmap-engine`, with unit tests in `roadmap-service/test/roadmap-engine/`.

## Hard rules

- No magic numbers, role strings or format strings. Use `EntityConstant` / `AppConstant` (for example `AppConstant.RoleName.SuperAdmin`, not `'SUPERADMIN'`).
- Users are soft-deleted with `AccountStatus` (`ACTIVE`, `PENDING_APPROVAL`, `BANNED`, `REJECTED`). There is never a boolean `isActive`.
- Business-state checks (uniqueness, existence, status transitions) belong in the service and throw Nest exceptions (`ConflictException`, `NotFoundException`, `ForbiddenException`).
- Unit tests go in `*.unit.spec.ts` files (Jest) and must not use a database.
