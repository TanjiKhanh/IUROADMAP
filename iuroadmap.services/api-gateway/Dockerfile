# iuroadmap.services/api-gateway/Dockerfile
# Build context = repository root (npm workspaces: this service + @iuroadmap/shared):
#   docker build -f iuroadmap.services/api-gateway/Dockerfile -t iuroadmap-api-gateway .
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
COPY iuroadmap.services/api-gateway/package.json iuroadmap.services/api-gateway/
# This service + @iuroadmap/shared + the root build tools (typescript, tsc-alias)
RUN npm ci --workspace=iuroadmap.services/api-gateway --include-workspace-root --no-audit --no-fund

COPY iuroadmap.services/shared iuroadmap.services/shared
COPY iuroadmap.services/api-gateway iuroadmap.services/api-gateway
WORKDIR /app/iuroadmap.services/api-gateway
RUN npm run build:prod

# ---- runtime ----
FROM node:20-bookworm-slim AS runner
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
# node_modules stay complete (the compiled code requires them at runtime)
COPY --from=builder /app /app
WORKDIR /app/iuroadmap.services/api-gateway
USER node
EXPOSE 8080
CMD ["node", "dist/api-gateway/src/main.js"]
