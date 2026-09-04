# FUNCTIONAL REQUIREMENTS — Bản đồ Flow tổng quan

> **Project:** IUROADMAP — IU Academic Roadmap & AI Assistant
> **Version:** 2.0
> **Last Updated:** 2026-08-31
> **Status:** In Progress

---

**Quy ước ID:** Module = `FL-<MODULE>`; FR = `FR-<MODULE>.<sub-flow>.<n>` (vd `FR-AUTH.06.3`).
Cột **Ưu tiên**: Must / Should / Could.
Cột **Nguồn** truy vết tài liệu gốc.

> **Ngôn ngữ / trạng thái actor:** giữ mã trạng thái tiếng Anh (`ACTIVE`, `BANNED`,…) + vai trò (`ADMIN`, `LEARNER`,…) như DB + business logic.
>
> **Tên bảng/cột trong FR = vật lý** (`User`, `Role`, `Permission`, `PermissionGroup`…) — [`auth-schema.md`](../schema/auth-schema.md).

---

## Actors tổng hợp

| Actor | Mô tả |
|---|---|
| **Guest** | Truy cập công khai: browse majors, view reviews, hỏi chatbot (giới hạn) |
| **Learner** | Sinh viên đã đăng ký: clone roadmap, track progress, submit reviews, chat AI không giới hạn |
| **Mentor** | Cố vấn được duyệt: quản lý requests, chat learner, feedback |
| **Admin** | Quản trị: CRUD data, moderate reviews, quản lý users, roles, permissions |
| **Superadmin** | Toàn quyền: hard delete, system config, short-circuit permission |
| **System** | Auto-processes: RAG indexing, review moderation, summary generation |

---

## Bản đồ Flow

| FL | Tên flow | Trigger chính | Actor | Trạng thái liên quan | File chi tiết |
|---|---|---|---|---|---|
| **FL-AUTH** | Authentication & RBAC | Đăng ký / Đăng nhập / Quản lý IAM | Guest, Admin, Superadmin | `ACTIVE`, `PENDING_APPROVAL`, `BANNED`, `REJECTED` | [`FL-AUTH-authentication-rbac.md`](FL-AUTH-authentication-rbac.md) |
| **FL-LRN** | Learner Portal | Learner browse / enroll / track | Guest, Learner | — | [`FL-LRN-learner-portal.md`](FL-LRN-learner-portal.md) |
| **FL-RDM** | Roadmap Management | Admin CRUD roadmap data | Admin | — | [`FL-RDM-roadmap-management.md`](FL-RDM-roadmap-management.md) |
| **FL-LR** | Lecturer Review & Assessment | Student submit review | Learner, Admin, System | `PENDING`, `APPROVED`, `REJECTED`, `FLAGGED` | [`FL-LR-lecturer-review.md`](FL-LR-lecturer-review.md) |
| **FL-CFG** | Admin Configuration | Admin quản trị hệ thống | Admin, Superadmin | — | [`FL-CFG-admin-configuration.md`](FL-CFG-admin-configuration.md) |
| **FL-MNT** | Mentor Portal | Mentor quản lý mentorship | Learner, Mentor | `PENDING`, `ACCEPTED`, `DECLINED` | [`FL-MNT-mentor-portal.md`](FL-MNT-mentor-portal.md) |
| **FL-RAG** | AI Chatbot (RAG) | User hỏi chatbot | Guest, Learner, System | — | [`FL-RAG-ai-chatbot.md`](FL-RAG-ai-chatbot.md) |

---

## Ma trận Actor × Module

| Feature | Guest | Learner | Mentor | Admin | Superadmin | System |
|---|---|---|---|---|---|---|
| Register / Login | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Manage Roles & Permissions | — | — | — | ✅ | ✅ | — |
| Manage Users | — | — | — | ✅ | ✅ | — |
| Browse Majors/Courses | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Clone Roadmap & Track | — | ✅ | — | — | — | — |
| CRUD Roadmap Data | — | — | — | ✅ | ✅ | — |
| Submit/Browse Reviews | ✅(view) | ✅ | ✅(view) | ✅ | ✅ | — |
| Moderate Reviews | — | — | — | ✅ | ✅ | ✅ |
| Mentor Chat | — | ✅ | ✅ | — | — | — |
| AI Chatbot (limited) | ✅ | — | — | — | — | — |
| AI Chatbot (unlimited) | — | ✅ | ✅ | ✅ | ✅ | — |
| RAG Indexing & Admin | — | — | — | ✅ | ✅ | ✅ |

---

## Ma trận truy vết (Flow ↔ Business Flow ↔ Schema ↔ API)

| Flow | Business Flow Doc | Schema | API Base |
|---|---|---|---|
| FL-AUTH | [`00-authentication-rbac.md`](../../business-flow/00-authentication-rbac.md) | [`auth-schema.md`](../../schema/auth-schema.md) | `/api/v1/auth/*`, `/api/v1/iam/*` |
| FL-LRN | [`01-learner-portal.md`](../../business-flow/01-learner-portal.md) | [`roadmap-schema.md`](../../schema/roadmap-schema.md) | `/api/v1/roadmap/*`, `/api/v1/progress/*` |
| FL-RDM | [`02-roadmap-management.md`](../../business-flow/02-roadmap-management.md) | [`roadmap-schema.md`](../../schema/roadmap-schema.md) | `/api/v1/admin/roadmap/*` |
| FL-LR | [`03-lecturer-review.md`](../../business-flow/03-lecturer-review.md) | [`lecturer-review-schema.md`](../../schema/lecturer-review-schema.md) | `/api/v1/lecturers/*`, `/api/v1/reviews/*` |
| FL-CFG | [`04-admin-configuration.md`](../../business-flow/04-admin-configuration.md) | [`user-schema.md`](../../schema/user-schema.md) | `/api/v1/admin/*` |
| FL-MNT | [`05-mentor-portal.md`](../../business-flow/05-mentor-portal.md) | [`mentor-schema.md`](../../schema/mentor-schema.md) | `/api/v1/mentor/*` |
| FL-RAG | *(planned)* | [`rag-schema.md`](../../schema/rag-schema.md) | `/api/v1/chat/*` |
