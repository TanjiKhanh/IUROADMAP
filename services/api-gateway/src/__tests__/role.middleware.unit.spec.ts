import { ForbiddenException } from '@nestjs/common';
import { AdminRoleMiddleware } from '../common/middlewares/role.middleware';

describe('AdminRoleMiddleware', () => {
  let middleware: AdminRoleMiddleware;
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    middleware = new AdminRoleMiddleware();
    mockNext = jest.fn();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // ✅ TEST 1: User Not Authenticated
  describe('User Authentication Check', () => {
    it('should throw ForbiddenException when no user attached to request', () => {
      mockRequest = {
        user: null,
        originalUrl: '/admin/users',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow(ForbiddenException);
    });

    it('should throw error with correct message when user is missing', () => {
      mockRequest = {
        user: undefined,
        originalUrl: '/admin/dashboard',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow('Access denied: User not authenticated');
    });
  });

  // ✅ TEST 2: User Role Validation
  describe('User Role Validation', () => {
    it('should allow admin user to proceed', () => {
      mockRequest = {
        user: {
          email: 'admin@example.com',
          role: 'ADMIN',
          id: '123',
        },
        originalUrl: '/admin/users',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should deny USER role access', () => {
      mockRequest = {
        user: {
          email: 'user@example.com',
          role: 'USER',
          id: '456',
        },
        originalUrl: '/admin/users',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow(ForbiddenException);
    });

    it('should deny MENTOR role access', () => {
      mockRequest = {
        user: {
          email: 'mentor@example.com',
          role: 'MENTOR',
          id: '789',
        },
        originalUrl: '/admin/dashboard',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow(ForbiddenException);
    });

    it('should throw error with message "Admins only"', () => {
      mockRequest = {
        user: {
          email: 'user@example.com',
          role: 'USER',
          id: '456',
        },
        originalUrl: '/admin/settings',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow('Access denied: Admins only');
    });
  });

  // ✅ TEST 3: Case Sensitivity for Roles
  describe('Role Case Sensitivity', () => {
    it('should accept lowercase admin role (case-insensitive)', () => {
      mockRequest = {
        user: {
          email: 'admin@example.com',
          role: 'admin', // lowercase
          id: '123',
        },
        originalUrl: '/admin/users',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should accept Admin (mixed case)', () => {
      mockRequest = {
        user: {
          email: 'admin@example.com',
          role: 'Admin', // mixed case
          id: '123',
        },
        originalUrl: '/admin/users',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  // ✅ TEST 4: Different Admin Routes
  describe('Different Admin Routes', () => {
    const adminUser = {
      email: 'admin@example.com',
      role: 'ADMIN',
      id: '123',
    };

    it('should allow access to /admin/users', () => {
      mockRequest = {
        user: adminUser,
        originalUrl: '/admin/users',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should allow access to /admin/settings', () => {
      mockRequest = {
        user: adminUser,
        originalUrl: '/admin/settings',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should allow access to /admin/dashboard', () => {
      mockRequest = {
        user: adminUser,
        originalUrl: '/admin/dashboard',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should allow access to /admin/analytics', () => {
      mockRequest = {
        user: adminUser,
        originalUrl: '/admin/analytics',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  // ✅ TEST 5: Edge Cases
  describe('Edge Cases', () => {
    it('should handle user object with extra properties', () => {
      mockRequest = {
        user: {
          email: 'admin@example.com',
          role: 'ADMIN',
          id: '123',
          permissions: ['read', 'write', 'delete'],
          lastLogin: new Date(),
        },
        originalUrl: '/admin/users',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle user with null role property', () => {
      mockRequest = {
        user: {
          email: 'user@example.com',
          role: null,
          id: '456',
        },
        originalUrl: '/admin/users',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow(ForbiddenException);
    });

    it('should handle user with undefined role property', () => {
      mockRequest = {
        user: {
          email: 'user@example.com',
          role: undefined,
          id: '456',
        },
        originalUrl: '/admin/users',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow(ForbiddenException);
    });

    it('should handle user object missing role property', () => {
      mockRequest = {
        user: {
          email: 'user@example.com',
          id: '456',
        },
        originalUrl: '/admin/users',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow(ForbiddenException);
    });
  });

  // ✅ TEST 6: Logging Verification
  describe('Logging Behavior', () => {
    beforeEach(() => {
      jest.spyOn(console, 'log').mockImplementation();
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should log when checking permissions', () => {
      mockRequest = {
        user: { role: 'ADMIN' },
        originalUrl: '/admin/users',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(console.log).toHaveBeenCalled();
    });

    it('should log access granted message', () => {
      mockRequest = {
        user: { role: 'ADMIN' },
        originalUrl: '/admin/users',
      };

      middleware.use(mockRequest, mockResponse, mockNext);
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('✅')
      );
    });

    it('should log access denied message for non-admin', () => {
      mockRequest = {
        user: { role: 'USER' },
        originalUrl: '/admin/users',
      };

      expect(() => {
        middleware.use(mockRequest, mockResponse, mockNext);
      }).toThrow();
      expect(console.error).toHaveBeenCalled();
    });
  });
});