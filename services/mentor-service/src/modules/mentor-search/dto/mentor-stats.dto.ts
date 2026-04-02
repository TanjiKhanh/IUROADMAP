export class MentorStatsDto {
  totalMentors: number;

  mentorsByIndustry: Array<{
    industry: string;
    count: number;
  }>;

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