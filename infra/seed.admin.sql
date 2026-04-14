-- Connect to gupjob_admin database first!
\c gupjob_admin;

-- 1. DEPARTMENTS
INSERT INTO admin.departments (
  id,
  slug,
  name,
  subtitle,
  description,
  created_at,
  updated_at
) VALUES
  (1, 'it', 'Information Technology',
   'Foundational and specialized tracks for the digital age.',
   NULL,
   NOW(), NOW()),
  (2, 'business-economics', 'Business & Economics',
   'Strategic management and financial analysis roadmaps.',
   NULL,
   NOW(), NOW()),
  (3, 'architecture-design', 'Architecture & Design',
   'Creative and technical pathways in architecture and design.',
   NULL,
   NOW(), NOW()),
  (4, 'humanities', 'Humanities',
   'Interdisciplinary programs in arts, culture, and society.',
   NULL,
   NOW(), NOW()),
  (5, 'engineering', 'Engineering',
   'Engineering disciplines for building and innovation.',
   NULL,
   NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. MAJOR ROADMAPS (one per major, linked to departments)
INSERT INTO admin.major_roadmaps (
  id,
  slug,
  name,
  total_credits,
  description,
  department_id,
  created_at,
  updated_at
) VALUES
  (1, 'computer-science',          'Computer Science',          136, NULL, 1, NOW(), NOW()), -- IT
  (2, 'financial-engineering',     'Financial Engineering',     110, NULL, 2, NOW(), NOW()), -- Business & Economics
  (3, 'entrepreneurial-growth',    'Entrepreneurial Growth',    100, NULL, 2, NOW(), NOW()), -- Business & Economics
  (4, 'architecture-urban-design', 'Architecture & Urban Design',132, NULL, 3, NOW(), NOW()), -- Architecture & Design
  (5, 'literature-cultural-studies','Literature & Cultural Studies',108, NULL, 4, NOW(), NOW()), -- Humanities
  (6, 'mechanical-engineering',    'Mechanical Engineering',    128, NULL, 5, NOW(), NOW()), -- Engineering
  (7, 'electrical-engineering',    'Electrical Engineering',    124, NULL, 5, NOW(), NOW())  -- Engineering
ON CONFLICT (id) DO NOTHING;


-- 3. COURSE NODES for Computer Science (roadmap_id = 1)

INSERT INTO admin.course_nodes (
  id,
  roadmap_id,
  slug,
  name,
  coords,
  credits,
  description,
  created_at,
  updated_at
) VALUES
  -- Intro & Math foundation
  (1,  1, 'intro-to-programming',       'Intro To Programming',        '{"x":100,"y":40}',  4,
   'Fundamentals of programming using a high-level language.', NOW(), NOW()),
  (2,  1, 'c-calculus-1',               'Calculus 1',                  '{"x":100,"y":140}', 4,
   'Limits, derivatives, and basic integration techniques.', NOW(), NOW()),
  (3,  1, 'calculus-2',                 'Calculus 2',                  '{"x":260,"y":140}', 4,
   'Advanced integration, sequences, and series.', NOW(), NOW()),
  (4,  1, 'linear-algebra',             'Linear Algebra',              '{"x":260,"y":240}', 4,
   'Matrices, vectors, eigenvalues, eigenvectors, and linear transformations.', NOW(), NOW()),
  (5,  1, 'probability-statistics',     'Probability & Statistics',    '{"x":420,"y":140}', 3,
   'Probability theory and basic statistics for engineers.', NOW(), NOW()),
  (6,  1, 'discrete-mathematics',       'Discrete Mathematics',        '{"x":420,"y":240}', 3,
   'Logic, sets, combinatorics, graphs, and proof techniques.', NOW(), NOW()),

  -- Programming & systems core
  (7,  1, 'c-cpp-programming',          'C/C++ Programming',           '{"x":100,"y":260}', 4,
   'Structured and object-oriented programming in C/C++.', NOW(), NOW()),
  (8,  1, 'object-oriented-programming','Object-Oriented Programming', '{"x":260,"y":360}', 4,
   'OOP concepts: classes, inheritance, polymorphism, design principles.', NOW(), NOW()),
  (9,  1, 'computer-network',           'Computer Network',            '{"x":260,"y":460}', 4,
   'Fundamentals of computer networking and protocols.', NOW(), NOW()),

  -- CS core: DS & Algorithms, Web, IoT, AI
  (10, 1, 'algorithms-data-structure',  'Algorithms & Data Structure', '{"x":420,"y":360}', 4,
   'Fundamental data structures and algorithms for problem solving.', NOW(), NOW()),
  (11, 1, 'web-application-development','Web Application Development', '{"x":580,"y":360}', 4,
   'Frontend & backend web development fundamentals.', NOW(), NOW()),
  (12, 1, 'internet-of-things',         'Internet of Things',          '{"x":420,"y":460}', 4,
   'Embedded systems and IoT communication basics.', NOW(), NOW()),
  (13, 1, 'artificial-intelligence',    'Artificial Intelligence',     '{"x":740,"y":460}', 4,
   'Search, knowledge representation, and basic machine learning.', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;


 -- 4. COURSE NODE PREREQUISITES (edges for roadmap 1)

INSERT INTO admin.course_node_prerequisites (
  id,
  course_node_id,
  prerequisite_node_id,
  created_at,
  updated_at
) VALUES
  -- Math chain
  (1,  3,  2, NOW(), NOW()),  -- Calculus 2 requires Calculus 1
  (2,  4,  2, NOW(), NOW()),  -- Linear Algebra requires Calculus 1
  (3,  5,  2, NOW(), NOW()),  -- Probability & Statistics requires Calculus 1
  (4,  6,  1, NOW(), NOW()),  -- Discrete Mathematics requires Intro To Programming

  -- Programming chain
  (5,  7,  1, NOW(), NOW()),  -- C/C++ Programming requires Intro To Programming
  (6,  8,  7, NOW(), NOW()),  -- OOP requires C/C++ Programming
  (7,  9,  7, NOW(), NOW()),  -- Computer Network requires C/C++ Programming

  -- Core CS
  (8,  10, 6, NOW(), NOW()),  -- Algorithms & DS requires Discrete Mathematics
  (9,  10, 8, NOW(), NOW()),  -- ...and OOP
  (10, 11, 8, NOW(), NOW()),  -- Web App Dev requires OOP
  (11, 12, 9, NOW(), NOW()),  -- IoT requires Computer Network
  (12, 13, 10, NOW(), NOW()), -- AI requires Algorithms & DS
  (13, 13, 5, NOW(), NOW())   -- AI also requires Probability & Statistics
ON CONFLICT (id) DO NOTHING;



-- 5. COURSE TOPICS (micro nodes for course_node_id = 10)

INSERT INTO admin.course_topics_node (
  id,
  course_node_id,
  slug,
  title,
  description,
  coords,
  learning_objectives,
  resources_url,
  created_at,
  updated_at
) VALUES
  (1, 10, 'arrays-lists', 'Arrays and Lists',
   'Basic linear data structures and their operations.',
   '{"x":100,"y":60}',
   'Understand static vs dynamic arrays, list implementations, and complexity of basic operations.',
   'https://example.com/dsa/arrays-lists', NOW(), NOW()),

  (2, 10, 'stacks-queues', 'Stacks & Queues',
   'LIFO and FIFO data structures used for buffering and control flows.',
   '{"x":260,"y":60}',
   'Differentiate between stacks and queues, and implement them using arrays and linked lists.',
   'https://example.com/dsa/stacks-queues', NOW(), NOW()),

  (3, 10, 'binary-trees', 'Binary Trees',
   'Hierarchical data structures: binary trees and binary search trees.',
   '{"x":420,"y":60}',
   'Understand tree terminology, tree traversals, and BST operations.',
   'https://example.com/dsa/binary-trees', NOW(), NOW()),

  (4, 10, 'graphs-dfs-bfs', 'Graph (DFS & BFS)',
   'Graph representations and fundamental traversal algorithms.',
   '{"x":580,"y":60}',
   'Model problems as graphs and use DFS/BFS to explore and search.',
   'https://example.com/dsa/graphs', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 6. COURSE TOPICS EDGES (micro edges for course_node_id = 10)

INSERT INTO admin.course_topics_edge (
  id,
  source_topic_id,
  target_topic_id,
  created_at
) VALUES
  (1, 1, 2, NOW()),  -- Arrays & Lists → Stacks & Queues
  (2, 2, 3, NOW()),  -- Stacks & Queues → Binary Trees
  (3, 3, 4, NOW())   -- Binary Trees → Graph (DFS & BFS)
ON CONFLICT (id) DO NOTHING;