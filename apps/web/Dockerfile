# ===== Frontend Build Stage =====
FROM node:20-alpine AS builder
WORKDIR /app

# Copy root workspaces configs
COPY package*.json ./
COPY turbo.json ./

# Copy package configurations for caching
COPY apps/web/package*.json ./apps/web/
COPY packages/store/package*.json ./packages/store/
COPY packages/store/tsconfig.json ./packages/store/
COPY packages/i18n/package*.json ./packages/i18n/
COPY packages/i18n/tsconfig.json ./packages/i18n/

# Install dependencies for the workspace
RUN npm ci

# Copy source code of web application and shared dependencies
COPY apps/web ./apps/web
COPY packages/store ./packages/store
COPY packages/i18n ./packages/i18n

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
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/package*.json ./

USER nextjs

EXPOSE 5173

# Serve the static files
CMD ["serve", "-s", "dist", "-l", "5173"]
