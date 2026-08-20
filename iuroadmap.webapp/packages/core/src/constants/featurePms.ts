import { UserRole } from '../enums/roles';

export const FeaturePms = {
  dashboard: {
    view: [UserRole.USER, UserRole.STUDENT, UserRole.ADMIN, UserRole.MENTOR],
  },
  roadmap: {
    view: [UserRole.USER, UserRole.STUDENT, UserRole.ADMIN],
    manage: [UserRole.ADMIN],
    permissions: {
      view: ['RM.USER', 'RM.AD'],
      manage: ['RM.AD'],
    },
  },
  course: {
    view: [UserRole.USER, UserRole.STUDENT, UserRole.ADMIN],
    manage: [UserRole.ADMIN],
    permissions: {
      view: ['RM.USER', 'RM.AD'],
      manage: ['RM.AD'],
    },
  },
  community: {
    view: [UserRole.USER, UserRole.STUDENT, UserRole.ADMIN, UserRole.MENTOR],
    chat: [UserRole.USER, UserRole.STUDENT, UserRole.ADMIN],
    mentor_hub: [UserRole.MENTOR],
    permissions: {
      view: ['LR.USER', 'LR.AD'],
      chat: ['LR.USER', 'LR.AD'],
    },
  },
  system: {
    admin: [UserRole.ADMIN],
    permissions: {
      admin: ['SYS.AD', 'USER.AD'],
    },
  },
};
