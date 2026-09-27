# Roadmap v2 — Kế hoạch implement (danh sách file)

> **Loại tài liệu:** Implementation plan
> **Ngày:** 2026-09-26
> **Dựa trên:** [`roadmap-v2-design.md`](roadmap-v2-design.md), [`FL-RDM`](../srs/features/FL-RDM-roadmap-management.md), [`FL-LRN`](../srs/features/FL-LRN-learner-portal.md), [`roadmap-schema.md`](../schema/roadmap-schema.md)
> **Ký hiệu:** 🆕 tạo mới · ✏️ sửa · 🗑️ xoá (sau khi phần thay thế chạy được) · ⚙️ sinh tự động, không sửa tay

---

## 0. Cần chốt trước khi code

| # | Vấn đề | Hiện trạng | Đề xuất |
|---|---|---|---|
| I1 | **Migration Prisma không được commit** | `.gitignore` dòng 136 có `migrations/`. Không service nào có thư mục `prisma/migrations` trong git, Dockerfile của roadmap-service cũng không chạy `migrate deploy` | Bỏ dòng `migrations/` khỏi `.gitignore` và commit migration. Prisma khuyến nghị commit để mọi môi trường (máy dev, K8s) chạy cùng lịch sử schema |
| I2 | **DB roadmap-service có dữ liệu cần giữ không?** | Khoa, ngành, môn v1 do admin nhập qua CRUD v1 | **Nếu chỉ là dữ liệu test** (như D5): tạo migration đầu tiên `InitRoadmapV2` trên DB trống, rồi seed lại. **Nếu cần giữ:** baseline schema v1 (`prisma migrate diff` + `migrate resolve --applied`), rồi viết migration chuyển dữ liệu theo design §12 |
| I3 | **Logic dùng chung BE và FE** | Kiểm tra vòng lặp (DAG), ràng buộc xếp kỳ, tính điểm và GPA, bố cục hàng cần chạy ở cả server (lúc lưu, lúc publish) và web (báo lỗi ngay khi kéo thả) | Viết **một lần** trong `shared/src/roadmap-engine/`: TypeScript thuần, không import NestJS. Web import qua subpath `@iuroadmap/shared/roadmap-engine`. Root `package.json` đã gộp web và services vào chung một npm workspace nên import được. *Phương án B:* viết 2 bản giống nhau, dùng chung bộ test |
| I4 | **Branch** | Đang ở `feature/kubernet`, docs v2 chưa commit | Commit phần docs, tạo `feature/roadmap-v2`. Mỗi phase là một PR |

**Rủi ro hạ tầng có sẵn (không thuộc v2, nhưng sẽ gặp khi deploy):** Dockerfile của các service build với context là thư mục service và chạy `npm ci`, trong khi `package.json` phụ thuộc `@iuroadmap/shared` (private, không publish lên npm). Cần kiểm tra cách K8s build image trước khi deploy v2.

---

## 1. Hiện trạng code liên quan (khảo sát 2026-09-26)

| Phần | Hiện trạng | Ảnh hưởng |
|---|---|---|
| roadmap-service | 1 module legacy `src/modules/roadmap/` (thư mục `controller/` số ít, file `*.dto.ts`, tên snake_case). 5 controller: `departments`, `majors`, `admin/roadmaps`, `admin/major-roadmaps`, `admin/course-nodes`. Prisma v1 có 6 model. Chưa có unit test | Viết lại theo mẫu IAM, chia thành nhiều module |
| api-gateway | Prefix trỏ tới roadmap-service: `roadmaps`, `admin`, `courses`, `departments`, `explore`. **Thiếu `majors`** (G10). `AuthMiddleware` áp cho `v1/users/*`, `v1/user/*`, `v1/roadmaps/*`, `v1/mentor-profiles/*`, `v1/admin/*` | Thêm prefix mới |
| shared | Có `JwtGuard`, `RoleGuard`, phân trang, `AppConstant`, `EntityConstant`. Chưa có hằng số cho Roadmap. `PMS.RM_USER`, `PMS.RM_AD` đã có | Thêm hằng số, mã lỗi, engine |
| web | `views/config/{department,major,roadmap}`, `views/roadmap/{explore,viewer,my-courses,hooks}`. Đã có `reactflow` 11, `react-markdown` 8 (mặc định không render HTML thô, nên an toàn XSS cho `student_guide`), TanStack Query | Không cần cài thêm thư viện. Kéo từ sidebar dùng HTML5 drag-and-drop theo mẫu của React Flow |
| api-gen | Orval `tags-split`: mỗi `@ApiTags` sinh ra một thư mục | Đặt tên `@ApiTags` cẩn thận vì nó thành tên thư mục và tên hook |
| tests | Playwright `api/` và `e2e/` mới có user, role | Thêm spec cho v2 |

