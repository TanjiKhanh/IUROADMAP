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

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_departments_slug ON departments(slug);

CREATE TABLE major_roadmaps (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  total_credits INTEGER NOT NULL,
  description TEXT,
  department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_major_roadmaps_department_id ON major_roadmaps(department_id);

CREATE TABLE course_nodes (
  id SERIAL PRIMARY KEY,
  roadmap_id INTEGER NOT NULL REFERENCES major_roadmaps(id) ON DELETE CASCADE,
  slug VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  coords JSONB,
  credits INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(roadmap_id, slug)
);

CREATE INDEX idx_course_nodes_roadmap_id ON course_nodes(roadmap_id);

CREATE TABLE course_node_prerequisites (
  id SERIAL PRIMARY KEY,
  course_node_id INTEGER NOT NULL REFERENCES course_nodes(id) ON DELETE CASCADE,
  prerequisite_node_id INTEGER NOT NULL REFERENCES course_nodes(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course_node_id, prerequisite_node_id)
);

CREATE INDEX idx_course_node_prerequisites_course_node_id ON course_node_prerequisites(course_node_id);
CREATE INDEX idx_course_node_prerequisites_prerequisite_node_id ON course_node_prerequisites(prerequisite_node_id);

CREATE TABLE course_topics_node (
  id SERIAL PRIMARY KEY,
  course_node_id INTEGER NOT NULL REFERENCES course_nodes(id) ON DELETE CASCADE,
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  coords JSONB,
  learning_objectives TEXT,
  resources_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(course_node_id, slug)
);

CREATE INDEX idx_course_topics_node_course_node_id ON course_topics_node(course_node_id);

CREATE TABLE course_topics_edge (
  id SERIAL PRIMARY KEY,
  source_topic_id INTEGER NOT NULL REFERENCES course_topics_node(id) ON DELETE CASCADE,
  target_topic_id INTEGER NOT NULL REFERENCES course_topics_node(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(source_topic_id, target_topic_id)
);

CREATE INDEX idx_course_topics_edge_source_topic_id ON course_topics_edge(source_topic_id);
CREATE INDEX idx_course_topics_edge_target_topic_id ON course_topics_edge(target_topic_id);

-- Connect to user database
\c gupjob_user;

-- 1. Create Enums exactly matching Prisma definitions
CREATE TYPE "EnrollmentStatus" AS ENUM ('ENROLLED', 'COMPLETED', 'DROPPED');
CREATE TYPE "NodeProgressStatus" AS ENUM ('AVAILABLE', 'IN_PROGRESS', 'COMPLETED');

-- 2. Create the User Roadmaps table mapped from USER_ROADMAPS_PROGRESS
CREATE TABLE "user_roadmaps" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    roadmap_id INTEGER NOT NULL,
    enrollment_status "EnrollmentStatus" NOT NULL,
    completion_percentage INTEGER NOT NULL,
    total_credits_earned INTEGER NOT NULL,
    total_credits_required INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Matches @@unique([user_id, roadmap_id])
    CONSTRAINT unique_user_roadmap UNIQUE (user_id, roadmap_id)
);

-- Indexes for user_roadmaps
CREATE INDEX idx_user_roadmaps_user_id ON "user_roadmaps"(user_id);
CREATE INDEX idx_user_roadmaps_roadmap_id ON "user_roadmaps"(roadmap_id);


-- 3. Create the Node Progress table mapped from USER_NODE_PROGRESS
CREATE TABLE "user_node_progress" (
    id SERIAL PRIMARY KEY,
    user_roadmap_id INTEGER NOT NULL,
    course_node_id INTEGER NOT NULL,
    status "NodeProgressStatus" NOT NULL,
    credits_earned INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Matches @@unique([user_roadmap_id, course_node_id])
    CONSTRAINT unique_roadmap_node UNIQUE (user_roadmap_id, course_node_id),

    -- Matches the relation fields with onDelete: Cascade
    CONSTRAINT fk_user_roadmap FOREIGN KEY (user_roadmap_id) 
        REFERENCES "user_roadmaps"(id) ON DELETE CASCADE
);

-- Indexes for user_node_progress
CREATE INDEX idx_user_node_progress_user_roadmap_id ON "user_node_progress"(user_roadmap_id);
CREATE INDEX idx_user_node_progress_course_node_id ON "user_node_progress"(course_node_id);

-- 4. Automatically update the updated_at column on changes (PostgreSQL Best Practice)
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_roadmaps_modtime BEFORE UPDATE ON "user_roadmaps" FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_user_node_progress_modtime BEFORE UPDATE ON "user_node_progress" FOR EACH ROW EXECUTE PROCEDURE update_modified_column();