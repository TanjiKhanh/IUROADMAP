import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';

// simple fake ExecutionContext (reuses same request object)
function makeContext(header?: string) {
  const req: any = { headers: { authorization: header } };
  return {
    switchToHttp: () => ({
      getRequest: () => req,
    }),
  } as any;
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwt: any;
  let config: any;

  beforeEach(() => {
    jwt = { verifyAsync: jest.fn() };
    config = { get: jest.fn().mockReturnValue('secret') };
    guard = new AuthGuard(jwt, config);
  });

  it('throws when no token', async () => {
    await expect(guard.canActivate(makeContext(undefined))).rejects.toThrow(UnauthorizedException);
  });

  it('throws when invalid token', async () => {
    jwt.verifyAsync.mockRejectedValue(new Error('bad')); 
    await expect(guard.canActivate(makeContext('Bearer bad'))).rejects.toThrow(UnauthorizedException);
  });

  it('attaches payload when token valid', async () => {
    jwt.verifyAsync.mockResolvedValue({ sub: 1, email: 'a', role: 'X' });
    const ctx: any = makeContext('Bearer good');
    const allowed = await guard.canActivate(ctx);
    expect(allowed).toBe(true);
    expect(ctx.switchToHttp().getRequest().user).toEqual({ id: 1, email: 'a', role: 'X', deptId: undefined, job: undefined });
  });

  it('ignores bad scheme', async () => {
    await expect(guard.canActivate(makeContext('Token abc'))).rejects.toThrow(UnauthorizedException);
  });
});
