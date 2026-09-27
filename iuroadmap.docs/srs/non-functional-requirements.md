# Non-Functional Requirements (NFR)

> **Project:** IUROADMAP — IU Academic Roadmap & AI Assistant
> **Version:** 1.0
> **Last Updated:** 2026-08-29
> **Status:** Draft

---

## 1. Giới thiệu

Tài liệu này mô tả toàn bộ **yêu cầu phi chức năng** (Non-Functional Requirements) của hệ thống IUROADMAP, bao gồm: Performance, Security, Scalability, Availability, Maintainability, và các ràng buộc kỹ thuật cho RAG AI chatbot.

---

## 2. Performance Requirements

### 2.1 Response Time

| ID | Yêu cầu | Target | Đo bằng |
|---|---|---|---|
| NFR-PERF-01 | API response time (CRUD endpoints) | ≤ 500ms (95th percentile) | Latency monitoring |
| NFR-PERF-02 | Dashboard load (Learner Portal) | ≤ 3.0s (95th percentile) | Page load time |
| NFR-PERF-03 | Macro Canvas rendering (React Flow graph) | ≤ 2.0s cho 100 nodes | Frontend profiling |
| NFR-PERF-04 | Micro View query (`GET /roadmaps/course/:id`) | ≤ 1.0s | API latency |
| NFR-PERF-05 | Status mutation (Mark Completed) | ≤ 1.0s | API latency |
| NFR-PERF-06 | **AI Chatbot — First token** | ≤ 2.0s (time-to-first-token) | SSE stream start |
| NFR-PERF-07 | **AI Chatbot — Full response** | ≤ 10s cho câu trả lời trung bình | End-to-end latency |
| NFR-PERF-08 | **RAG Vector search** | ≤ 200ms cho top-K retrieval | pgvector query time |
| NFR-PERF-09 | Login / Register | ≤ 1.5s (bao gồm bcrypt hash) | API latency |
| NFR-PERF-10 | Search / Filter (Lecturer, Review) | ≤ 1.0s | API latency |

### 2.2 Throughput

| ID | Yêu cầu | Target |
|---|---|---|
| NFR-THR-01 | Concurrent users (normal load) | 200 users đồng thời |
| NFR-THR-02 | Concurrent users (peak — đầu/cuối kỳ) | 500 users đồng thời |
| NFR-THR-03 | AI Chatbot concurrent queries | 20 queries đồng thời |
| NFR-THR-04 | WebSocket connections (Mentor Chat) | 100 connections đồng thời |

---

## 3. Security Requirements

### 3.1 Authentication & Authorization

| ID | Yêu cầu | Chi tiết |
|---|---|---|
| NFR-SEC-01 | Password hashing | `bcrypt` với work factor ≥ 10 |
| NFR-SEC-02 | JWT token security | Access token expiry: 24h, signed với HS256/RS256 |
| NFR-SEC-03 | Role-Based Access Control | Dynamic RBAC: Role → Permission mapping, permissions encoded trong JWT payload |
| NFR-SEC-04 | Route protection | Tất cả protected routes yêu cầu valid JWT Bearer token |
| NFR-SEC-05 | BANNED user blocking | `BANNED` status → JWT bị invalidate ngay lập tức, không thể login lại |
| NFR-SEC-06 | Admin role restriction | Role `ADMIN` / `SUPERADMIN` không thể đăng ký công khai — chỉ Admin tạo |

### 3.2 Data Protection

| ID | Yêu cầu | Chi tiết |
|---|---|---|
| NFR-SEC-07 | Password không bao giờ trả về trong API response | Loại bỏ `password` field khỏi mọi user response DTO |
| NFR-SEC-08 | Email unique constraint | Database-level unique constraint trên `email` |
| NFR-SEC-09 | Review anonymity | Anonymous reviews không expose `userId` trong public API |
| NFR-SEC-10 | API rate limiting | Rate limit trên sensitive endpoints: login (10 req/min), forgot-password (3 req/min) |
| NFR-SEC-11 | Input validation | Tất cả DTO sử dụng `class-validator` decorators (`@IsEmail()`, `@IsNotEmpty()`, `@MinLength()`) |
| NFR-SEC-12 | SQL injection prevention | Sử dụng Prisma ORM (parameterized queries) — không raw SQL trực tiếp |

