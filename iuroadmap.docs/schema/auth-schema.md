# Auth Service Schema

```mermaid
erDiagram
    User {
        String id PK
        String email UK
        String password
        String name
        String roleId FK
        AccountStatus status
        SubscriptionTier subscriptionTier
        DateTime subscriptionExpiresAt
        String resetPasswordToken
        DateTime resetPasswordExpires
        DateTime emailVerifiedAt
        String emailVerificationCode
        DateTime emailVerificationExpires
        Int emailVerificationAttempts
        DateTime createdAt
        DateTime updatedAt
    }
    Role {
        String id PK
        String name UK
        String description
        DateTime createdAt
        DateTime updatedAt
    }
    PermissionGroup {
        String id PK
        String name UK
        String description
        DateTime createdAt
        DateTime updatedAt
    }
    Permission {
        String id PK
        String name UK
        String displayName
        String description
        String groupId FK
        DateTime createdAt
        DateTime updatedAt
    }
    
    Role ||--o{ User : "users"
    Role }|--|{ Permission : "permissions (many-to-many)"
    PermissionGroup ||--o{ Permission : "permissions"
```

---

# `User` — Người dùng hệ thống

**Khối:** Auth Service  
**Mục đích:** Bảng gốc quản lý thông tin đăng nhập, trạng thái tài khoản và vai trò (Role). Bảng này là "Source of Truth" cho định danh người dùng.

## Enum liên quan
* `AccountStatus`: `PENDING_APPROVAL`, `ACTIVE`, `BANNED`, `REJECTED`.
* `SubscriptionTier`: `FREE`, `VIP`, `PRO`. Gói cước độc lập với Role (User có thể là `LEARNER` + `PRO` hoặc `MENTOR` + `FREE`).

## Cột (PostgreSQL)

| Cột | Kiểu | Khóa | Null | Mặc định | Mô tả |
|---|---|---|---|---|---|
| `id` | `String` | PK | N | `uuid()` | Khóa chính (UUID) |
| `email` | `String` | UK | N | | Email đăng nhập (duy nhất toàn hệ thống). Luôn lưu dạng đã `trim` + chữ thường (BR-AUTH-01); CHECK constraint `User_email_normalized_check` chặn mọi giá trị chưa chuẩn hoá |
| `password` | `String` | — | N | | Mật khẩu (đã hash bcrypt, work factor ≥ 10) |
| `name` | `String` | — | Y | | Tên hiển thị của người dùng |
| `roleId` | `String` | FK | N | | FK tham chiếu đến `Role.id` |
| `status` | `AccountStatus` | — | N | `ACTIVE` | Trạng thái tài khoản (điều khiển login, UI, feature access) |
| `subscriptionTier` | `SubscriptionTier` | — | N | `FREE` | Gói cước hiện tại (FREE / VIP / PRO) |
| `subscriptionExpiresAt` | `DateTime` | — | Y | | Ngày hết hạn gói cước VIP/PRO |
| `resetPasswordToken` | `String` | — | Y | | Token cấp phát khi quên mật khẩu |
| `resetPasswordExpires` | `DateTime` | — | Y | | Hạn sử dụng token quên mật khẩu |
| `emailVerifiedAt` | `DateTime` | — | Y | | Thời điểm email được xác minh. `NULL` = tài khoản đăng ký bằng mật khẩu chưa nhập mã OTP, chưa được đăng nhập (FL-AUTH-13) |
| `emailVerificationCode` | `String` | — | Y | | bcrypt hash của mã OTP 6 chữ số đang hiệu lực (không lưu mã gốc) |
| `emailVerificationExpires` | `DateTime` | — | Y | | Hạn dùng của mã OTP (15 phút). Thời điểm gửi = hạn dùng − 15 phút, dùng để tính thời gian chờ gửi lại |
| `emailVerificationAttempts` | `Int` | — | N | `0` | Số lần nhập sai mã hiện tại; đủ 5 lần thì mã bị huỷ, phải gửi mã mới |
| `createdAt` | `DateTime` | — | N | `now()` | Thời điểm tạo |
| `updatedAt` | `DateTime` | — | N | `@updatedAt` | Thời điểm cập nhật cuối |

## Quan hệ
**Tham chiếu ra (FK):**
- `roleId` → `Role.id`

