# Auth Service (services/auth)

The Auth Service manages user accounts, registration, login sessions, passwords, and issues JWT tokens for authentication.

## Tech Stack
*   **Framework**: NestJS (v10)
*   **Database ORM**: Prisma
*   **Authentication**: Passport + JWT

## Environment Variables
*   `PORT`: Port for the Auth service (default: `3000`).
*   `AUTH_DATABASE_URL`: Connection URL to the PostgreSQL database for auth storage.
*   `REDIS_URL`: Redis connection URL for token blacklisting and session cache.
*   `JWT_SECRET`: Secret key for signing and verifying tokens.
*   `JWT_EXPIRATION`: Token duration (e.g., `3600s`).
*   `MENTOR_SERVICE_URL`: URL of the mentor service.

## Quick Start

### 1. Install & Scaffold
```bash
cd services/auth
npm install
```

### 2. Generate Prisma Clients & Migrations
```bash
npx prisma generate
npx prisma migrate dev
```

### 3. Run Development Server
```bash
npm run start:dev
```

---

## APIs Exposed
*   `POST /auth/register` - Create a new user account.
*   `POST /auth/login` - Validate credentials and receive JWT.
*   `GET /auth/verify` - Check session details.
