---
paths:
  - "iuroadmap.services/**/prisma/**"
  - "iuroadmap.services/shared/src/enums/**"
  - "iuroadmap.services/**/guards/**"
---

# Prisma schema & permissions

## Schema changes

1. Edit `iuroadmap.services/<service>/prisma/schema.prisma`, the one belonging to the service that owns the data.
2. `cd iuroadmap.services/<service> && npx prisma migrate dev --name <PascalCaseName>` (this also runs `prisma generate`).
3. Update the matching doc in `iuroadmap.docs/schema/<area>-schema.md`.
4. Then write the DTOs, service and controller.

Review the generated SQL before running it on shared data. Watch for NOT NULL without a default, dropped columns, renames that Prisma turns into drop + add, and cascade deletes.

## Delete strategy (from business rules)

| Entity | Strategy |
|---|---|
| User | Soft: `status = BANNED`. Hard delete is Superadmin-only (BR-CFG-05). An admin cannot delete themselves (BR-CFG-03). BANNED means immediate JWT invalidation and no login (BR-CFG-04, BR-AUTH-05) |
| LecturerProfile | Soft: `status = INACTIVE` |
| Mentoring connection | Status `Terminated` (keeps history) |
| Department / Major / Course | Hard delete with cascade |
| Role / Permission | Hard delete |

## RBAC

- `Role` ↔ `Permission` is many-to-many. `Permission` belongs to a `PermissionGroup`. The static registry is `shared/src/enums/permissions.enum.ts` (`PMS` enum + `APP_PERMISSIONS`). The groups are `AppConstant.PMSGroup` (`SYSTEM`, `USER`, `ROADMAP`, `LECTURER`).
- The JWT payload is `{ sub, email, role, permissions[] }`. `JwtGuard` → 401 and `RoleGuard` (checks `@Roles`) → 403.
- To add a permission: add it to `PMS` and to `APP_PERMISSIONS` (code, displayName, groupId), add a `PMSGroup` if needed, rebuild `shared`, run `npx prisma db seed` in `auth`, and mirror the key in `@iuroadmap/core` if the web app gates on it.
- Default roles: `LEARNER`, `MENTOR`, `ADMIN`, `SUPERADMIN` (the `Role` enum).
