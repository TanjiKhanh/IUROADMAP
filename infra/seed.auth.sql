-- Connect to gupjob_auth database first!
\c gupjob_auth;

-- Insert Users with REAL bcrypt hashes
-- All passwords: "password123"
INSERT INTO "User" (email, password, name, role, status, "createdAt", "updatedAt") VALUES
-- Students (IDs: 1, 2, 3)
('student1@example.com', '$2b$10$GIwSnIQjztGd5hmaofM6POLeXSugR84HdY7m1cy5Y9krwJkyzGK5W', 'John Student', 'STUDENT', 'ACTIVE', NOW(), NOW()),
('student2@example.com', '$2b$10$GIwSnIQjztGd5hmaofM6POLeXSugR84HdY7m1cy5Y9krwJkyzGK5W', 'Jane Smith', 'STUDENT', 'ACTIVE', NOW(), NOW()),
('student3@example.com', '$2b$10$GIwSnIQjztGd5hmaofM6POLeXSugR84HdY7m1cy5Y9krwJkyzGK5W', 'Bob Johnson', 'STUDENT', 'ACTIVE', NOW(), NOW()),

-- Mentors (IDs: 4, 5, 6)
('mentor1@example.com', '$2b$10$GIwSnIQjztGd5hmaofM6POLeXSugR84HdY7m1cy5Y9krwJkyzGK5W', 'Alice Mentor', 'MENTOR', 'PENDING_APPROVAL', NOW(), NOW()),
('mentor2@example.com', '$2b$10$GIwSnIQjztGd5hmaofM6POLeXSugR84HdY7m1cy5Y9krwJkyzGK5W', 'Charlie Dev', 'MENTOR', 'ACTIVE', NOW(), NOW()),
('mentor3@example.com', '$2b$10$GIwSnIQjztGd5hmaofM6POLeXSugR84HdY7m1cy5Y9krwJkyzGK5W', 'Diana Expert', 'MENTOR', 'ACTIVE', NOW(), NOW()),

-- Admins (IDs: 7, 8)
('admin@example.com', '$2b$10$GIwSnIQjztGd5hmaofM6POLeXSugR84HdY7m1cy5Y9krwJkyzGK5W', 'Admin User', 'ADMIN', 'ACTIVE', NOW(), NOW()),
('admin2@example.com', '$2b$10$GIwSnIQjztGd5hmaofM6POLeXSugR84HdY7m1cy5Y9krwJkyzGK5W', 'Super Admin', 'ADMIN', 'ACTIVE', NOW(), NOW());

-- Insert Refresh Tokens
INSERT INTO "RefreshToken" (id, "userId", "tokenHash", "createdAt", "expiresAt", revoked, "userAgent", ip) VALUES
(gen_random_uuid(), 1, 'token_hash_student1', NOW(), NOW() + INTERVAL '7 days', false, 'Mozilla/5.0', '192.168.1.1'),
(gen_random_uuid(), 4, 'token_hash_mentor1', NOW(), NOW() + INTERVAL '7 days', false, 'Mozilla/5.0', '192.168.1.2'),
(gen_random_uuid(), 7, 'token_hash_admin', NOW(), NOW() + INTERVAL '7 days', false, 'Mozilla/5.0', '192.168.1.3');