### 3.3 AI/RAG Security

| ID | Yêu cầu | Chi tiết |
|---|---|---|
| NFR-SEC-13 | Prompt injection prevention | System prompt hardcoded, user input sanitized trước khi gửi LLM |
| NFR-SEC-14 | API key protection | OpenAI API key stored trong environment variables, không commit vào source |
| NFR-SEC-15 | Content filtering | AI response không được chứa nội dung nhạy cảm/xúc phạm về giảng viên |
| NFR-SEC-16 | Rate limiting cho chatbot | Guest: 5 queries/ngày, Learner: 50 queries/ngày (có thể điều chỉnh) |

---

## 4. Scalability Requirements

| ID | Yêu cầu | Chi tiết |
|---|---|---|
| NFR-SCL-01 | Microservices architecture | Hệ thống chia thành các service độc lập: `auth`, `roadmap-service`, `user-service`, `mentor-service`, `api-gateway` |
| NFR-SCL-02 | Database per service | Mỗi microservice có database riêng (Database-per-Service pattern) |
| NFR-SCL-03 | Horizontal scaling | Mỗi service có thể scale independently thông qua Docker containers |
| NFR-SCL-04 | Vector DB scaling | `pgvector` hỗ trợ IVFFlat index — khi data > 100K documents, chuyển sang HNSW index |
| NFR-SCL-05 | RAG document capacity | Hệ thống phải handle ≥ 50,000 document chunks (dự kiến 1000 môn × 10 reviews × 3 chunks) |
| NFR-SCL-06 | Stateless services | Tất cả API services stateless — session state lưu trong JWT, không server-side session |

---

## 5. Availability Requirements

| ID | Yêu cầu | Target |
|---|---|---|
| NFR-AVL-01 | System uptime (core services) | ≥ 99.5% (≈ 3.65h downtime/tháng) |
| NFR-AVL-02 | Planned maintenance window | 02:00 - 04:00 AM (GMT+7), thông báo trước 24h |
| NFR-AVL-03 | AI Chatbot availability | Best-effort — phụ thuộc OpenAI API uptime |
| NFR-AVL-04 | Graceful degradation | Nếu AI service down → hiển thị "AI đang bảo trì" + fallback search thường |
| NFR-AVL-05 | Health check endpoints | Mỗi service expose `/health` endpoint cho monitoring |

---

## 6. Reliability Requirements

| ID | Yêu cầu | Chi tiết |
|---|---|---|
| NFR-REL-01 | Database backup | PostgreSQL daily backup, retention 30 ngày |
| NFR-REL-02 | Transaction integrity | Clone roadmap, review submission dùng `Prisma.$transaction` (ACID) |
| NFR-REL-03 | Idempotent operations | Seed data dùng `upsert` — chạy nhiều lần không duplicate |
| NFR-REL-04 | Error handling | Tất cả services sử dụng global exception filter + structured error response |
| NFR-REL-05 | RAG re-indexing safety | Re-index không xóa old version cho đến khi new version complete |

---

## 7. Maintainability Requirements

| ID | Yêu cầu | Chi tiết |
|---|---|---|
| NFR-MNT-01 | Code structure | NestJS modular architecture (Module → Controller → Service → DTO) |
| NFR-MNT-02 | Shared library | `@iuroadmap/shared` package chứa guards, decorators, DTOs dùng chung |
| NFR-MNT-03 | Database migrations | Prisma migrations cho schema changes, tracked trong version control |
| NFR-MNT-04 | API documentation | Swagger/OpenAPI auto-generated từ NestJS decorators (`@ApiTags`, `@ApiOperation`) |
| NFR-MNT-05 | Logging | Structured logging với `Logger` (NestJS built-in) cho mọi service |
| NFR-MNT-06 | Monorepo structure | Turbo monorepo: `iuroadmap.services/`, `iuroadmap.webapp/`, `iuroadmap.docs/`, `iuroadmap.infra/` |

