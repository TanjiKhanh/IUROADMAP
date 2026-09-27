---
paths:
  - "iuroadmap.services/**/dto/**"
  - "iuroadmap.services/**/*.request.ts"
  - "iuroadmap.services/**/*.response.ts"
  - "iuroadmap.services/shared/src/constants/**"
---

# DTOs & validation

The DTO is the single source of truth for runtime validation (`class-validator`), Swagger, and therefore the FE's generated Zod schemas.

## Files: one flat folder per entity

```
dto/role/
  index.ts                 # barrel: export * from './role-create.request'; ...
  role-create.request.ts   # RoleCreateRequest
  role-update.request.ts   # RoleUpdateRequest (must include id)
  role-filter.request.ts   # RoleFilterRequest extends PaginationRequest
  role.response.ts         # RoleResponse
  role-detail.response.ts  # RoleDetailResponse
```

- ❌ No `requests/` or `responses/` subfolders, no `.dto.ts` suffix, no `Dto` class suffix. Use the `Request` / `Response` suffixes.
- One class per file.

## Decorators

The order is always Swagger → validators → transformers. Required fields use `!:`.

```ts
@ApiProperty({ description: 'Role name', example: 'ADMIN' })
@IsString() @IsNotEmpty() @MaxLength(EntityConstant.ShortString)
name!: string;

@ApiPropertyOptional({ description: 'Description' })
@IsString() @IsOptional() @MaxLength(EntityConstant.DescriptionShort)
description?: string;

@ApiPropertyOptional({ type: [String] })
@IsArray() @IsUUID('4', { each: true }) @IsOptional()
permissionIds?: string[];
```

- Every string gets a `@MaxLength(EntityConstant.X)`. **Never use inline numbers.** If a constant is missing, add it to `shared/src/constants/entity.constant.ts`.
- Update requests have `@ApiProperty() @IsString() @IsNotEmpty() @IsUUID('4') id!: string;`, and every other field is optional.
- Filter requests extend `PaginationRequest` (which has only `rowsPerPage` and `currentPage`) and add `keyword` or `status` there. Never add these to the base class.
- Numeric query params need `@Type(() => Number)`.
- Response classes contain plain `@ApiProperty` fields only. No constructor, no `@Exclude()`, and only safe fields (no `password`).

After you change a DTO, run `npm run gen:api` (root) so the web app's hooks and Zod schemas pick it up.
