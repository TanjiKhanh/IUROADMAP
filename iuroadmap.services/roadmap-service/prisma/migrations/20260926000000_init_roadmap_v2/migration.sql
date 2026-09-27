-- CreateEnum
CREATE TYPE "RoadmapVersionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TermKind" AS ENUM ('REGULAR', 'SUMMER', 'ELECTIVE_POOL');

-- CreateEnum
CREATE TYPE "RoadmapNodeKind" AS ENUM ('COURSE', 'ELECTIVE_SLOT');

-- CreateEnum
CREATE TYPE "RelationType" AS ENUM ('PREREQUISITE', 'PREVIOUS', 'COREQUISITE');

-- CreateEnum
CREATE TYPE "StudentRoadmapStatus" AS ENUM ('ENROLLED', 'COMPLETED', 'DROPPED');

-- CreateEnum
CREATE TYPE "DeltaOrigin" AS ENUM ('BASE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "CourseResultStatus" AS ENUM ('IN_PROGRESS', 'GRADED');

-- CreateEnum
CREATE TYPE "GradingMode" AS ENUM ('SCORE', 'PASS_FAIL');

-- CreateEnum
CREATE TYPE "OfferingStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "TermInYear" AS ENUM ('SEMESTER_1', 'SEMESTER_2', 'SUMMER');

-- CreateEnum
CREATE TYPE "LecturerRole" AS ENUM ('LECTURER', 'TA');

-- CreateEnum
CREATE TYPE "LecturerStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'RETIRED');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('VISIBLE', 'FLAGGED', 'HIDDEN', 'DELETED');

-- CreateEnum
CREATE TYPE "CommentReportReason" AS ENUM ('SPAM', 'OFFENSIVE', 'OFF_TOPIC', 'MISINFORMATION', 'OTHER');

-- CreateEnum
CREATE TYPE "CommentReportStatus" AS ENUM ('PENDING', 'REVIEWED', 'DISMISSED');

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "major_roadmaps" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "department_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "major_roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_categories" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fill_color" TEXT NOT NULL,
    "border_color" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "theory_credits" INTEGER NOT NULL,
    "lab_credits" INTEGER NOT NULL DEFAULT 0,
    "category_id" INTEGER NOT NULL,
    "grading_mode" "GradingMode" NOT NULL DEFAULT 'SCORE',
    "counts_toward_gpa" BOOLEAN NOT NULL DEFAULT true,
    "counts_toward_credits" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_offerings" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "academic_year" INTEGER NOT NULL,
    "status" "OfferingStatus" NOT NULL DEFAULT 'DRAFT',
    "student_guide" TEXT,
    "syllabus_url" TEXT,
    "weight_process" INTEGER,
    "weight_midterm" INTEGER,
    "weight_final" INTEGER,
    "has_project" BOOLEAN NOT NULL DEFAULT false,
    "project_description" TEXT,
    "copied_from_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_offerings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecturers" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "title" TEXT,
    "department_id" INTEGER NOT NULL,
    "email" TEXT,
    "status" "LecturerStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lecturers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_offering_lecturers" (
    "id" SERIAL NOT NULL,
    "offering_id" INTEGER NOT NULL,
    "lecturer_id" INTEGER NOT NULL,
    "role" "LecturerRole" NOT NULL DEFAULT 'LECTURER',
    "term_in_year" "TermInYear",

    CONSTRAINT "course_offering_lecturers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap_versions" (
    "id" SERIAL NOT NULL,
    "roadmap_id" INTEGER NOT NULL,
    "cohort_year" INTEGER NOT NULL,
    "revision_no" INTEGER,
    "total_credits" INTEGER NOT NULL,
    "decision_ref" TEXT,
    "status" "RoadmapVersionStatus" NOT NULL DEFAULT 'DRAFT',
    "revision" INTEGER NOT NULL DEFAULT 0,
    "published_at" TIMESTAMP(3),
    "published_by" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roadmap_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap_terms" (
    "id" SERIAL NOT NULL,
    "version_id" INTEGER NOT NULL,
    "term_key" UUID NOT NULL,
    "order_index" INTEGER NOT NULL,
    "kind" "TermKind" NOT NULL,
    "semester_no" INTEGER,

    CONSTRAINT "roadmap_terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap_nodes" (
    "id" SERIAL NOT NULL,
    "version_id" INTEGER NOT NULL,
    "node_key" UUID NOT NULL,
    "term_id" INTEGER NOT NULL,
    "row_index" INTEGER NOT NULL,
    "kind" "RoadmapNodeKind" NOT NULL,
    "course_id" INTEGER,
    "slot_label" TEXT,
    "slot_theory_credits" INTEGER,
    "slot_lab_credits" INTEGER,
    "elective_group" TEXT,
    "choice_group" TEXT,
    "condition" TEXT,

    CONSTRAINT "roadmap_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap_edges" (
    "id" SERIAL NOT NULL,
    "version_id" INTEGER NOT NULL,
    "edge_key" UUID NOT NULL,
    "source_node_id" INTEGER NOT NULL,
    "target_node_id" INTEGER NOT NULL,
    "type" "RelationType" NOT NULL,

    CONSTRAINT "roadmap_edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_topics_node" (
    "id" SERIAL NOT NULL,
    "offering_id" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coords" JSONB,
    "learning_objectives" TEXT,
    "resources_url" TEXT,
    "estimated_hours" DECIMAL(6,1),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_topics_node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_topics_edge" (
    "id" SERIAL NOT NULL,
    "source_topic_id" INTEGER NOT NULL,
    "target_topic_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_topics_edge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_roadmaps" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "roadmap_id" INTEGER NOT NULL,
    "version_id" INTEGER NOT NULL,
    "status" "StudentRoadmapStatus" NOT NULL DEFAULT 'ENROLLED',
    "revision" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_term_deltas" (
    "id" SERIAL NOT NULL,
    "student_roadmap_id" INTEGER NOT NULL,
    "term_key" UUID NOT NULL,
    "origin" "DeltaOrigin" NOT NULL,
    "kind" "TermKind",
    "after_term_key" UUID,
    "custom_label" TEXT,
    "academic_year" INTEGER,
    "term_in_year" "TermInYear",

    CONSTRAINT "student_term_deltas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_node_deltas" (
    "id" SERIAL NOT NULL,
    "student_roadmap_id" INTEGER NOT NULL,
    "node_key" UUID NOT NULL,
    "origin" "DeltaOrigin" NOT NULL,
    "term_key" UUID,
    "row_order" DECIMAL(12,6),
    "course_id" INTEGER,
    "custom_code" TEXT,
    "custom_name" TEXT,
    "custom_theory_credits" INTEGER,
    "custom_lab_credits" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_node_deltas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_edge_deltas" (
    "id" SERIAL NOT NULL,
    "student_roadmap_id" INTEGER NOT NULL,
    "edge_key" UUID NOT NULL,
    "source_node_key" UUID NOT NULL,
    "target_node_key" UUID NOT NULL,
    "type" "RelationType" NOT NULL,

    CONSTRAINT "student_edge_deltas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_course_results" (
    "id" SERIAL NOT NULL,
    "student_roadmap_id" INTEGER NOT NULL,
    "node_key" UUID NOT NULL,
    "status" "CourseResultStatus" NOT NULL,
    "weight_process" INTEGER,
    "weight_midterm" INTEGER,
    "weight_final" INTEGER,
    "score_process" DECIMAL(4,1),
    "score_midterm" DECIMAL(4,1),
    "score_final" DECIMAL(4,1),
    "total_score" INTEGER,
    "is_passed" BOOLEAN,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_course_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_comments" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "user_id" UUID NOT NULL,
    "academic_year" INTEGER,
    "author_display_name" TEXT,
    "content" TEXT NOT NULL,
    "status" "CommentStatus" NOT NULL DEFAULT 'VISIBLE',
    "pending_report_count" INTEGER NOT NULL DEFAULT 0,
    "edited_at" TIMESTAMP(3),
    "moderated_by" UUID,
    "moderated_at" TIMESTAMP(3),
    "moderation_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_comment_reports" (
    "id" SERIAL NOT NULL,
    "comment_id" INTEGER NOT NULL,
    "reporter_id" UUID NOT NULL,
    "reason" "CommentReportReason" NOT NULL,
    "note" TEXT,
    "status" "CommentReportStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_comment_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grade_scales" (
    "id" SERIAL NOT NULL,
    "letter" TEXT NOT NULL,
    "min_score" INTEGER NOT NULL,
    "max_score" INTEGER NOT NULL,
    "grade_point" DECIMAL(3,2) NOT NULL,
    "is_passing" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grade_scales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_classifications" (
    "id" SERIAL NOT NULL,
    "label_key" TEXT NOT NULL,
    "min_gpa100" DECIMAL(4,1) NOT NULL,
    "max_gpa100" DECIMAL(4,1) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_classifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "departments_slug_key" ON "departments"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "major_roadmaps_slug_key" ON "major_roadmaps"("slug");

-- CreateIndex
CREATE INDEX "major_roadmaps_department_id_idx" ON "major_roadmaps"("department_id");

-- CreateIndex
CREATE UNIQUE INDEX "course_categories_code_key" ON "course_categories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "courses_code_key" ON "courses"("code");

-- CreateIndex
CREATE INDEX "courses_category_id_idx" ON "courses"("category_id");

-- CreateIndex
CREATE INDEX "course_offerings_academic_year_status_idx" ON "course_offerings"("academic_year", "status");

-- CreateIndex
CREATE UNIQUE INDEX "course_offerings_course_id_academic_year_key" ON "course_offerings"("course_id", "academic_year");

-- CreateIndex
CREATE UNIQUE INDEX "lecturers_email_key" ON "lecturers"("email");

-- CreateIndex
CREATE INDEX "lecturers_department_id_idx" ON "lecturers"("department_id");

-- CreateIndex
CREATE INDEX "course_offering_lecturers_lecturer_id_idx" ON "course_offering_lecturers"("lecturer_id");

-- CreateIndex
CREATE UNIQUE INDEX "course_offering_lecturers_offering_id_lecturer_id_term_in_y_key" ON "course_offering_lecturers"("offering_id", "lecturer_id", "term_in_year");

-- CreateIndex
CREATE INDEX "roadmap_versions_roadmap_id_cohort_year_status_idx" ON "roadmap_versions"("roadmap_id", "cohort_year", "status");

-- CreateIndex
CREATE UNIQUE INDEX "roadmap_versions_roadmap_id_cohort_year_revision_no_key" ON "roadmap_versions"("roadmap_id", "cohort_year", "revision_no");

-- CreateIndex
CREATE UNIQUE INDEX "roadmap_terms_version_id_term_key_key" ON "roadmap_terms"("version_id", "term_key");

-- CreateIndex
CREATE UNIQUE INDEX "roadmap_terms_version_id_order_index_key" ON "roadmap_terms"("version_id", "order_index");

-- CreateIndex
CREATE INDEX "roadmap_nodes_course_id_idx" ON "roadmap_nodes"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "roadmap_nodes_version_id_node_key_key" ON "roadmap_nodes"("version_id", "node_key");

-- CreateIndex
CREATE UNIQUE INDEX "roadmap_nodes_term_id_row_index_key" ON "roadmap_nodes"("term_id", "row_index");

-- CreateIndex
CREATE UNIQUE INDEX "roadmap_nodes_version_id_course_id_key" ON "roadmap_nodes"("version_id", "course_id");

-- CreateIndex
CREATE INDEX "roadmap_edges_target_node_id_idx" ON "roadmap_edges"("target_node_id");

-- CreateIndex
CREATE UNIQUE INDEX "roadmap_edges_version_id_edge_key_key" ON "roadmap_edges"("version_id", "edge_key");

-- CreateIndex
CREATE UNIQUE INDEX "roadmap_edges_source_node_id_target_node_id_key" ON "roadmap_edges"("source_node_id", "target_node_id");

-- CreateIndex
CREATE INDEX "course_topics_node_offering_id_idx" ON "course_topics_node"("offering_id");

-- CreateIndex
CREATE UNIQUE INDEX "course_topics_node_offering_id_slug_key" ON "course_topics_node"("offering_id", "slug");

-- CreateIndex
CREATE INDEX "course_topics_edge_target_topic_id_idx" ON "course_topics_edge"("target_topic_id");

-- CreateIndex
CREATE UNIQUE INDEX "course_topics_edge_source_topic_id_target_topic_id_key" ON "course_topics_edge"("source_topic_id", "target_topic_id");

-- CreateIndex
CREATE INDEX "student_roadmaps_version_id_idx" ON "student_roadmaps"("version_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_roadmaps_user_id_roadmap_id_key" ON "student_roadmaps"("user_id", "roadmap_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_term_deltas_student_roadmap_id_term_key_key" ON "student_term_deltas"("student_roadmap_id", "term_key");

-- CreateIndex
CREATE INDEX "student_node_deltas_course_id_idx" ON "student_node_deltas"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_node_deltas_student_roadmap_id_node_key_key" ON "student_node_deltas"("student_roadmap_id", "node_key");

-- CreateIndex
CREATE UNIQUE INDEX "student_edge_deltas_student_roadmap_id_edge_key_key" ON "student_edge_deltas"("student_roadmap_id", "edge_key");

-- CreateIndex
CREATE UNIQUE INDEX "student_edge_deltas_student_roadmap_id_source_node_key_targ_key" ON "student_edge_deltas"("student_roadmap_id", "source_node_key", "target_node_key");

-- CreateIndex
CREATE UNIQUE INDEX "student_course_results_student_roadmap_id_node_key_key" ON "student_course_results"("student_roadmap_id", "node_key");

-- CreateIndex
CREATE INDEX "course_comments_course_id_parent_id_status_created_at_idx" ON "course_comments"("course_id", "parent_id", "status", "created_at");

-- CreateIndex
CREATE INDEX "course_comments_status_pending_report_count_idx" ON "course_comments"("status", "pending_report_count");

-- CreateIndex
CREATE INDEX "course_comments_user_id_created_at_idx" ON "course_comments"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "course_comment_reports_comment_id_reporter_id_key" ON "course_comment_reports"("comment_id", "reporter_id");

-- CreateIndex
CREATE UNIQUE INDEX "grade_scales_letter_key" ON "grade_scales"("letter");

-- CreateIndex
CREATE UNIQUE INDEX "academic_classifications_label_key_key" ON "academic_classifications"("label_key");

-- AddForeignKey
ALTER TABLE "major_roadmaps" ADD CONSTRAINT "major_roadmaps_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "course_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_offerings" ADD CONSTRAINT "course_offerings_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturers" ADD CONSTRAINT "lecturers_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_offering_lecturers" ADD CONSTRAINT "course_offering_lecturers_offering_id_fkey" FOREIGN KEY ("offering_id") REFERENCES "course_offerings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_offering_lecturers" ADD CONSTRAINT "course_offering_lecturers_lecturer_id_fkey" FOREIGN KEY ("lecturer_id") REFERENCES "lecturers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_versions" ADD CONSTRAINT "roadmap_versions_roadmap_id_fkey" FOREIGN KEY ("roadmap_id") REFERENCES "major_roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_terms" ADD CONSTRAINT "roadmap_terms_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "roadmap_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_nodes" ADD CONSTRAINT "roadmap_nodes_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "roadmap_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_nodes" ADD CONSTRAINT "roadmap_nodes_term_id_fkey" FOREIGN KEY ("term_id") REFERENCES "roadmap_terms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_nodes" ADD CONSTRAINT "roadmap_nodes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_edges" ADD CONSTRAINT "roadmap_edges_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "roadmap_versions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_edges" ADD CONSTRAINT "roadmap_edges_source_node_id_fkey" FOREIGN KEY ("source_node_id") REFERENCES "roadmap_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roadmap_edges" ADD CONSTRAINT "roadmap_edges_target_node_id_fkey" FOREIGN KEY ("target_node_id") REFERENCES "roadmap_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_topics_node" ADD CONSTRAINT "course_topics_node_offering_id_fkey" FOREIGN KEY ("offering_id") REFERENCES "course_offerings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_topics_edge" ADD CONSTRAINT "course_topics_edge_source_topic_id_fkey" FOREIGN KEY ("source_topic_id") REFERENCES "course_topics_node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_topics_edge" ADD CONSTRAINT "course_topics_edge_target_topic_id_fkey" FOREIGN KEY ("target_topic_id") REFERENCES "course_topics_node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_roadmaps" ADD CONSTRAINT "student_roadmaps_roadmap_id_fkey" FOREIGN KEY ("roadmap_id") REFERENCES "major_roadmaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_roadmaps" ADD CONSTRAINT "student_roadmaps_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "roadmap_versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_term_deltas" ADD CONSTRAINT "student_term_deltas_student_roadmap_id_fkey" FOREIGN KEY ("student_roadmap_id") REFERENCES "student_roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_node_deltas" ADD CONSTRAINT "student_node_deltas_student_roadmap_id_fkey" FOREIGN KEY ("student_roadmap_id") REFERENCES "student_roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_node_deltas" ADD CONSTRAINT "student_node_deltas_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_edge_deltas" ADD CONSTRAINT "student_edge_deltas_student_roadmap_id_fkey" FOREIGN KEY ("student_roadmap_id") REFERENCES "student_roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course_results" ADD CONSTRAINT "student_course_results_student_roadmap_id_fkey" FOREIGN KEY ("student_roadmap_id") REFERENCES "student_roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_comments" ADD CONSTRAINT "course_comments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_comments" ADD CONSTRAINT "course_comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "course_comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_comment_reports" ADD CONSTRAINT "course_comment_reports_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "course_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- =====================================================================
-- Hand-written constraints (roadmap-schema.md § "Ràng buộc Prisma không biểu diễn được")
-- =====================================================================

-- One DRAFT and one PUBLISHED curriculum per (major, cohort year) — BR-RM-07, BR-RM-15
CREATE UNIQUE INDEX "roadmap_versions_one_draft_per_year"
  ON "roadmap_versions" ("roadmap_id", "cohort_year") WHERE "status" = 'DRAFT';
CREATE UNIQUE INDEX "roadmap_versions_one_published_per_year"
  ON "roadmap_versions" ("roadmap_id", "cohort_year") WHERE "status" = 'PUBLISHED';

-- Custom term chain: at most one custom term right after each position (NULL = before the first term)
CREATE UNIQUE INDEX "student_term_deltas_one_after"
  ON "student_term_deltas" ("student_roadmap_id",
      COALESCE("after_term_key", '00000000-0000-0000-0000-000000000000'::uuid))
  WHERE "origin" = 'CUSTOM';

-- A lecturer is assigned at most once for the whole academic year (term_in_year NULL)
CREATE UNIQUE INDEX "course_offering_lecturers_whole_year"
  ON "course_offering_lecturers" ("offering_id", "lecturer_id") WHERE "term_in_year" IS NULL;

-- CHECK constraints
ALTER TABLE "course_categories"
  ADD CONSTRAINT "course_categories_colors_hex"
  CHECK ("fill_color" ~ '^#[0-9A-Fa-f]{6}$' AND "border_color" ~ '^#[0-9A-Fa-f]{6}$');

ALTER TABLE "courses"
  ADD CONSTRAINT "courses_credits_valid"
  CHECK ("theory_credits" >= 0 AND "lab_credits" >= 0 AND "theory_credits" + "lab_credits" > 0);

ALTER TABLE "roadmap_versions"
  ADD CONSTRAINT "roadmap_versions_total_credits_positive" CHECK ("total_credits" > 0),
  ADD CONSTRAINT "roadmap_versions_cohort_year_range" CHECK ("cohort_year" BETWEEN 2000 AND 2100);

ALTER TABLE "course_offerings"
  ADD CONSTRAINT "course_offerings_academic_year_range" CHECK ("academic_year" BETWEEN 2000 AND 2100),
  ADD CONSTRAINT "course_offerings_weights_valid" CHECK (
    ("weight_process" IS NULL AND "weight_midterm" IS NULL AND "weight_final" IS NULL)
    OR ("weight_process" BETWEEN 0 AND 100 AND "weight_midterm" BETWEEN 0 AND 100 AND "weight_final" BETWEEN 0 AND 100
        AND "weight_process" + "weight_midterm" + "weight_final" = 100));

ALTER TABLE "roadmap_nodes"
  ADD CONSTRAINT "roadmap_nodes_kind_fields" CHECK (
    ("kind" = 'COURSE' AND "course_id" IS NOT NULL)
    OR ("kind" = 'ELECTIVE_SLOT' AND "slot_label" IS NOT NULL)),
  ADD CONSTRAINT "roadmap_nodes_row_non_negative" CHECK ("row_index" >= 0);

ALTER TABLE "roadmap_edges"
  ADD CONSTRAINT "roadmap_edges_no_self_loop" CHECK ("source_node_id" <> "target_node_id");

ALTER TABLE "student_edge_deltas"
  ADD CONSTRAINT "student_edge_deltas_no_self_loop" CHECK ("source_node_key" <> "target_node_key");

ALTER TABLE "student_course_results"
  ADD CONSTRAINT "student_course_results_weights_valid" CHECK (
    ("weight_process" IS NULL AND "weight_midterm" IS NULL AND "weight_final" IS NULL)
    OR ("weight_process" BETWEEN 0 AND 100 AND "weight_midterm" BETWEEN 0 AND 100 AND "weight_final" BETWEEN 0 AND 100
        AND "weight_process" + "weight_midterm" + "weight_final" = 100)),
  ADD CONSTRAINT "student_course_results_scores_range" CHECK (
    ("score_process" IS NULL OR "score_process" BETWEEN 0 AND 100)
    AND ("score_midterm" IS NULL OR "score_midterm" BETWEEN 0 AND 100)
    AND ("score_final" IS NULL OR "score_final" BETWEEN 0 AND 100)
    AND ("total_score" IS NULL OR "total_score" BETWEEN 0 AND 100));

ALTER TABLE "grade_scales"
  ADD CONSTRAINT "grade_scales_range" CHECK ("min_score" BETWEEN 0 AND 100 AND "max_score" BETWEEN 0 AND 100 AND "min_score" <= "max_score");
