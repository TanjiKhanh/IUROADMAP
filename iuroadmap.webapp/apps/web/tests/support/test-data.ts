/**
 * Centralized Test Users & DTO Payloads for QA Automation
 * Enforces business rule constraints (BR-01 to BR-15) cleanly across all tests.
 */

export const TEST_USERS = {
  LEARNER: {
    email: 'qa_learner_test@iuroadmap.edu',
    password: 'Password123!',
    role: 'STUDENT',
  },
  ADMIN: {
    email: 'admin@iuroadmap.edu',
    password: 'AdminPassword123!',
    role: 'ADMIN',
  },
  MENTOR: {
    email: 'approved_mentor@iuroadmap.edu',
    password: 'MentorPassword123!',
    role: 'MENTOR',
  },
};

export const TEST_PAYLOADS = {
  NEW_LEARNER: (timestamp = Date.now()) => ({
    email: `qa_e2e_${timestamp}@iuroadmap.edu`,
    password: 'Password123!',
    confirmPassword: 'Password123!',
    role: 'STUDENT',
  }),
  DEPARTMENT: (timestamp = Date.now()) => ({
    name: 'QA Automation Department',
    slug: `qa-dept-${timestamp}`,
    description: 'Department created via automated test suite',
  }),
  MAJOR: (deptId: string, timestamp = Date.now()) => ({
    name: 'Software Quality Assurance Engineering',
    slug: `qa-major-${timestamp}`,
    departmentId: deptId,
    creditsRequired: 120,
    description: 'Comprehensive major verifying prerequisite invariants',
  }),
  TOPIC: {
    title: 'Automated E2E Testing with Playwright',
    estimatedHours: 3.5,
    objectives: ['Master POM architecture', 'Implement custom fixtures'],
    resources: [{ title: 'Playwright Guide', url: 'https://playwright.dev', type: 'ARTICLE' }],
  },
  AVAILABILITY_SLOT: {
    slotDate: '2026-08-25',
    startTime: '10:00',
    endTime: '11:30',
    status: 'AVAILABLE',
  },
};