---

## 8. Usability Requirements

| ID | Yêu cầu | Chi tiết |
|---|---|---|
| NFR-USE-01 | Language support | UI + Chatbot hỗ trợ Tiếng Việt (primary) + English |
| NFR-USE-02 | Responsive design | Webapp hoạt động tốt trên Desktop (≥ 1024px) và Mobile (≥ 375px) |
| NFR-USE-03 | Canvas interaction | Macro/Micro Canvas hỗ trợ: zoom, pan, drag-drop, hover tooltip |
| NFR-USE-04 | Chatbot UX | Streaming response (typing effect), suggested questions, conversation history |
| NFR-USE-05 | Error messages | Thông báo lỗi rõ ràng, hướng dẫn user cách fix (VD: "Email already exists") |
| NFR-USE-06 | Accessibility | Semantic HTML, ARIA labels cho interactive elements |

---

## 9. Infrastructure & Deployment

| ID | Yêu cầu | Chi tiết |
|---|---|---|
| NFR-INF-01 | Container runtime | Docker + Docker Compose cho local development |
| NFR-INF-02 | CI/CD | Azure Pipelines (đã có `azure-pipeline/` directory) |
| NFR-INF-03 | Reverse proxy | Nginx (đã có `nginx.conf`) |
| NFR-INF-04 | Database | PostgreSQL ≥ 14 + `pgvector` extension |
| NFR-INF-05 | Node.js runtime | Node.js ≥ 18 LTS |
| NFR-INF-06 | Package manager | npm (lockfile committed) |

---

## 10. RAG-Specific Technical Requirements

| ID | Yêu cầu | Giá trị |
|---|---|---|
| NFR-RAG-01 | PostgreSQL Extension | `pgvector` (`CREATE EXTENSION vector`) |
| NFR-RAG-02 | Embedding Model | `text-embedding-3-small` (OpenAI) hoặc multilingual model |
| NFR-RAG-03 | Vector Dimension | 1536 (khớp với model) |
| NFR-RAG-04 | Search Type | Hybrid: cosine similarity + BM25 keyword |
| NFR-RAG-05 | Chunk Size | 500-1000 tokens, overlap 100 tokens |
| NFR-RAG-06 | Index Type | IVFFlat (< 100K docs) → HNSW (> 100K docs) |
| NFR-RAG-07 | Re-indexing Strategy | Event-driven (primary) + daily cron (consistency) |
| NFR-RAG-08 | LLM Provider | OpenAI GPT-4o-mini (cost-effective) hoặc GPT-4o (quality) |
| NFR-RAG-09 | Context Window | ≤ 8K tokens (system prompt + retrieved chunks + user query) |
| NFR-RAG-10 | Fallback behavior | Trả lời "Không đủ thông tin" khi relevance score < threshold |

---

## 11. Compliance & Constraints

| ID | Ràng buộc | Chi tiết |
|---|---|---|
| NFR-CON-01 | Academic data accuracy | Dữ liệu roadmap/courses phải khớp chương trình đào tạo chính thức của IU |
| NFR-CON-02 | Review moderation | Tất cả reviews phải qua moderation (auto hoặc manual) trước khi public |
| NFR-CON-03 | No personal attacks | AI chatbot + reviews không được chứa nội dung xúc phạm cá nhân giảng viên |
| NFR-CON-04 | Data retention | Reviews, conversations lưu vĩnh viễn trừ khi user yêu cầu xóa |
| NFR-CON-05 | Third-party dependency | AI features phụ thuộc OpenAI API — cần fallback plan nếu service unavailable |
