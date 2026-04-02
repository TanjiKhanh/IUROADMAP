-- Connect to gupjob_admin database first!
\c gupjob_admin;

-- Insert Departments
INSERT INTO "Department" (name, slug, description, "createdAt", "updatedAt") VALUES
('Computer Science', 'computer-science', 'All about CS fundamentals and advanced topics', NOW(), NOW()),
('Business Analytics', 'business-analytics', 'Data-driven decision making', NOW(), NOW()),
('Web Development', 'web-development', 'Modern web technologies and frameworks', NOW(), NOW());

-- Insert Courses
INSERT INTO "Course" (slug, title, description, type, "departmentId", "priorityJob", structure, "createdAt", "updatedAt") VALUES
('react-fundamentals', 'React Fundamentals', 'Learn React from scratch', 'BASIC', 3, ARRAY['Frontend Developer', 'Full-Stack Developer'], '{"color": "blue"}', NOW(), NOW()),
('nestjs-mastery', 'NestJS Mastery', 'Master NestJS framework', 'JOB', 1, ARRAY['Backend Developer', 'Full-Stack Developer'], '{"color": "green"}', NOW(), NOW()),
('data-analytics-101', 'Data Analytics 101', 'Introduction to data analytics', 'BASIC', 2, ARRAY['Data Analyst', 'Business Analyst'], '{"color": "purple"}', NOW(), NOW()),
('advanced-sql', 'Advanced SQL', 'Deep dive into SQL optimization', 'JOB', 1, ARRAY['Database Administrator', 'Backend Developer'], '{"color": "orange"}', NOW(), NOW());

-- Insert Roadmaps
INSERT INTO "Roadmap" (slug, title, description, "courseId", structure, "createdAt", "updatedAt") VALUES
('react-roadmap', 'Complete React Roadmap', 'Full journey from basics to advanced React', 1, '{"viewport": {"x": 0, "y": 0, "zoom": 1}}', NOW(), NOW()),
('nestjs-roadmap', 'NestJS Masterclass Path', 'Complete NestJS learning path', 2, '{"viewport": {"x": 0, "y": 0, "zoom": 1}}', NOW(), NOW()),
('sql-roadmap', 'SQL Optimization Guide', 'Learn SQL from basics to advanced optimization', 4, '{"viewport": {"x": 0, "y": 0, "zoom": 1}}', NOW(), NOW());

-- Insert Roadmap Nodes for React Roadmap
INSERT INTO "RoadmapNode" (
  "roadmapId", 
  "nodeKey", 
  title, 
  summary, 
  "contentMd", 
  "isRequired", 
  metadata, 
  coords, 
  "createdAt", 
  "updatedAt"
) VALUES
(
  1,
  'react-intro',
  'React Introduction',
  'Learn what React is and why it matters',
  '# React Introduction\n\nReact is a JavaScript library for building user interfaces with components.',
  true,
  '{"difficulty": "beginner", "estimatedTime": 60}',
  '{"x": 100, "y": 100}',
  NOW(),
  NOW()
),
(
  1,
  'react-jsx',
  'JSX Syntax',
  'Understand JSX and how to use it',
  '# JSX Syntax\n\nJSX is a syntax extension to JavaScript that looks similar to XML/HTML.',
  true,
  '{"difficulty": "beginner", "estimatedTime": 45}',
  '{"x": 300, "y": 100}',
  NOW(),
  NOW()
),
(
  1,
  'react-components',
  'Components & Props',
  'Create reusable components',
  '# Components & Props\n\nComponents are the building blocks of React applications.',
  true,
  '{"difficulty": "intermediate", "estimatedTime": 90}',
  '{"x": 500, "y": 100}',
  NOW(),
  NOW()
),
(
  1,
  'react-hooks',
  'React Hooks',
  'Master useState, useEffect, and custom hooks',
  '# React Hooks\n\nHooks let you use state and other React features without writing a class.',
  true,
  '{"difficulty": "intermediate", "estimatedTime": 120}',
  '{"x": 700, "y": 100}',
  NOW(),
  NOW()
),
(
  1,
  'react-context',
  'Context API',
  'State management with Context',
  '# Context API\n\nContext API provides a way to pass data through the component tree.',
  false,
  '{"difficulty": "advanced", "estimatedTime": 75}',
  '{"x": 900, "y": 100}',
  NOW(),
  NOW()
);

