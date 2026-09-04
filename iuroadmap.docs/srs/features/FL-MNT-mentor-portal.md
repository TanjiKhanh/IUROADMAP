# FL-MNT — Mentor Portal

> **Module:** MENTOR — Cổng Cố vấn
> **Version:** 2.0
> **Last Updated:** 2026-08-31
> **Status:** ✅ Implemented — Chi tiết FR chờ tách từ file gốc

---

## Liên kết chéo

- Business Flow → [`05-mentor-portal.md`](../../business-flow/05-mentor-portal.md)
- Database Schema → [`mentor-schema.md`](../../schema/mentor-schema.md)
- Flow tổng quan → [`_OVERVIEW.md`](_OVERVIEW.md)

---

## Tóm tắt FR (từ file gốc — chờ chi tiết hóa)

| FR ID | Yêu cầu | Ưu tiên | Trạng thái |
|---|---|---|---|
| FR-MNT-01 | Verified Mentor xem inbox mentorship requests | P0 | ✅ |
| FR-MNT-02 | Mentor accept/decline requests (accept = atomic create connection) | P0 | ✅ |
| FR-MNT-03 | Mentor quản lý availability calendar (time slots CRUD) | P1 | ✅ |
| FR-MNT-04 | Real-time WebSocket chat giữa Mentor ↔ Learner | P0 | ✅ |
| FR-MNT-05 | Mentor submit post-session feedback (rating + written) | P1 | ✅ |
| FR-MNT-06 | Gate check: Mentor Portal chỉ accessible khi `status == APPROVED` | P0 | ✅ |

> **TODO:** Chi tiết hóa theo format PTW (sub-flows, alternative flows, business rules, error cases, liên kết chéo đầy đủ).
