import { ApiProperty } from '@nestjs/swagger';
import { IActionDelete, IActionUpdate } from '@iuroadmap/shared';

export class CourseCategoryResponse implements IActionDelete, IActionUpdate {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'MAJOR' })
  code!: string;

  @ApiProperty({ example: 'Major' })
  name!: string;

  @ApiProperty({ example: '#BDD7EE' })
  fillColor!: string;

  @ApiProperty({ example: '#2F5597' })
  borderColor!: string;

  @ApiProperty({ example: 1 })
  sortOrder!: number;

  @ApiProperty({ description: 'Courses in this category', example: 42 })
  courseCount!: number;

  @ApiProperty({ description: 'False while courses still use the category (CATEGORY_IN_USE)' })
  canDelete!: boolean;

  @ApiProperty()
  canUpdate!: boolean;
}