---

## 2. Kiến trúc roadmap-service sau v2

```
iuroadmap.services/roadmap-service/src/
├── app.module.ts                    ✏️ import các module mới, bỏ RoadmapModule legacy
├── prisma/                          (giữ) PrismaModule, PrismaService
├── common/
│   ├── prisma-error.util.ts         🆕 handlePrismaError dùng chung (P2002/P2025/P2003 → 409/404)
│   └── version-cache.service.ts     🆕 cache CTĐT đã publish (bất biến, không cần invalidate)
└── modules/
    ├── department/                  khoa: CRUD, chặn xoá khi còn ngành
    ├── major/                       ngành: CRUD, chặn xoá khi có CTĐT đã publish
    ├── course-catalog/              môn + nhóm môn (màu)
    ├── lecturer/                    giảng viên (master data, D17)
    ├── course-offering/             môn theo năm học + topic theo năm
    ├── curriculum/                  CTĐT theo năm: vòng đời, canvas, publish
    ├── grading/                     thang điểm, xếp loại
    ├── explore/                     API public: lọc CTĐT, Course Explorer
    ├── student-roadmap/             clone, merged view, batch changes, kết quả, rebase
    └── course-comment/              bình luận + kiểm duyệt
```

Mỗi module theo mẫu `auth/src/modules/iam/`: `<module>.module.ts`, `controllers/`, `services/`, `dto/<entity>/` (file `.request.ts` / `.response.ts` + `index.ts`).

---

## 3. Danh sách file theo layer

### 3.1 `iuroadmap.services/shared`

