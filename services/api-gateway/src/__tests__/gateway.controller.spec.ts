/// <reference types="jest" />

// 1. BYPASS THE HTTP PROXY (Prevents 504 Gateway Timeout)
jest.mock('http-proxy-middleware', () => ({
  createProxyMiddleware: jest.fn(() => (req: any, res: any, next: any) => next()),
}));

// 2. MOCK THE AUTH MIDDLEWARE (Prevents 401 on fake tokens)
jest.mock('../common/middlewares/auth.middleware', () => {
  const { Injectable } = require('@nestjs/common');
  
  @Injectable()
  class MockAuthMiddleware {
    use(req: any, res: any, next: any) {
      if (req.headers.authorization) {
        req.user = { id: 1, email: 'test@example.com', role: 'ADMIN' }; 
        return next();
      }
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
  return { AuthMiddleware: MockAuthMiddleware };
});

import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';

/**
 * Unit / integration tests for API Gateway.
 *
 * We boot a Nest TestingModule, override the AUTH and ADMIN clients with mocks, and
 * optionally override the JwtAuthGuard to simulate auth success/failure.
 *
 * Tests included:
 * - GET /health returns 200 and service status
 * - POST /auth/login forwards payload to authClient.login and returns response
 * - GET /admin/info with Authorization forwarded to adminClient.getInfo (successful)
 * - GET /admin/info without Authorization returns 401
 * - Admin service error maps to 502
 */



describe('GatewayController (e2e)', () => {
  let app: INestApplication;

  // Mock clients
  const authClientMock = {
    login: jest.fn(async (payload) => ({ accessToken: 'access-123', user: { id: 1, email: 'u' } })),
  };

  const adminClientMock = {
    getInfo: jest.fn(async ({ headers }) => ({ name: 'admin-service', version: '1.0', gotAuthHeader: headers.authorization })),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // override the AUTH_CLIENT and ADMIN_CLIENT providers defined in module
      .overrideProvider('AUTH_CLIENT')
      .useValue(authClientMock)
      .overrideProvider('ADMIN_CLIENT')
      .useValue(adminClientMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('/health (GET) should return OK', async () => {
    const res = await request(app.getHttpServer()).get('/health').expect(200);
    expect(res.body).toEqual({ status: 'ok', service: 'api-gateway' });
  });

  it('POST /auth/login should proxy to authClient.login and return tokens', async () => {
    const payload = { email: 'alice@example.com', password: 'secret' };
    const res = await request(app.getHttpServer()).post('/auth/login').send(payload).expect(201);
    // our controller simply proxies to authClient.login
    expect(authClientMock.login).toHaveBeenCalledWith(payload);
    expect(res.body).toMatchObject({ accessToken: 'access-123' });
  });

  it('GET /admin/info should return admin info when Authorization header present', async () => {
    const token = 'Bearer test-token';
    const res = await request(app.getHttpServer()).get('/admin/info').set('Authorization', token).expect(200);
    expect(adminClientMock.getInfo).toHaveBeenCalledWith(expect.objectContaining({ headers: { authorization: token } }));
    expect(res.body).toMatchObject({ name: 'admin-service', version: '1.0', gotAuthHeader: token });
  });

  it('GET /admin/info without Authorization should be 401', async () => {
    await request(app.getHttpServer()).get('/admin/info').expect(401);
  });

  it('GET /admin/info maps admin errors to 502', async () => {
    // Make admin client throw
    adminClientMock.getInfo.mockImplementationOnce(async () => {
      throw new Error('down');
    });
    const token = 'Bearer test-token';
    const res = await request(app.getHttpServer()).get('/admin/info').set('Authorization', token).expect(502);
    expect(res.text).toContain('Admin service error');
  });
});