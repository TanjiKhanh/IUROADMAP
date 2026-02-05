# Example Dockerfile for a NestJS service (admin-service / roadmap)
# Adjust the WORKDIR and package manager commands according to your project.

FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build TypeScript
RUN npm install -g typescript@~4 --silent && \
	npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
# copy package.json in case scripts or metadata are needed
COPY package.json ./
EXPOSE 4100
CMD ["node", "dist/main.js"]