| File | | Nội dung |
|---|---|---|
| `src/constants/app.constant.ts` | ✏️ | `Roadmap: { DefaultSemesterCount: 8, MaxTermCount: 16, MaxCreditsPerTerm: 24, RowOrderEpsilon: 1e-6 }`, `CourseComment: { MaxPerWindow: 5, WindowMinutes: 10 }`, `Moderation: { ReportThreshold: 3 }`, `AcademicYear: { Min: 2000, Max: 2100 }` |
| `src/constants/entity.constant.ts` | ✏️ | `CourseCode`, `HexColor`, `CourseCommentContent` (2000), `TermLabel`, `DecisionRef`, `LecturerTitle`; dùng lại `DescriptionVeryLong` (5000) cho `student_guide` |
| `src/constants/error.constant.ts` | ✏️ | Mã lỗi v2: `ROADMAP_VERSION_IMMUTABLE`, `ROADMAP_DRAFT_EXISTS`, `CURRICULUM_YEAR_ALREADY_PUBLISHED`, `DEPARTMENT_HAS_MAJORS`, `MAJOR_HAS_PUBLISHED_CURRICULUM`, `CATEGORY_IN_USE`, `COURSE_HAS_RESULTS`, `COURSE_OFFERING_EXISTS`, `LECTURER_IN_USE`, `ALREADY_CLONED`, `REVISION_CONFLICT`, `DUPLICATE_COURSE_IN_PLAN`, `NODE_HAS_RESULT`, `CYCLE_DETECTED`, `INVALID_WEIGHTS`, `PUBLISH_WARNINGS_NOT_ACKNOWLEDGED`, `COMMENT_RATE_LIMITED`, `COMMENT_NOT_EDITABLE`, `ALREADY_REPORTED`, `MODERATION_REASON_REQUIRED` |
| `src/interfaces/jwt-payload.interface.ts` | ✏️ đã xong | `name` (D18). Sửa `userId: number` → `string` để riêng (D19) |
| `src/roadmap-engine/index.ts` | 🆕 | Export các hàm thuần bên dưới (I3) |
| `src/roadmap-engine/graph.ts` | 🆕 | `findCycle(edges)` → đường đi của chu trình hoặc `null` (BR-RM-01) |
| `src/roadmap-engine/placement.ts` | 🆕 | `checkPlacement(terms, nodes, edges)` → danh sách vi phạm xếp kỳ (BR-RM-08); learner dùng làm gợi ý |
| `src/roadmap-engine/publish-validator.ts` | 🆕 | `validateForPublish(canvas, totalCredits)` → `{ errors, warnings }` (FR-RDM.04.4) |
| `src/roadmap-engine/row-layout.ts` | 🆕 | `layoutColumn`, `orderForSlot`, `rebalance` (design §4.2) |
| `src/roadmap-engine/term-order.ts` | 🆕 | Ghép kỳ CTĐT với chuỗi kỳ custom (`after_term_key`) |
| `src/roadmap-engine/grading.ts` | 🆕 | `computeTotal` (làm tròn half-up), `lookupGrade`, `termSummary`, `cumulativeSummary`, xử lý `PASS_FAIL` và `counts_toward_*` (design §9) |
| `src/roadmap-engine/offering-resolver.ts` | 🆕 | `resolveOffering(offerings, year)`, `estimateAcademicYear(cohortYear, semesterNo)` (FR-LRN.11.6) |
| `package.json` | ✏️ | Thêm `exports` cho subpath `./roadmap-engine` |
| `src/interfaces/roadmap.interface.ts`, `user-progress.interface.ts`, `enums/enrollment.enum.ts` | 🗑️ | Kiểu dữ liệu v1; xoá ở phase dọn dẹp nếu không còn nơi dùng |

### 3.2 `iuroadmap.services/roadmap-service`

**Prisma và seed**

| File | | Nội dung |
|---|---|---|
| `prisma/schema.prisma` | ✏️ | Viết lại theo `roadmap-schema.md` v2.1 |
| `prisma/migrations/<ts>_init_roadmap_v2/migration.sql` | 🆕 | Sinh bằng `prisma migrate dev`, rồi **thêm tay** các partial unique index và CHECK ở mục "Ràng buộc Prisma không biểu diễn được". Chạy `migration-checker` trước khi deploy |
| `prisma/seed.ts` | ✏️ | Seed 6 nhóm môn, thang điểm (ngưỡng đạt 50, đánh dấu band giả định), xếp loại; dữ liệu demo: khoa CSE, ngành CS, CTĐT 2023 theo Ảnh 1, môn IE (`PASS_FAIL`) |

**Module** (mỗi thư mục `dto/<entity>/` gồm các file `-create.request.ts`, `-update.request.ts`, `-filter.request.ts`, `.response.ts`, `index.ts` theo mẫu IAM)

