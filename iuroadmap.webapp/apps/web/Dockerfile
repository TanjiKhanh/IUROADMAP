# ===== Frontend Build Stage =====
FROM node:20-alpine AS builder
WORKDIR /app

# Copy root workspaces configs
COPY package*.json ./
COPY turbo.json ./

# Copy package configurations for caching
COPY iuroadmap.webapp/apps/web/package*.json ./iuroadmap.webapp/apps/web/
COPY iuroadmap.webapp/packages/store/package*.json ./iuroadmap.webapp/packages/store/
COPY iuroadmap.webapp/packages/store/tsconfig.json ./iuroadmap.webapp/packages/store/
COPY iuroadmap.webapp/packages/i18n/package*.json ./iuroadmap.webapp/packages/i18n/
COPY iuroadmap.webapp/packages/i18n/tsconfig.json ./iuroadmap.webapp/packages/i18n/
COPY iuroadmap.webapp/packages/api-gen/package*.json ./iuroadmap.webapp/packages/api-gen/
COPY iuroadmap.webapp/packages/api-gen/tsconfig.json ./iuroadmap.webapp/packages/api-gen/

# Install dependencies for the workspace
RUN npm ci

# Copy source code of web application and shared dependencies
COPY iuroadmap.webapp/apps/web ./iuroadmap.webapp/apps/web
COPY iuroadmap.webapp/packages/store ./iuroadmap.webapp/packages/store
COPY iuroadmap.webapp/packages/i18n ./iuroadmap.webapp/packages/i18n
COPY iuroadmap.webapp/packages/api-gen ./iuroadmap.webapp/packages/api-gen

# Build packages and web app using Turborepo
RUN npx turbo run build --filter=iuroadmap.web

# ===== Production Stage =====
FROM node:20-alpine
WORKDIR /app

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/iuroadmap.webapp/apps/web/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/iuroadmap.webapp/apps/web/package*.json ./

USER nextjs

EXPOSE 5173

# Serve the static files
CMD ["serve", "-s", "dist", "-l", "5173"]
