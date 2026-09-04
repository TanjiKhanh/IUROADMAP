# FL-RAG — AI Chatbot (RAG — Retrieval-Augmented Generation)

> **Module:** RAG — AI Chatbot tích hợp RAG
> **Version:** 2.0
> **Last Updated:** 2026-08-31
> **Status:** 🔲 Planned — Chi tiết FR chờ tách từ file gốc

---

## Liên kết chéo

- PRD → [`prd-ai-chatbot-rag.md`](../prd-ai-chatbot-rag.md)
- Database Schema → [`rag-schema.md`](../../schema/rag-schema.md)
- Flow tổng quan → [`_OVERVIEW.md`](_OVERVIEW.md)

---

## Tóm tắt FR (từ file gốc — chờ chi tiết hóa)

### FR-RAG-1xx: Data Ingestion & Indexing

| FR ID | Yêu cầu | Ưu tiên | Trạng thái |
|---|---|---|---|
| FR-RAG-101 | Hệ thống tự động index dữ liệu có cấu trúc từ PostgreSQL vào `rag_documents` (pgvector) | P0 | 🔲 |
| FR-RAG-102 | Hỗ trợ 5 loại source: `REVIEW`, `LECTURER_PROFILE`, `COURSE`, `ASSESSMENT_CRITERIA`, `SYSTEM_SUMMARY` | P0 | 🔲 |
| FR-RAG-103 | Document được chunk theo template chuẩn (500-1000 tokens, overlap 100 tokens) | P0 | 🔲 |
| FR-RAG-104 | Mỗi chunk gắn rich metadata JSON (lecturer_id, course_name, semester, ratings, tags) | P0 | 🔲 |
| FR-RAG-105 | Embedding tạo bằng model `text-embedding-3-small` (OpenAI) hoặc multilingual model tương đương | P0 | 🔲 |
| FR-RAG-106 | ETL pipeline chạy event-driven: trigger khi review APPROVED, lecturer updated, criteria changed | P0 | 🔲 |
| FR-RAG-107 | Re-indexing hỗ trợ versioning — khi re-index, tăng `version` field, cleanup old versions | P1 | 🔲 |
| FR-RAG-108 | Daily cron job re-index toàn bộ để đảm bảo consistency | P2 | 🔲 |
| FR-RAG-109 | Admin có thể trigger manual re-index qua API | P1 | 🔲 |

### FR-RAG-2xx: Query Pipeline & Chatbot

| FR ID | Yêu cầu | Ưu tiên | Trạng thái |
|---|---|---|---|
| FR-RAG-201 | User gửi câu hỏi bằng ngôn ngữ tự nhiên (Tiếng Việt + English) qua chat interface | P0 | 🔲 |
| FR-RAG-202 | Hệ thống embed câu hỏi → hybrid search (vector cosine similarity + BM25 keyword) trên `rag_documents` | P0 | 🔲 |
| FR-RAG-203 | Hỗ trợ metadata filtering trong query: filter by department, course, semester, lecturer | P0 | 🔲 |
| FR-RAG-204 | Top-K chunks (K=5-10) được re-rank rồi feed vào LLM làm context | P0 | 🔲 |
| FR-RAG-205 | LLM generate câu trả lời có citations (trích dẫn source review/lecturer/course) | P0 | 🔲 |
| FR-RAG-206 | Chatbot trả lời các câu hỏi về: môn học, prerequisite, giảng viên, tips học tập, assessment criteria | P0 | 🔲 |
| FR-RAG-207 | Nếu không tìm thấy context phù hợp → trả lời "Tôi không có đủ thông tin" thay vì hallucinate | P0 | 🔲 |
| FR-RAG-208 | Conversation history được lưu để support multi-turn chat (follow-up questions) | P1 | 🔲 |
| FR-RAG-209 | Guest có thể hỏi chatbot (giới hạn 5 câu/ngày), Learner không giới hạn | P1 | 🔲 |
| FR-RAG-210 | Response streaming (Server-Sent Events) để hiển thị real-time typing effect | P1 | 🔲 |

### FR-RAG-3xx: Conversation Management

| FR ID | Yêu cầu | Ưu tiên | Trạng thái |
|---|---|---|---|
| FR-RAG-301 | User có thể tạo conversation mới (new chat) | P0 | 🔲 |
| FR-RAG-302 | User xem lịch sử conversations đã tạo (sidebar list) | P1 | 🔲 |
| FR-RAG-303 | User có thể rename conversation | P2 | 🔲 |
| FR-RAG-304 | User có thể xóa conversation | P1 | 🔲 |
| FR-RAG-305 | Suggested questions hiển thị khi bắt đầu chat mới (dựa trên popular queries) | P2 | 🔲 |

### FR-RAG-4xx: Admin & Analytics

| FR ID | Yêu cầu | Ưu tiên | Trạng thái |
|---|---|---|---|
| FR-RAG-401 | Admin xem dashboard: tổng conversations, queries/ngày, popular topics | P2 | 🔲 |
| FR-RAG-402 | Admin xem feedback ratings trên câu trả lời (thumbs up/down) | P2 | 🔲 |
| FR-RAG-403 | User có thể rate câu trả lời (👍/👎) để cải thiện chất lượng | P1 | 🔲 |
| FR-RAG-404 | Admin quản lý system prompts / behavior rules cho chatbot | P2 | 🔲 |

> **TODO:** Chi tiết hóa theo format PTW (sub-flows, alternative flows, business rules, error cases, liên kết chéo đầy đủ).
