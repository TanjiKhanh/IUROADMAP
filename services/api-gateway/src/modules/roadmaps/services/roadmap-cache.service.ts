import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class RoadmapCacheService {
  private readonly TTL_SECONDS = 60 * 60 * 24; // 24h, adjust as needed

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  private getKey(roadmapId: number): string {
    return `roadmap:${roadmapId}:graph`;
  }

  async getGraph(roadmapId: number): Promise<any | null> {
    const key = this.getKey(roadmapId);
    const value = await this.cache.get(key);
    // We store raw objects, so no JSON.parse needed
    return (value as any) ?? null;
  }

  async setGraph(roadmapId: number, graph: any): Promise<void> {
    const key = this.getKey(roadmapId);
    await this.cache.set(key, graph, this.TTL_SECONDS);
  }

  async deleteGraph(roadmapId: number): Promise<void> {
    const key = this.getKey(roadmapId);
    // useful later if admin updates roadmap
    await this.cache.del(key);
  }
}