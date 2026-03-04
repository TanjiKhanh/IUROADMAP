import { IsEmail, IsString, MinLength, IsOptional, IsIn, IsInt, IsArray, IsNotEmpty } from 'class-validator';

export class LearnerRegisterDto {
  @IsEmail({}, {message: 'Invalid email format'})
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6 , {message: 'Password must be at least 6 characters long'})
  password: string;

  @IsNotEmpty()
  @IsString( {message: 'Name must be a string'})
  name?: string;

  @IsNotEmpty()
  @IsIn(['STUDENT' ] , {message: 'Role must be one of STUDENT'})
  role?: string;

}
