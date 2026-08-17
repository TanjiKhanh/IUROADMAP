import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID, MaxLength, IsEnum } from 'class-validator';
import { AccountStatus, SubscriptionTier, EntityConstant } from '@iuroadmap/shared';

export class UserUpdateRequest {
  @ApiProperty({ description: 'Record ID to update' })
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;

  @ApiPropertyOptional({ description: 'Full name', example: 'Nguyen Van A' })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.Fullname)
  name?: string;

  @ApiPropertyOptional({ description: 'Role ID to assign', example: 'uuid-role-id' })
  @IsString()
  @IsOptional()
  @IsUUID('4')
  roleId?: string;

  @ApiPropertyOptional({ description: 'Account status', enum: AccountStatus })
  @IsOptional()
  @IsEnum(AccountStatus)
  status?: AccountStatus;

  @ApiPropertyOptional({ description: 'Subscription tier', enum: SubscriptionTier })
  @IsOptional()
  @IsEnum(SubscriptionTier)
  subscriptionTier?: SubscriptionTier;
}
