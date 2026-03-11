-- Create all databases
CREATE DATABASE gupjob_auth;
CREATE DATABASE gupjob_admin;
CREATE DATABASE gupjob_mentor;
CREATE DATABASE gupjob_user;

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE gupjob_auth TO gupjob;
GRANT ALL PRIVILEGES ON DATABASE gupjob_admin TO gupjob;
GRANT ALL PRIVILEGES ON DATABASE gupjob_mentor TO gupjob;
GRANT ALL PRIVILEGES ON DATABASE gupjob_user TO gupjob;

-- Connect to auth and create tables
\c gupjob_auth;

CREATE TYPE "Role" AS ENUM ('STUDENT', 'MENTOR', 'ADMIN');
CREATE TYPE "AccountStatus" AS ENUM ('PENDING_APPROVAL', 'ACTIVE', 'BANNED', 'REJECTED');

CREATE TABLE "User" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role "Role" DEFAULT 'STUDENT',
  status "AccountStatus" DEFAULT 'ACTIVE',
  "resetPasswordToken" VARCHAR(255),
  "resetPasswordExpires" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "RefreshToken" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" INTEGER NOT NULL REFERENCES "User"(id),
  "tokenHash" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" TIMESTAMP NOT NULL,
  revoked BOOLEAN DEFAULT false,
  "userAgent" VARCHAR(255),
  ip VARCHAR(45),
  CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE INDEX idx_refreshtoken_userid ON "RefreshToken"("userId");

-- Connect to mentor database
\c gupjob_mentor;

CREATE TABLE "MentorProfile" (
  "userId" INTEGER PRIMARY KEY,
  bio TEXT,
  "cvUrl" VARCHAR(255),
  "linkedinUrl" VARCHAR(255),
  industry VARCHAR(255),
  skills TEXT[],
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "MentorSkill" (
  id SERIAL PRIMARY KEY,
  "mentorId" INTEGER NOT NULL,
  "skillName" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_mentor_skill_mentorid ON "MentorSkill"("mentorId");

-- Connect to admin database
\c gupjob_admin;

CREATE TYPE "CourseType" AS ENUM ('BASIC', 'JOB');

CREATE TABLE "Department" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_department_slug ON "Department"(slug);

CREATE TABLE "Course" (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type "CourseType",
  "departmentId" INTEGER REFERENCES "Department"(id),
  "priorityJob" TEXT[],
  structure JSONB,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_course_departmentid ON "Course"("departmentId");

CREATE TABLE "Roadmap" (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  "courseId" INTEGER REFERENCES "Course"(id),
  structure JSONB,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_roadmap_courseid ON "Roadmap"("courseId");

CREATE TABLE "RoadmapNode" (
  id SERIAL PRIMARY KEY,
  "roadmapId" INTEGER NOT NULL REFERENCES "Roadmap"(id) ON DELETE CASCADE,
  "nodeKey" VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  "contentMd" TEXT,
  "isRequired" BOOLEAN DEFAULT true,
  metadata JSONB,
  coords JSONB,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("roadmapId", "nodeKey")
);

CREATE INDEX idx_roadmapnode_roadmapid ON "RoadmapNode"("roadmapId");

CREATE TABLE "RoadmapEdge" (
  id SERIAL PRIMARY KEY,
  "roadmapId" INTEGER NOT NULL REFERENCES "Roadmap"(id) ON DELETE CASCADE,
  "sourceKey" VARCHAR(255) NOT NULL,
  "targetKey" VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_roadmapedge_roadmapid_sourcekey ON "RoadmapEdge"("roadmapId", "sourceKey");
CREATE INDEX idx_roadmapedge_roadmapid_targetkey ON "RoadmapEdge"("roadmapId", "targetKey");

-- Connect to user database
\c gupjob_user;

CREATE TYPE "RoadmapNodeStatus" AS ENUM ('AVAILABLE', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED', 'LOCKED');

CREATE TABLE "UserRoadmap" (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL,
  "masterRoadmapId" INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255),
  "progressPercent" INTEGER DEFAULT 0,
  "totalNodes" INTEGER DEFAULT 0,
  "completedNodes" INTEGER DEFAULT 0,
  "startDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "targetDate" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("userId", "masterRoadmapId")
);

CREATE INDEX idx_userroadmap_userid ON "UserRoadmap"("userId");
CREATE INDEX idx_userroadmap_masterroadmapid ON "UserRoadmap"("masterRoadmapId");

CREATE TABLE "UserRoadmapNode" (
  id SERIAL PRIMARY KEY,
  "userRoadmapId" INTEGER NOT NULL REFERENCES "UserRoadmap"(id) ON DELETE CASCADE,
  "nodeKey" VARCHAR(255) NOT NULL,
  status "RoadmapNodeStatus" DEFAULT 'AVAILABLE',
  "userNotesMd" TEXT,
  "userResources" JSONB,
  "startedAt" TIMESTAMP,
  "completedAt" TIMESTAMP,
  "timeSpentMinutes" INTEGER DEFAULT 0,
  "difficultyRating" INTEGER,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("userRoadmapId", "nodeKey")
);

CREATE INDEX idx_userroadmapnode_userroadmapid ON "UserRoadmapNode"("userRoadmapId");

CREATE TABLE "LearnerProfile" (
  "userId" INTEGER PRIMARY KEY,
  "universityDepartment" VARCHAR(255),
  major VARCHAR(255),
  bio JSONB,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_learnerprofile_universitydepartment ON "LearnerProfile"("universityDepartment");
CREATE INDEX idx_learnerprofile_major ON "LearnerProfile"(major);