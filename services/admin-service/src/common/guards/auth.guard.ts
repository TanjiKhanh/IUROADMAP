import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'; // 👈 Make sure this path is correct

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 🔓 CHECK FOR PUBLIC FIRST
    // If the route is marked @Public(), we skip token validation.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      console.log('🔓 Public route accessed, skipping auth check');
      return true; // ✅ Allow access without token
    }

    // 2. 🔒 STANDARD TOKEN CHECK
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error('JWT_SECRET is not defined');

      const payload: any = jwt.verify(token, secret);
      payload.userId = payload.userId ?? payload.sub;
      payload.sub = payload.sub ?? payload.userId;
      
      // 📝 Attach user to request so RolesGuard can read it later
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}