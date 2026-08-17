# API Gateway (services/api-gateway)

The API Gateway is the central entry point for the IUROADMAP platform. It routes incoming client requests, manages reverse proxies, handles authentication checks, and balances load across the microservices.

## Tech Stack
*   **Framework**: NestJS (v10)
*   **Routing**: Express + http-proxy-middleware

## Environment Variables
Create a `.env` file or provide variables in the environment:
*   `PORT`: Port for the API Gateway to listen on (default: `8080`).
*   `JWT_SECRET`: Secret key used for decoding and validating client JWTs.
*   `AUTH_SERVICE_URL`: URL of the Auth service (e.g., `http://localhost:3000`).
*   `ADMIN_SERVICE_URL`: URL of the Admin service (e.g., `http://localhost:3001`).
*   `MENTOR_SERVICE_URL`: URL of the Mentor service (e.g., `http://localhost:4001`).
*   `USER_SERVICE_URL`: URL of the User service (e.g., `http://localhost:3002`).

## Quick Start

### 1. Install & Build
```bash
cd services/api-gateway
npm install
npm run build
```

### 2. Run in Development
```bash
npm run start:dev
```

### 3. Run in Production
```bash
npm run start
```
By default, the gateway will spin up at [http://localhost:8080](http://localhost:8080).

---

## Route Mappings
All incoming requests under specific path prefixes are proxied as follows:
*   `/auth/**` ➔ `AUTH_SERVICE_URL`
*   `/admin/**` ➔ `ADMIN_SERVICE_URL`
*   `/mentors/**` ➔ `MENTOR_SERVICE_URL`
*   `/users/**` ➔ `USER_SERVICE_URL`