-- Insert Roadmap Edges for React Roadmap (define dependencies)
INSERT INTO "RoadmapEdge" ("roadmapId", "sourceKey", "targetKey", "createdAt") VALUES
(1, 'react-intro', 'react-jsx', NOW()),
(1, 'react-jsx', 'react-components', NOW()),
(1, 'react-components', 'react-hooks', NOW()),
(1, 'react-hooks', 'react-context', NOW());

-- Insert Roadmap Nodes for NestJS Roadmap
INSERT INTO "RoadmapNode" (
  "roadmapId", 
  "nodeKey", 
  title, 
  summary, 
  "contentMd", 
  "isRequired", 
  metadata, 
  coords, 
  "createdAt", 
  "updatedAt"
) VALUES
(
  2,
  'nestjs-intro',
  'NestJS Introduction',
  'What is NestJS and why use it',
  '# NestJS Introduction\n\nNestJS is a progressive Node.js framework for building efficient and scalable server-side applications.',
  true,
  '{"difficulty": "intermediate", "estimatedTime": 60}',
  '{"x": 100, "y": 200}',
  NOW(),
  NOW()
),
(
  2,
  'nestjs-modules',
  'Modules & Dependency Injection',
  'Understand NestJS module system',
  '# Modules\n\nModules are singletons and can be imported by multiple other modules.',
  true,
  '{"difficulty": "intermediate", "estimatedTime": 90}',
  '{"x": 300, "y": 200}',
  NOW(),
  NOW()
),
(
  2,
  'nestjs-controllers',
  'Controllers & Decorators',
  'Build API endpoints',
  '# Controllers\n\nControllers are responsible for handling incoming requests.',
  true,
  '{"difficulty": "intermediate", "estimatedTime": 75}',
  '{"x": 500, "y": 200}',
  NOW(),
  NOW()
),
(
  2,
  'nestjs-database',
  'Database Integration',
  'Connect to databases with TypeORM/Prisma',
  '# Database Integration\n\nIntegrate TypeORM or Prisma with NestJS.',
  true,
  '{"difficulty": "advanced", "estimatedTime": 120}',
  '{"x": 700, "y": 200}',
  NOW(),
  NOW()
);

-- Insert Roadmap Edges for NestJS Roadmap
INSERT INTO "RoadmapEdge" ("roadmapId", "sourceKey", "targetKey", "createdAt") VALUES
(2, 'nestjs-intro', 'nestjs-modules', NOW()),
(2, 'nestjs-modules', 'nestjs-controllers', NOW()),
(2, 'nestjs-controllers', 'nestjs-database', NOW());

-- Insert Roadmap Nodes for SQL Roadmap
INSERT INTO "RoadmapNode" (
  "roadmapId", 
  "nodeKey", 
  title, 
  summary, 
  "contentMd", 
  "isRequired", 
  metadata, 
  coords, 
  "createdAt", 
  "updatedAt"
) VALUES
(
  3,
  'sql-basics',
  'SQL Basics',
  'SELECT, WHERE, JOIN fundamentals',
  '# SQL Basics\n\nLearn the foundation of SQL queries.',
  true,
  '{"difficulty": "beginner", "estimatedTime": 90}',
  '{"x": 100, "y": 300}',
  NOW(),
  NOW()
),
(
  3,
  'sql-advanced',
  'Advanced Queries',
  'Subqueries, CTEs, Window Functions',
  '# Advanced Queries\n\nMaster complex SQL patterns.',
  true,
  '{"difficulty": "advanced", "estimatedTime": 150}',
  '{"x": 300, "y": 300}',
  NOW(),
  NOW()
),
(
  3,
  'sql-optimization',
  'Query Optimization',
  'Indexes, EXPLAIN, Performance tuning',
  '# Query Optimization\n\nOptimize your SQL queries for production.',
  true,
  '{"difficulty": "advanced", "estimatedTime": 120}',
  '{"x": 500, "y": 300}',
  NOW(),
  NOW()
);

-- Insert Roadmap Edges for SQL Roadmap
INSERT INTO "RoadmapEdge" ("roadmapId", "sourceKey", "targetKey", "createdAt") VALUES
(3, 'sql-basics', 'sql-advanced', NOW()),
(3, 'sql-advanced', 'sql-optimization', NOW());