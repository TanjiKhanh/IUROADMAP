# User Service (services/user-service)

The User Service handles user profile data (student details, CV uploads, career target configurations) and individual user-customized roadmaps.

## Tech Stack
*   **Framework**: NestJS (v10)
*   **Database ORM**: Prisma (PostgreSQL)
*   **Caching**: Redis

## Environment Variables
*   `PORT`: Port for the User service to run on (default: `3002`).
*   `USER_DATABASE_URL`: Connection string for PostgreSQL user profiles DB.
*   `REDIS_URL`: Cache layer connection URL.
*   `JWT_SECRET`: JWT verification secret.

## Quick Start

### 1. Install & Database Setup
```bash
cd services/user-service
npm install
npx prisma generate
npx prisma migrate dev
```

### 2. Run in Development Mode
```bash
npm run start:dev
```

---

## Core APIs
*   `GET /users/profile` - Fetch current user profile.
*   `PATCH /users/profile` - Update user bio, CV links, target roles.
*   `GET /users/roadmaps` - Retrieve user-saved roadmaps.
