// src/modules/auth/interfaces/jwt-payload.interface.ts

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}