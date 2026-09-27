import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { RelationTypeEnum } from '../../../../common/enums';

/** Directed relation A (source, taken first) → B (target). */
export class CanvasEdgeRequest {
  @ApiProperty({ format: 'uuid' })
  @IsUUID('4')
  edgeKey!: string;

  @ApiProperty({ format: 'uuid', description: 'A: the course taken first' })
  @IsUUID('4')
  sourceKey!: string;

  @ApiProperty({ format: 'uuid', description: 'B: the course taken after' })
  @IsUUID('4')
  targetKey!: string;

  @ApiProperty({ enum: RelationTypeEnum, enumName: 'RelationType' })
  @IsEnum(RelationTypeEnum)
  type!: RelationTypeEnum;
}
