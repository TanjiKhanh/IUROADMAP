import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IActionDelete, IActionUpdate } from '@iuroadmap/shared';

export class RoleResponse implements IActionDelete, IActionUpdate {
  @ApiProperty({ description: 'Role ID' })
  id!: string;

  @ApiProperty({ description: 'Role Name' })
  name!: string;

  @ApiPropertyOptional({ description: 'Role Description' })
  description?: string;

  @ApiProperty({ description: 'List of assigned permission IDs', type: [String] })
  permissionIds!: string[];

  @ApiPropertyOptional({ description: 'Whether the current user can delete this record' })
  canDelete!: boolean;

  @ApiPropertyOptional({ description: 'Whether the current user can update this record' })
  canUpdate!: boolean;
}
