import { ApiProperty } from '@nestjs/swagger';
import { MergedTermResponse } from '../student-roadmap/merged-term.response';
import { TermResultRowResponse } from './term-result-row.response';

export class TermResultsResponse {
  @ApiProperty({ description: 'Current revision of the roadmap', example: 8 })
  revision!: number;

  @ApiProperty({ type: MergedTermResponse, description: 'The term, with its summary and cumulative block' })
  term!: MergedTermResponse;

  @ApiProperty({ type: [TermResultRowResponse] })
  rows!: TermResultRowResponse[];
}
