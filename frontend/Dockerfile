# ===== Frontend Build Stage =====
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build the frontend
COPY . .
RUN npm run build

# ===== Production Stage =====
FROM node:20-alpine
WORKDIR /app

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built application from builder
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./

USER nextjs

EXPOSE 5173

# Serve the static files
CMD ["serve", "-s", "dist", "-l", "5173"]
