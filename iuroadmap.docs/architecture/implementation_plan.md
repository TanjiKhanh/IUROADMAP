# Phase 1 — Base Infrastructure Refactoring

> **Goal:** Implement reusable BaseCrud pattern in `services/shared`, rename admin-service → roadmap-service, clean up auth/user-service/api-gateway, add shared enums/constants/models/DTOs, create seed data, configure orval for api-gen.

## User Review Required

> [!IMPORTANT]
> **Rename: admin-service → roadmap-service**  
> The `services/admin-service` package name becomes `@iuroadmap/roadmap-service`. The folder stays as `admin-service` on disk to avoid breaking git history, but all internal naming (package.json name, swagger title, health check, log messages, docker-compose service name) will change to "roadmap-service". If you prefer the folder to also be renamed, let me know.

> [!IMPORTANT]
> **Mentor service skipped** as requested — no changes to `services/mentor-service`.

> [!WARNING]
> **ServiceUrls.ADMIN_SERVICE** in the gateway config has a typo (trailing colon in the URL: `http://localhost:4100:`). This will be fixed as part of the cleanup.

## Open Questions

> [!IMPORTANT]
> **Q1: Folder rename on disk?**  
> Should I rename `services/admin-service/` folder → `services/roadmap-service/` on disk? This changes import paths everywhere. Current plan: keep folder name, only rename package name.

> [!IMPORTANT]
> **Q2: ADMIN_SERVICE_URL env var rename?**  
> Should env var `ADMIN_SERVICE_URL` become `ROADMAP_SERVICE_URL` across all services and docker-compose? Current plan: rename to `ROADMAP_SERVICE_URL`.

## Proposed Changes

### 1. Shared Package (`services/shared`)

#### [NEW] `services/shared/src/base/base-crud.service.ts`
Generic CRUD service wrapping Prisma dynamic model access. Provides:
- `create(data)` → entity
- `update(id, data)` → entity  
- `findById(id)` → entity (with NotFoundException)
- `findAll(filter: BasePaginationRequestDto)` → `PaginatedResponse<T>`
- `delete(id)` → void (with NotFoundException + ConflictException for P2003 FK)
- `getDropdownList(keyword?, parentField?, parentId?)` → `DropdownItemDto[]`

Uses `this.prisma[this.modelName]` dynamic access pattern since Prisma doesn't support generics natively.

#### [NEW] `services/shared/src/base/base-crud.controller.ts`
Generic CRUD controller providing 7 standard endpoints:
```
POST   /create          → Create
POST   /update          → Update  
GET    /getById/:id     → Get by ID
GET    /GetByIndex      → Paginated list
GET    /ForDropdown     → Dropdown data
POST   /delete/:id      → Delete
```
All with Swagger decorators. Subclasses only need to provide DTOs and override hooks.

#### [NEW] `services/shared/src/base/base-crud.interface.ts`
`ICrudService<T>` interface contract.

#### [NEW] `services/shared/src/base/index.ts`
Barrel exports for all base classes.

#### [DELETE] `services/shared/src/dtos/index.ts`
The single `index.ts` will be split up to be more manageable. `src/dtos` will be reserved for feature-specific DTOs (e.g., `dtos/roadmap/roadmap_create_response.dto.ts`).

#### [NEW] `services/shared/src/models/pagination.model.ts`
Contains:
- `BasePaginationRequestDto` — replaces simple `PaginationDto` (adds `keyword`, `sortBy`, `sortOrder`)
- `PaginationDto` — legacy pagination
- `PaginatedResponse<T>`

#### [NEW] `services/shared/src/models/dropdown.model.ts`
Contains:
- `BaseDropdownRequestDto` — `keyword`, `limit`, `parentId`
- `DropdownItemDto` — `{id, label, metadata?}`

#### [NEW] `services/shared/src/models/response.model.ts`
Contains:
- `ErrorResponse`

#### [NEW] `services/shared/src/enums/enrollment.enum.ts`
Shared enums from user-service Prisma schema:
```typescript
export enum EnrollmentStatus { ENROLLED, COMPLETED, DROPPED }
export enum NodeProgressStatus { AVAILABLE, IN_PROGRESS, COMPLETED }
```

