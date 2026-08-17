// @iuroadmap/shared - Static Permission Registry
import { AppConstant } from '../constants/app.constant';

/**
 * RBAC Enum for permissions across the system.
 */
export enum PMS {
  // --- SYSTEM / CONFIGURATION ---
  SYS_AD = 'SYS.AD',

  // --- ROADMAP ---
  RM_USER = 'RM.USER',
  RM_AD = 'RM.AD',

  // --- LECTURER REVIEW ---
  LR_USER = 'LR.USER',
  LR_AD = 'LR.AD',

  // --- USER ---
  USER_AD = 'USER.AD',
}

export interface IPermissionDefinition {
  code: PMS;
  displayName: string;
  groupId: string;
  description?: string;
}

/**
 * Metadata map for permissions.
 */
export const APP_PERMISSIONS: IPermissionDefinition[] = [
  // SYSTEM
  { code: PMS.SYS_AD, displayName: 'Manage System Configuration', groupId: AppConstant.PMSGroup.SYSTEM },
  
  // ROADMAP
  { code: PMS.RM_USER, displayName: 'Sử dụng Roadmap (Explore, Clone)', groupId: AppConstant.PMSGroup.ROADMAP },
  { code: PMS.RM_AD, displayName: 'Quản trị Roadmap', groupId: AppConstant.PMSGroup.ROADMAP },

  // LECTURER REVIEW
  { code: PMS.LR_USER, displayName: 'Xem và đánh giá Giảng viên', groupId: AppConstant.PMSGroup.LECTURER },
  { code: PMS.LR_AD, displayName: 'Quản trị Đánh giá Giảng viên', groupId: AppConstant.PMSGroup.LECTURER },

  // USER
  { code: PMS.USER_AD, displayName: 'Manage Users', groupId: AppConstant.PMSGroup.USER },
];
