// src/modules/auth/dtos/auth-login-response.dto.ts
import { UserResponseDto } from './user-response.dto';

export class AuthLoginResponseDto {
  access_token: string;
  refresh_token: string;
  user: UserResponseDto;
}