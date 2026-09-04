# Functional Requirements Document (FRD)

> **Project:** IUROADMAP — IU Academic Roadmap & AI Assistant
> **Version:** 2.0
> **Last Updated:** 2026-08-31
> **Status:** In Progress

---

## 1. Giới thiệu

### 1.1 Mục đích tài liệu

Tài liệu này là **index tổng hợp** cho toàn bộ yêu cầu chức năng (Functional Requirements) của hệ thống IUROADMAP. Chi tiết FR từng module được tách vào folder [`features/`](features/) theo cấu trúc 1 file / module.

### 1.2 Phạm vi hệ thống

IUROADMAP bao gồm 7 module chính:

| Module | Viết tắt | Trạng thái | FR chi tiết | Business Flow |
|---|---|---|---|---|
| Authentication & RBAC | AUTH | ✅ Implemented | [`FL-AUTH-authentication-rbac.md`](features/FL-AUTH-authentication-rbac.md) ★ | [`00-authentication-rbac.md`](../business-flow/00-authentication-rbac.md) |
| Learner Portal | LEARNER | ✅ Implemented | [`FL-LRN-learner-portal.md`](features/FL-LRN-learner-portal.md) | [`01-learner-portal.md`](../business-flow/01-learner-portal.md) |
| Roadmap Management | ROADMAP | ✅ Implemented | [`FL-RDM-roadmap-management.md`](features/FL-RDM-roadmap-management.md) | [`02-roadmap-management.md`](../business-flow/02-roadmap-management.md) |
| Lecturer Review & Assessment | LR | ⚠️ Chưa implement | [`FL-LR-lecturer-review.md`](features/FL-LR-lecturer-review.md) | [`03-lecturer-review.md`](../business-flow/03-lecturer-review.md) |
| Admin Configuration | CONFIG | ✅ Implemented | [`FL-CFG-admin-configuration.md`](features/FL-CFG-admin-configuration.md) | [`04-admin-configuration.md`](../business-flow/04-admin-configuration.md) |
| Mentor Portal | MENTOR | ✅ Implemented | [`FL-MNT-mentor-portal.md`](features/FL-MNT-mentor-portal.md) | [`05-mentor-portal.md`](../business-flow/05-mentor-portal.md) |
| **AI Chatbot (RAG)** | **RAG** | **🔲 Planned** | [`FL-RAG-ai-chatbot.md`](features/FL-RAG-ai-chatbot.md) | [`rag-schema.md`](../schema/rag-schema.md) |

> ★ = Đã chi tiết hóa theo format PTW. Các module khác đang ở dạng stub chờ bổ sung.

### 1.3 Cấu trúc thư mục FR

```
srs/
├── functional-requirements.md          ← Bạn đang ở đây (index)
├── non-functional-requirements.md
├── prd-ai-chatbot-rag.md
└── features/                           ← Chi tiết FR theo module
    ├── _OVERVIEW.md                    ← Bản đồ flow tổng quan
    ├── FL-AUTH-authentication-rbac.md  ← ★ Chi tiết (11 sub-flows)
    ├── FL-LRN-learner-portal.md       ← Stub
    ├── FL-RDM-roadmap-management.md   ← Stub
    ├── FL-LR-lecturer-review.md       ← Stub
    ├── FL-CFG-admin-configuration.md  ← Stub
    ├── FL-MNT-mentor-portal.md        ← Stub
    └── FL-RAG-ai-chatbot.md           ← Stub
```

### 1.4 Quy ước ID

- **Flow:** `FL-<MODULE>` (vd `FL-AUTH`, `FL-LRN`)
- **Sub-flow:** `FL-<MODULE>-<nn>` (vd `FL-AUTH-06`)
- **FR:** `FR-<MODULE>.<sub-flow>.<n>` (vd `FR-AUTH.06.3`)
- **Ưu tiên:** Must / Should / Could
- **Nguồn:** truy vết tài liệu gốc (business flow, schema, etc.)

### 1.5 Actors tổng hợp

