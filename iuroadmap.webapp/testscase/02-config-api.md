# IUROADMAP — Module 02: Configuration — API Test Cases

**Document Version:** 1.0  
**Module Scope:** Config Module — User Management & Role Management (API Layer)  
**Base URL:** `{{API_BASE_URL}}/api/v1`  
**Auth:** All endpoints require `Authorization: Bearer <token>` (ADMIN or SUPERADMIN role)  
**Automation Target:** `tests/api/config/user/user.spec.ts`, `tests/api/config/role/role.spec.ts`

---

## 1. API Endpoint Reference

### User Endpoints (`/api/v1/iam/User`)

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/iam/User/GetByIndex` | List / filter / paginate users |
| `GET` | `/iam/User/getById/:id` | Get user detail by ID |
| `POST` | `/iam/User/create` | Create a new user |
| `POST` | `/iam/User/update` | Update an existing user |
| `POST` | `/iam/User/softDelete/:id` | Soft delete (ban) a user |
| `POST` | `/iam/User/delete/:id` | Hard delete (SUPERADMIN only) |

### Pagination Response Shape

```json
{
  "status": "success",
  "data": {
    "datas": [ { "id": "...", "name": "...", "email": "...", ... } ],
    "totalRows": 42
  }
}
```

### Query Parameters for `GetByIndex`

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `rowsPerPage` | number | 20 | Page size |
| `currentPage` | number | 1 | Page number (1-based) |
| `keyword` | string | — | Search by name or email |
| `roleId` | string (UUID) | — | Filter by role |
| `status` | string | — | Filter by account status |
| `subscriptionTier` | string | — | Filter by subscription tier |

---

## 2. API Test Cases — User Management

### TC-API-USR-01: List Users with Pagination

- **Endpoint:** `GET /iam/User/GetByIndex`
- **Preconditions:** Authenticated admin. At least one user seeded.
- **Tests:**

| # | Scenario | Request | Expected |
|---|----------|---------|----------|
| 1 | Default pagination | `?currentPage=1&rowsPerPage=20` | `200`. Body has `totalRows >= 0`, `datas` is array. If `datas.length > 0`, first item has `id` and `name`. |
| 2 | Respects rowsPerPage | `?currentPage=1&rowsPerPage=3` | `200`. `datas.length <= 3`. |
| 3 | Out-of-range page | `?currentPage=9999&rowsPerPage=20` | `200`. `datas` is `[]`. |

---

### TC-API-USR-02: Filter Users by Keyword

- **Endpoint:** `GET /iam/User/GetByIndex`
- **Preconditions:** At least one user exists.
- **Tests:**

| # | Scenario | Request | Expected |
|---|----------|---------|----------|
| 1 | Filter by keyword | `?currentPage=1&rowsPerPage=20&keyword=<known_name>` | `200`. `datas` is array. |
| 2 | Non-matching keyword | `?keyword=zzz_no_match_zzz` | `200`. `datas` is `[]` or fewer results. |

---

### TC-API-USR-03: Filter Users by Role

- **Endpoint:** `GET /iam/User/GetByIndex`
- **Preconditions:** At least one role exists.
- **Tests:**

| # | Scenario | Request | Expected |
|---|----------|---------|----------|
| 1 | Filter by valid roleId | `?roleId=<valid_uuid>` | `200`. All returned users have matching `roleId`. |
| 2 | Filter by non-existent roleId | `?roleId=<NON_EXISTENT_UUID>` | `200`. `datas` is `[]`. |

---

### TC-API-USR-04: Create User (Happy Path)

- **Endpoint:** `POST /iam/User/create`
- **Preconditions:** At least one role exists for assignment.
- **Tests:**

| # | Scenario | Request Body | Expected |
|---|----------|-------------|----------|
| 1 | Valid create | `{ name, email, password, roleId }` | `201`. Response contains created user with `id`. |
| 2 | Cleanup | `POST /iam/User/delete/<id>` | `200`. |

---

### TC-API-USR-05: Create User — Validation Errors

- **Endpoint:** `POST /iam/User/create`
- **Tests:**

| # | Scenario | Request Body | Expected |
|---|----------|-------------|----------|
| 1 | Missing name | `{ email, password, roleId }` | `400` or error response. |
| 2 | Missing email | `{ name, password, roleId }` | `400` or error response. |
| 3 | Invalid email format | `{ name, email: "notanemail", password, roleId }` | `400` or error response. |

---

### TC-API-USR-06: Get User by ID

- **Endpoint:** `GET /iam/User/getById/:id`
- **Preconditions:** At least one user exists.
- **Tests:**

| # | Scenario | Request | Expected |
|---|----------|---------|----------|
| 1 | Valid ID | `/getById/<existing_id>` | `200`. Response has `id`, `name`, `email`. |

---

### TC-API-USR-07: Update User

- **Endpoint:** `POST /iam/User/update`
- **Preconditions:** A test user exists (created in setup).
- **Tests:**

| # | Scenario | Request Body | Expected |
|---|----------|-------------|----------|
| 1 | Update name | `{ id, name: "Updated Name" }` | `200`. |
| 2 | Verify update | `GET /getById/<id>` | Name matches updated value. |

---

### TC-API-USR-08: Delete User

- **Endpoint:** `POST /iam/User/softDelete/:id` / `POST /iam/User/delete/:id`
- **Preconditions:** A test user exists (created in setup).
- **Tests:**

| # | Scenario | Request | Expected |
|---|----------|---------|----------|
| 1 | Soft delete | `POST /softDelete/<id>` | `200`. |
| 2 | Hard delete | `POST /delete/<id>` | `200`. |

---

### TC-API-USR-09: Get Current User Profile

- **Endpoint:** `GET /user/profile` (if exists)
- **Preconditions:** Authenticated user.
- **Tests:**

| # | Scenario | Request | Expected |
|---|----------|---------|----------|
| 1 | Get profile | `GET /user/profile` | `200`. Has `id`, `name`. |

---

### TC-API-USR-10: Non-Existent User ID

- **Endpoint:** `GET /iam/User/getById/:id`
- **Tests:**

| # | Scenario | Request | Expected |
|---|----------|---------|----------|
| 1 | Fake UUID | `/getById/00000000-0000-0000-0000-000000000000` | `404` or error response. |

---

### TC-API-USR-11: Invalid UUID Format

- **Endpoint:** `GET /iam/User/getById/:id`
- **Tests:**

| # | Scenario | Request | Expected |
|---|----------|---------|----------|
| 1 | Invalid string | `/getById/not-a-valid-uuid` | `400` or error response. |
| 2 | Empty string | `/getById/` | `404` or error response. |

---

### TC-API-USR-12: Pagination Boundary

- **Endpoint:** `GET /iam/User/GetByIndex`
- **Preconditions:** Multiple users exist.
- **Tests:**

| # | Scenario | Request | Expected |
|---|----------|---------|----------|
| 1 | Last page | Calculate `lastPage = ceil(totalRows / 5)`, fetch it | `200`. `datas` is defined array. |
| 2 | totalRows consistent | Fetch page 1 and page 2 | Both have same `totalRows`. |

---

## 3. Automation Notes

- **Auth token:** Obtained via `api-setup` project in Playwright (`api/auth/auth.setup.ts`).
- **Test runner:** `npm run test:api:config` (runs `playwright test api/config --project=api`).
- **Cleanup:** Tests that create data should clean up in `test.afterAll()`.
- **Base URL:** Configured via `API_BASE_URL` env var (default: `http://localhost:8080`).
