import { IsEmail, IsString, MinLength, IsOptional, IsIn, IsInt, IsArray, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, {message: 'Invalid email format'})
  email: string;

  @IsString()
  @MinLength(6 , {message: 'Password must be at least 6 characters long'})
  password: string;

  @IsString( {message: 'Name must be a string'})
  name?: string;

  @IsIn(['STUDENT', 'MENTOR', 'COMPANY', 'ADMIN'] , {message: 'Role must be one of STUDENT, MENTOR, COMPANY, ADMIN'})
  role?: string;


}