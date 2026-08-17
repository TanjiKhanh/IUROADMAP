# IUROADMAP — QA Master Test Cases Specification

**Document Version:** 1.0  
**Reference Document:** [`docs/srs/IUROADMAP_Master_SRS_IEEE830.md`](file:///d:/TanKhanh/Lecture/2025-2026/Second%20Semester/Software%20Engineering/IUROADMAP/IUROADMAP/docs/srs/IUROADMAP_Master_SRS_IEEE830.md)  
**Target Environment:** `apps/web` (React + Vite) & Microservices Cluster (`Port 8080` API Gateway)  
**Test Framework:** Playwright (`@playwright/test`) for API & E2E UI Automation

---

## 1. Test Suite Summary & Coverage Matrix

| Module / Feature Area | Target Use Cases | Business Rules Verified | Test Case IDs | Automation Status |
| :--- | :--- | :--- | :--- | :--- |
| **Module 01: Learner Portal** | `UC-01` to `UC-09` | `BR-01`, `BR-02`, `BR-03`, `BR-09`, `BR-15` | `TC-LNR-01` to `TC-LNR-09` | Automated (`tests/api/01-auth-and-learner.spec.ts`, `tests/e2e/learner-portal.e2e.spec.ts`) |
| **Module 02: Admin Management** | `UC-A01` to `UC-A06` | `BR-01`, `BR-04`, `BR-05`, `BR-06`, `BR-11`, `BR-12` | `TC-ADM-01` to `TC-ADM-06` | Automated (`tests/api/02-admin-management.spec.ts`, `tests/e2e/admin-canvas.e2e.spec.ts`) |
| **Module 03: Mentor Portal** | `UC-M01` to `UC-M06` | `BR-05`, `BR-07`, `BR-08`, `BR-10`, `BR-13`, `BR-14` | `TC-MNT-01` to `TC-MNT-06` | Automated (`tests/api/03-mentor-portal.spec.ts`, `tests/e2e/mentor-portal.e2e.spec.ts`) |

---

## 2. Module 01: Learner Portal Test Cases (`TC-LNR-01` to `TC-LNR-09`)

### TC-LNR-01: User Registration (Happy Path & Duplicate Email Interception)
- **Use Case:** `UC-01` (User Registration)
- **Preconditions:** Database `users` table is running and accessible (`auth-service :3000`).
- **Test Steps:**
  1. Send `POST /api/v1/auth/register-learner` with valid payload (`email: "qa_learner_1@iuroadmap.edu"`, `password: "Password123!"`, `confirmPassword: "Password123!"`, `role: "LEARNER"`).
  2. Verify response status is `201 Created` and `message` equals `"Registration successful"`.
  3. Verify response `data` contains valid user account details (login returns 24-hour `access_token`).
  4. **[Alternative Flow A1 - BR-01 Verification]** Re-send the exact same payload to `POST /api/v1/auth/register-learner`.
  5. Verify response status is `400 Bad Request` and `message` equals `"Email already exists"`.
- **Expected Result:** New learner account is successfully registered with `LEARNER` role; duplicate email registration is rejected with plain-language error.

### TC-LNR-02: User Login (Credentials Verification & Unauthorized Route Protection)
- **Use Case:** `UC-02` (User Login)
- **Preconditions:** `TC-LNR-01` completed (`qa_learner_1@iuroadmap.edu` exists).
- **Test Steps:**
  1. Send `POST /api/v1/auth/login` with correct credentials (`email: "qa_learner_1@iuroadmap.edu"`, `password: "Password123!"`).
  2. Verify response status is `200 OK`, `message` equals `"Login successful"`, and JWT Bearer token is returned.
  3. **[Alternative Flow A1]** Send `POST /api/v1/auth/login` with wrong password (`password: "WrongPass999!"`).
  4. Verify response status is `401 Unauthorized` and `message` equals `"Invalid email or password"`.
  5. **[Alternative Flow A4 - Unauthorized Interception]** Send `GET /api/v1/user/roadmaps/my` without `Authorization` header.
  6. Verify response status is `401 Unauthorized` and `message` equals `"Please log in to continue"`.
- **Expected Result:** Credentials verified securely via `bcrypt`; protected endpoints intercept unauthenticated requests.

### TC-LNR-03: Browse Majors Catalog & Filter by Department
- **Use Case:** `UC-03` (Browse Majors)
- **Preconditions:** Admin has seeded departments and majors in database (`admin-service`).
- **Test Steps:**
  1. Send `GET /api/v1/explore/majors`.
  2. Verify response status is `200 OK` and `data` is an array of departments with child majors.
  3. Send `GET /api/v1/explore/majors?search=Software` to filter by keyword.
  4. Verify all returned major items contain `"Software"` in their `name` or `description`.
  5. Send `GET /api/v1/explore/majors?departmentSlug=it-cs` to filter by department slug.
  6. Verify returned majors strictly belong to the requested department.
- **Expected Result:** Catalog returns accurate major groupings with `_count: { courses: true }` and credit statistics.

### TC-LNR-04: View Major Details Preview & Course Graph
- **Use Case:** `UC-04` (View Major Details)
- **Preconditions:** Major with `slug: "software-engineering"` exists.
- **Test Steps:**
  1. Send `GET /api/v1/roadmaps/preview/software-engineering`.
  2. Verify response status is `200 OK` and payload contains `title`, `creditsRequired`, `courses` array, and `edges` (prerequisite relationships).
  3. **[Alternative Flow A1]** Send `GET /api/v1/roadmaps/preview/non-existent-major-slug`.
  4. Verify response status is `404 Not Found` and `message` equals `"Major not found"`.
- **Expected Result:** Full curriculum breakdown and prerequisite network graph are exposed for public preview.

### TC-LNR-05: Clone Major into Personal Dashboard (Enrollment Workflow)
- **Use Case:** `UC-05` (Clone Major)
- **Preconditions:** Authenticated Learner (`TC-LNR-02`); major `"software-engineering"` exists.
- **Test Steps:**
  1. Send `POST /api/v1/roadmaps/software-engineering/enroll` with `Authorization: Bearer <learner_token>`.
  2. Verify response status is `201 Created` and `message` equals `"Enrollment successful"`.
  3. Verify `data.userRoadmap` contains `id` (`UUID`) and `progressPercentage = 0`.
  4. **[BR-03 Verification]** Verify that root courses (courses without prerequisites) in `user_course_progress` are initialized with `status = "AVAILABLE"`.
  5. **[BR-09 Duplicate Verification]** Send `POST /api/v1/roadmaps/software-engineering/enroll` again using the same `learner_token`.
  6. Verify response status is `400 Bad Request` and `message` equals `"You are already enrolled in this major"`.
- **Expected Result:** Atomic enrollment transaction (`Prisma.$transaction`) initializes learner roadmap and prevents duplicates.

### TC-LNR-06: View My Roadmaps Dashboard & Dynamic Progress Aggregation
- **Use Case:** `UC-06` (View My Roadmaps)
- **Preconditions:** Learner enrolled in `"software-engineering"` (`TC-LNR-05`).
- **Test Steps:**
  1. Send `GET /api/v1/user/roadmaps/my` with `Authorization: Bearer <learner_token>`.
  2. Verify response status is `200 OK` and array contains the enrolled `software-engineering` roadmap card.
  3. Verify card displays `progressPercentage` and total completed vs total required courses (`BR-15`).
- **Expected Result:** Personal dashboard aggregates exact completion statistics across all enrolled programs.

### TC-LNR-07: Macro Canvas View & Prerequisite Locking Check (`BR-02`)
- **Use Case:** `UC-07` (View Roadmap Learning Progress - Macro View)
- **Preconditions:** `userRoadmapId` acquired from `TC-LNR-06`.
- **Test Steps:**
  1. Send `GET /api/v1/user/roadmaps/<userRoadmapId>/overview` with `Authorization: Bearer <learner_token>`.
  2. Verify response status is `200 OK` and `data` contains `nodes: Array<{ id, title, position: { x, y }, status }>` and `edges`.
  3. Verify nodes without prerequisites have `status = "AVAILABLE"` (**Blue** badge).
  4. Verify nodes whose parent prerequisite courses are uncompleted (`status != COMPLETED`) have `status = "LOCKED"` or `prerequisitesMet = false` (**Gray/Locked** badge) per `BR-02`.
- **Expected Result:** Visual 2D graph network correctly color-codes node states and enforces prerequisite locking.

### TC-LNR-08: Micro View Course Details & Sequential Topic List
- **Use Case:** `UC-08` (View Course Details - Micro Learning Viewer)
- **Preconditions:** `courseNodeId` of an `AVAILABLE` course acquired from `TC-LNR-07`.
- **Test Steps:**
  1. Send `GET /api/v1/roadmaps/micro/<courseNodeId>` with `Authorization: Bearer <learner_token>`.
  2. Verify response status is `200 OK` and payload contains `courseTitle`, `credits`, `topics` ordered sequentially (`learningOrder ASC`).
  3. Verify each topic item contains `objectives` bullet array and `resources` JSON (`Array<{ title, url, type: "VIDEO" | "ARTICLE" }>`).
- **Expected Result:** Micro viewer delivers step-by-step instructional materials sorted strictly by learning sequence.

### TC-LNR-09: Mark Topic as Completed & Prerequisite Invariant Guard (`BR-02`)
- **Use Case:** `UC-09` (Mark Topic as Completed)
- **Preconditions:** Learner enrolled in roadmap; `courseNodeA` is `AVAILABLE`; `courseNodeB` has prerequisite `(courseNodeA -> courseNodeB)` and is locked.
- **Test Steps:**
  1. **[Violation Check - BR-02]** Send `PATCH /api/v1/user/roadmaps/<userRoadmapId>/courses/<courseNodeB_id>` with `{ status: "COMPLETED" }`.
  2. Verify response status is `400 Bad Request` and `message` equals `"Invalid status transition"`.
  3. **[Happy Path]** Send `PATCH /api/v1/user/roadmaps/<userRoadmapId>/courses/<courseNodeA_id>` with `{ status: "COMPLETED", creditsEarned: 3 }`.
  4. Verify response status is `200 OK` and `message` equals `"Status updated successfully"`.
  5. Verify `user_roadmaps.progressPercentage` increments dynamically (`BR-15`).
  6. Re-check macro canvas (`TC-LNR-07`): verify `courseNodeA` is now **Green** (`COMPLETED`) and `courseNodeB` is now unlocked (`AVAILABLE` / **Blue**).
- **Expected Result:** Status mutations strictly enforce prerequisite dependencies (`BR-02`) and trigger dynamic progress recalculation (`BR-15`).

---

## 3. Module 02: Admin Management Test Cases (`TC-ADM-01` to `TC-ADM-06`)

### TC-ADM-01: Manage Department CRUD
- **Use Case:** `UC-A01` (Manage Department CRUD)
- **Preconditions:** Admin access token (`Role == ADMIN`) acquired via `auth-service`.
- **Test Steps:**
  1. Send `POST /api/v1/admin/departments` with `{ name: "QA Department", slug: "qa-dept-automation", description: "Test department" }` and Admin Bearer token.
  2. Verify response status is `201 Created` and `message` equals `"Department created successfully"`.
  3. Send `PATCH /api/v1/admin/departments/<id>` to update description to `"Updated description"`.
  4. Verify response status is `200 OK` and `message` equals `"Department updated successfully"`.
  5. Send `DELETE /api/v1/admin/departments/<id>`. Verify response status is `200 OK` and `message` equals `"Department deleted successfully"`.
- **Expected Result:** Admin role is authorized (`RolesGuard`); CRUD operations persist across PostgreSQL schema (`BR-12`).

### TC-ADM-02: Manage Major CRUD & Department Linkage
- **Use Case:** `UC-A02` (Manage Major CRUD)
- **Preconditions:** Valid `departmentId` exists.
- **Test Steps:**
  1. Send `POST /api/v1/admin/majors` with `{ name: "Automation Engineering", slug: "automation-eng", departmentId: "<valid_dept_id>", creditsRequired: 120, description: "QA Major" }`.
  2. Verify response status is `201 Created` and `message` equals `"Major created successfully"`.
  3. **[Validation Check]** Send `POST /api/v1/admin/majors` with negative credits (`creditsRequired: -15`).
  4. Verify response status is `400 Bad Request` and validation error indicates `@Min(0)` violation.
- **Expected Result:** Major entity linked via foreign key to department; strict DTO validation (`class-validator`) enforced.

### TC-ADM-03: Macro Canvas Editor Coordinate Saving & DAG Non-Cyclicity Check (`BR-04`)
- **Use Case:** `UC-A03` (Manage Major Roadmap Canvas Editor)
- **Preconditions:** Major `<majorId>` exists.
- **Test Steps:**
  1. Send `POST /api/v1/admin/roadmaps/<majorId>/courses` to create `Node A` (`credits: 3`, `positionX: 100`, `positionY: 100`).
  2. Send `POST /api/v1/admin/roadmaps/<majorId>/courses` to create `Node B` (`credits: 4`, `positionX: 300`, `positionY: 100`, `prerequisites: [NodeA_id]`).
  3. Send `PUT /api/v1/admin/roadmaps/<majorId>/layout` with dragged coordinates `[{ id: NodeA_id, x: 150, y: 200 }]`.
  4. Verify response status is `200 OK` and `message` equals `"Layout saved successfully"`.
  5. **[DAG Cyclicity Check - BR-04]** Send `PATCH /api/v1/admin/roadmaps/courses/<NodeA_id>` attempting to add `prerequisites: [NodeB_id]` (creating loop `A -> B -> A`).
  6. Verify response status is `400 Bad Request` and `message` equals `"Circular prerequisite dependency detected"`.
- **Expected Result:** Canvas coordinates saved accurately; Directed Acyclic Graph (`DAG`) invariant (`BR-04`) prevents infinite dependency loops.

### TC-ADM-04: Micro Canvas Editor Topics & Resource URL Validation
- **Use Case:** `UC-A04` (Manage Topic Roadmap Canvas Editor)
- **Preconditions:** Course node `<courseNodeId>` exists.
- **Test Steps:**
  1. Send `POST /api/v1/admin/roadmaps/courses/<courseNodeId>/topics` with valid payload (`title: "Topic 1: Intro to QA"`, `estimatedHours: 2.5`, `objectives: ["Understand E2E concepts"]`, `resources: [{ title: "Playwright Guide", url: "https://playwright.dev", type: "ARTICLE" }]`).
  2. Verify response status is `201 Created` and `message` equals `"Topic node created successfully"`.
  3. **[Validation Check]** Send `POST .../topics` with invalid URL (`resources: [{ title: "Bad Link", url: "htp:/broken-url", type: "ARTICLE" }]`).
  4. Verify response status is `400 Bad Request` with URL regex validation error.
- **Expected Result:** Micro topic structures and instructional resources (`VIDEO / ARTICLE`) are persisted and validated.

### TC-ADM-05: User Directory Governance & Self-Deletion Prevention (`BR-11`)
- **Use Case:** `UC-A05` (Manage User Directory & Accounts CRUD)
- **Preconditions:** Admin authenticated (`currentAdminId`).
- **Test Steps:**
  1. Send `GET /api/v1/admin/users?role=LEARNER` to filter user directory. Verify `200 OK`.
  2. Send `PATCH /api/v1/admin/users/<learner_id>` with `{ status: "SUSPENDED" }`. Verify status updates to `SUSPENDED` (`200 OK`).
  3. Verify that `<learner_id>` attempting `POST /api/v1/auth/login` is rejected by `JwtStrategy` due to account suspension.
  4. **[Self-Deletion Prevention - BR-11]** Send `DELETE /api/v1/admin/users/<currentAdminId>` using the Admin's own token.
  5. Verify response status is `400 Bad Request` and `message` equals `"Cannot delete your own administrative account."`.
- **Expected Result:** Identity governance functions correctly; safeguards block self-inflicted admin lockouts (`BR-11`).

### TC-ADM-06: Mentor Verification Workflow & Mandatory Rejection Reason (`BR-06`)
- **Use Case:** `UC-A06` (Verify Mentors Application Review Workflow)
- **Preconditions:** Two users registered with mentor intent (`status == PENDING` in `mentor_profiles`).
- **Test Steps:**
  1. Send `GET /api/v1/admin/mentors/pending`. Verify both applicants are listed (`200 OK`).
  2. **[Approval Flow]** Send `POST /api/v1/admin/mentors/<applicant_1_id>/approve`.
  3. Verify status is `200 OK`, `message` equals `"Mentor application approved successfully"`, and `users.role` changes to `MENTOR`.
  4. **[Rejection Violation - BR-06]** Send `POST /api/v1/admin/mentors/<applicant_2_id>/reject` with empty payload `{ reason: "" }`.
  5. Verify response status is `400 Bad Request` and `message` equals `"Please provide a reason for rejection"`.
  6. **[Valid Rejection]** Send `POST /api/v1/admin/mentors/<applicant_2_id>/reject` with `{ reason: "Insufficient industry experience listed." }`.
  7. Verify status is `200 OK`, `message` equals `"Mentor application rejected"`, `mentor_profiles.status` becomes `REJECTED`, and automated rejection email trigger is fired.
- **Expected Result:** Mentor verification workflow strictly enforces `APPROVED` roles (`BR-05`) and mandatory rejection explanations (`BR-06`).

---

## 4. Module 03: Mentor Portal Test Cases (`TC-MNT-01` to `TC-MNT-06`)

### TC-MNT-01: View Request List & Approved Status Guard (`BR-05`)
- **Use Case:** `UC-M01` (View Request List)
- **Preconditions:** `applicant_1` is `APPROVED` mentor (`TC-ADM-06`); `applicant_2` is `REJECTED`.
- **Test Steps:**
  1. Send `GET /api/v1/mentors/requests` using `applicant_1` token.
  2. Verify response status is `200 OK` and requests are sorted by `createdAt DESC`.
  3. **[Unauthorized Guard Check - BR-05]** Send `GET /api/v1/mentors/requests` using `applicant_2` (`REJECTED`) or a standard `LEARNER` token.
  4. Verify response status is `403 Forbidden` and `message` equals `"Unauthorized mentor access"`.
- **Expected Result:** Mentor Portal endpoints strictly verify `role == MENTOR` and `profile.status == APPROVED` (`BR-05`).

### TC-MNT-02: Accept Request & Atomic Handshake Connection (`BR-07`)
- **Use Case:** `UC-M02` (Accept Request)
- **Preconditions:** Learner has submitted `mentorship_requests` (`status: PENDING`) to Approved Mentor.
- **Test Steps:**
  1. Send `POST /api/v1/mentors/requests/<requestId>/accept` with Mentor Bearer token.
  2. Verify response status is `200 OK` and `message` equals `"Request accepted successfully"`.
  3. Verify `mentorship_requests.status` is updated to `"ACCEPTED"` inside database.
  4. Verify that `mentoring_connections` record linking `mentorId` and `learnerId` is created atomically inside the same transaction (`BR-07`).
  5. **[Idempotency Check]** Re-send `POST /api/v1/mentors/requests/<requestId>/accept`.
  6. Verify response status is `400 Bad Request` and `message` equals `"Request already processed"`.
- **Expected Result:** Atomic transaction (`Prisma.$transaction`) links mentor-learner pair (`BR-07`) and prevents re-processing.

### TC-MNT-03: Decline Request Workflow
- **Use Case:** `UC-M03` (Decline Request)
- **Preconditions:** Pending request `<request2_id>` exists.
- **Test Steps:**
  1. Send `POST /api/v1/mentors/requests/<request2_id>/decline`.
  2. Verify response status is `200 OK` and `message` equals `"Request declined successfully"`.
  3. Verify request `status` is updated to `"DECLINED"` and learner notification is emitted.
- **Expected Result:** Declined request is updated in database and removed from active pending queue.

### TC-MNT-04: Calendar Availability Scheduling & Overlap Conflict Guard (`BR-10`)
- **Use Case:** `UC-M04` (Manage Availability Schedule & Time Slots)
- **Preconditions:** Approved Mentor token.
- **Test Steps:**
  1. Send `POST /api/v1/mentors/availability` with `{ slotDate: "2026-08-01", startTime: "10:00", endTime: "11:00", status: "AVAILABLE" }`.
  2. Verify response status is `201 Created` and `message` equals `"Availability updated successfully"`.
  3. **[Interval Overlap Check - BR-10]** Send `POST /api/v1/mentors/availability` with overlapping interval `{ slotDate: "2026-08-01", startTime: "10:30", endTime: "11:30" }`.
  4. Verify response status is `400 Bad Request` and `message` equals `"Time conflict detected"`.
- **Expected Result:** Backend executes interval query (`lt: newEnd, gt: newStart`) and rejects intersecting availability schedules (`BR-10`).

### TC-MNT-05: Real-Time WebSocket Chat & Active Connection Guard (`BR-08`, `BR-13`)
- **Use Case:** `UC-M05` (Chat with Learner - Real-Time Messaging)
- **Preconditions:** Active `mentoring_connections` between Mentor and Learner (`TC-MNT-02`).
- **Test Steps:**
  1. Establish WebSocket connection to `ws://localhost:8080` (or `:4001`) (`WebSocketGateway`) authenticating with Mentor JWT.
  2. Emit `sendMessage` event with payload `{ receiverId: "<learner_id>", content: "Hello! Ready for our session?" }`.
  3. Verify message is delivered in real-time (`< 500ms` SLA `NFR-PF-03`) and persisted to `chat_messages` table.
  4. **[Empty Message Violation - BR-13]** Emit `sendMessage` with empty content `{ receiverId: "<learner_id>", content: "" }`.
  5. Verify gateway returns error `"Message cannot be empty"`.
  6. **[Unauthorized Connection Guard - BR-08]** Attempt to emit `sendMessage` to a learner with no active `mentoring_connections` record.
  7. Verify socket/API rejects request with `403 Forbidden` (`"Must accept mentoring request before chatting"`).
- **Expected Result:** Bidirectional real-time chat operates within `< 500ms` (`NFR-PF-03`) and strictly verifies active connections (`BR-08`).

### TC-MNT-06: Session Assessment Feedback & Star Rating Bounds (`BR-14`)
- **Use Case:** `UC-M06` (Give Feedback & Rating)
- **Preconditions:** Completed or active session between Mentor and Learner (`TC-MNT-02`).
- **Test Steps:**
  1. Send `POST /api/v1/mentors/feedback/<learner_id>` with `{ content: "Excellent performance during the architecture review.", rating: 5 }`.
  2. Verify response status is `201 Created` and `message` equals `"Feedback submitted successfully"`.
  3. **[Empty Content Violation - BR-13]** Send `POST /api/v1/mentors/feedback/<learner_id>` with `{ content: "", rating: 4 }`.
  4. Verify response status is `400 Bad Request` and `message` equals `"Please enter feedback"`.
  5. **[Rating Range Violation - BR-14]** Send `POST /api/v1/mentors/feedback/<learner_id>` with `{ content: "Good job", rating: 6 }` (or `rating: 0`).
  6. Verify response status is `400 Bad Request` and `message` equals `"Invalid rating value"`.
- **Expected Result:** Feedback loop enforces non-empty content (`BR-13`) and `1-5` integer bounds (`BR-14`).
