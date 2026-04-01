import { IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '../common/enums/role.enum'; 
import { AccountStatus } from '../generated/client';

export class FilterUsersDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsEnum(AccountStatus)
  status?: AccountStatus;

  @IsOptional()
  @IsString()
  search?: string;

  // --- PAGINATION FIELDS ---
  @IsOptional()
  @Type(() => Number) // Converts the URL string "1" into a real Number
  @IsInt()
  @Min(1)
  page?: number = 1; // Default to page 1

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10; // Default to 10 users per page
}
