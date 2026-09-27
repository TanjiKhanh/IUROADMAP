import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpgradePreviewItemResponse {
  @ApiProperty({ format: 'uuid' })
  nodeKey!: string;

  @ApiPropertyOptional({ format: 'uuid', description: 'Remapped key in the target curriculum' })
  newNodeKey?: string;

  @ApiPropertyOptional({ example: 'IT089IU' })
  courseCode?: string;

  @ApiPropertyOptional({ example: 'Computer Architecture' })
  courseName?: string;
}
