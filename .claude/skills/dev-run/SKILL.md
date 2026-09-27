---
name: dev-run
description: Start IUROADMAP services and/or the web app locally (Turbo dev, ports, Swagger URLs) and diagnose startup failures.
disable-model-invocation: true
argument-hint: [all|web|<service>]
---

# Run locally

| Target | Command (root) | URL |
|---|---|---|
| all | `npm run dev` | — |
| web | `npm run web:dev` | Vite prints the URL (default http://localhost:5173) |
| api-gateway | `npm run start:dev --prefix iuroadmap.services/api-gateway` | http://localhost:8080 |
| auth | `npm run start:dev --prefix iuroadmap.services/auth` | http://localhost:3000/docs |
| user-service | `… user-service` | :4000 |
| mentor-service | `… mentor-service` | :4001 |
| roadmap-service | `… roadmap-service` | :4100 |

Run it with `run_in_background: true`, then watch the first lines of output for errors.

## If startup fails

- Missing `.env` / `*_DATABASE_URL` → check the root `.env` and `docker-compose.yml` (Postgres).
- `@prisma/client did not initialize` → `npx prisma generate` in that service.
- `Cannot find module '@iuroadmap/shared'` → `npm run build --prefix iuroadmap.services/shared`.
- Port in use → `netstat -ano | findstr :<port>`.
