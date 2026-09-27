-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('ENROLLED', 'COMPLETED', 'DROPPED');

-- CreateEnum
CREATE TYPE "NodeProgressStatus" AS ENUM ('AVAILABLE', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "user_roadmaps" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "roadmap_id" INTEGER NOT NULL,
    "enrollment_status" "EnrollmentStatus" NOT NULL,
    "completion_percentage" INTEGER NOT NULL,
    "total_credits_earned" INTEGER NOT NULL,
    "total_credits_required" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_node_progress" (
    "id" SERIAL NOT NULL,
    "user_roadmap_id" INTEGER NOT NULL,
    "course_node_id" INTEGER NOT NULL,
    "status" "NodeProgressStatus" NOT NULL,
    "credits_earned" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_node_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_roadmaps_user_id_idx" ON "user_roadmaps"("user_id");

-- CreateIndex
CREATE INDEX "user_roadmaps_roadmap_id_idx" ON "user_roadmaps"("roadmap_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_roadmaps_user_id_roadmap_id_key" ON "user_roadmaps"("user_id", "roadmap_id");

-- CreateIndex
CREATE INDEX "user_node_progress_user_roadmap_id_idx" ON "user_node_progress"("user_roadmap_id");

-- CreateIndex
CREATE INDEX "user_node_progress_course_node_id_idx" ON "user_node_progress"("course_node_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_node_progress_user_roadmap_id_course_node_id_key" ON "user_node_progress"("user_roadmap_id", "course_node_id");

-- AddForeignKey
ALTER TABLE "user_node_progress" ADD CONSTRAINT "user_node_progress_user_roadmap_id_fkey" FOREIGN KEY ("user_roadmap_id") REFERENCES "user_roadmaps"("id") ON DELETE CASCADE ON UPDATE CASCADE;
