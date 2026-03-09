import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import * as jwt from 'jsonwebtoken';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    middleware = new AuthMiddleware();
    mockNext = jest.fn();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // ✅ TEST 1: Public Routes Should Skip Auth
  describe('Public Routes', () => {
    it('should skip authentication for /auth/login', () => {
      mockRequest = {
        headers: {},
        originalUrl: '/auth/login',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should skip authentication for /auth/register', () => {
      mockRequest = {
        headers: {},
        originalUrl: '/auth/register',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should skip authentication for /auth/refresh-token', () => {
      mockRequest = {
        headers: {},
        originalUrl: '/auth/refresh-token',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should skip authentication for /auth/forgot-password', () => {
      mockRequest = {
        headers: {},
        originalUrl: '/auth/forgot-password',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should skip authentication for /auth/reset-password', () => {
      mockRequest = {
        headers: {},
        originalUrl: '/auth/reset-password',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  // ✅ TEST 2: Missing Authorization Header
  describe('Missing Authorization Header', () => {
    it('should throw UnauthorizedException when no Authorization header', () => {
      mockRequest = {
        headers: {},
        originalUrl: '/admin/users',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow(UnauthorizedException);
    });

    it('should throw error with message "No token provided"', () => {
      mockRequest = {
        headers: {},
        originalUrl: '/roadmaps/list',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow('No token provided');
    });
  });

  // ✅ TEST 3: Malformed Authorization Header
  describe('Malformed Authorization Header', () => {
    it('should throw error for malformed header (no Bearer prefix)', () => {
      mockRequest = {
        headers: {
          authorization: 'InvalidToken',
        },
        originalUrl: '/admin/info',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow('Malformed authorization header');
    });

    it('should handle Authorization header as array', () => {
      const validToken = jwt.sign(
        { email: 'test@example.com', role: 'ADMIN' },
        process.env.JWT_SECRET || 'test-secret'
      );

      mockRequest = {
        headers: {
          authorization: ['Bearer ' + validToken],
        },
        originalUrl: '/admin/info',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  // ✅ TEST 4: Valid JWT Token
  describe('Valid JWT Token', () => {
    it('should attach decoded user to request for valid token', () => {
      const validToken = jwt.sign(
        { email: 'user@example.com', role: 'USER', sub: '123' },
        process.env.JWT_SECRET || 'test-secret'
      );

      mockRequest = {
        headers: {
          authorization: 'Bearer ' + validToken,
        },
        originalUrl: '/roadmaps/list',
      };

      middleware.use(mockRequest, mockResponse, mockNext);

      expect(mockRequest.user).toBeDefined();
      expect(mockRequest.user.email).toBe('user@example.com');
      expect(mockRequest.user.role).toBe('USER');
      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle token with only sub claim', () => {
      const validToken = jwt.sign(
        { sub: 'user-123' },
        process.env.JWT_SECRET || 'test-secret'
      );

      mockRequest = {
        headers: {
          authorization: 'Bearer ' + validToken,
        },
        originalUrl: '/roadmaps/list',
      };

      middleware.use(mockRequest, mockResponse, mockNext);

      expect(mockRequest.user).toBeDefined();
      expect(mockRequest.user.sub).toBe('user-123');
      expect(mockNext).toHaveBeenCalled();
    });
  });

  // ✅ TEST 5: Invalid/Expired JWT Token
  describe('Invalid/Expired JWT Token', () => {
    it('should throw error for expired token', (done) => {
      const expiredToken = jwt.sign(
        { email: 'user@example.com', role: 'USER' },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '0s' } // Expired immediately
      );

      // Add delay to ensure token is actually expired
      setTimeout(() => {
        mockRequest = {
          headers: {
            authorization: 'Bearer ' + expiredToken,
          },
          originalUrl: '/admin/info',
        };

        expect(() => {
          middleware.use(mockRequest, mockResponse, mockNext);
        }).toThrow(UnauthorizedException);
        done();
      }, 100);
    });

    it('should throw error for invalid token signature', () => {
      const invalidToken = jwt.sign(
        { email: 'user@example.com' },
        'wrong-secret'
      );

      mockRequest = {
        headers: {
          authorization: 'Bearer ' + invalidToken,
        },
        originalUrl: '/admin/info',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow('Invalid or expired token');
    });

    it('should throw error for malformed JWT', () => {
      mockRequest = {
        headers: {
          authorization: 'Bearer not.a.valid.jwt',
        },
        originalUrl: '/admin/info',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow(UnauthorizedException);
    });
  });

  // ✅ TEST 6: Multiple Roles Support
  describe('Different User Roles', () => {
    it('should attach ADMIN role to request', () => {
      const adminToken = jwt.sign(
        { email: 'admin@example.com', role: 'ADMIN' },
        process.env.JWT_SECRET || 'test-secret'
      );

      mockRequest = {
        headers: {
          authorization: 'Bearer ' + adminToken,
        },
        originalUrl: '/admin/dashboard',
      };

      middleware.use(mockRequest, mockResponse, mockNext);

      expect(mockRequest.user.role).toBe('ADMIN');
      expect(mockNext).toHaveBeenCalled();
    });

    it('should attach USER role to request', () => {
      const userToken = jwt.sign(
        { email: 'user@example.com', role: 'USER' },
        process.env.JWT_SECRET || 'test-secret'
      );

      mockRequest = {
        headers: {
          authorization: 'Bearer ' + userToken,
        },
        originalUrl: '/roadmaps/my-roadmap',
      };

      middleware.use(mockRequest, mockResponse, mockNext);

      expect(mockRequest.user.role).toBe('USER');
      expect(mockNext).toHaveBeenCalled();
    });

    it('should attach MENTOR role to request', () => {
      const mentorToken = jwt.sign(
        { email: 'mentor@example.com', role: 'MENTOR' },
        process.env.JWT_SECRET || 'test-secret'
      );

      mockRequest = {
        headers: {
          authorization: 'Bearer ' + mentorToken,
        },
        originalUrl: '/mentor/sessions',
      };

      middleware.use(mockRequest, mockResponse, mockNext);

      expect(mockRequest.user.role).toBe('MENTOR');
      expect(mockNext).toHaveBeenCalled();
    });
  });
});