import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PermissionResponse {
  @ApiProperty({ description: 'Permission ID' })
  id!: string;

  @ApiPropertyOptional({ description: 'Display name of the permission (e.g. Write Roadmap)' })
  displayName?: string;

  @ApiProperty({ description: 'Normalization/Internal name of the permission (e.g. roadmap:write)' })
  normalizationName!: string;

  @ApiPropertyOptional({ description: 'ID of the group this permission belongs to' })
  groupId?: string;

  @ApiProperty({ description: 'Indicates whether this permission is currently assigned to the requested Role' })
  isInRole!: boolean;
}
