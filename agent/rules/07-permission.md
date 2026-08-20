# 07 - Permissions & Guards

## Overview
IUROADMAP uses a dynamic RBAC (Role-Based Access Control) model. Permissions are database-driven, NOT hardcoded roles.

## Permission Registry
Static permission definitions live in `@iuroadmap/shared` at `services/shared/src/enums/permissions.enum.ts`:

### Permission Groups (`AppConstant.PMSGroup`)
| Constant | Group Name |
|----------|-----------|
| `SYSTEM` | `SYSTEM_MANAGEMENT` |
| `USER` | `USER_MANAGEMENT` |
| `ROADMAP` | `ROADMAP_MANAGEMENT` |
| `LECTURER` | `LECTURER_REVIEW_MANAGEMENT` |

### Permissions (`PMS` enum)
| Code | Display Name | Group |
|------|-------------|-------|
| `SYS.AD` | Manage System Configuration | SYSTEM |
| `RM.USER` | Sử dụng Roadmap | ROADMAP |
| `RM.AD` | Quản trị Roadmap | ROADMAP |
| `LR.USER` | Xem và đánh giá Giảng viên | LECTURER |
| `LR.AD` | Quản trị Đánh giá Giảng viên | LECTURER |
| `USER.AD` | Manage Users | USER |

## Database Model
```
Role ←→ Permission (many-to-many, Prisma implicit)
Permission → PermissionGroup (many-to-one via groupId)
```

### Permission Matrix API
- **Create screen** (empty matrix): `GET /api/v1/iam/Role/GetAllPermission` → all permissions with `isInRole: false`
- **Edit screen** (filled matrix): `GET /api/v1/iam/Role/getById/:id` → permissions with `isInRole: true/false` based on role assignment

## Guards

### JwtGuard
- Verifies Bearer token signature using `JWT_SECRET`
- Populates `request.user` with decoded JWT payload (`sub`, `email`, `role`, `permissions`)
- Fails → `401 Unauthorized`

### RoleGuard
- Reads `@Roles()` decorator metadata
- Checks `request.user.role` against allowed roles
- Fails → `403 Forbidden`

### Usage Pattern
```typescript
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)     // Always both, at class level
@Controller({ path: 'iam/Role', version: '1' })
export class RolesController {

  @Post('create')
  @Roles('ADMIN')                    // Write → ADMIN only
  async create(...) {}

  @Get('GetByIndex')
  @Roles('ADMIN', 'USER')            // Read → broader access
  async getByIndex(...) {}
}
```

### Current User
```typescript
@Get('me')
async getProfile(@CurrentUser('userId') userId: string) { ... }
```

## JWT Payload Structure
```json
{
  "sub": "uuid-user-id",
  "email": "admin@iuroadmap.com",
  "role": "ADMIN",
  "permissions": ["SYS.AD", "RM.AD", "USER.AD"],
  "iat": 1723528255,
  "exp": 1723614655
}
```

## Adding New Permissions
1. Add entry to `PMS` enum in `services/shared/src/enums/permissions.enum.ts`
2. Add to `APP_PERMISSIONS` array with `code`, `displayName`, `groupId`
3. Add new `PMSGroup` constant if needed
4. Run `npx prisma db seed` to populate database
5. Rebuild shared library if needed
