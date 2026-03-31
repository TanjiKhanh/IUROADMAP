# Place at services/user/Dockerfile

# ---- Builder ----
FROM node:18-bullseye-slim AS builder
ENV NODE_ENV=development
WORKDIR /app

# Install build deps (git, python, make/g++, required by some native modules)
RUN apt-get update && apt-get install -y --no-install-recommends \
  python3 \
  build-essential \
  git \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --only=production=false

# Copy source and build
COPY . .
RUN npx prisma generate || true
RUN npm run build

# ---- Runtime ----
FROM node:18-bullseye-slim AS runner
ENV NODE_ENV=production
WORKDIR /app

# Create non-root user
RUN useradd --user-group --create-home --shell /bin/false appuser

# Copy production dependencies and built files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./dist/generated

# Drop privileges
USER appuser

EXPOSE 4001

# Use a healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD ["node", "-e", "require('./dist/main').health ? process.exit(0) : process.exit(1)"] || true

CMD ["node", "dist/main.js"]