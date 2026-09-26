import { ApiProperty } from '@nestjs/swagger';
import { OfferingStatusEnum } from '../../../../common/enums';
import { TopicResponse } from './topic.response';
import { TopicEdgeResponse } from './topic-edge.response';

export class TopicsGraphResponse {
  @ApiProperty({ example: 1 })
  offeringId!: number;

  @ApiProperty({ example: 2025 })
  academicYear!: number;

  @ApiProperty({ enum: OfferingStatusEnum, enumName: 'OfferingStatus' })
  status!: OfferingStatusEnum;

  @ApiProperty({ example: 12 })
  courseId!: number;

  @ApiProperty({ example: 'IT172IU' })
  courseCode!: string;

  @ApiProperty({ example: 'Machine Learning' })
  courseName!: string;

  @ApiProperty({ type: [TopicResponse] })
  topics!: TopicResponse[];

  @ApiProperty({ type: [TopicEdgeResponse] })
  edges!: TopicEdgeResponse[];
}
