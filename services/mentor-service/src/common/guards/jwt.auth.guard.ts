import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/**
 * JwtAuthGuard
 * 
 * Validates JWT token and attaches user object to request.
 * Must run BEFORE RolesGuard.
 * 
 * Extracts Authorization header, verifies JWT, sets req.user.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer') {
      throw new UnauthorizedException('Invalid auth scheme. Use: Bearer <token>');
    }

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      // Attach user info to request
      req.user = {
        userId: payload.sub || payload.userId,
        email: payload.email,
        role: payload.role,
        roles: payload.roles || [payload.role], // Support both single role and roles array
      };
      return true;
    } catch (err) {
      throw new UnauthorizedException(`Invalid token: ${err.message}`);
    }
  }
}