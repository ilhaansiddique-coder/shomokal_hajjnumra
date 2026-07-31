FROM node:22-alpine AS builder

WORKDIR /app

# Pre-declare ARGs that Coolify may inject to prevent build issues
ARG COOLIFY_FQDN
ARG NODE_ENV
ARG BACKEND_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ARG NEXT_PUBLIC_GA4_ID
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_META_PIXEL_ID
ARG NEXT_PUBLIC_TIKTOK_PIXEL_ID
ARG NEXT_PUBLIC_CLARITY_ID
ARG FRONTEND_URL
ARG ADMIN_URL

ENV BACKEND_URL=${BACKEND_URL:-http://backend:4000} \
    NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL:-https://shomakal.com} \
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:-} \
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:-} \
    NEXT_PUBLIC_GA4_ID=${NEXT_PUBLIC_GA4_ID:-} \
    NEXT_PUBLIC_GTM_ID=${NEXT_PUBLIC_GTM_ID:-} \
    NEXT_PUBLIC_META_PIXEL_ID=${NEXT_PUBLIC_META_PIXEL_ID:-} \
    NEXT_PUBLIC_TIKTOK_PIXEL_ID=${NEXT_PUBLIC_TIKTOK_PIXEL_ID:-} \
    NEXT_PUBLIC_CLARITY_ID=${NEXT_PUBLIC_CLARITY_ID:-} \
    NEXT_TELEMETRY_DISABLED=1

COPY .npmrc* package.json package-lock.json* ./
RUN npm install --no-audit --no-fund --include=dev

COPY . .
RUN npm run build

FROM node:22-alpine AS runner

# Re-declare ARGs for runner stage
ARG COOLIFY_FQDN
ARG NODE_ENV
ARG BACKEND_URL
ARG NEXT_PUBLIC_SITE_URL
ARG FRONTEND_URL

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production \
    BACKEND_URL=${BACKEND_URL:-http://backend:4000} \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
