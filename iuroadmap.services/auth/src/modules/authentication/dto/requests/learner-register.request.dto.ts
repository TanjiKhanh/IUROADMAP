import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { EntityConstant } from '@iuroadmap/shared';

/** Self sign-up always creates a LEARNER account, so the client does not send a role. */
export class LearnerRegisterRequestDto {
  @ApiProperty({
    description: 'The email address of the learner',
    example: 'learner@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(EntityConstant.Email)
  email: string;

  @ApiProperty({
    description: 'The account password (minimum 6 characters)',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(EntityConstant.PasswordMin, { message: `Password must be at least ${EntityConstant.PasswordMin} characters long` })
  @MaxLength(EntityConstant.PasswordMax)
  password: string;

  @ApiPropertyOptional({
    description: 'Full name of the learner',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  name?: string;
}
