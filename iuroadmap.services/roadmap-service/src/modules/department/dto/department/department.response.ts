import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IActionDelete, IActionUpdate } from '@iuroadmap/shared';

export class DepartmentResponse implements IActionDelete, IActionUpdate {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'school-of-computing' })
  slug!: string;

  @ApiProperty({ example: 'School of Computer Science and Engineering' })
  name!: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ description: 'Number of majors in this department', example: 3 })
  majorCount!: number;

  @ApiProperty({ description: 'Number of lecturers in this department', example: 12 })
  lecturerCount!: number;

  @ApiProperty({ description: 'False while the department still has majors or lecturers (BR-RM-02)' })
  canDelete!: boolean;

  @ApiProperty()
  canUpdate!: boolean;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
