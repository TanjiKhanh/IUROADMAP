export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  MENTOR = 'MENTOR',
  LEARNER = 'LEARNER',
  USER = 'USER',
  STUDENT = 'STUDENT',
}

/** Permission codes returned in JWT `permissions` claim. */
export enum PMS {
  // Dashboard
  DASH_USER = 'DASH.USER',
  DASH_AD = 'DASH.AD',
  DASH_MT = 'DASH.MT',

  // Roadmap
  RM_USER = 'RM.USER',
  RM_AD = 'RM.AD',

  // Course
  CRS_USER = 'CRS.USER',
  CRS_AD = 'CRS.AD',

  // Community / Learner
  LR_USER = 'LR.USER',
  LR_AD = 'LR.AD',

  // Mentor
  MT_USER = 'MT.USER',
  MT_AD = 'MT.AD',

  // System
  SYS_AD = 'SYS.AD',

  // User management
  USER_AD = 'USER.AD',

  // Role management
  ROLE_AD = 'ROLE.AD',
}
