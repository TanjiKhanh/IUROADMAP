import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { EntityConstant } from '@iuroadmap/shared';

export class GoogleLoginRequestDto {
  @ApiProperty({
    description: 'Google ID token (the "credential" returned by Google Identity Services)',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6...',
    maxLength: EntityConstant.ExternalToken,
  })
  @IsString()
  @IsNotEmpty({ message: 'Google ID token is required' })
  @MaxLength(EntityConstant.ExternalToken)
  idToken: string;
}