## AccountStatus Lifecycle
```mermaid
stateDiagram-v2
    [*] --> ACTIVE : Register as Learner
    [*] --> PENDING_APPROVAL : Register as Mentor
    PENDING_APPROVAL --> ACTIVE : Admin Approve
    PENDING_APPROVAL --> REJECTED : Admin Reject
    ACTIVE --> BANNED : Admin Suspend/Ban
    BANNED --> ACTIVE : Admin Unban
```

| From | To | Action | Actor | Business Rule |
|---|---|---|---|---|
| *(new)* | `ACTIVE` | Register as Learner | Guest | — |
| *(new)* | `PENDING_APPROVAL` | Register as Mentor | Guest | — |
| `PENDING_APPROVAL` | `ACTIVE` | Approve Mentor | Admin | — |
| `PENDING_APPROVAL` | `REJECTED` | Reject Mentor | Admin | `BR-CFG-06`: rejection reason bắt buộc |
| `ACTIVE` | `BANNED` | Suspend/Ban | Admin | `BR-CFG-04`: invalidate JWT ngay lập tức |
| `BANNED` | `ACTIVE` | Unban | Admin | — |

## Email verification
`emailVerifiedAt` độc lập với `status`: một tài khoản có thể `ACTIVE` (learner) hoặc `PENDING_APPROVAL` (mentor) nhưng vẫn chưa xác minh email.

| Cách tạo / sự kiện | `emailVerifiedAt` |
|---|---|
| Đăng ký learner / mentor bằng mật khẩu | `NULL`, gửi mã OTP |
| Nhập đúng mã OTP (`POST /auth/verify-email`) | `now()` |
| Đặt lại mật khẩu qua mã quên mật khẩu | `now()` (mã được gửi tới email nên đã chứng minh sở hữu email) |
| Đăng nhập Google (email đã được Google xác minh) | `now()`; nếu tài khoản chưa xác minh thì mật khẩu cũ bị thay bằng mật khẩu ngẫu nhiên |
| Admin tạo qua IAM, seed | `now()` |
| Tài khoản có trước migration `AddEmailVerification` | `createdAt` |

## Migrations
Auth được tạo bằng `db push` trước khi có migration. `20260928000000_Init` là baseline (đúng schema lúc đó), `20260928000100_AddEmailVerification` thêm các cột trên và chuẩn hoá email.
- DB **mới**: `npx prisma migrate deploy`.
- DB **đã có bảng** (tạo bằng `db push`, ví dụ production cũ): chạy **một lần** `npx prisma migrate resolve --applied 20260928000000_Init` trước, rồi mới `migrate deploy`.

## Delete Strategy
- **Soft Delete**: Đổi `status` thành `BANNED` (Admin)
- **Hard Delete**: Chỉ `SUPERADMIN` mới được phép (`BR-CFG-05`). Xoá tokens trong auth. Từ Roadmap v2, roadmap của learner nằm ở roadmap-service (`STUDENT_ROADMAPS`), nên auth gọi roadmap-service qua HTTP client để xoá roadmap và ẩn danh hoá bình luận (xem [`roadmap-schema.md`](roadmap-schema.md) § Xoá user). `user_roadmaps`, `user_course_progress` của v1 đã bị bỏ.
- **Self-delete prevention**: Admin không thể xóa tài khoản chính mình (`BR-CFG-03`)

---

# `Role` — Vai trò phân quyền

**Khối:** Auth Service  
**Mục đích:** Lưu trữ các vai trò (VD: ADMIN, LEARNER, MENTOR, SUPERADMIN). Mỗi vai trò được cấp nhiều Permissions thông qua bảng trung gian ẩn `_RoleToPermission` của Prisma.

## Cột (PostgreSQL)

| Cột | Kiểu | Khóa | Null | Mặc định | Mô tả |
|---|---|---|---|---|---|
| `id` | `String` | PK | N | `uuid()` | Khóa chính (UUID) |
| `name` | `String` | UK | N | | Tên vai trò duy nhất (VD: `ADMIN`, `LEARNER`) |
| `description` | `String` | — | Y | | Mô tả chi tiết vai trò |
| `createdAt` | `DateTime` | — | N | `now()` | Thời điểm tạo |
| `updatedAt` | `DateTime` | — | N | `@updatedAt` | Thời điểm cập nhật cuối |

