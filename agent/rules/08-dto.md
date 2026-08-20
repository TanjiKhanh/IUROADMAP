---
description: "DTO formatting and structuring rules"
globs: ["**/*.request.ts", "**/*.response.ts"]
---

# 08 - DTO Guidelines (Master Data Pattern)

## Reference Implementation
**Folder**: `services/auth/src/modules/iam/dto/role/`

## File Structure & Organization

### 1. Feature-Based Flat Folders
Group all DTOs for one entity in a single flat folder:
```
dto/
  role/
    index.ts                    ← Barrel exports
    role-create.request.ts      ← Create DTO
    role-update.request.ts      ← Update DTO
    role-filter.request.ts      ← Filter/pagination DTO
    role.response.ts            ← List/simple response
    role-detail.response.ts     ← Detail response (with relations)
```

### 2. DO NOT create nested subfolders
```
❌ dto/role/requests/            ← WRONG
❌ dto/role/responses/           ← WRONG
❌ dto/requests/                 ← WRONG
❌ dto/responses/                ← WRONG
```

### 3. One Class Per File

### 4. Barrel Exports (`index.ts`)
```typescript
export * from './role-create.request';
export * from './role-update.request';
export * from './role-filter.request';
export * from './role.response';
export * from './role-detail.response';
```

## Naming Conventions

### File Names
| Type | Pattern | Example |
|------|---------|---------|
| Create Request | `<feature>-create.request.ts` | `role-create.request.ts` |
| Update Request | `<feature>-update.request.ts` | `role-update.request.ts` |
| Filter Request | `<feature>-filter.request.ts` | `role-filter.request.ts` |
| List Response | `<feature>.response.ts` | `role.response.ts` |
| Detail Response | `<feature>-detail.response.ts` | `role-detail.response.ts` |

### Class Names
| Type | Pattern | Example |
|------|---------|---------|
| Create Request | `[Feature]CreateRequest` | `RoleCreateRequest` |
| Update Request | `[Feature]UpdateRequest` | `RoleUpdateRequest` |
| Filter Request | `[Feature]FilterRequest` | `RoleFilterRequest` |
| List Response | `[Feature]Response` | `RoleResponse` |
| Detail Response | `[Feature]DetailResponse` | `RoleDetailResponse` |

> ⚠️ Do NOT append `Dto` suffix. Use `Request`/`Response` suffix only.

## DTO Templates

### Create Request
```typescript
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class RoleCreateRequest {
  @ApiProperty({ description: 'Name of the role', example: 'ADMIN' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiPropertyOptional({ description: 'Description' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}
```

### Update Request (MUST include `id`)
```typescript
export class RoleUpdateRequest {
  @ApiProperty({ description: 'Record ID to update' })
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;

  // ... same fields as Create but all optional except id
}
```

### Filter Request (extends `PaginationRequest`)
```typescript
import { PaginationRequest } from '@iuroadmap/shared';

export class RoleFilterRequest extends PaginationRequest {
  @ApiPropertyOptional({ description: 'Search keyword' })
  @IsOptional()
  @IsString()
  keyword?: string;
}
```

### Response (plain property mapping, NO constructor)
```typescript
export class RoleResponse {
  @ApiProperty({ description: 'Role ID' })
  id!: string;

  @ApiProperty({ description: 'Role Name' })
  name!: string;

  @ApiPropertyOptional({ description: 'Role Description' })
  description?: string;
}
```

## Anti-Patterns
- ❌ Do NOT use `.dto.ts` suffix → use `.request.ts` / `.response.ts`
- ❌ Do NOT use constructor-based mapping (`new UserResponseDto(user)`) → use `toResponse()` in service
- ❌ Do NOT use `@Exclude()` from `class-transformer` → return only the fields you declare in the Response class
- ❌ Do NOT create `requests/` and `responses/` subfolders → flat folder per entity