#### [NEW] `services/shared/src/enums/account-status.enum.ts`
From auth Prisma schema:
```typescript
export enum AccountStatus { PENDING_APPROVAL, ACTIVE, BANNED, REJECTED }
```

#### [MODIFY] `services/shared/src/enums/index.ts`
Add new enum exports, keep existing `Role` enum.

#### [NEW] `services/shared/src/models/index.ts`
Shared model interfaces (for cross-service type safety):
```typescript
export interface IDepartment { id: number; slug: string; name: string; description?: string | null; }
export interface IMajorRoadmap { id: number; slug: string; name: string; totalCredits: number; departmentId: number; }
export interface ICourseNode { id: number; roadmapId: number; slug: string; name: string; credits: number; }
export interface ICourseTopic { id: number; courseNodeId: number; slug: string; title: string; }
export interface IUserRoadmapProgress { id: number; userId: number; roadmapId: number; enrollmentStatus: string; completionPercentage: number; }
```

#### [MODIFY] `services/shared/src/constants/index.ts`
Add:
- `ROADMAP_SERVICE_ERROR` error code (replaces `ADMIN_SERVICE_ERROR`)
- `CacheTtl` constants for dropdown caching
- Keep existing error codes

#### [MODIFY] `services/shared/src/index.ts`
Add `export * from './base'` and `export * from './models'`.

---

### 2. Roadmap Service (formerly admin-service)

#### [MODIFY] `services/admin-service/package.json`
- Rename `name` → `@iuroadmap/roadmap-service`
- Update description

#### [MODIFY] `services/admin-service/src/main.ts`
- Update Swagger title to "IUROADMAP Roadmap Service"
- Update log message to "Roadmap Service"

#### [MODIFY] `services/admin-service/src/health.controller.ts`
- Update service name in response

#### Refactor Department to use BaseCrud pattern:

#### [MODIFY] `services/admin-service/src/modules/roadmap/services/departments.service.ts`
Refactor to extend `BaseCrudService` from shared:
```typescript
export class DepartmentsService extends BaseCrudService {
  constructor(prisma: PrismaService) {
    super(prisma, 'dEPARTMENTS', { labelField: 'name' });
  }
  // Override toResponse for custom mapping
}
```

#### [MODIFY] `services/admin-service/src/modules/roadmap/controller/departments.controller.ts`
Refactor to use standard 7-endpoint pattern, delegating to `DepartmentsService`.

#### Refactor Major (Management) — uses BaseCrud for list + custom endpoints:

#### [MODIFY] `services/admin-service/src/modules/roadmap/services/management.service.ts`
Add pagination support, dropdown support.

#### [MODIFY] `services/admin-service/src/modules/roadmap/controller/management.controller.ts`
Add `GetByIndex`, `ForDropdown` endpoints.

#### [NEW] `services/admin-service/prisma/seed.ts`
Seed data for testing — departments, majors, course nodes, topics, edges.

---

### 3. Auth Service

#### [MODIFY] `services/auth/src/main.ts`
- Clean up Swagger title/description

#### Auth service modules stay as-is (login/register/JWT are custom workflows, not CRUD).

---

### 4. User Service

#### [MODIFY] `services/user-service/src/main.ts`
- Clean up Swagger title

#### User service modules stay as-is (UserRoadmapProgress is transactional, not CRUD).

---

### 5. API Gateway

#### [MODIFY] `services/api-gateway/src/config/service-urls.config.ts`
- Rename `ADMIN_SERVICE` → `ROADMAP_SERVICE`
- Fix trailing colon typo in URL
- Add `ROADMAP_SERVICE_URL` env var

#### [MODIFY] `services/api-gateway/src/config/env.config.ts`
- Rename `ADMIN_SERVICE_URL` → `ROADMAP_SERVICE_URL`

#### [MODIFY] `services/api-gateway/.env`
- Rename env var

#### [MODIFY] `services/api-gateway/src/app.module.ts`
- Rename `AdminModule` → `RoadmapModule`

#### [MODIFY] `services/api-gateway/src/modules/admin/admin.module.ts`
- Rename to `RoadmapModule`
- Rename `AdminServiceClient` → `RoadmapServiceClient`

