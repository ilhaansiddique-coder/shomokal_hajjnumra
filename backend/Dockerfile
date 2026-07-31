FROM node:22-alpine AS builder

WORKDIR /app

# Pre-declare ARGs that Coolify may inject to prevent build issues
ARG COOLIFY_FQDN
ARG NODE_ENV
ARG DATABASE_URL
ARG POSTGRES_PASSWORD
ARG REDIS_HOST
ARG REDIS_PORT
ARG REDIS_PASSWORD
ARG JWT_ACCESS_SECRET
ARG JWT_REFRESH_SECRET
ARG JWT_ACCESS_EXPIRY
ARG JWT_REFRESH_EXPIRY
ARG FRONTEND_URL
ARG ADMIN_URL
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_SECRET
ARG EMAIL_FROM
ARG MEILISEARCH_HOST
ARG MEILISEARCH_API_KEY
ARG BACKEND_URL

COPY .npmrc package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm install --no-audit --no-fund --include=dev

COPY . .
RUN npm run build

FROM node:22-alpine AS runner

# Re-declare for runner stage
ARG COOLIFY_FQDN
ARG NODE_ENV
ARG DATABASE_URL
ARG POSTGRES_PASSWORD
ARG REDIS_HOST
ARG REDIS_PORT
ARG REDIS_PASSWORD
ARG JWT_ACCESS_SECRET
ARG JWT_REFRESH_SECRET
ARG JWT_ACCESS_EXPIRY
ARG JWT_REFRESH_EXPIRY
ARG FRONTEND_URL
ARG ADMIN_URL
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_SECRET
ARG EMAIL_FROM
ARG MEILISEARCH_HOST
ARG MEILISEARCH_API_KEY
ARG BACKEND_URL

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
RUN npm prune --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY docker-entrypoint.sh ./

RUN chmod +x docker-entrypoint.sh

USER nestjs

EXPOSE 4000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
