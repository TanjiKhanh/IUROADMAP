# Business Flow: Authentication & RBAC

This document outlines the business flow for user authentication, session generation, and Role-Based Access Control (RBAC) across the **IUROADMAP** platform.

## 1. Authentication Flow Diagram

The following sequence diagram illustrates how a user authenticates, how the JWT token is structured with permissions, and how the system controls access to protected routes.

```mermaid
sequenceDiagram
    actor User
    participant Frontend as SPA (React/Vue)
    participant Gateway as API Gateway
    participant Auth as Auth Service
    participant DB as Shared Database

    %% Registration Flow
    User->>Frontend: Fills Registration Form (Email, Password, Role)
    Frontend->>Gateway: POST /api/v1/auth/register
    Gateway->>Auth: Forward Payload
    Auth->>DB: Check Email Uniqueness
    alt Email exists
        DB-->>Auth: Conflict
        Auth-->>Gateway: 400 Bad Request
        Gateway-->>Frontend: "Email already exists"
    else Email unique
        Auth->>DB: Hash Password & Insert User (Role: LEARNER / MENTOR)
        DB-->>Auth: Success (UserId)
        Auth->>Auth: Generate JWT (Access & Refresh Tokens)
        Auth-->>Gateway: 201 Created + Tokens
        Gateway-->>Frontend: "Registration successful" + Tokens
    end

    %% Login Flow
    User->>Frontend: Enters Email & Password
    Frontend->>Gateway: POST /api/v1/auth/login
    Gateway->>Auth: Forward Payload
    Auth->>DB: Fetch User & Password Hash
    DB-->>Auth: User Record + Role + Permissions
    Auth->>Auth: Verify Hash (bcrypt.compare)
    
    alt Invalid Credentials
        Auth-->>Gateway: 401 Unauthorized
        Gateway-->>Frontend: "Invalid email or password"
    else Valid Credentials
        Auth->>Auth: Encode JWT Payload (id, email, role, permissions[])
        Auth-->>Gateway: 200 OK + JWT Tokens
        Gateway-->>Frontend: "Login successful" + Tokens
        Frontend->>Frontend: Decode JWT to resolve visible UI features
    end

    %% Protected Endpoint Access
    User->>Frontend: Clicks "Admin Configuration"
    Frontend->>Frontend: Check JWT `permissions.includes('configuration:manage')`
    alt Permission Missing (UI Level)
        Frontend-->>User: Hide menu item / redirect to Dashboard
    else Permission Exists (UI Level)
        Frontend->>Gateway: GET /api/v1/admin/config (Header: Bearer JWT)
        Gateway->>Auth: Validate Token Signature
        Auth-->>Gateway: Token Valid (Decoded Payload)
        Gateway->>Gateway: RolesGuard / PermissionsGuard validation
        alt Permission Missing (API Level)
            Gateway-->>Frontend: 403 Forbidden
        else Permission Valid (API Level)
            Gateway->>DB: Fetch Config Data
            DB-->>Gateway: Data
            Gateway-->>Frontend: 200 OK + Data
        end
    end
```

## 2. Dynamic RBAC Configuration

Unlike static enum roles, **IUROADMAP** uses a dynamic `Role <-> Permission` mapping. The `Auth Service` handles this structure.

### JWT Payload Structure
When the user successfully logs in, the Auth service queries all permissions tied to their role and bakes them directly into the JWT:

```json
{
  "sub": 105,
  "email": "user@iuroadmap.com",
  "role": "ADMIN",
  "permissions": [
    "roadmap:read",
    "roadmap:write",
    "user:manage",
    "configuration:manage"
  ],
  "iat": 1723528255,
  "exp": 1723614655
}
```

### Business Rules & Constraints
1. **Token Lifespan:** Access Token (1 Hour), Refresh Token (7 Days).
2. **Double Validation (Zero Trust):** The frontend uses the decoded JWT array to toggle UI elements (e.g., hiding the Admin sidebar), while the backend API Gateway strictly re-verifies the same permissions via Guards (`@RequirePermissions('roadmap:write')`) before executing any logic.
3. **Admin Registration:** Users *cannot* register as an `ADMIN` via the public registration screen (`UC-01`). The public screen only allows `LEARNER` or `MENTOR`. Admins are created natively in the database or via the Admin Dashboard's User Management suite.
