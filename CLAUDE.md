# IUROADMAP — root

AI-powered career roadmap platform (learners, mentors, lecturers, admins). npm workspaces + Turbo monorepo.

| Folder | What | Stack |
|---|---|---|
| [iuroadmap.services/](iuroadmap.services/) | Backend microservices | NestJS + Prisma + PostgreSQL (one DB schema per service), TypeScript strict |
| [iuroadmap.webapp/apps/web/](iuroadmap.webapp/apps/web/) | Web app | React 18 + Vite + Antd (wrapped in `src/uikit`) + TanStack Query + react-hook-form + Zod + React Flow |
| [iuroadmap.webapp/apps/mobile/](iuroadmap.webapp/apps/mobile/) | Mobile app | React Native (early stage) |
| `iuroadmap.webapp/packages/` | `api-gen` (Orval: hooks + models + Zod), `core` (RoutePaths, i18n, constants, menus), `api` (legacy client) | |
| `iuroadmap.webapp/tests/` | Playwright `api/` + `e2e/` suites | |
| [iuroadmap.docs/](iuroadmap.docs/) | SRS, business flows, schema docs | |

## Services

| Service | Port | Owns | Gateway prefixes |
|---|---|---|---|
| `api-gateway` | 8080 | Proxy + JWT check + merged Swagger (`swagger:export`) | — |
| `auth` | 3000 | Login/register, users, IAM (roles, permissions) | `auth`, `iam` |
| `user-service` | 4000 | User profile data | `users` |
| `mentor-service` | 4001 | Mentor profiles, mentor search | `mentors`, `mentor-profiles` |
| `roadmap-service` | 4100 | Departments, majors, courses, roadmap graphs | `roadmaps`, `admin`, `courses`, `departments`, `explore` |
| `shared` | — | `@iuroadmap/shared`: guards, decorators, `PMS`, `AppConstant`, `EntityConstant`, pagination, interceptors | — |

A new controller path prefix must be added to `api-gateway/src/config/routes.config.ts`.

## Rules: loaded automatically by path

The detailed conventions live in `.claude/rules/`, and each file loads only when you work on matching paths:
- `backend/*` for `iuroadmap.services/**`
- `web/*` for `iuroadmap.webapp/**`

## Trust chain

```
NestJS DTO (class-validator + @ApiProperty) → gateway Swagger (npm run gen:spec)
  → packages/api-gen (npm run gen:api → Orval hooks + models + Zod)
    → apps/web: useXxxController* hooks + zodResolver(XxxZod...)
```
The frontend never hand-writes validation or API calls. If a rule is missing, fix the backend DTO, then run `npm run gen:api`.

## Canonical reference modules (copy these)

- **Backend:** `iuroadmap.services/auth/src/modules/iam/` (Role). Legacy, do not copy: `auth/src/modules/users/`, `roadmap-service` `*.dto.ts` files, and the `mentor-service` repository layer.
- **Web:** `iuroadmap.webapp/apps/web/src/views/config/role/` and `config/department/`.

## Business rules = source of truth

Before building or changing a feature, read its requirement file. The index is [functional-requirements.md](iuroadmap.docs/srs/functional-requirements.md). Then follow the BR-* rules in the matching file:

| Area | SRS feature | Business flow |
|---|---|---|
| Auth / RBAC | [FL-AUTH](iuroadmap.docs/srs/features/FL-AUTH-authentication-rbac.md) | [00](iuroadmap.docs/business-flow/00-authentication-rbac.md) |
| Learner portal | [FL-LRN](iuroadmap.docs/srs/features/FL-LRN-learner-portal.md) | [01](iuroadmap.docs/business-flow/01-learner-portal.md) |
| Roadmap mgmt | [FL-RDM](iuroadmap.docs/srs/features/FL-RDM-roadmap-management.md) | [02](iuroadmap.docs/business-flow/02-roadmap-management.md) |
| Lecturer review | [FL-LR](iuroadmap.docs/srs/features/FL-LR-lecturer-review.md) | [03](iuroadmap.docs/business-flow/03-lecturer-review.md) |
| Admin config | [FL-CFG](iuroadmap.docs/srs/features/FL-CFG-admin-configuration.md) | [04](iuroadmap.docs/business-flow/04-admin-configuration.md) |
| Mentor portal | [FL-MNT](iuroadmap.docs/srs/features/FL-MNT-mentor-portal.md) | [05](iuroadmap.docs/business-flow/05-mentor-portal.md) |
| AI chatbot (RAG) | [FL-RAG](iuroadmap.docs/srs/features/FL-RAG-ai-chatbot.md) | — |

DB schema docs are in `iuroadmap.docs/schema/<area>-schema.md`. Read only the file for the area you are touching.

Roadmap and learner work follows **Roadmap v2**: semester lanes, curriculum versions, student overlay and grades. Read [roadmap-v2-design.md](iuroadmap.docs/architecture/roadmap-v2-design.md) before changing `roadmap-service`, `views/roadmap/` or `views/config/roadmap/`.

## Commands (root)

- `npm run dev`: all services + web (Turbo). `npm run web:dev`: web only.
- `npm run gen:api`: export gateway Swagger, then regenerate `@iuroadmap/api-gen`.
- `npm run build` / `npm run lint`
- Per service (`cd iuroadmap.services/<svc>`): `npm run start:dev`, `npm run build`, `npm run test:unit` (`*.unit.spec.ts`), `npx prisma migrate dev --name <Name>`
- Playwright (`cd iuroadmap.webapp/tests`): `npm run test:api`, `npm run test:e2e`

## General conventions

- Do NOT auto-run formatters or `lint:fix`; the user runs them manually.
- UI strings go through i18n (`t('key.path')` from `hooks/useTranslation`, locales in `packages/core/src/i18n/locales`). Never hardcode EN/VI text in components.
- Never hardcode lengths or role names. Use `EntityConstant` / `AppConstant` from `@iuroadmap/shared`.
- `agent/` and `.agents/` hold the same conventions for other AI tools (Antigravity / BMAD). `.claude/` is the Claude copy, so keep them in sync when a convention changes.
