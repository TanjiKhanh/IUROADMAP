import axios from 'axios';
import { AuthClientService } from '../auth-client/auth-client.service';
import { HttpException } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AuthClientService', () => {
  let svc: AuthClientService;

  beforeEach(() => {
    process.env.AUTH_SERVICE_URL = 'http://auth';
    svc = new AuthClientService();
    jest.resetAllMocks();
  });

  it('getUserProfile returns backend payload', async () => {
    mockedAxios.get.mockResolvedValue({ data: { id: 5, email: 'a@b' } });
    const profile = await svc.getUserProfile(5);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://auth/users/5');
    expect(profile).toEqual({ id: 5, email: 'a@b' });
  });

  it('errors propagate as HttpException', async () => {
    mockedAxios.get.mockRejectedValue(new Error('down')); 
    await expect(svc.getUserProfile(1)).rejects.toThrow(HttpException);
  });
});
