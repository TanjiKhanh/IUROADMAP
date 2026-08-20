# 03 - Controllers (Master Data Pattern)

## Overview
All controllers follow the **IAM/Role pattern** — the single approved controller template for IUROADMAP.

## Reference Implementation
**File**: `services/auth/src/modules/iam/controllers/roles.controller.ts`

## Standard Endpoints (Master Data CRUD)
Every master data controller MUST expose these 6 endpoints:

| Method | Route | Action | Roles |
|--------|-------|--------|-------|
| `POST` | `create` | Create record | `ADMIN` |
| `POST` | `update` | Update record (ID in body) | `ADMIN` |
| `GET`  | `getById/:id` | Get single record by ID | `ADMIN`, `USER` |
| `GET`  | `GetByIndex` | Paginated list with filters | `ADMIN`, `USER` |
| `GET`  | `ForDropdown` | Lightweight dropdown data | `ADMIN`, `USER` |
| `POST` | `delete/:id` | Delete record by ID | `ADMIN` |

## Conventions

### Routing
```typescript
@Controller({
  path: 'iam/Role',    // Pattern: '<module>/<Entity>'
  version: '1',        // API versioning → /api/v1/iam/Role/...
})
```

### Security
```typescript
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)   // Always both guards together
```

### Method-level access
```typescript
@Roles('ADMIN')                    // Write operations
@Roles('ADMIN', 'USER')           // Read operations
```

### Controller is THIN
- Inject the Service. Delegate all logic.
- The only logic allowed in controllers: destructuring DTO (e.g., `const { id, ...data } = dto`).
- NO database calls, NO business rules in controllers.

### Swagger
```typescript
@ApiTags('IAM - Roles')
@ApiOperation({ summary: '...' })
@ApiParam({ name: 'id', type: String, description: 'Record ID' })
@ApiQuery({ name: 'keyword', required: false, type: String })
@ApiResponse({ status: 200, description: '...', type: RoleResponse })
```

## Anti-Patterns (DO NOT)
- ❌ Do NOT use `@Delete()`, `@Patch()`, `@Put()` — use `@Post('delete/:id')` and `@Post('update')`
- ❌ Do NOT inject `PrismaService` in controllers — use the Service layer
- ❌ Do NOT use `ClassSerializerInterceptor` — responses are wrapped by `ResponseInterceptor` globally
- ❌ Do NOT create a Repository layer — services interact with Prisma directly
