export const ColorCommon = {
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  secondary: '#7c3aed',
  success: '#22c55e',
  successLight: '#dcfce7',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  danger: '#ef4444',
  dangerLight: '#fee2e2',
  info: '#0ea5e9',
  infoLight: '#e0f2fe',
  muted: '#64748b',
  mutedLight: '#f1f5f9',
  text: '#0f172a',
  border: '#e2e8f0',
  white: '#ffffff',
  black: '#000000',

  // ── Status / outcome ─────────────────────────────────────────
  // Repeated across roadmap, mentor, admin, course, and auth flows.
  StatusPositive: '#148f77', // active · completed · approved · enrolled
  StatusNegative: '#bf3020', // rejected · banned · dropped · failed
  StatusPending: '#f16a1b', // pending · in-progress · under review

  role: {
    admin: '#dc2626',
    mentor: '#7c3aed',
    student: '#2563eb',
    user: '#0891b2',
  },
  accountStatus: {
    active: '#22c55e',
    pendingApproval: '#f59e0b',
    rejected: '#ef4444',
    banned: '#64748b',
  },
  subscriptionTier: {
    free: '#64748b',
    vip: '#d97706',
    pro: '#7c3aed',
  },
  enrollmentStatus: {
    enrolled: '#2563eb',
    completed: '#22c55e',
    dropped: '#ef4444',
  },
  nodeProgressStatus: {
    available: '#2563eb',
    inProgress: '#f59e0b',
    completed: '#22c55e',
    skipped: '#64748b',
    locked: '#94a3b8',
  },
  feature: {
    auth: {
      active: '#148f77',
      pendingApproval: '#f16a1b',
      rejected: '#bf3020',
      banned: '#64748b',
    },
    roadmap: {
      available: '#2563eb',
      inProgress: '#f16a1b',
      completed: '#148f77',
      skipped: '#64748b',
      locked: '#94a3b8',
    },
    course: {
      enrolled: '#2563eb',
      completed: '#148f77',
      dropped: '#bf3020',
    },
    mentor: {
      pendingReview: '#f16a1b',
      approved: '#148f77',
      rejected: '#bf3020',
    },
    admin: {
      active: '#148f77',
      pending: '#f16a1b',
      rejected: '#bf3020',
    },
  },
} as const;

export type ColorCommonKey = keyof typeof ColorCommon;
