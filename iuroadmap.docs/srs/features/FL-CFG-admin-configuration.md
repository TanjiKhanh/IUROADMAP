# FL-CFG — Admin Configuration

> **Module:** CONFIG — Quản trị hệ thống
> **Version:** 2.0
> **Last Updated:** 2026-08-31
> **Status:** ✅ Implemented — Chi tiết FR chờ tách từ file gốc

---

## Liên kết chéo

- Business Flow → [`04-admin-configuration.md`](../../business-flow/04-admin-configuration.md)
- Database Schema → [`user-schema.md`](../../schema/user-schema.md)
- Flow tổng quan → [`_OVERVIEW.md`](_OVERVIEW.md)

---

## Tóm tắt FR (từ file gốc — chờ chi tiết hóa)

| FR ID | Yêu cầu | Ưu tiên | Trạng thái |
|---|---|---|---|
| FR-CFG-01 | Admin CRUD user accounts (create, update, soft-delete/ban) | P0 | ✅ |
| FR-CFG-02 | Superadmin hard-delete users (cascade: roadmaps, progress, tokens) | P1 | ✅ |
| FR-CFG-03 | Admin review + approve/reject mentor applications | P0 | ✅ |
| FR-CFG-04 | Reject mentor yêu cầu mandatory rejection reason | P0 | ✅ |
| FR-CFG-05 | Ban user → immediate JWT invalidation | P0 | ✅ |
| FR-CFG-06 | Admin không thể delete/downgrade chính mình | P1 | ✅ |

> **Ghi chú:** Nhiều FR-CFG trùng lặp với FL-AUTH (user management, mentor approval). Sau khi chi tiết hóa, sẽ merge vào FL-AUTH và FL-CFG chỉ giữ configuration-specific FR (system settings, etc.).

> **TODO:** Chi tiết hóa theo format PTW, tách rõ phần nào thuộc AUTH vs CONFIG riêng.
