# services/api-gateway/Dockerfile
# Multi-stage Dockerfile for the API Gateway (NestJS)
FROM node:18-bullseye-slim AS builder
ENV NODE_ENV=development
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 build-essential git ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
# If gateway does not use Prisma, you can remove COPY prisma
RUN npm ci
RUN npx prisma generate || true

COPY . .
RUN npm run build

FROM node:18-bullseye-slim AS runner
ENV NODE_ENV=production
WORKDIR /app

RUN useradd --user-group --create-home --shell /bin/false appuser

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

USER appuser

EXPOSE 3000
CMD ["node", "dist/main.js"]