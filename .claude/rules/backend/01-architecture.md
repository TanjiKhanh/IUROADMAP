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

**Legacy code (do not copy, migrate when touched):** `auth/src/modules/users/`, `roadmap-service/src/modules/roadmap/` (`controller/` singular, `*.dto.ts`, snake_case filenames), and `mentor-service/*/repositories/`.

## Boundaries

- Each service owns its Prisma schema. **Never query another service's DB.** For cross-service calls, use the HTTP clients in `@iuroadmap/shared/src/clients/*` (or the saga helpers in `shared/src/saga`).
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

After you change `shared`, rebuild it (`npm run build --workspace=@iuroadmap/shared`) before the services see the change.

## Hard rules

- No magic numbers, role strings or format strings. Use `EntityConstant` / `AppConstant` (for example `AppConstant.RoleName.SuperAdmin`, not `'SUPERADMIN'`).
- Users are soft-deleted with `AccountStatus` (`ACTIVE`, `PENDING_APPROVAL`, `BANNED`, `REJECTED`). There is never a boolean `isActive`.
- Business-state checks (uniqueness, existence, status transitions) belong in the service and throw Nest exceptions (`ConflictException`, `NotFoundException`, `ForbiddenException`).
- Unit tests go in `*.unit.spec.ts` files (Jest) and must not use a database.
