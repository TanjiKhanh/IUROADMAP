---
paths:
  - "iuroadmap.services/**/*.controller.ts"
  - "iuroadmap.services/**/*.service.ts"
  - "iuroadmap.services/**/*.module.ts"
---

# Controllers & services (master-data pattern)

## Controller: thin and uniform

```ts
@ApiTags('IAM - Roles')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)                 // always both, at class level
@Controller({ path: 'iam/Role', version: '1' }) // → /api/v1/iam/Role/...
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('update')
  @Roles('ADMIN')
  @ApiOperation({ summary: '...' })
  @ApiResponse({ status: 200, type: RoleResponse })
  async update(@Body() dto: RoleUpdateRequest): Promise<RoleResponse> {
    const { id, ...data } = dto;               // the only logic allowed
    return this.rolesService.update(id, data);
  }
}
```

The 6 standard endpoints for master-data CRUD:

| Method | Route | Roles |
|---|---|---|
| POST | `create` | ADMIN |
| POST | `update` (id in body) | ADMIN |
| GET | `getById/:id` | ADMIN, USER |
| GET | `GetByIndex` (paged, `@Query() filter`) | ADMIN, USER |
| GET | `ForDropdown` (`keyword?`, `limit?`) | ADMIN, USER |
| POST | `delete/:id` | ADMIN |

Rules:
- ❌ Don't use `@Put`, `@Patch` or `@Delete`. Mutations are always `POST`.
- ❌ Don't inject `PrismaService` into a controller, and don't put business rules there.
- ❌ Don't use `ClassSerializerInterceptor`, and don't wrap the response by hand (`ResponseInterceptor` already does it).
- Every action gets `@ApiOperation` + `@ApiResponse({ type })`. Params and queries get `@ApiParam` / `@ApiQuery`. Orval's generated hook names come from this Swagger output (`use<Controller>Controller<Method>`).

## Service: talks to Prisma directly (no repository layer)

Methods: `create(dto)`, `update(id, data)`, `findById(id)`, `findAll(filter)`, `getDropdownList(keyword?, limit = 50)`, `delete(id)`.

```ts
async findAll(filter: RoleFilterRequest): Promise<PaginationResponse<RoleResponse>> {
  const res = await getPaginationAsync(this.prisma.role, filter, (f) => {
    const where: any = {};
    if (f.keyword) where.name = { contains: f.keyword, mode: 'insensitive' };
    return where;
  }, { include: { permissions: true } });
  if (res.datas) res.datas = res.datas.map((r: any) => this.toResponse(r));
  return res as any;
}

private toResponse(r: any): RoleResponse { return { id: r.id, name: r.name, description: r.description ?? undefined }; }

private handlePrismaError(error: any, op: string, id?: string): never {
  if (error?.code === 'P2002') throw new ConflictException('Already exists with same unique fields');
  if (error?.code === 'P2025') throw new NotFoundException('Not found');
  if (error?.code === 'P2003') throw new ConflictException('Referenced by other records');
  this.logger.error(`${op} failed: ${error.message}`, error.stack);
  throw error;
}
```

- Wrap every write in `try { ... } catch (e) { this.handlePrismaError(e, 'update', id); }`.
- Map to the response only through `toResponse()`. Never return the raw Prisma record (it would leak `password`, reset tokens, and so on).
- Dropdown: `findMany({ where, select: { id: true, name: true }, take: limit, orderBy: { name: 'asc' } })`, then map to `{ id, label }`.
- Register the controller and service in `<module>.module.ts`, and import that module in `app.module.ts`.
