# 01 - Project Overview

## Goal
Establish the core technical stack, repository layout, and high-level boundaries for the IUROADMAP platform.

## Stack
- **Backend Framework**: NestJS (Node.js) — pure NestJS, no `@nestjs/cli` scaffolding
- **Database**: PostgreSQL with Prisma ORM (each service owns its own schema)
- **Shared Library**: `@iuroadmap/shared` — common models, guards, interceptors, decorators, enums, pagination utilities
- **Validation**: `class-validator` + `class-transformer` (via global `CustomValidationPipe`)
- **Language**: TypeScript (strict mode — use `!:` for DTO property initialization)
- **Dev Server**: `ts-node-dev --respawn --transpile-only`
- **Containerization**: Docker & Docker Compose (planned)

## Layout
```
services/
  auth/                  ← Authentication, Users, IAM (Roles & Permissions)
    prisma/
      schema.prisma      ← Auth DB schema (User, Role, Permission, PermissionGroup)
      seed.ts            ← Permission groups, roles, and permissions seeder
    src/
      modules/
        auth/            ← Login, Register, Password Reset
        users/           ← User profiles and listing (⚠️ LEGACY — needs migration to master data pattern)
        iam/             ← ✅ APPROVED PATTERN — Roles CRUD, Permission matrix
      infrastructure/
        prisma/          ← PrismaService + PrismaModule
  shared/                ← @iuroadmap/shared library
    src/
      clients/          ← Inter-service HTTP clients
      constants/        ← AppConstant, EntityConstant, CacheTtl, ErrorCodes
      decorators/       ← @CurrentUser, @Roles
      enums/            ← AccountStatus, PMS, Role
      filters/          ← HttpExceptionFilter
      guards/           ← JwtGuard, RoleGuard
      interceptors/     ← ResponseInterceptor (wraps all responses)
      interfaces/       ← Domain & Auth interfaces
      models/           ← PaginationRequest, PaginationResponse, DropdownItemDto, ErrorResponse
      pipes/            ← CustomValidationPipe
      utils/            ← getPaginationAsync utility
  api-gateway/           ← (planned) Public-facing gateway
  roadmap-service/       ← (planned) Core domain
  user-service/          ← (planned) User profile data
  mentor-service/        ← (planned) Mentorship features
docs/
  business-flow/         ← Business requirements per module
  schema/                ← Database schema documentation (mermaid ERDs)
  architecture/          ← Architecture decisions
```

## Where to start
- **Add a new CRUD module**: Follow IAM/Role pattern. See [03-controller.md](./03-controller.md).
- **Add/modify database models**: Edit Prisma schema, run `prisma migrate dev`, regenerate client. See [05-entity.md](./05-entity.md).
- **Write business logic**: See [06-service.md](./06-service.md).
- **Secure an endpoint**: See [07-permission.md](./07-permission.md).
- **Create DTOs**: Follow the approved flat-folder pattern. See [08-dto.md](./08-dto.md).

## ⚠️ Migration Notice
The `users/` module uses a **legacy pattern** (repository layer, `dto/requests/` + `dto/responses/` folders, `.dto.ts` suffix). New modules MUST follow the **IAM master data pattern**. The `users/` module itself will be migrated to this pattern.
