import { ApiProperty } from '@nestjs/swagger';

export class MentorStatsDto {
  @ApiProperty({ description: 'Total number of mentors', example: 42 })
  totalMentors: number;

  @ApiProperty({ description: 'Mentors distribution across industries', example: [{ industry: 'Tech', count: 25 }] })
  mentorsByIndustry: Array<{
    industry: string;
    count: number;
  }>;

  @ApiProperty({ description: 'Most common skills among mentors', example: [{ skill: 'TypeScript', count: 30 }] })
  topSkills: Array<{
    skill: string;
    count: number;
  }>;

  constructor(data: any) {
    this.totalMentors = data.totalMentors || 0;
    this.mentorsByIndustry = data.mentorsByIndustry || [];
    this.topSkills = data.topSkills || [];
  }
}