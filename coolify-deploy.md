# Shomakal Air Service — Coolify Deployment Guide

## Architecture

Coolify builds directly from source using the repository's `docker-compose.yml` (and `docker-compose.yaml`).

```
git push origin main
        │
        ▼
Coolify Git Webhook / Redeploy
        │
        ▼
Coolify Stack (Docker Compose — builds from source)
   ├─ frontend      (Next.js 15 Standalone)   → Port 3000
   ├─ backend       (NestJS 11 + Prisma)      → Port 4000
   ├─ postgres      (PostgreSQL 16 Alpine)    → Port 5432 (internal)
   ├─ redis         (Redis 7 Alpine)          → Port 6379 (internal)
   └─ meilisearch   (Meilisearch 1.12)        → Port 7700 (internal)
```

---

## Why Coolify Resources Showed "Exited" (Diagnosis)

If you saw these 5 resources in Coolify:
- `healthchecks-...` (Service Exited)
- `meilisearch-shomakal` (Service Exited)
- `postgresql-database-...` (Database Running)
- `redis-shomakal` (Database Exited)
- `shomokal_hajjnumra:main-...` (Application Exited)

### 1. `shomokal_hajjnumra:main-...` Exited
- **Root Cause 1:** `docker-compose.yml` was attempting to pull pre-built images from `ghcr.io/ilhaansiddique-coder/shomakal-air-service-backend:main`, which did not exist on GHCR. Docker failed with image not found.
- **Root Cause 2:** In the backend `Dockerfile`, `RUN npm prune --omit=dev` ran while `prisma` CLI was only in `devDependencies`. When the entrypoint ran `npx prisma migrate deploy`, it failed because Prisma CLI was missing.
- **Solution:** Both `docker-compose.yml` and `docker-compose.yaml` now build from `./backend` and `./frontend`. `prisma` has been moved to `dependencies` so migrations always run cleanly.

### 2. `meilisearch-shomakal` Exited
- **Root Cause:** Meilisearch v1.12 strictly requires a `MEILI_MASTER_KEY` of **at least 16 bytes** in production mode (`MEILI_ENV=production`). If the key is shorter (e.g. `masterKey` = 9 bytes) or missing, Meilisearch immediately exits with fatal error.
- **Solution:** Default `MEILI_MASTER_KEY` is now set to a 32+ character key (`shomakal_meili_master_key_secure_32chars`).

### 3. Redundant / Conflicting Resources (`redis-shomakal`, `healthchecks`, etc.)
- **Root Cause:** In Coolify, creating standalone databases (`postgresql-database`, `redis-shomakal`, `meilisearch-shomakal`) while ALSO running `shomokal_hajjnumra` (which defines its own Postgres, Redis, and Meilisearch) causes duplicate containers, port conflicts, and high memory usage (OOM kills).
- **Healthchecks Service:** `healthchecks-ldps4y9bhhjdrraah3yfd23o` is an external cron-monitoring Django app (Healthchecks.io) that requires its own PostgreSQL database and SECRET_KEY. It was created by mistake and is **not needed** by Shomakal Air Service.

---

## Recommended Coolify Setup (Clean & Simple)

### Step 1: Clean Up Redundant Resources in Coolify
In Coolify Dashboard under **Project: Shomakal_Air_Service / Environment: production**:
1. **Delete** `healthchecks-ldps4y9bhhjdrraah3yfd23o` (Not needed, saves RAM).
2. If you want the all-in-one stack (easiest):
   - You can delete `redis-shomakal` and `meilisearch-shomakal`, as the compose stack includes its own Redis and Meilisearch containers automatically.
   - If you want to use Coolify's standalone PostgreSQL (`postgresql-database-iaau6n06gg8gfzxxxzsuz54q`), simply set `DATABASE_URL` in the application environment variables (see below).

### Step 2: Configure the Application `shomokal_hajjnumra:main`
1. Go to **Application: `shomokal_hajjnumra:main`** in Coolify.
2. In **Configuration**:
   - **Build Pack:** Docker Compose
   - **Docker Compose Location:** `docker-compose.yml` (or `docker-compose.yaml`)
3. Under **Domains / FQDN**:
   - `frontend`: `https://shomakal.com` (or your domain)
   - `backend`: `https://api.shomakal.com` (or route through Next.js proxy)
4. Under **Environment Variables**, set:
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://shomakal.com`
   - `JWT_ACCESS_SECRET=<generate with openssl rand -hex 32>`
   - `JWT_REFRESH_SECRET=<generate with openssl rand -hex 32>`
   - `MEILISEARCH_API_KEY=<generate with openssl rand -hex 16>`
   - *(Optional if using Coolify standalone Postgres)*: `DATABASE_URL=postgresql://<user>:<password>@<coolify-postgres-host>:5432/<db>?schema=public`

### Step 3: Deploy
Click **Deploy**.
Coolify will:
1. Clone `shomokal_hajjnumra:main`.
2. Build `backend` (NestJS) and `frontend` (Next.js 15 Standalone).
3. Start Postgres, Redis, Meilisearch, Backend, and Frontend.
4. Run Prisma database migrations automatically.
5. Pass health checks and route domain traffic via Traefik.
