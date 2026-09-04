# FL-LRN — Learner Portal

> **Module:** LEARNER — Cổng thông tin sinh viên
> **Version:** 2.0
> **Last Updated:** 2026-08-31
> **Status:** ✅ Implemented — Chi tiết FR chờ tách từ file gốc

---

## Liên kết chéo

- Business Flow → [`01-learner-portal.md`](../../business-flow/01-learner-portal.md)
- Database Schema → [`roadmap-schema.md`](../../schema/roadmap-schema.md)
- Flow tổng quan → [`_OVERVIEW.md`](_OVERVIEW.md)

---

## Tóm tắt FR (từ file gốc — chờ chi tiết hóa)

| FR ID | Yêu cầu | Ưu tiên | Trạng thái |
|---|---|---|---|
| FR-LRN-01 | Guest/Learner có thể browse danh sách ngành học theo khoa (Department → Major) | P0 | ✅ |
| FR-LRN-02 | Guest/Learner có thể xem chi tiết ngành: mô tả, tổng tín chỉ, prerequisite graph preview | P0 | ✅ |
| FR-LRN-03 | Learner có thể clone (enroll) roadmap vào dashboard cá nhân | P0 | ✅ |
| FR-LRN-04 | Clone roadmap tự động khởi tạo progress cho root courses (status = AVAILABLE) | P0 | ✅ |
| FR-LRN-05 | Learner xem dashboard tổng hợp các roadmap đã enroll với progress bar | P0 | ✅ |
| FR-LRN-06 | Learner xem Macro Canvas: interactive 2D graph với course nodes, prerequisite edges, color-coded status | P0 | ✅ |
| FR-LRN-07 | Learner drill-down vào Micro View: topics, learning objectives, resources | P0 | ✅ |
| FR-LRN-08 | Learner mark course/topic status: AVAILABLE → IN_PROGRESS → COMPLETED (với prerequisite validation) | P0 | ✅ |
| FR-LRN-09 | Hệ thống tự động tính progress percentage: `(Completed / Total) × 100` | P1 | ✅ |
| FR-LRN-10 | Không cho phép duplicate enrollment (1 user = 1 enrollment/major) | P1 | ✅ |

> **TODO:** Chi tiết hóa theo format PTW (sub-flows, alternative flows, business rules, error cases, liên kết chéo đầy đủ).
