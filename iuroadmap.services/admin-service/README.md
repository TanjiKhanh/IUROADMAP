# Roadmap Module (admin-service)

This module implements the master Roadmap feature (CRUD for master roadmaps + nodes & edges).
It includes a small set of common helpers and guards used by admin controllers.

Contents:
- src/modules/roadmap: module, controller, service, repository, DTOs
- src/common: guards and decorators (AuthGuard, RolesGuard, @Roles, @CurrentUser)
- src/utils/slug.ts: shared makeSlug utility
- Dockerfile: example container image for the NestJS service

Prerequisites
- Node 18+
- npm
- Postgres (for local dev you can use docker-compose)
- Prisma (if you use Prisma for DB access)

Important env variables
- JWT_SECRET - secret for JWT verification used by AuthGuard
- ADMIN_DATABASE_URL (or DATABASE_URL) - Postgres connection string for admin DB
- PORT - service port (default in examples: 4100)

Quick start (local - dev)

1. Install dependencies
   cd services/admin-service
   npm ci

2. Configure env
   Copy `.env.example` or create `.env` with:
   ```
   DATABASE_URL="postgresql://dev:dev@localhost:5432/gupjob_admin"
   JWT_SECRET="supersecret_dev_key"
   PORT=4100
   NODE_ENV=development
   ```
   Make sure the database exists, or create it.

3. Prisma (if using)
   Generate client and create migrations (run per service)
   ```
   npx prisma generate
   npx prisma migrate dev --name init
   ```
   For CI/production use `npx prisma migrate deploy` to apply existing migrations.

4. Run service (dev)
   ```
   npm run start:dev
   ```
   or build & run
   ```
   npm run build
   node dist/main.js
   ```

Using the guards & decorators
- The AuthGuard provided here is a minimal JWT verifier. It expects Authorization: Bearer <token> and verifies the token using JWT_SECRET.
- The RolesGuard checks for roles metadata set by `@Roles(...)`. Example:
  ```ts
  @Controller('admin/roadmaps')
  @UseGuards(AuthGuard, RolesGuard)
  export class RoadmapController {
    @Post()
    @Roles('ADMIN')
    create(...) { ... }
  }
  ```
- Use `@CurrentUser()` in controllers to get the decoded JWT payload (e.g., `{ id, email, role }`).

Utility: makeSlug
- Import and use `makeSlug()` to generate safe slugs from titles or names. It normalizes, removes diacritics, replaces non-alnum with `-`, trims, and limits length.

Docker
- Build image:
  ```
  docker build -t gupjob-admin-service .
  ```
- Run container (example):
  ```
  docker run --env-file .env -p 4100:4100 gupjob-admin-service
  ```

Development tips & safety
- Ensure each microservice runs migrations against its intended DATABASE_URL. Accidentally running migrations against the wrong DB will modify or drop tables.
- For local dev you can host multiple logical databases on one Postgres instance (create db `gupjob_admin`, `gupjob_user`, `gupjob_mentor`) or run multiple Postgres containers and map host ports.
- Prefer `prisma migrate dev` while developing and `prisma migrate deploy` in CI/production.
- For production use proper auth (Passport strategy) and avoid printing secrets to logs.

Example endpoints (roadmap admin)
- POST /admin/roadmaps
  - Body: { title, slug?, description?, courseId?, structure?, nodes?:[], edges?:[] }
  - Creates roadmap + nodes + edges in a DB transaction.
- GET /admin/roadmaps
  - List master roadmaps
- GET /admin/roadmaps/:slug
  - Get roadmap with nodes and edges
- PATCH /admin/roadmaps/:id
  - Update basic fields and optionally replace nodes/edges
- DELETE /admin/roadmaps/:id
  - Delete roadmap (cascades nodes & edges)

Example cURL (create):
```bash
curl -X POST http://localhost:4100/admin/roadmaps \
  -H "Authorization: Bearer <ADMIN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "frontend-developer",
    "title": "Frontend Developer",
    "description": "Master frontend roadmap",
    "nodes": [
      {"nodeKey": "html-css", "title": "HTML & CSS"},
      {"nodeKey": "javascript", "title": "JavaScript"}
    ],
    "edges": [
      {"sourceKey":"html-css", "targetKey":"javascript"}
    ]
  }'
```

If you need
- a full Passport/JWT integration example,
- ready-to-run docker-compose for multi-db local dev,
- seed scripts to populate sample departments/courses/roadmaps,

tell me which one and I will generate it.
```