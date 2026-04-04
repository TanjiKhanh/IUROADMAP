# services/auth/Dockerfile
# Recommended multi-stage Dockerfile for NestJS + Prisma (Debian-slim)
FROM node:18-bullseye-slim AS builder
ENV NODE_ENV=development
WORKDIR /app

# Install build deps required by some native modules & Prisma generation
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 build-essential git ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Copy package files and prisma schema early for caching
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy the rest and build
COPY . .

# Generate Prisma client after source copy so custom output path is always present
RUN npx prisma generate || true
RUN npm run build

# ---- runtime ----
FROM node:18-bullseye-slim AS runner
ENV NODE_ENV=production
WORKDIR /app

# Create non-root user
RUN useradd --user-group --create-home --shell /bin/false appuser

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./dist/generated

USER appuser

EXPOSE 3000
# Start the NestJS app; ensure the entry file path matches your build output
CMD ["node", "dist/main.js"]