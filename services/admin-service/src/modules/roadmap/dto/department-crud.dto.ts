import { IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  slug: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class DepartmentResponseDto {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}