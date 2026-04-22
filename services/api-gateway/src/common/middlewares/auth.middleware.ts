import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// 1. Extend the Express Request type so TypeScript doesn't complain about 'req.user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 2. Skip Auth for public routes
    const publicRoutes = [
      '/auth/login',
      '/auth/register',
      '/auth/register/learner',    
      '/auth/register/mentor',    
      '/auth/refresh-token',
      '/auth/reset-password',
      '/auth/forgot-password',
      '/mentors',                  
      '/mentors/by-skill',         
      '/mentors/by-industry',      
    ];

    if (publicRoutes.some(route => req.originalUrl.startsWith(route))) {
      return next();
    }

    // 3. Check for the Authorization header
    const rawHeader = req.headers['authorization'];
    if (!rawHeader) {
      console.log('⛔ No Authorization header found');
      throw new UnauthorizedException('No token provided');
    }

    // 4. Normalize header
    const authHeader = Array.isArray(rawHeader) ? rawHeader[0] : rawHeader;
    const parts = authHeader.split(' ');
    if (parts.length < 2) {
      console.log('⛔ Malformed Authorization header');
      throw new UnauthorizedException('Malformed authorization header');
    }

    const token = parts[1];

    try {
      // 5. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const payload = typeof decoded === 'string' ? { sub: decoded } : decoded;
      req.user = payload as any;

      console.log(
        '✅ Gateway Auth Success. User:',
        (req.user as any).email || (req.user as any).sub,
        '| Role:',
        (req.user as any).role,
      );

      next();
    } catch (err) {
      console.log('❌ Gateway Token Verification Failed:', err.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}