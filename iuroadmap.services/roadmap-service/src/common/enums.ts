/**
 * DTO-facing enums. Values mirror the Prisma enums in prisma/schema.prisma so records can be
 * assigned with a cast; the `enumName` in @ApiProperty gives the FE client stable type names.
 */

export enum GradingModeEnum {
  SCORE = 'SCORE',
  PASS_FAIL = 'PASS_FAIL',
}

export enum TermKindEnum {
  REGULAR = 'REGULAR',
  SUMMER = 'SUMMER',
  ELECTIVE_POOL = 'ELECTIVE_POOL',
}

/** Kinds a learner may add (a custom term is never an elective pool). */
export enum CustomTermKindEnum {
  REGULAR = 'REGULAR',
  SUMMER = 'SUMMER',
}

export enum RoadmapNodeKindEnum {
  COURSE = 'COURSE',
  ELECTIVE_SLOT = 'ELECTIVE_SLOT',
}

export enum RelationTypeEnum {
  PREREQUISITE = 'PREREQUISITE',
  PREVIOUS = 'PREVIOUS',
  COREQUISITE = 'COREQUISITE',
}

export enum RoadmapVersionStatusEnum {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum OfferingStatusEnum {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export enum TermInYearEnum {
  SEMESTER_1 = 'SEMESTER_1',
  SEMESTER_2 = 'SEMESTER_2',
  SUMMER = 'SUMMER',
}

export enum LecturerRoleEnum {
  LECTURER = 'LECTURER',
  TA = 'TA',
}

export enum LecturerStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  RETIRED = 'RETIRED',
}

export enum StudentRoadmapStatusEnum {
  ENROLLED = 'ENROLLED',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
}

export enum DeltaOriginEnum {
  BASE = 'BASE',
  CUSTOM = 'CUSTOM',
}

export enum CourseResultStatusEnum {
  IN_PROGRESS = 'IN_PROGRESS',
  GRADED = 'GRADED',
}

/** Derived node state shown on My Roadmap (FR-LRN.00.2) */
export enum NodeStateEnum {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
}

export enum CommentStatusEnum {
  VISIBLE = 'VISIBLE',
  FLAGGED = 'FLAGGED',
  HIDDEN = 'HIDDEN',
  DELETED = 'DELETED',
}

export enum CommentReportReasonEnum {
  SPAM = 'SPAM',
  OFFENSIVE = 'OFFENSIVE',
  OFF_TOPIC = 'OFF_TOPIC',
  MISINFORMATION = 'MISINFORMATION',
  OTHER = 'OTHER',
}

export enum CommentReportStatusEnum {
  PENDING = 'PENDING',
  REVIEWED = 'REVIEWED',
  DISMISSED = 'DISMISSED',
}
