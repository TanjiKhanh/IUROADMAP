# CONFIG — Admin Configuration & User Governance

> ✅ **Đã implement** — User directory governance và Mentor verification đã hoạt động.

## 1. Module description

Admin Configuration cho phép Administrators quản lý user directory (accounts, roles, status, subscription), review và verify mentor applications. Là module quản trị trung tâm cho toàn bộ nhân sự hệ thống.

## 2. Tên viết tắt

- **CONFIG** = Admin Configuration & User Governance
- Vietnamese: **Cấu hình Quản trị & Quản lý Người dùng**

## 3. Submodules

| Submodule | Mô tả | URL |
|---|---|---|
| **User Directory** | CRUD accounts, roles, status, subscription | `/api/v1/iam/User/GetByIndex` |
| **Mentor Verification** | Review + approve/reject mentor applications | `/api/v1/iam/mentors/pending` |

## 4. Actors

| Role | Trách nhiệm |
|---|---|
| **Admin** | CRUD users, verify mentors, assign roles, suspend accounts |
| **Superadmin** | Admin + hard delete users |

## 5. Core flows

### Flow 1 — Manage User Directory (UC-C01)

1. Admin → View list (`GET /api/v1/iam/User/GetByIndex`).
2. System validate `Role == ADMIN` hoặc `SUPERADMIN`.
3. Display data table: `Name`, `Email`, `Role`, `Status`, `SubscriptionTier`, `SubscriptionExpiresAt`, `Actions`.

**Search & Filter:**
4. Search bar: by Name, Email.
5. Dropdown filters: Role, SubscriptionTier (`FREE`/`VIP`/`PRO`), Date range (subscriptionExpiresAt).
6. Dynamic filtering on table.

**Create User:**
7. Click **"Add New User"** → modal.
8. Fill: `Full Name`, `Email`, `Password`, `Role` (dropdown).
9. `POST /api/v1/iam/User/create`.
10. Backend: check email uniqueness → bcrypt hash → insert → `"User account created successfully"`.
11. Refresh table.

**Edit User:**
12. Click **"Edit"** on row → populate form.
13. Modify: `Name`, `Role` (e.g., → Collaborator), `Status`, `SubscriptionTier`.
14. `POST /api/v1/iam/User/update`.
15. Backend: update → `"User updated successfully"`.

**Suspend User:**
16. Click **"Suspend"** → confirmation prompt.
17. `POST /api/v1/iam/User/softDelete/:id`.
18. Backend: update status to `BANNED` → **immediately invalidate JWT** → `"User account has been suspended"`.
19. User không thể đăng nhập cho đến khi unban.

**Delete User (Superadmin only):**
20. Click **"Delete"** → confirmation: `"Are you sure you want to permanently delete this account?"`.
21. Backend validate: `userId != currentAdminId` (self-deletion prevention).
22. If self-deletion → `400 "Cannot delete your own administrative account."`.
23. Otherwise → `POST /api/v1/iam/User/delete/:id`.
24. Cascade: delete `user_roadmaps`, `user_course_progress`, tokens.
25. `"User deleted successfully"`.

**Alternative Flows:**
- **A1** – Email already exists → `"Email already exists in the system"`.
- **A2** – Missing fields → `"Please fill in all required fields"`.

### Flow 2 — Verify Mentors (UC-C02)

1. Admin → `/api/v1/iam/mentors/pending` (UI view).
2. System display table: pending mentor applicants (`mentor_profiles WHERE status == PENDING`).
3. Columns: Applicant Name, Email, Bio Preview, Expertise, Applied Date, Actions.

**View Details:**
4. Click **"View Details"** → expand/modal with full profile:
   - Bio (full text).
   - Expertise skills array.
   - LinkedIn / GitHub URLs.
   - Portfolio links.

**Approve:**
5. Click **"Approve"** → confirmation prompt.
6. `POST /api/v1/iam/mentors/:id/approve`.
7. Backend:
   a. Update `users.role = MENTOR`.
   b. Update `mentor_profiles.status = APPROVED`.
   c. Trigger approval email notification.
8. `"Mentor application approved successfully"`.
9. Refresh table.

**Reject:**
10. Click **"Reject"** → modal with **mandatory** `"Rejection Reason"` textarea.
11. Validate: reason not empty (`@IsNotEmpty()`).
12. If empty → `"Please provide a reason for rejection"` → block submission.
13. `POST /api/v1/iam/mentors/:id/reject` with `{ rejectionReason }`.
14. Backend:
    a. Update `mentor_profiles.status = REJECTED`.
    b. Store `mentor_profiles.rejectionReason = text`.
    c. Downgrade `users.role = LEARNER`.
    d. Trigger rejection email **containing the reason**.
15. `"Mentor application rejected"`.
16. Refresh table.

## 6. Database Schema

Tham chiếu: [`auth-schema.md`](../schema/auth-schema.md), [`mentor-schema.md`](../schema/mentor-schema.md)

Bảng liên quan:
- `users` — email, password, roleId, status, subscriptionTier, subscriptionExpiresAt
- `roles` — name, description
- `mentor_profiles` — userId, bio, expertise[], status, rejectionReason

## 7. Related modules

- **AUTH** — Users table, JWT invalidation
- **MENTOR** — Mentor Portal unlocked after approval
- **LEARNER** — User accounts, enrollment data

## 8. Business Rules

| Rule ID | Rule |
|---|---|
| **BR-CFG-01** | Admin không thể thay đổi role của Superadmin |
| **BR-CFG-02** | Admin không thể downgrade role của chính mình |
| **BR-CFG-03** | Admin không thể delete tài khoản chính mình (`BR-11` master) |
| **BR-CFG-04** | `BANNED` status → invalidate JWT session ngay lập tức |
| **BR-CFG-05** | Hard delete chỉ Superadmin thực hiện được |
| **BR-CFG-06** | Rejection reason bắt buộc khi reject mentor (`BR-06` master) |
| **BR-CFG-07** | Mentor rejected → role downgrade về `LEARNER` |
| **BR-CFG-08** | Email unique across platform khi create user |
