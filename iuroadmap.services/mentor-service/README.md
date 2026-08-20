# Mentor Service (services/mentor-service)

The Mentor Service manages mentor registrations, matching students with appropriate industry/academic mentors, scheduling bookings, and collecting session feedback/reviews.

## Tech Stack
*   **Framework**: NestJS (v10)
*   **Database ORM**: Prisma (PostgreSQL)
*   **Caching**: Redis

## Environment Variables
*   `PORT`: Port for the Mentor service to run on (default: `4001`).
*   `MENTOR_DATABASE_URL`: Connection string for PostgreSQL mentor DB.
*   `REDIS_URL`: Cache layer connection URL.
*   `JWT_SECRET`: JWT verification secret.

## Quick Start

### 1. Install & Database Setup
```bash
cd services/mentor-service
npm install
npx prisma generate
npx prisma migrate dev
```

### 2. Run in Development Mode
```bash
npm run start:dev
```

---

## Key Endpoints
*   `GET /mentors` - List all mentors.
*   `GET /mentors/:id` - Fetch mentor profile.
*   `POST /mentors/apply` - Register as a mentor.
*   `POST /mentors/bookings` - Create a booking.
