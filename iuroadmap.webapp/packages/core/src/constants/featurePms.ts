import { PMS } from '../enums/roles';

export const FeaturePms = {
  dashboard: {
    view: [PMS.DASH_USER, PMS.DASH_AD, PMS.DASH_MT, PMS.RM_USER, PMS.RM_AD, PMS.USER_AD, PMS.SYS_AD],
  },
  roadmap: {
    view: [PMS.RM_USER, PMS.RM_AD],
    manage: [PMS.RM_AD],
  },
  course: {
    view: [PMS.CRS_USER, PMS.CRS_AD],
    manage: [PMS.CRS_AD],
  },
  community: {
    view: [PMS.LR_USER, PMS.LR_AD],
    chat: [PMS.LR_USER, PMS.LR_AD],
    mentor_hub: [PMS.MT_USER, PMS.MT_AD],
  },
  system: {
    admin: [PMS.SYS_AD],
    userAdmin: [PMS.USER_AD, PMS.SYS_AD],
    roleAdmin: [PMS.ROLE_AD, PMS.SYS_AD, PMS.USER_AD],
  },
};
