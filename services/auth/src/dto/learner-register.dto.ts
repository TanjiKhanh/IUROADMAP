import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsIn, IsNotEmpty } from 'class-validator';

export class LearnerRegisterDto {
  @ApiProperty({
    description: 'The email address of the learner',
    example: 'learner@example.com',
  })
  @IsEmail({}, {message: 'Invalid email format'})
  email: string;

  @ApiProperty({
    description: 'The account password (minimum 6 characters)',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6 , {message: 'Password must be at least 6 characters long'})
  password: string;

  @ApiPropertyOptional({
    description: 'Full name of the learner',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString( {message: 'Name must be a string'})
  name?: string;

  @ApiPropertyOptional({
    description: 'Role of the user',
    enum: ['STUDENT'],
    example: 'STUDENT',
  })
  @IsNotEmpty()
  @IsIn(['STUDENT' ] , {message: 'Role must be one of STUDENT'})
  role?: string;

}
