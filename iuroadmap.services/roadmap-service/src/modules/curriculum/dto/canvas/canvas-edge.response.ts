import { ApiProperty } from '@nestjs/swagger';
import { RelationTypeEnum } from '../../../../common/enums';

export class CanvasEdgeResponse {
  @ApiProperty({ format: 'uuid' })
  edgeKey!: string;

  @ApiProperty({ format: 'uuid' })
  sourceKey!: string;

  @ApiProperty({ format: 'uuid' })
  targetKey!: string;

  @ApiProperty({ enum: RelationTypeEnum, enumName: 'RelationType' })
  type!: RelationTypeEnum;
}
