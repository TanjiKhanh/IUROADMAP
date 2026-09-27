---
name: add-dto
description: Create or fix NestJS request/response DTOs for IUROADMAP with class-validator + Swagger decorators and EntityConstant lengths (flat dto/<entity>/ folder, .request.ts/.response.ts naming). Use when the user says "add validation", "add DTO", or pastes a DTO with inline MaxLength numbers or .dto.ts naming.
argument-hint: [service] [entity]
---

# Add / fix DTOs

Reference: `iuroadmap.services/auth/src/modules/iam/dto/role/`. The full rules are in `.claude/rules/backend/03-dto-validation.md`.

## Checklist

- [ ] The folder is `dto/<entity>/`, flat, with an `index.ts` barrel.
- [ ] Filenames are `<entity>-create.request.ts`, `<entity>-update.request.ts`, `<entity>-filter.request.ts`, `<entity>.response.ts`, `<entity>-detail.response.ts`.
- [ ] Class names are `<Entity>CreateRequest`, `…UpdateRequest`, `…FilterRequest`, `<Entity>Response`, `<Entity>DetailResponse`, with no `Dto` suffix.
- [ ] Decorator order is `@ApiProperty` / `@ApiPropertyOptional`, then validators, then `@Type` / `@Transform`.
- [ ] Required fields use `!:`. Optional fields use `?:` + `@IsOptional()`.
- [ ] Every string has `@MaxLength(EntityConstant.X)` (and `@MinLength` where the SRS says so). There are no inline numbers. Missing constants are added to `iuroadmap.services/shared/src/constants/entity.constant.ts` **and** mirrored in `iuroadmap.webapp/packages/core/src/constants/entityConstant.ts`.
- [ ] The update request has `id!: string` with `@IsUUID('4')`, and every other field is optional.
- [ ] The filter request `extends PaginationRequest` and adds `keyword` / `status`. Numbers get `@Type(() => Number)`.
- [ ] Responses are plain declared fields: no constructor, no `@Exclude`, no secrets.

## Legacy migration

When you touch a legacy `*.dto.ts` (in `users/`, `roadmap-service`), rename it to the pattern above, update the imports and the barrel, then run `npm run gen:api`. Warn the user that the generated FE type names will change (for example `DepartmentResponseDto` → `DepartmentResponse`), and grep `iuroadmap.webapp/apps/web/src` for usages.

When you're done, run `npm run gen:api` at the root.
