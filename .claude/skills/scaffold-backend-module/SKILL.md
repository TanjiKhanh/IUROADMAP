---
name: scaffold-backend-module
description: End-to-end scaffold of a new IUROADMAP master-data backend module in a NestJS service — Prisma model + migration, flat DTO folder, service, controller (6 standard endpoints), module wiring, gateway route, then regenerate the FE API client. Use when the user says "add a new module / feature / CRUD for X" on the backend.
argument-hint: [service] [entity]
---

# Scaffold a backend module

Arguments: `<service>` (auth | user-service | mentor-service | roadmap-service) and `<entity>` (singular, e.g. `major`). If either is missing, ask for it.

**Copy the reference:** `iuroadmap.services/auth/src/modules/iam/`. Read `roles.controller.ts`, `roles.service.ts` and `dto/role/*` first, then mirror them.

## Steps (in order)

1. **Requirements.** Find the feature in `iuroadmap.docs/srs/functional-requirements.md`, read the matching `features/FL-*.md` and `iuroadmap.docs/schema/*-schema.md`, and note the BR-* rules (delete strategy, uniqueness, status transitions).
2. **Prisma model.** Add it to `iuroadmap.services/<service>/prisma/schema.prisma`, then run `cd iuroadmap.services/<service> && npx prisma migrate dev --name Add<Entity>`.
3. **DTOs.** Create `src/modules/<module>/dto/<entity>/` with `<entity>-create.request.ts`, `-update.request.ts`, `-filter.request.ts`, `<entity>.response.ts`, `<entity>-detail.response.ts` (if needed) and `index.ts`. Use `EntityConstant` for every length (see the `add-dto` skill).
4. **Service.** `services/<entity>s.service.ts`: `create`, `update`, `findById`, `findAll` (`getPaginationAsync`), `getDropdownList`, `delete`, plus private `toResponse` and `handlePrismaError`. Business rules go here.
5. **Controller.** `controllers/<entity>s.controller.ts`: `@Controller({ path: '<module>/<Entity>', version: '1' })`, `@UseGuards(JwtGuard, RoleGuard)`, the 6 endpoints, and full Swagger decorators.
6. **Module wiring.** Add the controller and service to `<module>.module.ts`, and import the module in `app.module.ts`.
7. **Gateway.** If the path prefix is new, add it to `iuroadmap.services/api-gateway/src/config/routes.config.ts` under the right service.
8. **Permissions.** If needed, follow `.claude/rules/backend/04-prisma-permissions.md` (PMS, then seed).
9. **Verify.** Run `npm run build` in the service, then `npm run gen:api` at the root so the web app gets `use<Entity>sController*` hooks + Zod.
10. **Report** the files you created and whatever you didn't run (for example a migration against a shared DB).

For the web side afterwards, use the `scaffold-web-crud` skill.