| Module | Controller → path | Service | DTO |
|---|---|---|---|
| `department/` | `departments.controller.ts` → `departments` | `departments.service.ts` | `dto/department/` |
| `major/` | `majors.controller.ts` → `majors` | `majors.service.ts` | `dto/major/` |
| `course-catalog/` | `course-categories.controller.ts` → `course-categories`; `courses.controller.ts` → `courses` | `course-categories.service.ts`, `courses.service.ts` | `dto/course-category/`, `dto/course/` |
| `lecturer/` | `lecturers.controller.ts` → `lecturers` | `lecturers.service.ts` | `dto/lecturer/` |
| `course-offering/` | `course-offerings.controller.ts` → `admin/course-offerings`; `offering-topics.controller.ts` → `admin/course-offerings/:id/topics*` | `course-offerings.service.ts` (CRUD, publish, copy năm), `offering-topics.service.ts` | `dto/course-offering/`, `dto/offering-lecturer/`, `dto/course-topic/` |
| `curriculum/` | `curriculum-versions.controller.ts` → `admin/roadmaps/:roadmapId/versions`, `admin/roadmap-versions`; `canvas.controller.ts` → `admin/roadmap-versions/:id/canvas` | `curriculum-versions.service.ts` (vòng đời T1–T6), `canvas.service.ts` (load, save full state theo key, revision), `publish.service.ts` | `dto/curriculum-version/`, `dto/canvas/` (term, node, edge, save request, issue response) |
| `grading/` | `grade-scales.controller.ts` → `admin/grade-scales`; `academic-classifications.controller.ts` → `admin/academic-classifications` | `grade-scales.service.ts` (kiểm tra phủ kín 0–100), `academic-classifications.service.ts` | `dto/grade-scale/`, `dto/academic-classification/` |
| `explore/` | `explore-roadmaps.controller.ts` → `explore/roadmaps`; `explore-courses.controller.ts` → `explore/courses` (list, detail, curricula, topics, academic-years) | `explore-roadmaps.service.ts`, `explore-courses.service.ts` | `dto/explore/` |
| `student-roadmap/` | `student-roadmaps.controller.ts` → `student-roadmaps` (clone, my, get, changes, reset, drop, reactivate, results, upgrade-preview, upgrade) | `student-roadmaps.service.ts`, `roadmap-changes.service.ts` (op → delta, chuẩn hoá), `merged-view.service.ts`, `term-results.service.ts`, `rebase.service.ts`; `lib/merge.ts` (hàm thuần `buildMergedRoadmap`, design §6.3) | `dto/student-roadmap/`, `dto/roadmap-change/` (op dạng discriminated union), `dto/term-result/`, `dto/rebase/` |
| `course-comment/` | `course-comments.controller.ts` → `course-comments`, `explore/courses/:courseId/comments`; `admin-course-comments.controller.ts` → `admin/course-comments` | `course-comments.service.ts` (giới hạn tần suất, trả lời 1 cấp), `comment-moderation.service.ts` (ngưỡng report, ẩn, khôi phục) | `dto/course-comment/`, `dto/comment-report/` |

**Xoá sau khi thay thế:** 🗑️ `src/modules/roadmap/` (toàn bộ module legacy).

**Unit test** (`*.unit.spec.ts`, không dùng DB)

| File | Kiểm tra |
|---|---|
| `test/roadmap-engine/graph.unit.spec.ts` | Phát hiện chu trình, trả đúng đường đi |
| `test/roadmap-engine/placement.unit.spec.ts` | 3 loại quan hệ, bỏ qua `ELECTIVE_POOL` |
| `test/roadmap-engine/row-layout.unit.spec.ts` | Chèn giữa, chèn đầu cột, hàng trống hấp thụ, chia đều lại khi hết chỗ |
| `test/roadmap-engine/grading.unit.spec.ts` | **Tái hiện 2 bảng điểm**: Ảnh 2 (85.0 / 3.45 / 20 / Giỏi) và Ảnh 3 (73.9 / 2.97 / 15 / Khá, môn IE chấm P) |
| `test/roadmap-engine/offering-resolver.unit.spec.ts` | Chọn đúng năm, lùi về năm gần nhất |
| `src/modules/student-roadmap/lib/merge.unit.spec.ts` | Ghép CTĐT + delta, kỳ custom, edge của node custom đã xoá tự rơi |
| `src/modules/student-roadmap/services/roadmap-changes.unit.spec.ts` | Chuẩn hoá (về chỗ cũ → xoá dòng), từ chối xoá node/edge CTĐT |
| `src/modules/curriculum/services/curriculum-versions.unit.spec.ts` | Chuyển trạng thái hợp lệ và không hợp lệ; ban hành lại thì bản cũ tự archive |
| `src/modules/course-comment/services/comment-moderation.unit.spec.ts` | Đủ ngưỡng → `FLAGGED`; ẩn hoặc giữ lại thì đóng report |
| `jest.config.js` | ✏️ nếu cần để quét thư mục `test/` |