## Quan hệ
- `User[].roleId` → One-to-Many với User
- `Permission[]` → Many-to-Many (Prisma implicit `_RoleToPermission`)

## Default Roles (Seeded)
| Role | Permissions |
|------|-----------|
| `SUPERADMIN` | Tất cả permissions |
| `ADMIN` | Tất cả permissions |
| `LEARNER` | `RM.USER`, `LR.USER` |
| `MENTOR` | `RM.USER`, `LR.USER` |

---

# `PermissionGroup` — Nhóm quyền

**Khối:** Auth Service  
**Mục đích:** Gom nhóm các Permission theo chức năng nghiệp vụ (VD: SYSTEM_MANAGEMENT, USER_MANAGEMENT). Dùng để render Permission Matrix trên giao diện quản lý Role.

## Cột (PostgreSQL)

| Cột | Kiểu | Khóa | Null | Mặc định | Mô tả |
|---|---|---|---|---|---|
| `id` | `String` | PK | N | `uuid()` | Khóa chính (UUID) |
| `name` | `String` | UK | N | | Tên nhóm duy nhất (VD: `SYSTEM_MANAGEMENT`) |
| `description` | `String` | — | Y | | Mô tả nhóm quyền |
| `createdAt` | `DateTime` | — | N | `now()` | Thời điểm tạo |
| `updatedAt` | `DateTime` | — | N | `@updatedAt` | Thời điểm cập nhật cuối |

## Quan hệ
- `Permission[]` → One-to-Many (mỗi Permission thuộc 1 PermissionGroup)

## Default Groups (Seeded from `AppConstant.PMSGroup`)
| Group Name | Constant |
|-----------|----------|
| `SYSTEM_MANAGEMENT` | `AppConstant.PMSGroup.SYSTEM` |
| `USER_MANAGEMENT` | `AppConstant.PMSGroup.USER` |
| `ROADMAP_MANAGEMENT` | `AppConstant.PMSGroup.ROADMAP` |
| `LECTURER_REVIEW_MANAGEMENT` | `AppConstant.PMSGroup.LECTURER` |

---

# `Permission` — Quyền chi tiết

**Khối:** Auth Service  
**Mục đích:** Danh sách các quyền cụ thể theo format `MODULE.LEVEL` (VD: `SYS.AD`, `RM.USER`). Dùng để check quyền trên Backend (encode vào JWT) và toggle giao diện ở Frontend.

## Cột (PostgreSQL)

| Cột | Kiểu | Khóa | Null | Mặc định | Mô tả |
|---|---|---|---|---|---|
| `id` | `String` | PK | N | `uuid()` | Khóa chính (UUID) |
| `name` | `String` | UK | N | | Mã quyền duy nhất (VD: `SYS.AD`, `RM.USER`) |
| `displayName` | `String` | — | Y | | Tên hiển thị trên UI (VD: "Quản trị Roadmap") |
| `description` | `String` | — | Y | | Giải thích chi tiết quyền này |
| `groupId` | `String` | FK | Y | | FK tham chiếu đến `PermissionGroup.id` |
| `createdAt` | `DateTime` | — | N | `now()` | Thời điểm tạo |
| `updatedAt` | `DateTime` | — | N | `@updatedAt` | Thời điểm cập nhật cuối |

## Quan hệ
- `groupId` → `PermissionGroup.id` (Many-to-One)
- `Role[]` → Many-to-Many với Role (Prisma implicit `_RoleToPermission`)

## Default Permissions (Seeded from `APP_PERMISSIONS`)
| Code | Display Name | Group |
|------|-------------|-------|
| `SYS.AD` | Manage System Configuration | `SYSTEM_MANAGEMENT` |
| `RM.USER` | Sử dụng Roadmap (Explore, Clone) | `ROADMAP_MANAGEMENT` |
| `RM.AD` | Quản trị Roadmap | `ROADMAP_MANAGEMENT` |
| `LR.USER` | Xem và đánh giá Giảng viên | `LECTURER_REVIEW_MANAGEMENT` |
| `LR.AD` | Quản trị Đánh giá Giảng viên | `LECTURER_REVIEW_MANAGEMENT` |
| `USER.AD` | Manage Users | `USER_MANAGEMENT` |
