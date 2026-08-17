import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MajorCardDto {
  @ApiProperty({ description: 'Major ID', example: 10 })
  id: number;

  @ApiProperty({ description: 'Major slug', example: 'software-engineering' })
  slug: string;

  @ApiProperty({ description: 'Major name', example: 'Software Engineering' })
  name: string;

  @ApiPropertyOptional({ description: 'Major description', example: 'Engineering software systems' })
  description?: string;

  @ApiProperty({ description: 'Total credits required', example: 130 })
  totalCreditsRequired: number;

  @ApiProperty({ description: 'Total courses', example: 45 })
  totalCourses: number;

  @ApiPropertyOptional({
    description: 'Associated department',
    example: { id: 1, slug: 'school-of-computing', name: 'School of Computing' },
  })
  department: {
    id: number;
    slug: string;
    name: string;
  } | null;
}

export class DepartmentFilterDto {
  @ApiProperty({ description: 'Department ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Department slug', example: 'school-of-computing' })
  slug: string;

  @ApiProperty({ description: 'Department name', example: 'School of Computing' })
  name: string;

  @ApiPropertyOptional({ description: 'Department description', example: 'Leading computing research' })
  description?: string;
}

export class ExploreMajorsResponseDto {
  @ApiProperty({ description: 'List of departments for filtering', type: [DepartmentFilterDto] })
  departments: DepartmentFilterDto[];

  @ApiProperty({ description: 'List of major cards', type: [MajorCardDto] })
  majors: MajorCardDto[];
}