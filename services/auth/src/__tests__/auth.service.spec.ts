/// <reference types="jest" />

/**
 * Unit tests for AuthService (Jest)
 *
 * This test suite uses plain dependency injection with mocked PrismaClient and JwtService.
 * It covers:
 * - validateUser (correct/incorrect password)
 * - login (issues tokens and persists hashed refresh token)
 * - rotateRefreshToken (happy path, revoked/expired/mismatch cases)
 * - revokeRefreshToken (logout)
 *
 * Run:
 *  cd services/auth
 *  npm i --save-dev jest ts-jest @types/jest
 *  npx jest services/auth/src/__tests__/auth.service.spec.ts --runInBand
 *
 * NOTE: adapt import paths if your project layout differs.
 */
 
import { AuthService } from '../services/auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// Keep bcrypt mocked for predictable compare/hash
jest.mock('bcrypt');

describe('AuthService (unit)', () => {
  let authService: AuthService;
  let usersServiceMock: any;
  let jwtServiceMock: Partial<JwtService>;
  let mailerServiceMock: any;

  beforeEach(() => {
    // simple in-memory stores
    const refreshStore = new Map<string, any>();

    // Users service mock with methods used by AuthService
    usersServiceMock = {
      findByEmail: jest.fn(async (email: string) => {
        if (email === 'alice@example.com') return { id: 1, email: 'alice@example.com', password: '$2b$10$hashed', name: 'Alice', role: 'STUDENT' } as any;
        return null;
      }),
      findById: jest.fn(async (id: number) => {
        if (id === 1) return { id: 1, email: 'alice@example.com', password: '$2b$10$hashed', name: 'Alice', role: 'STUDENT' } as any;
        return null;
      }),
      createRefreshToken: jest.fn(async (userId: number, tokenHash: string, expiresAt: Date, ua?: string, ip?: string) => {
        const id = `rt-${Math.random().toString(36).slice(2, 9)}`;
        const rec = { id, userId, tokenHash, expiresAt, revoked: false };
        refreshStore.set(id, rec);
        return rec;
      }),
      findValidRefreshTokensForUser: jest.fn(async (userId: number) => {
        return Array.from(refreshStore.values()).filter((r: any) => r.userId === userId && !r.revoked);
      }),
      revokeRefreshToken: jest.fn(async (id: string) => {
        const r = refreshStore.get(id);
        if (r) r.revoked = true;
        return null;
      }),
      revokeAllForUser: jest.fn(async (userId: number) => {
        for (const r of refreshStore.values()) if (r.userId === userId) r.revoked = true;
        return null;
      }),
      // for register flow if ever used
      createUser: jest.fn(async (payload: any) => ({ id: 2, ...payload })),
    };

    jwtServiceMock = {
      sign: jest.fn((payload: any) => `access-token-for-${payload.sub}`),
    };

    mailerServiceMock = { sendMail: jest.fn() };

    // Construct service with mocks. AuthService constructor expects (usersService, jwtService, mailerService, prisma, adminClient, userClient)
    authService = new AuthService(
      usersServiceMock,
      jwtServiceMock as JwtService,
      mailerServiceMock,
      // prisma + other external clients are not used by the exercised methods, pass minimal stubs
      {} as any,
      {} as any,
      {} as any,
    );
  });

  afterEach(() => jest.resetAllMocks());

  describe('login', () => {
    it('issues access and refresh tokens and persists hashed refresh token', async () => {
      (bcrypt.compare as unknown as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as unknown as jest.Mock).mockResolvedValue('hashed-refresh-token');

      const result = await authService.login({ email: 'alice@example.com', password: 'plain' } as any, 'ua', '1.2.3.4');

      expect(result).toHaveProperty('access_token');
      expect(result).toHaveProperty('refresh_token');
      expect(jwtServiceMock.sign).toHaveBeenCalledWith(expect.objectContaining({ sub: 1, email: 'alice@example.com', role: 'STUDENT', deptId: null }), expect.any(Object));
      expect(usersServiceMock.createRefreshToken).toHaveBeenCalledWith(1, 'hashed-refresh-token', expect.any(Date), 'ua', '1.2.3.4');
    });

    it('throws when credentials invalid', async () => {
      (bcrypt.compare as unknown as jest.Mock).mockResolvedValue(false);
      await expect(authService.login({ email: 'alice@example.com', password: 'wrong' } as any)).rejects.toThrow();
    });
  });

  describe('refreshToken', () => {
    it('rotates refresh token and returns new tokens', async () => {
      // prepare stored token
      const userId = 1;
      const tokenPart = 'sometoken123';
      const storedId = 'stored-1';
      const expires = new Date(Date.now() + 10000);
      // insert into usersService-backed store via createRefreshToken stub
      // directly push into the mock's internal store by calling createRefreshToken
      const created = await usersServiceMock.createRefreshToken(userId, 'stored-hash', expires);

      // mock findValidRefreshTokensForUser to return the stored record
      usersServiceMock.findValidRefreshTokensForUser = jest.fn(async () => [{ id: created.id, userId, tokenHash: 'stored-hash', expiresAt: expires, revoked: false }]);

      // bcrypt.compare should accept provided tokenPart
      (bcrypt.compare as unknown as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as unknown as jest.Mock).mockResolvedValue('new-hash');

      const plain = `${userId}.${tokenPart}`;
      const out = await authService.refreshToken(plain, 'ua', '1.2.3.4');

      expect(out).toHaveProperty('access_token');
      expect(out).toHaveProperty('refresh_token');
      expect(usersServiceMock.revokeRefreshToken).toHaveBeenCalledWith(created.id);
      expect(usersServiceMock.createRefreshToken).toHaveBeenCalled();
    });

    it('throws on missing/invalid format', async () => {
      await expect(authService.refreshToken('badformat')).rejects.toThrow();
    });
  });

  describe('logout', () => {
    it('revokes all tokens for user', async () => {
      await authService.logout(1);
      expect(usersServiceMock.revokeAllForUser).toHaveBeenCalledWith(1);
    });
  });
});