### 3.3 `iuroadmap.services/api-gateway`

| File | | Nội dung |
|---|---|---|
| `src/config/routes.config.ts` | ✏️ | Thêm vào `ROADMAP_SERVICE`: `majors`, `course-categories`, `lecturers`, `student-roadmaps`, `course-comments` |
| `src/app.module.ts` | ✏️ | Thêm `AuthMiddleware` cho `v1/student-roadmaps/*`, `v1/course-comments/*`. `explore/*` giữ public; service vẫn tự kiểm tra bằng `JwtGuard` |
| `swagger-spec.json` | ⚙️ | `npm run gen:spec` |

### 3.4 Service khác (phase sau)

| File | | Nội dung | Phase |
|---|---|---|---|
| `shared/src/clients/roadmap-client/*` | 🆕 | HTTP client gọi roadmap-service khi xoá user | Dọn dẹp |
| `auth/src/modules/users/...` (chỗ xoá cứng user) | ✏️ | Gọi roadmap-client: xoá roadmap, ẩn danh hoá bình luận (roadmap-schema § Xoá user) | Dọn dẹp |
| `user-service/src/roadmaps/*`, bảng `USER_ROADMAPS*`, `USER_NODE_PROGRESS` | 🗑️ | Luồng learner v1 (D5) | Dọn dẹp, sau khi web chuyển xong |

### 3.5 `iuroadmap.webapp/packages/core`

| File | | Nội dung |
|---|---|---|
| `src/constants/routes.ts` | ✏️ | RoutePaths mới. Config: `courseCategory`, `course`, `lecturer`, `courseOffering`, `majorCurricula`, `curriculumCanvas`, `gradeScale`, `commentModeration`. Roadmap: `exploreRoadmaps`, `roadmapPreview`, `exploreCourses`, `courseDetail`, `myRoadmaps`, `myRoadmap` |
| `src/constants/navigation.ts`, `src/menus/menu.ts` | ✏️ | Menu admin (Môn học, Nhóm môn, Giảng viên, Môn theo năm học, Thang điểm, Kiểm duyệt bình luận có badge) và menu learner (Explore CTĐT, Explore Môn học, My Roadmaps) |
| `src/constants/featurePms.ts` | ✏️ | Gắn route với `RM.AD` / `RM.USER` |
| `src/constants/roadmapCanvas.ts` | 🆕 | `LANE_WIDTH`, `NODE_WIDTH`, `ROW_HEIGHT`, `HEADER_HEIGHT`, `CANVAS_PADDING`, `GAP_HIT_WIDTH` |
| `src/i18n/locales/{en,vi}/config.json` | ✏️ | Chuỗi của các màn admin mới |
| `src/i18n/locales/{en,vi}/learner.json` | ✏️ | Explore, My Roadmap, bảng điểm, gợi ý, bình luận, Course Explorer |
| `src/i18n/locales/{en,vi}/roadmap.json` + `index.ts` | 🆕 ✏️ | Chuỗi dùng chung của canvas: "Semester {n} ({x}+{y})", "HK{k} {y1}-{y2}", nhãn 3 loại quan hệ, "＋ Kỳ mới", xếp loại (`label_key`), "Người dùng đã xoá" |
| `src/i18n/locales/{en,vi}/navigation.json` | ✏️ | Nhãn menu |

### 3.6 `iuroadmap.webapp/packages/api-gen` ⚙️

