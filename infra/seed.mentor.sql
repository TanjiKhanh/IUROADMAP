-- Connect to gupjob_mentor database first!
\c gupjob_mentor;

-- Insert Mentor Profiles (userId 4, 5, 6 from auth service)
INSERT INTO "MentorProfile" (
  "userId", 
  bio, 
  "cvUrl", 
  "linkedinUrl", 
  industry, 
  skills, 
  "createdAt", 
  "updatedAt"
) VALUES
(
  4,
  'Senior Full-Stack Developer with 10+ years experience in Web Development. Passionate about mentoring juniors.',
  'https://example.com/alice-cv.pdf',
  'https://linkedin.com/in/alice-mentor',
  'Tech',
  ARRAY['Node.js', 'TypeScript', 'React', 'PostgreSQL', 'System Design'],
  NOW(),
  NOW()
),
(
  5,
  'Backend Engineer specializing in Microservices and Cloud Architecture. Love sharing knowledge!',
  'https://example.com/charlie-cv.pdf',
  'https://linkedin.com/in/charlie-dev',
  'Tech',
  ARRAY['NestJS', 'Java', 'Docker', 'Kubernetes', 'AWS', 'Microservices'],
  NOW(),
  NOW()
),
(
  6,
  'Full-Stack Developer with expertise in mobile and web. 8 years in the industry.',
  'https://example.com/diana-cv.pdf',
  'https://linkedin.com/in/diana-expert',
  'Tech',
  ARRAY['React Native', 'Flutter', 'JavaScript', 'Firebase', 'UI/UX Design'],
  NOW(),
  NOW()
);

-- Insert Mentor Skills (supplementary)
INSERT INTO "MentorSkill" ("mentorId", "skillName", "createdAt", "updatedAt") VALUES
(4, 'Node.js', NOW(), NOW()),
(4, 'TypeScript', NOW(), NOW()),
(4, 'React', NOW(), NOW()),
(5, 'NestJS', NOW(), NOW()),
(5, 'Docker', NOW(), NOW()),
(6, 'React Native', NOW(), NOW()),
(6, 'Flutter', NOW(), NOW());