# 4. Authentication & Role-Based Access Control (RBAC)

This document outlines the functional requirements, schema, and token structure for the central Authentication and Authorization system in the IUROADMAP platform.

## 4.1. Core Concepts

The system utilizes a dynamic, database-driven **Role-Permission (RBAC)** model instead of static Enum roles. 

1. **User**: A registered account in the system. Each user has exactly **one** primary Role (e.g., Student, Mentor, Admin).
2. **Role**: A collection of permissions. Examples: `ADMIN`, `STUDENT`, `MENTOR`.
3. **Permission**: A granular, specific action that can be performed in the system. Examples: `roadmap:create`, `user:read`, `configuration:manage`.
4. **JWT Encoding**: Upon successful login, the Auth Service queries the User, their Role, and all associated Permissions, and encodes them directly into the JWT Payload.

---

## 4.2. Functional Requirements

| Item | Description |
| :--- | :--- |
| **Req ID** | `REQ-AUTH-01` |
| **Title** | Login & Token Generation |
| **Description** | When a user authenticates with valid credentials, the system MUST generate a JWT Access Token. The token MUST contain the user's `id`, `email`, `role`, and an array of `permissions` granted to that role. |

| Item | Description |
| :--- | :--- |
| **Req ID** | `REQ-AUTH-02` |
| **Title** | Frontend Feature Toggling |
| **Description** | The frontend SPA (Learner Portal / Admin Dashboard) MUST decode the JWT and use the `permissions` array to dynamically show, hide, or disable UI elements (e.g., hiding the "Configuration" menu if `configuration:manage` is absent). |

| Item | Description |
| :--- | :--- |
| **Req ID** | `REQ-AUTH-03` |
| **Title** | Backend Endpoint Protection |
| **Description** | Backend services MUST protect endpoints using decorators that check for specific permissions. If a request's JWT lacks the required permission in its array, the service MUST return `403 Forbidden`. |

| Item | Description |
| :--- | :--- |
| **Req ID** | `REQ-AUTH-04` |
| **Title** | Dynamic Role Management |
| **Description** | Administrators with `role:manage` permission MUST be able to create new Roles, define new Permissions, and map Permissions to Roles dynamically via the Admin Dashboard. |

---

## 4.3. Database Schema (Auth Service)

The `auth-service` acts as the single source of truth for Roles and Permissions. The Prisma Schema structure is defined below:

```prisma
model User {
  id           Int        @id @default(autoincrement())
  email        String     @unique
  password     String
  name         String?
  status       AccountStatus @default(ACTIVE)

  roleId       Int
  role         Role       @relation(fields: [roleId], references: [id])

  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
}

model Role {
  id          Int          @id @default(autoincrement())
  name        String       @unique // e.g., "ADMIN", "STUDENT"
  description String?
  
  users       User[]
  permissions Permission[] // Implicit Many-to-Many
  
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model Permission {
  id          Int          @id @default(autoincrement())
  name        String       @unique // e.g., "configuration:read"
  description String?
  
  roles       Role[]       // Implicit Many-to-Many

  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}
```

---

## 4.4. JWT Payload Structure

The generated Access Token is a standard signed JWT. The `payload` MUST follow this structure:

```json
{
  "sub": 105,
  "email": "admin@iuroadmap.com",
  "role": "ADMIN",
  "permissions": [
    "roadmap:read",
    "roadmap:write",
    "roadmap:delete",
    "user:read",
    "user:manage",
    "configuration:manage"
  ],
  "iat": 1723528255,
  "exp": 1723614655
}
```

*Note: The frontend will simply decode the base64 payload to access this JSON object and utilize `user.permissions.includes('configuration:manage')` to render the Admin Configuration panel.*