Chạy `npm run gen:api` sau mỗi phase backend. Thư mục mới sinh theo `@ApiTags`. Đề xuất tag: `course-categories`, `courses`, `lecturers`, `admin-course-offerings`, `admin-curriculum`, `admin-canvas`, `admin-grading`, `explore-roadmaps`, `explore-courses`, `student-roadmaps`, `course-comments`, `admin-course-comments`. Thư mục v1 (`admin-roadmaps`, `admin-majors`, `roadmaps`, `user-roadmaps`) tự mất khi controller cũ bị xoá.

### 3.7 `iuroadmap.webapp/apps/web/src`

**Component dùng chung**

```
components/semester-canvas/                  🆕 dùng cho canvas admin, preview CTĐT, My Roadmap
├── SemesterCanvas.tsx                       React Flow: lane, node, edge, chế độ readOnly / admin / learner
├── nodes/LaneNode.tsx                       cột nền (draggable: false, zIndex -1)
├── nodes/CourseNode.tsx                     "code (LT,TH)", màu nhóm môn, badge, trạng thái học
├── nodes/ElectiveSlotNode.tsx               ô tự chọn viền đậm / viền đứt
├── nodes/PhantomLaneNode.tsx                cột mờ "＋ Kỳ mới" khi kéo vào khe
├── edges/RelationEdge.tsx                   3 kiểu vẽ (liền, đứt, co-req)
├── LaneHeader.tsx                           "Semester n (x+y)" + tooltip; learner: bấm để mở bảng điểm
├── legends/CategoryLegend.tsx, RelationLegend.tsx
├── hooks/useCanvasLayout.ts                 terms + nodes → node React Flow (toPixel, visualRow)
├── hooks/useDragReflow.ts                   onNodeDrag / onNodeDragStop: xem trước, chèn, cột mới
└── lib/toPixel.ts

components/course/                           🆕 trang môn học dùng ở Explorer, preview, My Roadmap
├── CourseDetailPanel.tsx                    tabs Tổng quan / Nội dung / Trong CTĐT / Bình luận, dropdown năm học
├── StudentGuide.tsx                         react-markdown (không bật HTML thô)
├── OfferingLecturers.tsx
├── CourseCurriculaTab.tsx
└── comments/CommentThread.tsx, CommentForm.tsx, ReportDialog.tsx
```

**Màn admin (`views/config/`)**

| Thư mục | | File |
|---|---|---|
| `department/` | ✏️ | Hiển thị lỗi `409 DEPARTMENT_HAS_MAJORS` |
| `major/` | ✏️ | `majorForm.tsx` bỏ `total_credits`; 🆕 `majorDetailPage.tsx`, `components/curriculumVersionTab.tsx`, `createDraftModal.tsx` (chọn năm, nguồn copy), `publishDialog.tsx` (lỗi, cảnh báo, xác nhận) |
| `course-category/` | 🆕 | `courseCategoryListPage.tsx`, `CreatePage`, `EditPage`, `components/courseCategoryForm.tsx` (chọn màu, xem trước node) |
| `course/` | 🆕 | `courseListPage.tsx`, `CreatePage`, `EditPage`, `components/courseForm.tsx` (`grading_mode`, `counts_toward_*`) |
| `lecturer/` | 🆕 | `lecturerListPage.tsx`, `CreatePage`, `EditPage`, `components/lecturerForm.tsx` |
| `course-offering/` | 🆕 | `courseOfferingListPage.tsx`, `courseOfferingEditPage.tsx` (tab Thông tin / Giảng viên / Topic), `components/offeringForm.tsx`, `lecturerAssignTable.tsx`, `copyYearModal.tsx` |
| `roadmap/` | ✏️ | 🆕 `curriculumCanvasPage.tsx` + `components/CatalogSidebar.tsx`, `IssuesPanel.tsx`, `EdgeTypePopover.tsx`, `SlotEditorModal.tsx`; ✏️ `courseTopicDesignPage.tsx` (theo offering); 🗑️ `roadmapDesignPage.tsx` |
| `grading/` | 🆕 | `gradeScalePage.tsx`, `academicClassificationPage.tsx` |
| `comment-moderation/` | 🆕 | `commentModerationListPage.tsx`, `components/commentReviewDrawer.tsx` |

