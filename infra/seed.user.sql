-- Connect to gupjob_user database first!
\c gupjob_user;

-- Insert User Roadmaps (Enrollments)
INSERT INTO "UserRoadmap" (
  "userId", 
  "masterRoadmapId", 
  title, 
  slug, 
  "progressPercent", 
  "totalNodes", 
  "completedNodes", 
  "startDate", 
  "targetDate", 
  "createdAt", 
  "updatedAt"
) VALUES
-- Student 1 enrolled in React
(
  1,
  1,
  'Complete React Roadmap',
  'react-roadmap',
  40,
  5,
  2,
  NOW() - INTERVAL '30 days',
  NOW() + INTERVAL '30 days',
  NOW() - INTERVAL '30 days',
  NOW()
),
-- Student 1 enrolled in NestJS
(
  1,
  2,
  'NestJS Masterclass Path',
  'nestjs-roadmap',
  20,
  4,
  1,
  NOW() - INTERVAL '15 days',
  NOW() + INTERVAL '45 days',
  NOW() - INTERVAL '15 days',
  NOW()
),
-- Student 2 enrolled in React
(
  2,
  1,
  'Complete React Roadmap',
  'react-roadmap',
  60,
  5,
  3,
  NOW() - INTERVAL '20 days',
  NOW() + INTERVAL '40 days',
  NOW() - INTERVAL '20 days',
  NOW()
),
-- Student 2 enrolled in SQL
(
  2,
  3,
  'SQL Optimization Guide',
  'sql-roadmap',
  33,
  3,
  1,
  NOW() - INTERVAL '7 days',
  NOW() + INTERVAL '60 days',
  NOW() - INTERVAL '7 days',
  NOW()
);

-- Insert User Roadmap Nodes (Progress tracking)
-- Student 1 - React Progress
INSERT INTO "UserRoadmapNode" (
  "userRoadmapId", 
  "nodeKey", 
  status, 
  "userNotesMd", 
  "startedAt", 
  "completedAt", 
  "timeSpentMinutes", 
  "difficultyRating", 
  "createdAt", 
  "updatedAt"
) VALUES
(1, 'react-intro', 'COMPLETED', 'Good introduction, easy to understand', NOW() - INTERVAL '25 days', NOW() - INTERVAL '24 days', 65, 2, NOW(), NOW()),
(1, 'react-jsx', 'COMPLETED', 'JSX syntax was a bit confusing at first', NOW() - INTERVAL '23 days', NOW() - INTERVAL '22 days', 50, 3, NOW(), NOW()),
(1, 'react-components', 'IN_PROGRESS', 'Working on understanding component lifecycle', NOW() - INTERVAL '10 days', NULL, 120, NULL, NOW(), NOW()),
(1, 'react-hooks', 'AVAILABLE', NULL, NULL, NULL, 0, NULL, NOW(), NOW()),
(1, 'react-context', 'AVAILABLE', NULL, NULL, NULL, 0, NULL, NOW(), NOW());

-- Student 1 - NestJS Progress
INSERT INTO "UserRoadmapNode" (
  "userRoadmapId", 
  "nodeKey", 
  status, 
  "userNotesMd", 
  "startedAt", 
  "completedAt", 
  "timeSpentMinutes", 
  "difficultyRating", 
  "createdAt", 
  "updatedAt"
) VALUES
(2, 'nestjs-intro', 'COMPLETED', 'Framework overview completed', NOW() - INTERVAL '10 days', NOW() - INTERVAL '9 days', 75, 2, NOW(), NOW()),
(2, 'nestjs-modules', 'IN_PROGRESS', 'Learning about dependency injection', NOW() - INTERVAL '5 days', NULL, 95, NULL, NOW(), NOW()),
(2, 'nestjs-controllers', 'AVAILABLE', NULL, NULL, NULL, 0, NULL, NOW(), NOW()),
(2, 'nestjs-database', 'AVAILABLE', NULL, NULL, NULL, 0, NULL, NOW(), NOW());

-- Student 2 - React Progress
INSERT INTO "UserRoadmapNode" (
  "userRoadmapId", 
  "nodeKey", 
  status, 
  "userNotesMd", 
  "startedAt", 
  "completedAt", 
  "timeSpentMinutes", 
  "difficultyRating", 
  "createdAt", 
  "updatedAt"
) VALUES
(3, 'react-intro', 'COMPLETED', 'Basics are clear', NOW() - INTERVAL '18 days', NOW() - INTERVAL '17 days', 50, 1, NOW(), NOW()),
(3, 'react-jsx', 'COMPLETED', 'JSX is intuitive', NOW() - INTERVAL '16 days', NOW() - INTERVAL '15 days', 40, 1, NOW(), NOW()),
(3, 'react-components', 'COMPLETED', 'Component reusability is powerful', NOW() - INTERVAL '12 days', NOW() - INTERVAL '11 days', 100, 3, NOW(), NOW()),
(3, 'react-hooks', 'IN_PROGRESS', 'Hooks are game-changing!', NOW() - INTERVAL '5 days', NULL, 150, NULL, NOW(), NOW()),
(3, 'react-context', 'AVAILABLE', NULL, NULL, NULL, 0, NULL, NOW(), NOW());

-- Student 2 - SQL Progress
INSERT INTO "UserRoadmapNode" (
  "userRoadmapId", 
  "nodeKey", 
  status, 
  "userNotesMd", 
  "startedAt", 
  "completedAt", 
  "timeSpentMinutes", 
  "difficultyRating", 
  "createdAt", 
  "updatedAt"
) VALUES
(4, 'sql-basics', 'COMPLETED', 'SELECT and JOIN are fundamental', NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days', 110, 2, NOW(), NOW()),
(4, 'sql-advanced', 'IN_PROGRESS', 'CTEs are complex but powerful', NOW() - INTERVAL '2 days', NULL, 80, NULL, NOW(), NOW()),
(4, 'sql-optimization', 'AVAILABLE', NULL, NULL, NULL, 0, NULL, NOW(), NOW());

-- Insert Learner Profiles
INSERT INTO "LearnerProfile" (
  "userId", 
  "universityDepartment", 
  major, 
  bio, 
  "createdAt", 
  "updatedAt"
) VALUES
(
  1,
  'IU - Computer Science',
  'Computer Science',
  '{"interests": ["Web Development", "AI"], "goals": "Become a Full-Stack Developer", "linkedin": "https://linkedin.com/in/john"}',
  NOW(),
  NOW()
),
(
  2,
  'FPT University - Information Technology',
  'Software Engineering',
  '{"interests": ["Backend Development", "DevOps"], "goals": "Master backend systems", "github": "https://github.com/jane"}',
  NOW(),
  NOW()
),
(
  3,
  'HUST - Computer Engineering',
  'Computer Engineering',
  '{"interests": ["Full-Stack", "Mobile"], "goals": "Learn mobile development", "twitter": "https://twitter.com/bob"}',
  NOW(),
  NOW()
);