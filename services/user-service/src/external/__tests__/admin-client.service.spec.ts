import axios from 'axios';
import { AdminClientService } from '../admin-client/admin-client.service';
import { HttpException } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AdminClientService', () => {
  let svc: AdminClientService;

  beforeEach(() => {
    process.env.ADMIN_SERVICE_URL = 'http://example';
    svc = new AdminClientService();
    jest.resetAllMocks();
  });

  it('getRoadmapSummary returns data on success', async () => {
    mockedAxios.get.mockResolvedValue({ data: { foo: 'bar' } });
    const res = await svc.getRoadmapSummary('slug');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://example/admin/roadmaps/slug/summary');
    expect(res).toEqual({ foo: 'bar' });
  });

  it('getRoadmapSummary throws HttpException on error', async () => {
    mockedAxios.get.mockRejectedValue(new Error('fail'));
    await expect(svc.getRoadmapSummary('slug')).rejects.toThrow(HttpException);
  });

  it('getRoadmapDetails returns data', async () => {
    mockedAxios.get.mockResolvedValue({ data: { nodes: [] } });
    const res = await svc.getRoadmapDetails('slug');
    expect(res).toHaveProperty('nodes');
  });

  it('getRoadmapDetails wraps error', async () => {
    mockedAxios.get.mockRejectedValue(new Error('x'));
    await expect(svc.getRoadmapDetails('slug')).rejects.toThrow(HttpException);
  });
});
