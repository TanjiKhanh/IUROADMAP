import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoadmapNodeKindEnum } from '../../../../common/enums';
import { CourseBriefResponse } from '../../../course-catalog/dto/course/course-brief.response';

export class CanvasNodeResponse {
  @ApiProperty({ format: 'uuid' })
  nodeKey!: string;

  @ApiProperty({ format: 'uuid' })
  termKey!: string;

  @ApiProperty({ example: 0 })
  rowIndex!: number;

  @ApiProperty({ enum: RoadmapNodeKindEnum, enumName: 'RoadmapNodeKind' })
  kind!: RoadmapNodeKindEnum;

  @ApiPropertyOptional({ type: CourseBriefResponse })
  course?: CourseBriefResponse;

  @ApiPropertyOptional()
  slotLabel?: string;

  @ApiPropertyOptional()
  slotTheoryCredits?: number;

  @ApiPropertyOptional()
  slotLabCredits?: number;

  @ApiPropertyOptional()
  electiveGroup?: string;

  @ApiPropertyOptional()
  choiceGroup?: string;

  @ApiPropertyOptional()
  condition?: string;
}
