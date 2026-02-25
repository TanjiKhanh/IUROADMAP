(#) GupJob — Project Conventions

Purpose
- Provide concise, enforceable conventions for branches, commits, PRs, README/docs, and repository layout so CI/CD and teams operate consistently.

1) Branch Naming
- Format: `<type>/<module>/<ticket?-short-desc>`
	- `type`: feature | bugfix | hotfix | infra | test
	- `module`: mentor | learner | auth | core | api-gateway | infra (use service folder names)
	- `ticket?`: optional tracker/issue id (GJ-123)
	- `short-desc`: lowercase, hyphen-separated, meaningful

Examples:
- `feature/mentor/GJ-123-be-registration-api`
- `feature/mentor/fe-registration-form`
- `bugfix/learner/GJ-456-fix-search-lag`
- `infra/pipeline/azure-ci-setup`

Guidelines:
- Branch from `main` for features; branch from `release/x.y` for release fixes.  
- Keep branches focused and short-lived (< 2 weeks recommended).  
- Rebase or squash as your team prefers before merging to reduce noise.

2) Commit Messages
- Use Conventional Commits: `<type>(<scope>): <short summary>`
	- Types: feat, fix, chore, docs, style, refactor, perf, test, build, ci
	- Scope: optional, use module/service name
	- Body: optional longer description (wrap at 72 chars)
	- Footer: references (e.g., `Closes GJ-123`) and BREAKING CHANGES

Example:
```
feat(auth): add jwt refresh token endpoint (GJ-789)

Add server-side refresh token storage and rotate on login.

Closes GJ-789
```

3) Pull Requests
- PR Title: begin with branch context and short summary
	- Example: `[feature/mentor] BE-registration-api — Add registration endpoint (GJ-123)`
- PR Body must include: summary, testing steps, DB/migration notes, rollback steps, linked tickets
- Checklist (enforced in template): tests added / docs updated / migrations listed / CI green / 1-2 approvals
- Merge strategy: Squash-and-merge to `main` unless the team requires merge commits. Protect `main` with required status checks and reviews.

4) Release & Hotfixes
- Release branches: `release/x.y` for preparing releases. Tag releases `vX.Y.Z`.  
- Hotfixes: `hotfix/<ticket>-short-desc` branch, merged to `main` and `release/*` as needed.

5) README & Docs Conventions
- Files and locations:
	- Root: `README.md` — high-level quick-start and links.  
	- Service: `services/<service>/README.md` — concise run/test/build instructions for that service.  
	- Dev: `services/<service>/README-DEV.md` — developer-specific instructions (hot-reload, mounts, env).
	- ADRs: `docs/adrs/0001-*.md` (numbered).  
	- API contracts: `packages/contracts/openapi/`
- README structure (required sections in order):
	1. Title + 1-line summary
	2. Badges / Status (CI) — optional
	3. Quick Start (3 copy-pastable commands)
	4. Local Dev (env, ports, host.docker.internal guidance)
	5. Key Commands (start/test/build/migrate/seed)
	6. Migrations & Seeds
	7. Testing
	8. Troubleshooting
	9. Links (ADRs, API docs)

Formatting rules:
- Use imperative voice; keep examples copy/paste-ready.  
- Include both Bash and PowerShell snippets only when necessary.  
- Never include secrets—link to `.env.example` instead.

6) File & Repo Layout Conventions
- Service folders live under `services/<service-name>/`. Each service should include:
	- `README.md` and `README-DEV.md` (developer tips)
	- `Dockerfile`, `package.json`, `src/`, and `prisma/` if using Prisma
- Shared code: `libs/` or `packages/` (use workspace package manager config)
- Infrastructure: `infra/`, `helm/`, `k8s/` as appropriate

7) CI / Pipeline Triggers
- Scope CI jobs by branch patterns:
	- Frontend tests: `feature/*/FE-*` or `feature/*/fe-*`
	- Backend tests: `feature/*/BE-*` or `feature/*/be-*`
	- Infra jobs: `infra/*`
- Require fast checks on all PRs (lint, unit tests); run heavy e2e on release/main or scheduled runs.

8) Templates to add (recommended)
- `.github/PULL_REQUEST_TEMPLATE.md` — enforce PR checklist.  
- `.github/ISSUE_TEMPLATE/bug_report.md` and `feature_request.md`.  
- `CONTRIBUTING.md` — how to contribute, branch rules, commit style, PR expectations.  
- `CODEOWNERS` — map teams to paths.

9) Security & Secrets
- Never store secrets in repo or README. Use `.env.example` with placeholders.  
- Document where secrets live (Azure Key Vault, GitHub Secrets, etc.) in `docs/`.

10) Onboarding checklist (add to `CONTRIBUTING.md`)
- Install Node/Docker/Git  
- Copy `.env.example` → `.env`  
- Start infra: `docker compose up -d --build`  
- Run migrations/seeds for services used  
- Run unit tests for primary services

---

If you want, I can also add the recommended templates: `CONTRIBUTING.md`, `.github/PULL_REQUEST_TEMPLATE.md`, and a sample `services/auth/README-DEV.md`. Tell me which ones to create and I will add them.

