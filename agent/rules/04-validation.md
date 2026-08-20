# 04 - Validation

## Overview
All API validation is performed using `class-validator` + `class-transformer` via the global `CustomValidationPipe` from `@iuroadmap/shared`.

## Source of Truth
The DTO class is the single source of truth for:
- Runtime validation rules (`class-validator` decorators)
- Swagger API documentation (`@nestjs/swagger` decorators)
- TypeScript type safety

## Rules

### 1. Strict TypeScript Initialization
Properties MUST use non-null assertion (`!:`) for required fields:
```typescript
@ApiProperty({ description: 'Role Name', example: 'ADMIN' })
@IsString()
@IsNotEmpty()
@MaxLength(255)
name!: string;
```

### 2. Decorator Ordering
Order decorators consistently:
1. **Swagger** first — `@ApiProperty()` / `@ApiPropertyOptional()`
2. **Validators** — `@IsString()`, `@IsNotEmpty()`, `@MaxLength()`
3. **Transformers** — `@Type(() => Number)`, `@Transform()`

### 3. Required vs Optional
- Required: `@ApiProperty()` + validators
- Optional: `@ApiPropertyOptional()` + `@IsOptional()` + validators

```typescript
@ApiPropertyOptional({ description: 'Description' })
@IsString()
@IsOptional()
@MaxLength(500)
description?: string;
```

### 4. Arrays with UUID validation
```typescript
@ApiPropertyOptional({ description: 'Permission IDs', type: [String] })
@IsArray()
@IsUUID('4', { each: true })
@IsOptional()
permissionIds?: string[];
```

### 5. Pagination Filters
The base `PaginationRequest` from `@iuroadmap/shared` only contains `rowsPerPage` and `currentPage`.
Domain-specific filters (like `keyword`, `status`) must be added in the extended class. **Do NOT add `keyword` to the base `PaginationRequest`**, because not every entity is searchable by keyword.

```typescript
import { PaginationRequest } from '@iuroadmap/shared';

export class RoleFilterRequest extends PaginationRequest {
  @ApiPropertyOptional({ description: 'Search keyword' })
  @IsOptional()
  @IsString()
  keyword?: string;
}
```

### 6. Business Invariants
- Boundary validation (format, length, required) → DTO layer via decorators
- Business rules requiring database state (e.g., email uniqueness, role exists) → Service layer, throwing `ConflictException`, `NotFoundException`, etc.
