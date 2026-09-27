// Course catalog shared by every curriculum in curricula/ (a course is listed once, even when
// several curricula use it).
//
// (theory, lab) come from the Computer/Network Engineering KS 09.2023 charts when the course
// appears there. The Data Science chart only shows totals, so for DS-only courses the split is
// ASSUMED: 4 credits → (3,1), 3 credits → (3,0).

import type { CourseSeed } from './types';

export const COURSES: CourseSeed[] = [
  // Intensive English (transcript): Pass/Fail, not counted toward credits or GPA
  { code: 'ENTP01', name: 'Intensive English 1 - Twinning Program', theory: 17, lab: 0, category: 'LANGUAGE', gradingMode: 'PASS_FAIL', countsTowardGpa: false, countsTowardCredits: false },
  { code: 'ENTP02-1', name: 'Intensive English 02 - Twinning Program', theory: 13, lab: 0, category: 'LANGUAGE', gradingMode: 'PASS_FAIL', countsTowardGpa: false, countsTowardCredits: false },

  // General / foundation / language / political / physical
  { code: 'MA001IU', name: 'Calculus 1', theory: 4, lab: 0, category: 'FOUNDATION' },
  { code: 'MA026IU', name: 'Probability, Statistic & Random Process', theory: 3, lab: 0, category: 'FOUNDATION' },
  { code: 'IT154IU', name: 'Linear Algebra', theory: 3, lab: 0, category: 'FOUNDATION' },
  { code: 'EN007IU', name: 'Writing AE1', theory: 2, lab: 0, category: 'LANGUAGE' },
  { code: 'EN008IU', name: 'Listening AE1', theory: 2, lab: 0, category: 'LANGUAGE' },
  { code: 'EN011IU', name: 'Writing AE2', theory: 2, lab: 0, category: 'LANGUAGE' },
  { code: 'EN012IU', name: 'Speaking AE2', theory: 2, lab: 0, category: 'LANGUAGE' },
  { code: 'PE015IU', name: 'Philosophy Marxism', theory: 3, lab: 0, category: 'POLITICAL' },
  { code: 'PE016IU', name: 'Marxist - Leninist Political Economy', theory: 2, lab: 0, category: 'POLITICAL' },
  { code: 'PE017IU', name: 'Scientific Socialism', theory: 2, lab: 0, category: 'POLITICAL' },
  { code: 'PE018IU', name: 'History of Vietnamese Communist Party', theory: 2, lab: 0, category: 'POLITICAL' },
  { code: 'PE019IU', name: "Ho Chi Minh's Thoughts", theory: 2, lab: 0, category: 'POLITICAL' },
  { code: 'PE021IU', name: 'General Law', theory: 3, lab: 0, category: 'GENERAL' },
  // Physical training counts toward graduation credits but not toward GPA
  { code: 'PT001IU', name: 'Physical Training 1', theory: 0, lab: 3, category: 'PHYSICAL', countsTowardGpa: false },
  { code: 'PT002IU', name: 'Physical Training 2', theory: 0, lab: 3, category: 'PHYSICAL', countsTowardGpa: false },

  // Data Science core & specialized (required)
  { code: 'IT135IU', name: 'Introduction to Data Science', theory: 3, lab: 0, category: 'MAJOR' }, // 3 = semester 1 total (15) − other courses
  { code: 'IT149IU', name: 'Fundamentals of Programming', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT069IU', name: 'Object-Oriented Programming', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT151IU', name: 'Statistical Methods', theory: 3, lab: 0, category: 'MAJOR' },
  { code: 'IT013IU', name: 'Data Structures and Algorithms', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT159IU', name: 'Artificial Intelligence', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT140IU', name: 'Fundamental Concepts of Data Security', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT079IU', name: 'Principles of Database Management', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT171IU', name: 'Statistical Learning', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT136IU', name: 'Regression Analysis', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT138IU', name: 'Data Science and Data Visualization', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT160IU', name: 'Data Mining', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT139IU', name: 'Scalable and Distributed Computing', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT137IU', name: 'Data Analysis', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT172IU', name: 'Machine Learning', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT157IU', name: 'Deep Learning', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT173IU', name: 'Big Data Analytics', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT083IU', name: 'Special Study of the Field', theory: 0, lab: 3, category: 'MAJOR' },
  { code: 'IT082IU', name: 'Internship', theory: 0, lab: 3, category: 'MAJOR' },
  { code: 'IT058IU', name: 'Thesis', theory: 0, lab: 10, category: 'MAJOR' },
  { code: 'IT168IU', name: 'Special Study of the Field 2', theory: 0, lab: 3, category: 'MAJOR' },

  // Data Science electives (semester 6–7 elective pool)
  { code: 'IT146IU', name: 'Theory of Networks', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT076IU', name: 'Software Engineering', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT164IU', name: 'Cloud Computing', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT145IU', name: 'Decision Support Systems', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT056IU', name: 'IT Project Management', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT094IU', name: 'Information System Management', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT169IU', name: 'Time Series Analysis', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT144IU', name: 'Business Process Analysis', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT170IU', name: 'Natural Language Processing', theory: 3, lab: 1, category: 'MAJOR' },
  // ⚠️ The DS chart shows 4 credits, the CE/NE 2023 charts show (3+0): kept (3,0), to be checked
  { code: 'IT153IU', name: 'Discrete Mathematics', theory: 3, lab: 0, category: 'MAJOR' },
  { code: 'IT163IU', name: 'Optimization and Applications', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT150IU', name: 'Blockchain', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT120IU', name: 'Entrepreneurship', theory: 3, lab: 0, category: 'MAJOR' },

  // Computer Science K2023 (2023 handbook chart): courses not listed above
  { code: 'IT064IU', name: 'Introduction to Computing', theory: 3, lab: 0, category: 'MAJOR' },
  { code: 'IT116IU', name: 'C/C++ Programming', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'MA003IU', name: 'Calculus 2', theory: 4, lab: 0, category: 'FOUNDATION' },
  { code: 'PH013IU', name: 'Physics 1 (General Mechanics)', theory: 2, lab: 0, category: 'FOUNDATION' },
  { code: 'PH015IU', name: 'Physics 3 (Electricity and Magnetism)', theory: 3, lab: 0, category: 'FOUNDATION' },
  { code: 'PH016IU', name: 'Physics 3 Laboratory', theory: 0, lab: 1, category: 'FOUNDATION' },
  { code: 'IT091IU', name: 'Computer Networks', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT089IU', name: 'Computer Architecture', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT090IU', name: 'Object-Oriented Analysis and Design', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT093IU', name: 'Web Application Development', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT092IU', name: 'Principles of Programming Languages', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT017IU', name: 'Operating Systems', theory: 3, lab: 1, category: 'MAJOR' },
  // Computer Science electives
  { code: 'IT130IU', name: 'Digital Image Processing', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT114IU', name: 'Software Architecture', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT096IU', name: 'Net-centric Programming', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT134IU', name: 'Internet of Things', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT024IU', name: 'Computer Graphics', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT133IU', name: 'Mobile Application Development', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT165IU', name: 'Security Technology and Implementation', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT166IU', name: 'Software Quality Verification and Validation', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT044IU', name: 'Human Computer Interaction', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT131IU', name: 'Theoretical Models in Computing', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT067IU', name: 'Digital Logic Design', theory: 3, lab: 0, category: 'MAJOR' },
  { code: 'IT099IU', name: 'Digital Logic Design Lab', theory: 0, lab: 1, category: 'MAJOR' },
];
