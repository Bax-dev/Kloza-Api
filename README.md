# Kloza Ideas API

API server for managing ideas and kollabs used by the Kloza app.

**Tech stack:** Node.js, TypeScript, Express, MongoDB (Mongoose), Swagger, Jest

**Quick links:**
- **Entry:** [src/index.ts](src/index.ts)
- **DB config:** [src/config/database.ts](src/config/database.ts)
- **Swagger:** [src/config/swagger.ts](src/config/swagger.ts)

**Contents**
- **Project Overview**: brief description and purpose
- **Requirements**: Node + MongoDB
- **Setup**: install, env, run
- **API**: routes and usage
- **Testing**: run unit/integration tests
- **Development**: build and lint

**Project Overview**

This repository contains a small REST API for creating and managing ideas and kollabs for the Kloza project. It exposes endpoints under `/api` and provides automatic API docs via Swagger at `/swagger`.

**Requirements**
- Node.js (>= 18 recommended)
- npm
- MongoDB (local or remote)

**Setup**

1. Install dependencies

```
npm install
```

2. Environment

Create a `.env` file in the project root or set environment variables in your environment. Important variables used by the app:

- `MONGODB_URI`: MongoDB connection string (default: `mongodb://localhost:27017/kloza-app` if unset) — configured in [src/config/database.ts](src/config/database.ts)
- `PORT`: HTTP port (default: `3000`) — used in [src/index.ts](src/index.ts)
- `NODE_ENV`: `development` or `production` (affects error payloads)

Example `.env`:

```
MONGODB_URI=mongodb://localhost:27017/kloza-app
PORT=3000
NODE_ENV=development
```

3. Run in development

```
npm run dev
```

4. Build and run production

```
npm run build
npm start
```

**NPM scripts** (from `package.json`)

- `npm run dev`: run with `ts-node-dev` (fast reload)
- `npm run build`: compile TypeScript to `dist`
- `npm start`: run compiled `dist/index.js`
- `npm run type-check`: run TypeScript type checks
- `npm test`: run Jest tests
- `npm run test:watch`: watch mode for tests
- `npm run test:coverage`: generate coverage report

**API routes (high level)**

Routes are mounted under `/api` via the route files:

- Ideas: defined in [src/routes/ideaRoutes.ts](src/routes/ideaRoutes.ts) and handled by [src/controllers/ideaController.ts](src/controllers/ideaController.ts)
- Kollabs: defined in [src/routes/kollabRoutes.ts](src/routes/kollabRoutes.ts) and handled by [src/controllers/kollabController.ts](src/controllers/kollabController.ts)

Additionally:

- Root health checks: `GET /` and `GET /health` (see [src/index.ts](src/index.ts))
- Swagger UI available at `/swagger` (setup in [src/index.ts](src/index.ts); spec in [src/config/swagger.ts](src/config/swagger.ts))

Inspect the route files for exact endpoints and payload shapes.

**Schemas / Models**

Model and schema definitions are in `src/schemas/`:

- [src/schemas/Idea.ts](src/schemas/Idea.ts)
- [src/schemas/Kollab.ts](src/schemas/Kollab.ts)
- [src/schemas/Discussion.ts](src/schemas/Discussion.ts)

These use Mongoose to define documents persisted to MongoDB.

**Testing**

Unit and integration tests use Jest and Supertest. Tests are located in `src/__tests__/`.

Run tests:

```
npm test
```

Watch mode:

```
npm run test:watch
```

Coverage report:

```
npm run test:coverage
```

**Logging & Middleware**

- Request logging via `morgan` (dev format)
- CORS enabled via `cors`
- JSON and URL-encoded body parsing enabled
- Global error handler and 404 handler configured in [src/index.ts](src/index.ts)

**Swagger / API docs**

Open `http://localhost:<PORT>/swagger` after starting the server to view interactive API docs generated from the JSDoc/OpenAPI spec at [src/config/swagger.ts](src/config/swagger.ts).

**Database**

The DB connection is established at startup by `src/config/database.ts`. By default it connects to `mongodb://localhost:27017/kloza-app` unless `MONGODB_URI` is set.

**Suggested Development Workflow**

- Start a local MongoDB instance (or use a cloud URI in `MONGODB_URI`)
- Run `npm run dev` while developing
- Run tests frequently with `npm test`



**License**

MIT