import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CurriculumIssueResponse {
  @ApiProperty({
    enum: ['CYCLE', 'PLACEMENT', 'COURSE_MISSING', 'SLOT_CREDITS_MISSING', 'EMPTY_CURRICULUM', 'TOTAL_CREDITS_MISMATCH', 'TERM_CREDITS_EXCEEDED'],
    enumName: 'CurriculumIssueCode',
  })
  code!: string;

  @ApiProperty({ enum: ['ERROR', 'WARNING'], enumName: 'CurriculumIssueSeverity' })
  severity!: string;

  @ApiProperty({ type: [String] })
  nodeKeys!: string[];

  @ApiProperty({ type: [String] })
  edgeKeys!: string[];

  @ApiPropertyOptional()
  termKey?: string;

  @ApiPropertyOptional({ description: 'Numbers for the message, e.g. { expected: 135, actual: 131 }', type: 'object', additionalProperties: { type: 'number' } })
  meta?: Record<string, number>;
}