| Actor | Mô tả |
|---|---|
| **Guest** | Truy cập công khai: browse majors, view reviews, hỏi chatbot (giới hạn) |
| **Learner** | Sinh viên đã đăng ký: clone roadmap, track progress, submit reviews, chat AI không giới hạn |
| **Mentor** | Cố vấn được duyệt: quản lý requests, chat learner, feedback |
| **Admin** | Quản trị: CRUD data, moderate reviews, quản lý users, roles, permissions |
| **Superadmin** | Toàn quyền: hard delete, system config |
| **System** | Auto-processes: RAG indexing, review moderation, summary generation |

---

## 2. Tóm tắt FR theo Module

> Chi tiết đầy đủ → xem file tương ứng trong [`features/`](features/).
> Bản đồ flow tổng quan → [`features/_OVERVIEW.md`](features/_OVERVIEW.md).

---

### FR-AUTH: Authentication & RBAC ★

**File:** [`features/FL-AUTH-authentication-rbac.md`](features/FL-AUTH-authentication-rbac.md)

11 sub-flows chi tiết:

| Sub-flow | Tên | Trạng thái |
|---|---|---|
| FL-AUTH-00 | Permission Model & State Machine | ✅ |
| FL-AUTH-01 | Đăng ký Learner | ✅ |
| FL-AUTH-02 | Đăng ký Mentor | ✅ |
| FL-AUTH-03 | Đăng nhập (JWT) | ✅ |
| FL-AUTH-04 | Quên & Đặt lại mật khẩu | ✅ |
| FL-AUTH-05 | Đổi mật khẩu (khi đăng nhập) | 🆕 Should |
| FL-AUTH-06 | Quản lý Role & Permission Matrix ★ | ✅ |
| FL-AUTH-07 | Quản lý User Directory | ✅ |
| FL-AUTH-08 | Duyệt Mentor Application | ✅ |
| FL-AUTH-09 | Cấm / Mở khóa User | ✅ |
| FL-AUTH-10 | Đăng xuất & Session | ✅ |
| FL-AUTH-11 | Cross-cutting (Guard, Audit, Profile) | ✅/🆕 |

**Tổng:** 70+ FR chi tiết, 12 Business Rules, Permission Matrix với 12 permissions × 6 groups.

---

### FR-LRN: Learner Portal

**File:** [`features/FL-LRN-learner-portal.md`](features/FL-LRN-learner-portal.md) — 10 FR (stub)

---

### FR-RDM: Roadmap Management

**File:** [`features/FL-RDM-roadmap-management.md`](features/FL-RDM-roadmap-management.md) — 8 FR (stub)

---

### FR-LR: Lecturer Review & Assessment

**File:** [`features/FL-LR-lecturer-review.md`](features/FL-LR-lecturer-review.md) — 14 FR (stub, chưa implement)

---

### FR-CFG: Admin Configuration

**File:** [`features/FL-CFG-admin-configuration.md`](features/FL-CFG-admin-configuration.md) — 6 FR (stub)

---

### FR-MNT: Mentor Portal

**File:** [`features/FL-MNT-mentor-portal.md`](features/FL-MNT-mentor-portal.md) — 6 FR (stub)

---

### FR-RAG: AI Chatbot (RAG) 🆕

**File:** [`features/FL-RAG-ai-chatbot.md`](features/FL-RAG-ai-chatbot.md) — 28 FR (stub, planned)

---

## 3. Ma trận Actor × Feature

| Feature | Guest | Learner | Mentor | Admin | Superadmin | System |
|---|---|---|---|---|---|---|
| Register / Login | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Manage Roles & Permissions | — | — | — | ✅ | ✅ | — |
| Manage Users | — | — | — | ✅ | ✅ | — |
| Browse Majors/Courses | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Clone Roadmap | — | ✅ | — | — | — | — |
| Track Progress | — | ✅ | — | — | — | — |
| Submit Review | — | ✅ | — | — | — | — |
| Browse Reviews | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| AI Chatbot (limited) | ✅ | — | — | — | — | — |
| AI Chatbot (unlimited) | — | ✅ | ✅ | ✅ | ✅ | — |
| Mentor Chat | — | ✅ | ✅ | — | — | — |
| CRUD Academic Data | — | — | — | ✅ | ✅ | — |
| Moderate Reviews | — | — | — | ✅ | ✅ | ✅ |
| RAG Indexing | — | — | — | ✅ | ✅ | ✅ |
