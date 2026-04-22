import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  // User can provide a slug, or backend will generate one from name
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  structure?: any;
}