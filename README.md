# Hotel Booking - Backend API

REST API for a hotel booking application: hotels, locations, users, bookings, and Stripe-powered payments. Built with **Node.js** and **TypeScript**, using **MongoDB** for persistence and **Clerk** for authentication.

---

## Tech stack

| Layer | Technology |
|--------|------------|
| **Runtime** | Node.js |
| **Language** | TypeScript |
| **HTTP framework** | Express 5 |
| **Database** | MongoDB (via **Mongoose** 8) |
| **Authentication** | **Clerk** (`@clerk/express`) |
| **Payments** | **Stripe** (checkout, webhooks, products/prices) |
| **AI / search** | **OpenAI** embeddings (`text-embedding-3-small`) for semantic hotel search |
| **Validation** | **Zod** |
| **Cross-origin** | **CORS** (configurable frontend origin) |
| **Config** | **dotenv** |

**Dev tooling:** `ts-node`, `nodemon`, `typescript`, `@types/*`

---

## Features

- CRUD and listing for **hotels** and **locations**
- **Filtering** and **search** endpoints for hotels
- **AI-assisted search** (`/api/hotels/ai-search`) using vector embeddings (requires `OPENAI_API_KEY`)
- **Users** synced with Clerk-authenticated requests where middleware is applied
- **Bookings** and **payments** integrated with Stripe
- **Database seeding** script to populate hotels, locations, and Stripe catalog

---

## Project structure

```
src/
├── index.ts                 # Express app entry, middleware, route mounting
├── seed.ts                  # Seed MongoDB + Stripe (hotels, locations)
├── api/                     # HTTP routes & middleware
│   ├── hotel.ts
│   ├── location.ts
│   ├── user.ts
│   ├── booking.ts
│   ├── payment.ts
│   └── middleware/
├── application/             # Use cases / orchestration (hotels, bookings, payments, etc.)
├── domain/                  # DTOs, validation, domain errors
├── infrastructure/        # Mongoose models, DB connection
└── types/                   # TypeScript augmentations (e.g. Express)
```

---

## Prerequisites

- **Node.js** (LTS recommended)
- **MongoDB** instance (local or Atlas) and connection string
- **Clerk** application (for auth)
- **Stripe** account (secret key; webhook secret for payment webhooks)
- **OpenAI** API key (optional but required for AI/embedding-based hotel search)

---

## Environment variables

Create a `.env` file in the project root. Typical variables used in this codebase:

| Variable | Purpose |
|----------|---------|
| `MONGODB_URL` | MongoDB connection string (**required**) |
| `FRONTEND_URL` | Allowed CORS origin for your frontend (default: `http://localhost:5173`) |
| `STRIPE_SECRET_KEY` | Stripe secret API key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (for payment webhooks) |
| `OPENAI_API_KEY` | OpenAI API key (embeddings / AI search) |

**Clerk:** Configure your Clerk project per [Clerk Express docs](https://clerk.com/docs/quickstarts/express). The app uses `clerkMiddleware()`; set the standard Clerk environment variables from your Clerk dashboard (e.g. secret key and related keys as documented by Clerk for server-side usage).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Run API in development with **nodemon** + **ts-node** |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled app (`node dist/index.js`) |
| `npm run seed` | Run `src/seed.ts` (clears and reseeds data; uses Stripe — requires `STRIPE_SECRET_KEY`) |

---

## API routes (base path)

All routes below are mounted under the shown prefix (see `src/index.ts`):

| Prefix | Resource |
|--------|----------|
| `/api/hotels` | Hotels (list, filter, search, AI search, CRUD) |
| `/api/locations` | Locations |
| `/api/users` | Users |
| `/api/booking` | Bookings |
| `/api/payments` | Payments / Stripe-related endpoints |

Protected routes use Clerk authentication middleware (`isAuthenticated`) where defined on specific handlers.

---

## Seeding

```bash
npm run seed
```

This script connects to MongoDB, clears existing seeded collections (hotels, locations, users, bookings per `seed.ts`), creates Stripe products/prices for hotels, and inserts seed data. Ensure `MONGODB_URL` and `STRIPE_SECRET_KEY` are set before running.

---

## Local development

1. Clone the repository and `cd` into this folder.
2. Copy environment variables into `.env` (see table above).
3. `npm install`
4. `npm run dev`

The server listens on `PORT` (default **8000**). Point your frontend at this API and ensure `FRONTEND_URL` matches your dev URL for CORS.

---

## Production build

```bash
npm run build
npm start
```

Serve `dist/index.js` with `NODE_ENV=production` and the same environment variables as in development.

---

## Related

Pair this backend with a frontend (e.g. Vite on port `5173`) and configure `FRONTEND_URL` accordingly.
