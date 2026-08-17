import { ApiProperty } from '@nestjs/swagger';
import { PermissionResponse } from '../permission/permission.response';

export class PermissionGroupResponse {
  @ApiProperty({ description: 'Permission Group ID' })
  id!: string;

  @ApiProperty({ description: 'Name of the Feature/Group (e.g. Roadmap, Users)' })
  groupName!: string;

  @ApiProperty({ description: 'List of permissions belonging to this group', type: [PermissionResponse] })
  permissions!: PermissionResponse[];
}