**Màn learner (`views/roadmap/`)**

| Thư mục | | File |
|---|---|---|
| `explore/` | 🆕 🗑️ | `exploreRoadmapsPage.tsx` (lọc khoa, ngành, năm; thay `exploreMajorsPage.tsx`), `roadmapPreviewPage.tsx` (thay `viewer/macroRoadmapPage.tsx`), `components/cloneDialog.tsx` |
| `courses/` | 🆕 | `courseExplorerPage.tsx`, `courseDetailPage.tsx`, `components/courseFilterBar.tsx`, `courseCard.tsx` |
| `my-roadmap/` | 🆕 🗑️ | `myRoadmapsPage.tsx` (thay `my-courses/myCoursesPage.tsx`), `myRoadmapPage.tsx` (chế độ xem và chỉnh sửa), `components/summaryBar.tsx`, `termResultsDrawer.tsx` (cả môn `PASS_FAIL`), `hintsPanel.tsx`, `termYearModal.tsx`, `upgradePreviewDialog.tsx` |
| `hooks/` | 🆕 🗑️ | `useRoadmapEditor.ts` (hàng đợi op, gộp thao tác, undo/redo, `revision`, xử lý 409); 🗑️ `useRoadmapHooks.ts` |
| `viewer/` | ✏️ | `microRoadmapPage.tsx`: lấy topic theo `academicYear` |

**Router:** ✏️ `router/config.routes.tsx`, `router/roadmap.routes.tsx`, `router/learner.routes.tsx`.

### 3.8 `iuroadmap.webapp/tests` (Playwright)

| File | Nội dung |
|---|---|
| `api/config/course-category.spec.ts`, `course.spec.ts`, `lecturer.spec.ts`, `course-offering.spec.ts`, `grading.spec.ts` | CRUD + các lỗi 409 |
| `api/config/curriculum.spec.ts` | Draft → canvas save (sai revision → 409) → publish (lỗi, cảnh báo) → ban hành lại → archive |
| `api/config/department-major-delete.spec.ts` | Chặn xoá khoa, ngành |
| `api/learner/student-roadmap.spec.ts` | Clone (409 lần 2), changes (chuẩn hoá, xoá node CTĐT → 400), kết quả, rebase |
| `api/learner/explore.spec.ts`, `course-comment.spec.ts` | Bộ lọc; bình luận, báo cáo, ngưỡng, giới hạn tần suất |
| `e2e/page-objects/config/{course,course-offering,curriculum-canvas}.po.ts`, `e2e/page-objects/learner/{my-roadmap,course-explorer}.po.ts` | Page object |
| `e2e/specs/config/curriculum-canvas.spec.ts` | Kéo từ sidebar, kéo chèn giữa (node trượt xuống), nối edge, publish |
| `e2e/specs/learner/my-roadmap.spec.ts` | Clone, chèn kỳ IE trước Semester 1, kéo node vào khe tạo kỳ mới, lưu, nhập điểm, xem lại sau reload |
| `e2e/specs/learner/course-explorer.spec.ts` | Lọc, đổi năm học, bình luận |

### 3.9 Tài liệu và convention

| File | | Nội dung |
|---|---|---|
| `.claude/rules/backend/01-architecture.md` | ✏️ | Bỏ câu "rebuild shared" (shared dùng thẳng từ source); thêm `roadmap-engine` |
| `agent/`, `.agents/` | ✏️ | Đồng bộ convention với `.claude/` (theo CLAUDE.md) |
| `CLAUDE.md` | ✏️ | Bảng Services: thêm prefix mới của roadmap-service; module mẫu mới |
| `.gitignore` | ✏️ | Bỏ `migrations/` (I1) |

