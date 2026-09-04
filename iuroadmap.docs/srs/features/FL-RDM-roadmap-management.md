# FL-RDM — Roadmap Management

> **Module:** ROADMAP — Quản trị Roadmap học thuật
> **Version:** 2.0
> **Last Updated:** 2026-08-31
> **Status:** ✅ Implemented — Chi tiết FR chờ tách từ file gốc

---

## Liên kết chéo

- Business Flow → [`02-roadmap-management.md`](../../business-flow/02-roadmap-management.md)
- Database Schema → [`roadmap-schema.md`](../../schema/roadmap-schema.md)
- Flow tổng quan → [`_OVERVIEW.md`](_OVERVIEW.md)

---

## Tóm tắt FR (từ file gốc — chờ chi tiết hóa)

| FR ID | Yêu cầu | Ưu tiên | Trạng thái |
|---|---|---|---|
| FR-RDM-01 | Admin CRUD Departments (khoa) | P0 | ✅ |
| FR-RDM-02 | Admin CRUD Major Roadmaps (ngành) thuộc Department | P0 | ✅ |
| FR-RDM-03 | Admin quản lý Course Nodes bằng Macro Canvas Editor (drag-and-drop, add/remove nodes & edges) | P0 | ✅ |
| FR-RDM-04 | Admin quản lý Topic Nodes bằng Micro Canvas Editor | P0 | ✅ |
| FR-RDM-05 | Mỗi Course Node lưu: name, slug, credits, description, coords (x,y) | P0 | ✅ |
| FR-RDM-06 | Mỗi Topic Node lưu: title, description, learning_objectives, resources_url, coords | P0 | ✅ |
| FR-RDM-07 | Prerequisite relationships lưu dạng directed graph (source → target) | P0 | ✅ |
| FR-RDM-08 | Canvas save endpoint lưu batch toàn bộ nodes + edges trong 1 transaction | P1 | ✅ |

> **TODO:** Chi tiết hóa theo format PTW (sub-flows, alternative flows, business rules, error cases, liên kết chéo đầy đủ).
