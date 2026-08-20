import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// admin-service/src/management/dto/department.dto.ts
export class DepartmentDto {
  @ApiProperty({ description: 'Department ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Department slug', example: 'school-of-computing' })
  slug: string;

  @ApiProperty({ description: 'Department name', example: 'School of Computing and Information Technology' })
  name: string;

  @ApiPropertyOptional({ description: 'Department description', example: 'Leading research in computing' })
  description?: string | null;
}

// admin-service/src/management/dto/major.dto.ts
export class MajorDto {
  @ApiProperty({ description: 'Major ID', example: 10 })
  id: number;

  @ApiProperty({ description: 'Major slug', example: 'software-engineering' })
  slug: string;

  @ApiProperty({ description: 'Major name', example: 'Software Engineering' })
  name: string;

  @ApiPropertyOptional({ description: 'Major description', example: 'Focus on modern software development' })
  description?: string | null;

  @ApiProperty({ description: 'Total credits required', example: 130 })
  totalCreditsRequired: number;

  @ApiProperty({ description: 'Total courses in major', example: 45 })
  totalCourses: number;

  @ApiPropertyOptional({
    description: 'Associated department object',
    example: { id: 1, slug: 'school-of-computing', name: 'School of Computing and Information Technology' },
  })
  department: {
    id: number;
    slug: string;
    name: string;
  } | null;
}

