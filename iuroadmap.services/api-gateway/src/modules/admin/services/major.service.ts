import { Injectable } from '@nestjs/common';
import { AdminServiceClient } from '../clients/admin-service.client';
import { AdminRoadmapGraph } from '../../roadmaps/interfaces';
import { UpdateMajorMetaPayload } from '../dtos';

@Injectable()
export class MajorService {
  constructor(private readonly adminClient: AdminServiceClient) {}

  async UpdateMajorMeta(slug: string, payload: UpdateMajorMetaPayload): Promise<any> {
    return this.adminClient.updateMajorMeta(slug, payload);
  }

 
}
