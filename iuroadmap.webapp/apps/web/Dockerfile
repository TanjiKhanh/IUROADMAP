# iuroadmap.webapp/apps/web/Dockerfile
# Build context = repository root (npm workspaces: web + @iuroadmap/core, api-gen, shared):
#   docker build -f iuroadmap.webapp/apps/web/Dockerfile -t iuroadmap-web .
# Static build served by nginx on port 8080. The app calls the API on its own origin (/api), which the
# Kubernetes Ingress routes to api-gateway (iuroadmap.infra/kubernetes/base/ingress.yaml).

FROM node:20-bookworm-slim AS builder
WORKDIR /app
# The root "prepare" script runs husky; no git hooks inside the image
ENV HUSKY=0

# Manifests first: the install layer is reused until a package.json or the lockfile changes
COPY package.json package-lock.json ./
COPY iuroadmap.webapp/apps/web/package.json iuroadmap.webapp/apps/web/
COPY iuroadmap.webapp/packages/core/package.json iuroadmap.webapp/packages/core/
COPY iuroadmap.webapp/packages/api-gen/package.json iuroadmap.webapp/packages/api-gen/
COPY iuroadmap.services/shared/package.json iuroadmap.services/shared/
# @iuroadmap/shared: the web app imports its dependency-free roadmap-engine / constants subpaths
RUN npm ci --include-workspace-root --no-audit --no-fund \
  --workspace=iuroadmap.webapp/apps/web \
  --workspace=iuroadmap.webapp/packages/core \
  --workspace=iuroadmap.webapp/packages/api-gen \
  --workspace=iuroadmap.services/shared

COPY iuroadmap.services/shared iuroadmap.services/shared
COPY iuroadmap.webapp/packages/core iuroadmap.webapp/packages/core
COPY iuroadmap.webapp/packages/api-gen iuroadmap.webapp/packages/api-gen
COPY iuroadmap.webapp/apps/web iuroadmap.webapp/apps/web

# Vite inlines VITE_* at build time. An empty VITE_API_BASE_URL keeps API calls on the same origin.
ARG VITE_API_BASE_URL=""
ARG VITE_GOOGLE_CLIENT_ID=""
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
# @iuroadmap/core is consumed from its dist/
RUN npm run build --workspace=@iuroadmap/core \
  && npm run build --workspace=iuroadmap.web

# ---- runtime ----
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runner
COPY iuroadmap.webapp/apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/iuroadmap.webapp/apps/web/dist /usr/share/nginx/html
EXPOSE 8080