---

## 4. Thứ tự làm

Mỗi phase là 1 PR. Backend xong thì chạy `npm run gen:api`, rồi mới làm web của phase đó.

| Phase | Nội dung | File chính | Xong khi |
|---|---|---|---|
| **P0** | Chuẩn bị | `.gitignore`, hằng số và mã lỗi trong shared, `roadmap-engine` + unit test | Unit test engine xanh, **tái hiện đúng 2 bảng điểm** |
| **P1** | Schema v2 + master data | `schema.prisma`, migration đầu + SQL tay, `seed.ts`; module `department`, `major`, `course-catalog`, `lecturer`, `grading`; gateway; web `course-category`, `course`, `lecturer`, `grading`, sửa `department`/`major` | Migrate + seed chạy trên DB trống; CRUD qua gateway; Playwright `api/config/*` xanh |
| **P2** | CTĐT theo năm + canvas API | module `curriculum` (vòng đời, canvas save, publish) | Unit test vòng đời; API tạo draft → lưu → publish → ban hành lại chạy đúng |
| **P3** | Canvas admin (web) | `components/semester-canvas/*`, `curriculumCanvasPage`, `majorDetailPage` + tab CTĐT | E2E kéo thả chèn giữa, publish có lỗi / cảnh báo |
| **P4** | Student roadmap (backend) | module `student-roadmap` (clone, merged view, changes), `explore-roadmaps` | Unit test merge + changes; API clone → changes → đọc lại đúng |
| **P5** | My Roadmap (web) | `explore/*`, `my-roadmap/*`, `useRoadmapEditor` | E2E: chèn kỳ IE, kéo vào khe tạo kỳ, lưu, reload đúng |
| **P6** | Kết quả học tập | `term-results.service`, `termResultsDrawer`, `summaryBar` | UI ra đúng 85.0/3.45 và 73.9/2.97 khi nhập lại 2 bảng điểm |
| **P7** | Rebase + nhánh điều kiện + thống kê | `rebase.service`, `upgradePreviewDialog` | Unit test rebase: không mất điểm |
| **P8** | Bình luận + kiểm duyệt | module `course-comment`, `components/course/comments/*`, `comment-moderation/*` | API + E2E bình luận, báo cáo, ẩn |
| **P9** | Course Offering (UI) + Course Explorer | module `course-offering` (controller, copy năm), `explore-courses`; web `course-offering/*`, `courses/*`, `CourseDetailPanel` | Lọc theo khoa, ngành, năm, giảng viên, project; trang môn đổi năm học đúng |
| **P10** | Dọn dẹp | Xoá module legacy, user-service v1, kiểu v1 trong shared; roadmap-client khi xoá user; cập nhật rules | Không còn import v1; build toàn repo xanh |

> Bảng `COURSE_OFFERINGS` và topic theo offering nằm trong schema ngay từ **P1**, vì topic v1 phải chuyển thẳng sang offering. P9 chỉ là giao diện và API quản trị offering.

---

## 5. Rủi ro

| Rủi ro | Giảm thiểu |
|---|---|
| Migration không commit (I1) → môi trường lệch schema | Chốt I1 trước P1 |
| Logic lệch giữa BE và FE | Engine dùng chung (I3); cùng bộ test |
| Kéo thả với React Flow v11 phức tạp (xem trước khi kéo, animation) | Làm prototype `useDragReflow` sớm ở đầu P3 |
| Merged view chậm khi nhiều learner | CTĐT đã publish nằm trong cache; 4 query overlay có index (design §6.3) |
| Thang điểm C, D, F là giả định (D4) | Nằm trong seed, sửa seed không cần sửa code |
| Docker build của service phụ thuộc `@iuroadmap/shared` | Kiểm tra pipeline K8s trước khi deploy (mục 0) |