#### [MODIFY] `services/api-gateway/src/modules/admin/clients/admin-service.client.ts`
- Rename to `RoadmapServiceClient`, update URL reference

#### [MODIFY] Gateway controllers (departments, courses, majors, major-roadmaps, admin-roadmaps-alias):
- Update service client references
- Add `ForDropdown` and `GetByIndex` proxy endpoints for departments, majors

#### [MODIFY] `services/api-gateway/src/modules/roadmaps/clients/admin-service.client.ts`
- Rename to `RoadmapServiceClient`, update URL reference

---

### 6. Orval / API Gen

#### [MODIFY] `packages/api-gen/orval.config.ts`
- Point `input` to gateway swagger-spec.json
- Verify zod validation generation is enabled

---

### 7. Docker Compose & Env

#### [MODIFY] `docker-compose.yml`
- Rename `admin-service` → `roadmap-service` throughout  
- Update env vars

#### [MODIFY] `services/admin-service/.env`
- No change needed (DB connection stays same)

---

## File Summary

| Action | File | Purpose |
|--------|------|---------|
| NEW | `shared/src/base/base-crud.service.ts` | Generic Prisma CRUD service |
| NEW | `shared/src/base/base-crud.controller.ts` | Generic 7-endpoint controller |
| NEW | `shared/src/base/base-crud.interface.ts` | ICrudService interface |
| NEW | `shared/src/base/index.ts` | Barrel exports |
| DELETE | `shared/src/dtos/index.ts` | Split into separate models |
| NEW | `shared/src/models/pagination.model.ts` | Pagination DTOs and responses |
| NEW | `shared/src/models/dropdown.model.ts` | Dropdown DTOs |
| NEW | `shared/src/models/response.model.ts` | Error response model |
| NEW | `shared/src/enums/enrollment.enum.ts` | Enrollment + NodeProgress enums |
| NEW | `shared/src/enums/account-status.enum.ts` | AccountStatus enum |
| MODIFY | `shared/src/enums/index.ts` | Re-export new enums |
| NEW | `shared/src/models/index.ts` | Shared entity interfaces |
| MODIFY | `shared/src/constants/index.ts` | Add ROADMAP_SERVICE_ERROR, CacheTtl |
| MODIFY | `shared/src/index.ts` | Export base + models |
| MODIFY | `admin-service/package.json` | Rename to roadmap-service |
| MODIFY | `admin-service/src/main.ts` | Update naming |
| MODIFY | `admin-service/src/health.controller.ts` | Update service name |
| MODIFY | `admin-service departments service` | Extend BaseCrudService |
| MODIFY | `admin-service departments controller` | Standard 7 endpoints |
| MODIFY | `admin-service management service` | Add pagination + dropdown |
| MODIFY | `admin-service management controller` | Add GetByIndex, ForDropdown |
| NEW | `admin-service/prisma/seed.ts` | Seed data |
| MODIFY | `api-gateway config` | Rename ADMIN → ROADMAP |
| MODIFY | `api-gateway modules/admin` | Rename AdminModule → RoadmapModule |
| MODIFY | `api-gateway controllers` | Add dropdown/pagination proxy |
| MODIFY | `docker-compose.yml` | Rename service |
| MODIFY | `packages/api-gen/orval.config.ts` | Point to swagger-spec |

## Verification Plan

### Build Verification
```bash
# 1. Build shared package
cd services/shared && npx tsc --noEmit

# 2. Build roadmap service (admin-service)
cd services/admin-service && npx tsc --noEmit

# 3. Build api-gateway
cd services/api-gateway && npx tsc --noEmit

# 4. Build user-service
cd services/user-service && npx tsc --noEmit
```

### Seed Data
```bash
cd services/admin-service && npx ts-node prisma/seed.ts
```

### API Gen
```bash
# Start gateway, then generate
npm run gen:api
```

### Manual Verification
- Start roadmap-service → verify Swagger at `/docs`
- Start api-gateway → verify Swagger at `/docs`
- Test department CRUD via 7 standard endpoints
- Verify `ForDropdown` returns `{id, label}` format
- Verify `GetByIndex` returns paginated response
