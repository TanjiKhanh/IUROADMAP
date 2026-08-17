// @iuroadmap/shared - Account Status Enum (mirrors auth Prisma schema)

export enum AccountStatus {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  REJECTED = 'REJECTED',
}

export enum SubscriptionTier {
  FREE = 'FREE',
  VIP = 'VIP',
  PRO = 'PRO',
}
