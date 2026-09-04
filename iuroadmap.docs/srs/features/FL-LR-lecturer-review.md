# FL-LR — Lecturer Review & Course Assessment

> **Module:** LR — Đánh giá Giảng viên & Tiêu chí Đánh giá Môn học
> **Version:** 2.0
> **Last Updated:** 2026-08-31
> **Status:** ⚠️ Chưa implement — Chi tiết FR chờ tách từ file gốc

---

## Liên kết chéo

- Business Flow → [`03-lecturer-review.md`](../../business-flow/03-lecturer-review.md)
- Database Schema → [`lecturer-review-schema.md`](../../schema/lecturer-review-schema.md)
- Flow tổng quan → [`_OVERVIEW.md`](_OVERVIEW.md)

---

## Tóm tắt FR (từ file gốc — chờ chi tiết hóa)

| FR ID | Yêu cầu | Ưu tiên | Trạng thái |
|---|---|---|---|
| FR-LR-01 | Admin CRUD Lecturer Profiles (tên, title, department, specializations, bio) | P0 | 🔲 |
| FR-LR-02 | Admin CRUD Teaching Assignments (GV → Course → Semester) | P0 | 🔲 |
| FR-LR-03 | Admin CRUD Course Assessment Criteria (cấu trúc đánh giá: weight, type per course) | P0 | 🔲 |
| FR-LR-04 | Admin CRUD Academic Semesters | P1 | 🔲 |
| FR-LR-05 | Guest/Student browse Lecturer Directory (search, filter by department) | P0 | 🔲 |
| FR-LR-06 | Guest/Student xem Lecturer Profile: avg ratings, teaching history, review feed | P0 | 🔲 |
| FR-LR-07 | Student submit review cho GV theo course + semester (multi-criteria ratings + text) | P0 | 🔲 |
| FR-LR-08 | Review ratings gồm: difficulty, grading, teaching_quality, content_relevance (1-5 scale) | P0 | 🔲 |
| FR-LR-09 | Review có trường: would_take_again (boolean), grade_received (optional), tags[], anonymous option | P1 | 🔲 |
| FR-LR-10 | Review workflow: PENDING → APPROVED / REJECTED; APPROVED → FLAGGED (report_count ≥ 3) | P0 | 🔲 |
| FR-LR-11 | Admin moderate reviews: approve, reject (mandatory reason), dismiss reports | P1 | 🔲 |
| FR-LR-12 | System generate aggregated review summaries (System Reviews) | P2 | 🔲 |
| FR-LR-13 | Students có thể vote "Helpful" và "Report" reviews | P1 | 🔲 |
| FR-LR-14 | Duplicate prevention: 1 student = 1 review / lecturer / course / semester | P0 | 🔲 |

> **TODO:** Chi tiết hóa theo format PTW (sub-flows, alternative flows, business rules, error cases, liên kết chéo đầy đủ).
