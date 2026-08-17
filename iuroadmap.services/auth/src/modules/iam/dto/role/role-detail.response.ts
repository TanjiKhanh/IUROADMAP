import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PermissionGroupResponse } from '../permission-group/permission-group.response';

export class RoleDetailResponse {
  @ApiProperty({ description: 'Role ID' })
  id!: string;

  @ApiProperty({ description: 'Role Name' })
  name!: string;

  @ApiPropertyOptional({ description: 'Normalized Role Name' })
  normalizedName?: string;

  @ApiProperty({ description: 'List of permission groups with their permissions', type: [PermissionGroupResponse] })
  permissionGroups!: PermissionGroupResponse[];
}
