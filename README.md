# Shomakal Air Service Platform

Enterprise-grade, SaaS-ready travel operating system. Single-tenant deployment with full multi-tenant architecture built-in.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 + React 19 + TypeScript |
| Styling | TailwindCSS + ShadCN UI |
| Backend | NestJS + TypeScript |
| Database | PostgreSQL + Prisma ORM |
| Cache | Redis |
| Queues | BullMQ |
| Realtime | Socket.io |
| Search | Meilisearch |
| Storage | Cloudflare R2 |
| Payments | Stripe, bKash, Nagad, SSLCommerz |

## Project Structure

```
flyngo/
├── frontend/          # Next.js (public site + admin panel)
├── backend/           # NestJS API
├── infrastructure/    # Docker, NGINX, CI/CD
└── docs/              # Architecture docs, SRS, ERD
```

## Quick Start

```bash
# Install dependencies (all three workspaces)
npm install && npm --prefix backend install && npm --prefix frontend install

# Set up the database
npm run db:migrate
npm run db:seed   # optional: seed sample data

# Start both frontend + backend with one command
npm run dev
```

Backend → http://localhost:4000 (Swagger at /api/docs)  
Frontend → http://localhost:3000

### World Flight Map

The home page radar map renders pre-generated Natural Earth 1:110m country paths. To rebuild the simplified Miller-projection data after changing the generator or its inputs, run:

```bash
npm --prefix frontend run generate:world-map
```

The generated paths live in `frontend/src/lib/world-map.ts`. Update the Dhaka origin, airport coordinates, flight durations, and start delays in `frontend/src/components/WorldFlightMap.tsx`; the radar view filters are passed in from the home page. Reduced-motion preferences disable aircraft motion and freeze route trails.

### Docker (full stack: Postgres, Redis, Meilisearch, backend, frontend)

```bash
npm run docker:dev     # build from source, start everything
npm run docker:up      # pull pre-built images from ghcr.io
npm run docker:down    # stop everything
```

### Other Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start backend + frontend in watch mode |
| `npm run build` | Build both backend and frontend |
| `npm run lint` | Lint both workspaces |
| `npm run test` | Run all tests |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed the database |
| `npm run db:studio` | Open Prisma Studio GUI |

## License

Proprietary. All rights reserved.
# shomokal_hajjnumra
