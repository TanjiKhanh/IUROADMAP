# AUTH — Authentication & Role-Based Access Control

> ✅ **Đã implement** — Auth service đã hoạt động với JWT Bearer token, RBAC dynamic, Role-Permission mapping.

## 1. Module description

AUTH quản lý toàn bộ vòng đời xác thực người dùng: đăng ký, đăng nhập, phân quyền động. Sử dụng JWT Bearer token với permissions được encode trực tiếp vào payload. RBAC model database-driven (Role → Permission mapping) cho phép Admin tạo/xoá Role và Permission tùy ý.

## 2. Tên viết tắt

- **AUTH** = Authentication & Authorization
- Vietnamese: **Xác thực & Phân quyền**

## 3. Submodules

| Submodule | Mô tả | URL |
|---|---|---|
| **Login** | Đăng nhập hệ thống | `/api/v1/auth/login` |
| **Register** | Đăng ký tài khoản mới (Learner / Mentor) | `/api/v1/auth/register` |
| **Role Management** | CRUD Roles (Admin only) | `/api/v1/iam/Role/GetByIndex` |
| **Permission Management** | CRUD Permissions (Admin only) | `/api/v1/iam/Permission/GetByIndex` |
| **Password Reset** | Quên mật khẩu (token-based) | `/api/v1/auth/forgot-password` |

## 4. Actors

| Role | Trách nhiệm |
|---|---|
| **Guest** | Đăng ký, đăng nhập |
| **Authenticated User** | Truy cập resources theo permissions trong JWT |
| **Admin** | Quản lý Role, Permission, User directory |
| **Superadmin** | Toàn quyền hệ thống, hard delete |

## 5. Status lifecycle

### AccountStatus

| Status | Mô tả |
|---|---|
| `ACTIVE` | Tài khoản hoạt động bình thường |
| `PENDING_APPROVAL` | Đang chờ duyệt (khi đăng ký Mentor) |
| `BANNED` | Bị cấm — không thể đăng nhập |
| `REJECTED` | Đơn mentor bị từ chối |

### State transitions

```mermaid
stateDiagram-v2
    [*] --> ACTIVE : Register as Learner
    [*] --> PENDING_APPROVAL : Register as Mentor
    PENDING_APPROVAL --> ACTIVE : Admin Approve
    PENDING_APPROVAL --> REJECTED : Admin Reject (mandatory reason)
    ACTIVE --> BANNED : Admin Suspend/Ban
    BANNED --> ACTIVE : Admin Unban
```

| From | To | Action | Ai làm | Điều kiện |
|---|---|---|---|---|
| *(new)* | `ACTIVE` | **Register as Learner** | Guest | Valid form |
| *(new)* | `PENDING_APPROVAL` | **Register as Mentor** | Guest | Valid form + mentor profile |
| `PENDING_APPROVAL` | `ACTIVE` | **Approve Mentor** | Admin | Review credentials |
| `PENDING_APPROVAL` | `REJECTED` | **Reject Mentor** | Admin | Mandatory rejection reason |
| `ACTIVE` | `BANNED` | **Suspend/Ban** | Admin | Policy violation |
| `BANNED` | `ACTIVE` | **Unban** | Admin | Issue resolved |

## 6. Core flows

### Flow 1 — User Registration (UC-01)

1. Guest gọi endpoint `/api/v1/auth/register`.
2. Chọn role: `LEARNER` hoặc `MENTOR`.
3. Fill form: `email`, `password`, `confirmPassword`.
4. System validate:
   - Email format (`@IsEmail()`).
   - Password match.
   - Email uniqueness against `users` table.
5. Backend hash password (`bcrypt`, work factor ≥ 10).
6. Insert `users` record với role tương ứng.
7. Issue JWT tokens (access: 1h, refresh: 7d).
8. Redirect to Dashboard (`/dashboard`).

**Alternative Flows:**
- **A1** – Email đã tồn tại → `"Email already exists"`.
- **A2** – Password không match → `"Password does not match"`.
- **A3** – Fields trống → `"Please fill in all required fields"`.

### Flow 2 — User Login (UC-02)

1. Guest gọi endpoint `/api/v1/auth/login`.
2. Fill: `email`, `password`.
3. System verify: email exists, `bcrypt.compare(password, hash)`.
4. Generate JWT payload:
   ```json
   {
     "sub": 105,
     "email": "admin@iuroadmap.com",
     "role": "ADMIN",
     "permissions": ["roadmap:read", "roadmap:write", "user:manage", "configuration:manage"],
     "iat": 1723528255,
     "exp": 1723614655
   }
   ```
5. Return Bearer token, redirect to Dashboard.

**Alternative Flows:**
- **A1** – Invalid credentials → `"Invalid email or password"` (không tiết lộ field nào sai).
- **A2** – Unauthenticated access protected route → redirect to Login + `"Please log in to continue"`.

### Flow 3 — Dynamic Role Management (Admin)

1. Admin → View Roles (`GET /api/v1/iam/Role/GetByIndex`).
2. **Create Role**: name, description → `POST /api/v1/iam/Role/create`.
3. **Map Permissions**: Assign permissions to role (many-to-many) → `POST /api/v1/iam/Role/permissions`.
4. **Edit/Delete Role**: `POST /api/v1/iam/Role/update` & `POST /api/v1/iam/Role/delete/:id`.
5. Thay đổi reflect trong JWT payload ở lần login kế tiếp.

### Flow 4 — Password Reset

1. User → forgot password view.
2. Fill email → `POST /api/v1/auth/forgot-password`.
3. Backend: generate `resetPasswordToken` + `resetPasswordExpires`.
4. Send email with reset link.
5. User click link → fill new password → `POST /api/v1/auth/reset-password`.
6. Validate token + update password hash.

## 7. Database Schema

Tham chiếu: [`auth-schema.md`](../schema/auth-schema.md)

Bảng chính:
- `users` — id, email, password, name, roleId, status, subscriptionTier, resetPasswordToken
- `roles` — id, name, description
- `permissions` — id, name, description
- `_RoleToPermission` — Prisma implicit many-to-many

## 8. Related modules

- **CONFIG** (UC-C01) — User Directory management
- **CONFIG** (UC-C02) — Mentor Verification workflow
- **LEARNER** — JWT auth guard cho mọi protected route
- **MENTOR** — Role + profile status check

## 9. Business Rules

| Rule ID | Rule |
|---|---|
| **BR-AUTH-01** | Email unique across platform (`BR-01` master) |
| **BR-AUTH-02** | Password hash bcrypt work factor ≥ 10 |
| **BR-AUTH-03** | Access token expiry: 24h|
| **BR-AUTH-04** | Admin role cannot be registered publicly — chỉ Admin tạo |
| **BR-AUTH-05** | BANNED status → immediate JWT invalidation |
| **BR-AUTH-06** | Frontend decode JWT payload để toggle UI features |

## 10. SubscriptionTier (Parallel Concept)

| Tier | Mô tả |
|---|---|
| `FREE` | Gói miễn phí — features cơ bản |
| `VIP` | Gói VIP — features nâng cao |
| `PRO` | Gói PRO — toàn bộ features |

> Subscription tier độc lập với Role. User có thể là `LEARNER` + `PRO` hoặc `MENTOR` + `FREE`.
