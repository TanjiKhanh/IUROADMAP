---
name: check-build
description: Type-check / build the IUROADMAP services or web app and report only the errors. Use before committing, when the user says "build", "does it compile", or after non-trivial TypeScript edits.
argument-hint: [service|web|all]
allowed-tools: Bash(npm run build*) Bash(npx tsc *) Bash(npm run typecheck*) Bash(npm run test:unit*)
---

# Build check

| Target | Command (from repo root) |
|---|---|
| One service | `npm run build --prefix iuroadmap.services/<svc>` (`tsc`) |
| Shared lib (build first if it changed) | `npm run build --prefix iuroadmap.services/shared` |
| Web | `npm run build --prefix iuroadmap.webapp/apps/web` |
| api-gen / core | `npm run typecheck --prefix iuroadmap.webapp/packages/<pkg>` |
| Everything | `npm run build` (Turbo) |
| Unit tests for a service | `npm run test:unit --prefix iuroadmap.services/<svc>` |

With no argument, build only the workspaces touched in `git status`.

## Report

Don't paste the raw output. Give:
- ✅/❌ per target
- each error as `file:line`, the TS code and a one-line message, grouped by file (at most ~20)
- the likely root cause if many errors share one (for example an outdated `shared` build or a stale `prisma generate`)

Don't run `lint:fix` or `format`. The user runs formatters manually.
