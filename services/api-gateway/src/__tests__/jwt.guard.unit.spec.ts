import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let mockExecutionContext: any;
  let mockRequest: any;

  beforeEach(() => {
    guard = new JwtAuthGuard();
    mockRequest = {
      headers: {},
    };

    mockExecutionContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;
  });

  // ✅ TEST 1: Missing Authorization Header
  describe('Missing Authorization Header', () => {
    it('should throw when headers object is null', () => {
      mockRequest.headers = null;

      expect(() => {
        guard.canActivate(mockExecutionContext);
      }).toThrow();
    });

    it('should throw UnauthorizedException when authorization header missing', () => {
      mockRequest.headers = { 'content-type': 'application/json' };

      expect(() => {
        guard.canActivate(mockExecutionContext);
      }).toThrow(UnauthorizedException);
    });

    it('should throw error with message "Missing Authorization Header"', () => {
      mockRequest.headers = {};

      expect(() => {
        guard.canActivate(mockExecutionContext);
      }).toThrow('Missing Authorization Header');
    });
  });

  // ✅ TEST 2: Valid Authorization Header
  describe('Valid Authorization Header', () => {
    it('should return true when authorization header exists', () => {
      mockRequest.headers = {
        authorization: 'Bearer valid.jwt.token',
      };

      const result = guard.canActivate(mockExecutionContext);
      expect(result).toBe(true);
    });

    it('should return true with valid Bearer token', () => {
      mockRequest.headers = {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      };

      const result = guard.canActivate(mockExecutionContext);
      expect(result).toBe(true);
    });
  });

  // ✅ TEST 3: Different Authorization Formats
  describe('Different Authorization Formats', () => {
    it('should accept Bearer token with Bearer prefix', () => {
      mockRequest.headers = {
        authorization: 'Bearer sometoken123',
      };

      const result = guard.canActivate(mockExecutionContext);
      expect(result).toBe(true);
    });

    it('should reject non-Bearer authorization header', () => {
      mockRequest.headers = {
        authorization: 'SomeOtherScheme token123',
      };

      expect(() => {
        guard.canActivate(mockExecutionContext);
      }).toThrow(UnauthorizedException);
    });

    it('should not validate empty string authorization', () => {
      mockRequest.headers = {
        authorization: '',
      };

      // Empty string is falsy
      expect(() => {
        guard.canActivate(mockExecutionContext);
      }).toThrow(UnauthorizedException);
    });
  });

  // ✅ TEST 4: Header Case Insensitivity
  describe('Header Case Sensitivity', () => {
    it('should work with lowercase authorization header', () => {
      mockRequest.headers = {
        authorization: 'Bearer token123',
      };

      const result = guard.canActivate(mockExecutionContext);
      expect(result).toBe(true);
    });

    it('should work with Authorization (capitalized)', () => {
      mockRequest.headers = {
        Authorization: 'Bearer token123',
      };

      // Express normalizes headers to lowercase
      mockRequest.headers['authorization'] = mockRequest.headers['Authorization'];
      const result = guard.canActivate(mockExecutionContext);
      expect(result).toBe(true);
    });
  });

  // ✅ TEST 5: Multiple Headers
  describe('Request with Multiple Headers', () => {
    it('should pass with authorization header among other headers', () => {
      mockRequest.headers = {
        'content-type': 'application/json',
        'user-agent': 'Mozilla/5.0',
        authorization: 'Bearer validtoken',
        'accept-encoding': 'gzip, deflate',
      };

      const result = guard.canActivate(mockExecutionContext);
      expect(result).toBe(true);
    });
  });

  // ✅ TEST 6: Guard Integration
  describe('Guard Integration', () => {
    it('should work with ExecutionContext from request', () => {
      mockRequest.headers = {
        authorization: 'Bearer token123',
      };

      const result = guard.canActivate(mockExecutionContext);

      expect(mockExecutionContext.switchToHttp).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should throw when context has no headers', () => {
      mockRequest = null;
      mockExecutionContext.switchToHttp = jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      });

      expect(() => {
        guard.canActivate(mockExecutionContext);
      }).toThrow();
    });
  });

  // ✅ TEST 7: Edge Cases
  describe('Edge Cases', () => {
    it('should reject whitespace-only authorization', () => {
      mockRequest.headers = {
        authorization: '   ',
      };

      // Whitespace doesn't start with 'Bearer '
      expect(() => {
        guard.canActivate(mockExecutionContext);
      }).toThrow(UnauthorizedException);
    });

    it('should throw for authorization array with values', () => {
      // Express can pass headers as arrays in some cases
      mockRequest.headers = {
        authorization: ['Bearer token1', 'Bearer token2'],
      };

      // Array doesn't have startsWith method
      expect(() => {
        guard.canActivate(mockExecutionContext);
      }).toThrow();
    });
  });
});