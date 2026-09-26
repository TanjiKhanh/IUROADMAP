export const AppConstant = {
  CurrentVersion: '1.0',

  /**
   * Fallback language code used when the requested language is unavailable.
   * Notifications and language lookups will default to this.
   */
  DefaultLanguage: 'vi',

  /**
   * Date and Time Formats
   */
  DateFormat: {
    Default: 'dd-MM-yyyy',
    Compact: 'ddMMyy',
    DateTime: 'dd-MM-yyyy HH:mm:ss',
  },

  /**
   * System Colors for UI, PDF generation, or Email Templates
   */
  Color: {
    Danger: '#DC3545',
    Primary: '#148f77',
    Success: '#00CC6A',
    Blue: '#2196FF',
    Warning: '#ff9800',
  },

  /**
   * Default system role names mapped to ensure no hardcoded strings in logic
   */
  RoleName: {
    SuperAdmin: 'SUPERADMIN',
    Admin: 'ADMIN',
    Learner: 'LEARNER',
    Mentor: 'MENTOR',
  },

  /**
   * Standard pagination defaults
   */
  Pagination: {
    DefaultPage: 1,
    DefaultRowsPerPage: 20,
    MaxRowsPerPage: 1000,
  },

  /**
   * Permission Groups
   */
  PMSGroup: {
    SYSTEM: 'SYSTEM_MANAGEMENT',
    USER: 'USER_MANAGEMENT',
    ROADMAP: 'ROADMAP_MANAGEMENT',
    LECTURER: 'LECTURER_REVIEW_MANAGEMENT',
  },

  /**
   * Roadmap v2 (semester curriculum + student overlay)
   */
  Roadmap: {
    /** REGULAR terms created for a blank curriculum draft */
    DefaultSemesterCount: 8,
    /** Max terms (base + custom) in one student roadmap */
    MaxTermCount: 16,
    /** Publish warning threshold per term */
    MaxCreditsPerTerm: 24,
    /** Smallest gap between two row_order values before a rebalance */
    RowOrderEpsilon: 1e-6,
    /** Decimal places stored for row_order */
    RowOrderScale: 6,
    /** Score scale upper bound (hệ 100) */
    MaxScore: 100,
    /** Grade point scale upper bound (hệ 4) */
    MaxGradePoint: 4,
    /** Weights must sum to this value */
    WeightTotal: 100,
    /** Minimum estimated hours of a topic (BR-RM-06) */
    MinTopicHours: 0.1,
  },

  /**
   * Valid range for cohort_year / academic_year
   */
  AcademicYear: {
    Min: 2000,
    Max: 2100,
  },

  CourseComment: {
    MaxPerWindow: 5,
    WindowMinutes: 10,
  },

  Moderation: {
    /** Pending reports needed to auto-flag a comment (shared with FL-LR) */
    ReportThreshold: 3,
  },
} as const;
