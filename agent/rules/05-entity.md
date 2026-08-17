# 05 - Entity & Database Schema

## Prisma Schema
Each service owns its own Prisma schema at `services/<service>/prisma/schema.prisma`.

### Auth Service Schema (`services/auth/prisma/schema.prisma`)
```
User ──── Role ──── Permission ──── PermissionGroup
```

| Model | Key Fields | Notes |
|-------|-----------|-------|
| `User` | id, email, password, name, roleId, status (`AccountStatus`), resetPasswordToken, resetPasswordExpires | `status` drives access control (NOT a boolean `isActive`) |
| `Role` | id, name (unique), description | Many-to-many with `Permission` |
| `Permission` | id, name (unique, e.g. `SYS.AD`), displayName, description, groupId | Belongs to `PermissionGroup` |
| `PermissionGroup` | id, name (unique, e.g. `SYSTEM_MANAGEMENT`), description | Groups permissions for UI matrix |

### AccountStatus Lifecycle
- `ACTIVE` — Normal operation
- `PENDING_APPROVAL` — Mentor awaiting admin review
- `BANNED` — Suspended by admin (blocks login, JWT invalidated)
- `REJECTED` — Mentor application rejected

> ⚠️ The system uses `AccountStatus` enum, NOT a boolean `isActive`. Status transitions control login eligibility, UI visibility, and feature access.

## Seeding
Seed data lives at `services/auth/prisma/seed.ts`.
- Permission groups are auto-created from `AppConstant.PMSGroup` constants in `@iuroadmap/shared`
- Permissions are mapped to groups via `APP_PERMISSIONS` registry
- Default roles: `LEARNER`, `MENTOR`, `ADMIN`, `SUPERADMIN`
- Run: `npx prisma db seed`

## Soft Delete vs Hard Delete
Based on business rules in `docs/business-flow/`:

| Entity | Delete Strategy | Reason |
|--------|---------------|--------|
| **User** | Soft Delete via `status: BANNED` | Preserves enrollment history, roadmap progress, review data. Hard delete is **Superadmin-only** (`BR-CFG-05`) |
| **LecturerProfile** | Soft Delete via `status: INACTIVE` | Preserves student reviews; hides from public directory |
| **Mentoring Connection** | Status `Terminated` | Preserves chat/feedback history |
| **Department/Major/Course** | Hard Delete with cascade | Configuration data; cascade deletes child entities |
| **Role/Permission** | Hard Delete | System configuration entities |

### Key Business Rules
- `BR-CFG-03`: Admin cannot delete their own account
- `BR-CFG-04`: `BANNED` status → immediate JWT invalidation
- `BR-CFG-05`: Hard delete only for Superadmin
- `BR-AUTH-05`: `BANNED` users cannot log in

## Adding a New Model
1. Edit `services/<service>/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name <migration-name>`
3. Run `npx prisma generate` (auto if using `ts-node-dev`)
4. Create DTOs following [08-dto.md](./08-dto.md)
5. Create Service following [06-service.md](./06-service.md)
6. Create Controller following [03-controller.md](./03-controller.md)
