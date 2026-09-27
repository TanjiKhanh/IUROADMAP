---
name: add-prisma-model
description: Add or change a Prisma model in one IUROADMAP service, generate the migration, and review it for data-loss risk. Use when the user wants a new table/column/relation or says "add migration", "change schema".
argument-hint: [service] [ModelName]
allowed-tools: Bash(npx prisma *) Bash(npm run prisma:*)
---

# Add / change a Prisma model

1. Pick the **owning service**. Data never crosses service DBs. If another service needs the data, expose an endpoint and call it through `@iuroadmap/shared/src/clients`.
2. Read `iuroadmap.docs/schema/<area>-schema.md` and the existing `prisma/schema.prisma` in that service. Match the id type, naming (`camelCase` fields, `@@map` if used), timestamps and enum style.
3. Edit `iuroadmap.services/<service>/prisma/schema.prisma`.
   - Users are soft-deleted with `AccountStatus`, never a boolean `isActive`.
   - Configuration data (Department/Major/Course) uses `onDelete: Cascade` on children.
4. Generate: `cd iuroadmap.services/<service> && npx prisma migrate dev --name <PascalCaseName>`. Use a descriptive name, like `AddMentorSessionTable`, not `update1`.
5. **Review** `prisma/migrations/<ts>_<name>/migration.sql`:
   - `NOT NULL` added to an existing table without `DEFAULT` → fails on data.
   - `DROP COLUMN` / `DROP TABLE` → data loss. Is it intended?
   - A rename shows up as drop + add → data loss. Hand-edit it to `ALTER ... RENAME`.
   - Unexpected changes to other tables → the schema drifted. Stop and ask.
6. Update the schema doc in `iuroadmap.docs/schema/`.
7. Report the migration path + any risks. **Never** run `prisma migrate reset` or `db push --force-reset` without explicit permission.
