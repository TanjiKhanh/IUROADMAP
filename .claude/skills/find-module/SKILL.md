---
name: find-module
description: Resolve an IUROADMAP feature name (auth, iam/role, user, department, major, course, roadmap, mentor, lecturer review, chatbot) to every path across the stack — requirement docs, owning service, controller/service/DTO/Prisma model, gateway prefix, api-gen hooks, web views, routes, tests. Use when the user asks "where is X", "trace X", or before changing a feature.
argument-hint: [feature]
---

# Locate a feature across the stack

| Feature | Docs | Service → module | Gateway prefix | Web views |
|---|---|---|---|---|
| Auth (login/register/reset) | FL-AUTH, flow 00 | `auth` → `modules/authentication/` | `auth` | `views/public/` |
| Role / Permission | FL-AUTH, FL-CFG | `auth` → `modules/iam/` ✅ reference | `iam` | `views/config/role/` |
| User (admin) | FL-CFG, flow 04 | `auth` → `modules/users/` (legacy) + `user-service` | `iam`/`users` | `views/config/user/` |
| Department | FL-CFG, FL-RDM | `roadmap-service` → `modules/roadmap/` (departments.*) | `departments` | `views/config/department/` |
| Major | FL-RDM | `roadmap-service` → `management.controller.ts` + `majors.service.ts` | `admin`/`roadmaps` | `views/config/major/` |
| Roadmap graph / courses / topics | FL-RDM, flow 02 | `roadmap-service` → `major_roadmaps`, `course_roadmap`, `topics_roadmap` | `admin`, `roadmaps`, `courses` | `views/roadmap/`, `views/config/roadmap/` |
| Explore / learner | FL-LRN, flow 01 | `roadmap-service` (`explore`), `user-service` | `explore`, `users` | `views/explore/`, `views/learner/`, `views/my-courses/` |
| Mentor | FL-MNT, flow 05 | `mentor-service` → `mentor-profile/`, `mentor-search/` | `mentors`, `mentor-profiles` | `views/mentor/`, `views/learner/FindMentors.tsx` |
| Lecturer review | FL-LR, flow 03 | (not built yet; schema in `lecturer-review-schema.md`) | — | — |
| AI chatbot (RAG) | FL-RAG, `prd-ai-chatbot-rag.md` | (not built yet; `rag-schema.md`) | — | — |

Paths are relative to: services → `iuroadmap.services/<svc>/src/`; web → `iuroadmap.webapp/apps/web/src/`; docs → `iuroadmap.docs/srs/features/` and `iuroadmap.docs/business-flow/`.

## Procedure

1. Map the argument to a row. If it's ambiguous, ask.
2. Verify the paths with Glob. The code moves, so treat this table as a hint.
3. Also locate: the Prisma model (`<svc>/prisma/schema.prisma`), the generated hooks (grep `packages/api-gen/src/generated` for the controller name), `RoutePaths` in `packages/core/src/constants/routes.ts`, and tests in `iuroadmap.webapp/tests/{api,e2e/specs}/`.
4. Reply with a compact path list. Don't dump file contents.
