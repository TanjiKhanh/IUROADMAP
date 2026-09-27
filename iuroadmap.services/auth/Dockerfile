# iuroadmap.services/auth/Dockerfile
# Build context = repository root (npm workspaces: this service + @iuroadmap/shared):
#   docker build -f iuroadmap.services/auth/Dockerfile -t iuroadmap-auth .
# Render dev (render.yaml at the repo root) and Railway production (railway.json here) build it the same way.

FROM node:20-bookworm-slim AS builder
WORKDIR /app
# openssl: Prisma engines; python3/make/g++: native modules (bcrypt) when no prebuilt binary fits
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
# The root "prepare" script runs husky; no git hooks inside the image
ENV HUSKY=0

# Manifests first: the install layer is reused until a package.json or the lockfile changes
COPY package.json package-lock.json ./
COPY iuroadmap.services/shared/package.json iuroadmap.services/shared/
COPY iuroadmap.services/auth/package.json iuroadmap.services/auth/
# This service + @iuroadmap/shared + the root build tools (typescript, tsc-alias)
RUN npm ci --workspace=iuroadmap.services/auth --include-workspace-root --no-audit --no-fund

COPY iuroadmap.services/shared iuroadmap.services/shared
COPY iuroadmap.services/auth iuroadmap.services/auth
WORKDIR /app/iuroadmap.services/auth
RUN npx prisma generate && npm run build:prod

# ---- runtime ----
FROM node:20-bookworm-slim AS runner
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
# node_modules stay complete: the Railway pre-deploy step runs `prisma migrate deploy` (Prisma CLI is a dev dependency)
COPY --from=builder /app /app
WORKDIR /app/iuroadmap.services/auth
USER node
EXPOSE 3000
CMD ["node", "dist/auth/src/main.js"]
