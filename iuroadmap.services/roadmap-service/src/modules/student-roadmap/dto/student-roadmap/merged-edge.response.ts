import { ApiProperty } from '@nestjs/swagger';
import { DeltaOriginEnum, RelationTypeEnum } from '../../../../common/enums';

export class MergedEdgeResponse {
  @ApiProperty({ format: 'uuid' })
  edgeKey!: string;

  @ApiProperty({ enum: DeltaOriginEnum, enumName: 'DeltaOrigin', description: 'CUSTOM relations can be removed by the learner' })
  origin!: DeltaOriginEnum;

  @ApiProperty({ format: 'uuid' })
  sourceKey!: string;

  @ApiProperty({ format: 'uuid' })
  targetKey!: string;

  @ApiProperty({ enum: RelationTypeEnum, enumName: 'RelationType' })
  type!: RelationTypeEnum;
}
