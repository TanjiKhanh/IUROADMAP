-- CreateTable
CREATE TABLE "MentorProfile" (
    "userId" INTEGER NOT NULL,
    "bio" TEXT,
    "cvUrl" TEXT,
    "linkedinUrl" TEXT,
    "industry" TEXT,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentorProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "MentorSkill" (
    "id" SERIAL NOT NULL,
    "mentorId" INTEGER NOT NULL,
    "skillName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MentorSkill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MentorSkill_mentorId_idx" ON "MentorSkill"("mentorId");
