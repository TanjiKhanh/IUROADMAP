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
  }
} as const;
