import { ApiProperty } from '@nestjs/swagger';
import { CurriculumIssueResponse } from './curriculum-issue.response';

export class CurriculumValidationResponse {
  @ApiProperty({ type: [CurriculumIssueResponse], description: 'Block publishing' })
  errors!: CurriculumIssueResponse[];

  @ApiProperty({ type: [CurriculumIssueResponse], description: 'Must be acknowledged to publish' })
  warnings!: CurriculumIssueResponse[];
}
