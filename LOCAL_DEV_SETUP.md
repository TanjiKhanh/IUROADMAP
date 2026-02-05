# GupJob — Local Development README

Last updated: 2026-02-05

This README describes how to run the GupJob local development stack, how the repo is organized, and step-by-step commands for common tasks (start/stop, migrations, troubleshooting, QA/UAT). The goal is a one-command start for developers: `./run.sh up` (or `make up`).

---

## Table of contents

- Overview
- Prerequisites
- Repository layout
- Environment variables
- Quick start (one-click)
  - Option A: macOS / Linux (recommended)
  - Option B: Windows (PowerShell)
  - Option C: Manual (docker-compose)
- Services & ports
- Migrations & seeds
- Health check
- Common commands
- Troubleshooting
- QA / BA UAT checklist
- Next steps & useful resources
- Contact / support

---

## Overview

GupJob is a microservice-based web application (Auth, Admin, Mentorship, API Gateway, etc.). This repository contains a local development docker-compose configuration and a helper script (`run.sh`) so you can start the stack quickly for development and testing.

The development stack uses:
- PostgreSQL
- Redis
- Node.js services (NestJS / Express / Prisma typical layout)
- Adminer for DB browsing

---

# LOCAL DEV SETUP — GupJob

Last updated: 2026-02-05

This file explains how to get the full GupJob development environment running locally, how to run individual services for development, run migrations and seeds, and common troubleshooting steps.

If you prefer one-click scripts, see `run-all.ps1` (Windows) or `scripts/setup-local.sh` (Linux/macOS) — both can be created or extended from this guide.

---

## Quick summary (recommended)

- Install prerequisites (Node 18+, Docker Desktop, Git).  
- Copy `.env.example` -> `.env` and adjust secrets.  
- Start infra + services with Docker Compose: `docker compose up -d --build`.  
- Run Prisma migrations and seeds for services with `prisma` folders.  

---

## Prerequisites

- Node.js 18 or newer (LTS recommended).  
- npm or pnpm (pnpm recommended for monorepos but npm works).  
- Docker Desktop (Linux: Docker Engine + docker-compose plugin).  
- Git.  
- (Optional) WSL2 on Windows for running `./run.sh` or shell helpers.

Confirm versions (example):

```powershell
node -v
npm -v
docker --version
docker compose version
```

---

## Repo layout highlights

- Root: `docker-compose.yml`, `run-all.ps1`, `run.sh` (if present).  
- `services/`: each microservice (auth, user-service, admin-service, api-gateway, etc.).  
- `scripts/`: helpers and seeds (see `scripts/seed/` for example).  
- `libs/` or `packages/`: shared code/contracts used by services.

Work from the repository root for compose-based commands, or `infra/` if your compose files are inside that folder.

---

## Environment variables

Copy the example and edit.

```bash
cp .env.example .env
# or on Windows PowerShell
Copy-Item .env.example .env
```

Essential values to check:

- `DATABASE_URL` (Postgres connection string)  
- `REDIS_URL` or `REDIS_HOST/REDIS_PORT`  
- JWT secrets used by auth  
- Service `PORT` overrides (if needed)

Keep `.env` out of VCS. Use `.env.local` or environment-specific secrets in CI/CD.

---

## Start the full stack (Docker Compose)

From repo root (or `infra/` if compose is located there):

```bash
# Linux / macOS / WSL
docker compose up -d --build

# Windows PowerShell (Docker Desktop)
docker compose up -d --build
```

What this typically provides: Postgres, Redis, Adminer (DB GUI), and built service images for local development.

Check containers:

```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

Stop and remove:

```bash
docker compose down --volumes --remove-orphans
```

Rebuild (clean):

```bash
docker compose up -d --build --force-recreate
```

---

## Run a single service locally (fast dev loop)

If you want to run a service (e.g., `services/auth`) on your host with hot reload:

```bash
cd services/auth
npm install         # or pnpm install
cp .env.example .env  # then edit to point to local DB (e.g. host=host.docker.internal on Mac/Windows)

# generate prisma client if this service uses Prisma
npm run prisma:generate

# start in development (example scripts vary by service)
npm run start:dev
```

Notes:
- When running services on the host and Postgres + Redis are in Docker, use `host.docker.internal` (macOS/Windows) or the Docker network host for Linux.
- Ensure ports used by the service do not conflict with other local processes.

---

## Migrations & seeds (Prisma example)

For each service that uses Prisma (check `prisma/` folder):

```bash
cd services/<service>
npx prisma generate
npx prisma migrate dev --name init   # local dev migrations
# or for CI / production: npx prisma migrate deploy

# Run seeds (if the repo includes TS/JS seeds)
npx ts-node --esm scripts/seed/seed-users.ts
```

You can also run migrations inside a container if the image includes the needed dev tools:

```bash
docker compose exec <service> sh -c "npx prisma migrate deploy"
```

---

## Seed helpers

This repo contains `scripts/seed/seed-users.ts` — run it via `npx ts-node` or add an npm script `npm run seed` that invokes it. Example:

```bash
# from repo root
npx ts-node ./scripts/seed/seed-users.ts --env .env
```

Adjust flags or environment as required by the seed implementation.

---

## Useful commands (summary)

- Start full stack: `docker compose up -d --build`  
- Stop full stack: `docker compose down --volumes`  
- Rebuild service images: `docker compose up -d --build --force-recreate`  
- Run a service locally: `cd services/<svc> && npm install && npm run start:dev`  
- Run migrations: `npx prisma migrate dev` (inside service)  
- Generate Prisma client: `npx prisma generate`  
- Run seeds: `npx ts-node scripts/seed/seed-users.ts`

If you use a package manager workspace (pnpm/npm workspaces), you can run scripts across the repo using workspace flags.

---

## Ports (common defaults)

- API Gateway: 8080  
- Auth Service: 3000  
- Admin Service: 4100  
- Adminer (DB GUI): 8081  
- Postgres: 5432  
- Redis: 6379

Check `docker compose ps` for the exact ports mapped locally.

---

## Troubleshooting

- DB connection refused: ensure Postgres container is healthy (`docker logs <pg-container>`).  
- Wrong DB host from host-run services: use `host.docker.internal` (macOS/Windows) or expose Postgres port and use `localhost`.  
- Prisma: if "client not generated" run `npx prisma generate` and restart service.  
- Port collision: change service `PORT` env var or stop conflicting process.  

If logs show uncaught errors, run the service locally with `DEBUG=*` or check container logs with `docker compose logs <service>`.

---

## Running tests

- Unit / service tests: `cd services/<service> && npm test`  
- Contract tests or Postman collections can be run from `tests/contract-tests` (use Postman/newman).  
- E2E tests (if present): run from `tests/e2e` with the configured test runner.

Example (newman):

```bash
# install newman globally or use npx
npx newman run tests/contract-tests/GUPJOB_Full_Test.postman_collection.json
```

---

## Recommended next automation tasks (optional)

- Create `scripts/setup-local.sh` and `run-all.ps1` that: copy `.env`, start compose, wait for DB, run migrations, run seed.  
- Add `Makefile` targets for convenience (make up/down/logs/seed).  
- Add a lightweight `README-DEV.md` in each service with service-specific run commands.

---

## Contacts & help

If you'd like, I can:
- Generate `scripts/setup-local.sh` and `run-all.ps1` that implement the steps above.  
- Add `Makefile` targets and a `README-DEV.md` for each service.  
- Create a `docker-compose.override.yml` tailored for dev (volumes + local mounts).  

Tell me which of the above you'd like next and I'll create it.
