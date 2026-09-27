import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TermKindEnum } from '../../../../common/enums';
import { CourseBriefResponse } from '../../../course-catalog/dto/course/course-brief.response';

export class OverlayStatTermResponse {
  @ApiProperty({ format: 'uuid' })
  termKey!: string;

  @ApiProperty({ enum: TermKindEnum, enumName: 'TermKind' })
  kind!: TermKindEnum;

  @ApiPropertyOptional({ description: 'REGULAR only' })
  semesterNo?: number;
}

export class OverlayMoveTargetResponse {
  @ApiProperty({ format: 'uuid' })
  termKey!: string;

  @ApiProperty({ description: 'A term the learner added (not in the curriculum)' })
  isCustomTerm!: boolean;

  @ApiProperty({ example: 12 })
  learnerCount!: number;
}

export class OverlayMovedCourseResponse {
  @ApiProperty({ format: 'uuid' })
  nodeKey!: string;

  @ApiPropertyOptional({ type: CourseBriefResponse })
  course?: CourseBriefResponse;

  @ApiPropertyOptional({ description: 'Label of an elective slot' })
  slotLabel?: string;

  @ApiProperty({ format: 'uuid', description: 'Curriculum term of the course' })
  fromTermKey!: string;

  @ApiProperty({ description: 'Learners who moved it', example: 37 })
  learnerCount!: number;

  @ApiProperty({ type: [OverlayMoveTargetResponse], description: 'Where they moved it, most chosen first' })
  targets!: OverlayMoveTargetResponse[];
}

export class OverlayCourseCountResponse {
  @ApiProperty({ type: CourseBriefResponse })
  course!: CourseBriefResponse;

  @ApiProperty({ example: 8 })
  learnerCount!: number;
}

export class OverlaySlotChoiceResponse {
  @ApiProperty({ format: 'uuid' })
  nodeKey!: string;

  @ApiProperty({ example: 'Elective CS1' })
  slotLabel!: string;

  @ApiProperty({ type: [OverlayCourseCountResponse] })
  choices!: OverlayCourseCountResponse[];
}

/** Signals for the department (FR-RDM.07.5): how learners adapt this curriculum. */
export class OverlayStatsResponse {
  @ApiProperty()
  versionId!: number;

  @ApiProperty({ description: 'Roadmaps on this curriculum (all statuses)' })
  learnerCount!: number;

  @ApiProperty({ type: [OverlayStatTermResponse], description: 'Curriculum terms, to label term keys' })
  terms!: OverlayStatTermResponse[];

  @ApiProperty({ type: [OverlayMovedCourseResponse], description: 'Curriculum courses moved to another term, most moved first' })
  movedCourses!: OverlayMovedCourseResponse[];

  @ApiProperty({ type: [OverlayCourseCountResponse], description: 'Catalog courses learners add, most added first' })
  addedCourses!: OverlayCourseCountResponse[];

  @ApiProperty({ type: [OverlaySlotChoiceResponse], description: 'Courses chosen for each elective slot' })
  slotChoices!: OverlaySlotChoiceResponse[];

  @ApiProperty({ description: 'Learners who added a course outside the catalog' })
  customCourseLearners!: number;

  @ApiProperty({ description: 'Learners who inserted at least one term (e.g. Intensive English before semester 1)' })
  insertedTermLearners!: number;
}
