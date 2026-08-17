import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccountStatus, SubscriptionTier, IActionDelete, IActionUpdate } from '@iuroadmap/shared';

export class UserResponse implements IActionDelete, IActionUpdate {
  @ApiProperty({ description: 'User ID' })
  id!: string;

  @ApiProperty({ description: 'Email address' })
  email!: string;

  @ApiPropertyOptional({ description: 'Full name' })
  name?: string;

  @ApiProperty({ description: 'Role ID' })
  roleId!: string;

  @ApiProperty({ description: 'Account status', enum: AccountStatus })
  status!: AccountStatus;

  @ApiProperty({ description: 'Subscription tier', enum: SubscriptionTier })
  subscriptionTier!: SubscriptionTier;

  @ApiPropertyOptional({ description: 'Subscription expiration date' })
  subscriptionExpiresAt?: Date;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt!: Date;

  @ApiPropertyOptional({ description: 'Whether the current user can delete this record' })
  canDelete!: boolean;

  @ApiPropertyOptional({ description: 'Whether the current user can update this record' })
  canUpdate!: boolean;
}
