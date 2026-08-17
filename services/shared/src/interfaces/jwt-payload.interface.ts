export interface IJwtPayload {
  sub: number;
  userId: number;
  email: string;
  role: string;
  deptId?: number | null;
  job?: string | null;
  iat?: number;
  exp?: number;
}
