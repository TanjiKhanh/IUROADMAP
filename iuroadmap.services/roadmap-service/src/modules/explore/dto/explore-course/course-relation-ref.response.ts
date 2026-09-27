import { ApiProperty } from '@nestjs/swagger';
import { RelationTypeEnum } from '../../../../common/enums';

export class CourseRelationRefResponse {
  @ApiProperty({ example: 'MA001IU' })
  code!: string;

  @ApiProperty({ example: 'Calculus 1' })
  name!: string;

  @ApiProperty({ enum: RelationTypeEnum, enumName: 'RelationType' })
  type!: RelationTypeEnum;
}
