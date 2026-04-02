# services/admin/Dockerfile
FROM node:18-bullseye-slim AS builder
ENV NODE_ENV=development
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 build-essential git ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --include=dev

COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-bullseye-slim AS runner
ENV NODE_ENV=production
WORKDIR /app

RUN useradd --user-group --create-home --shell /bin/false appuser

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./dist/generated

USER appuser

EXPOSE 4100
CMD ["node", "dist/main.js"]