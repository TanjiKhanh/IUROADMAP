# 06 - Services (Master Data Pattern)

## Overview
Services encapsulate all business logic. They interact directly with `PrismaService` — no repository layer.

## Reference Implementation
**File**: `services/auth/src/modules/iam/services/roles.service.ts`

## Standard Methods
Every master data service SHOULD provide:

| Method | Purpose |
|--------|---------|
| `create(dto)` | Create record, return `Response` |
| `update(id, data)` | Update record, return `Response` |
| `findById(id)` | Get single record (with relations if needed) |
| `findAll(filter)` | Paginated list via `getPaginationAsync()` |
| `getDropdownList(keyword?, limit?)` | Lightweight `DropdownItemDto[]` |
| `delete(id)` | Delete record (hard or soft per entity rules) |

## Pagination Pattern
Use `getPaginationAsync` from `@iuroadmap/shared`:
```typescript
import { getPaginationAsync, PaginationResponse } from '@iuroadmap/shared';

async findAll(filter: RoleFilterRequest): Promise<PaginationResponse<RoleResponse>> {
  const response = await getPaginationAsync(this.prisma.role, filter, (f) => {
    const where: any = {};
    if (f.keyword) {
      where.name = { contains: f.keyword, mode: 'insensitive' };
    }
    return where;
  }, {
    include: { permissions: true }
  });

  if (response.datas) {
    response.datas = response.datas.map((record: any) => this.toResponse(record));
  }
  return response as any;
}
```

## Dropdown Pattern
```typescript
async getDropdownList(keyword?: string, limit = 50): Promise<DropdownItemDto[]> {
  const where: any = {};
  if (keyword) {
    where.name = { contains: keyword, mode: 'insensitive' };
  }
  const records = await this.prisma.role.findMany({
    where,
    select: { id: true, name: true },
    take: limit,
    orderBy: { name: 'asc' },
  });
  return records.map((r) => ({ id: r.id, label: r.name }));
}
```

## Error Handling Pattern
Use private helper method for consistent Prisma error handling:
```typescript
private handlePrismaError(error: any, operation: string, id?: string): never {
  if (error?.code === 'P2002') throw new ConflictException('Already exists with same unique fields');
  if (error?.code === 'P2025') throw new NotFoundException('Not found');
  if (error?.code === 'P2003') throw new ConflictException('Referenced by other records');
  this.logger.error(`${operation} failed: ${error.message}`, error.stack);
  throw error;
}
```

## Response Mapping Pattern
Use private `toResponse()` for clean DTO mapping:
```typescript
private toResponse(record: any): RoleResponse {
  return {
    id: record.id,
    name: record.name,
    description: record.description ?? undefined,
    permissionIds: record.permissions?.map((p: any) => p.id) ?? [],
  };
}
```

## Anti-Patterns
- ❌ Do NOT create a separate Repository class — service talks to Prisma directly
- ❌ Do NOT use `ClassSerializerInterceptor` or constructor-based DTO mapping
- ❌ Do NOT strip passwords manually — use proper Response DTOs that only declare safe fields
