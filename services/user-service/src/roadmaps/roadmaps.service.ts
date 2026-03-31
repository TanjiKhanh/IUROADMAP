import { Inject, Injectable, ConflictException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RoadmapNodeStatus } from '../generated/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { AdminClientService } from '../external/admin-client/admin-client.service';
import { AuthClientService } from '../external/auth-client/auth-client.service';

@Injectable()
export class RoadmapsService {
  constructor(
    private prisma: PrismaService,
    private adminClient: AdminClientService,
    private authClient: AuthClientService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  // 🟢 The "Enroll" Sequence
  async enroll(userId: number, slug: string) {
    
    // 1. [Diagram: UserSvc -> Auth] Get User Profile
    // We fetch this to ensure the user exists and maybe check their jobPriority
    const userProfile = await this.authClient.getUserProfile(userId);
    // (Optional: You could validate here if userProfile.jobPriority matches the roadmap)

    // 2. Check for duplicate enrollment (Safety check)
    const existing = await this.prisma.userRoadmap.findFirst({
      where: { userId, slug }
    });
    if (existing) throw new ConflictException('Already enrolled');

    // 3. [Diagram: UserSvc -> Cache] Check Redis
    const cacheKey = `roadmap:summary:${slug}`;
    let masterMap = await this.cacheManager.get<any>(cacheKey);

    if (masterMap) {
      console.log(`✅ CACHE HIT: Found ${slug} in RAM`);
    } else {
      console.log(`❌ CACHE MISS: Calling Admin Service for ${slug}`);
      
      // 4. [Diagram: UserSvc -> Admin] Fetch from Admin
      masterMap = await this.adminClient.getRoadmapSummary(slug);

      // 5. [Diagram: UserSvc -> Cache] Save to Redis
      // Save for 1 hour (TTL: 3600000 ms)
      await this.cacheManager.set(cacheKey, masterMap, 3600000);
    }

    // 6. [Diagram: UserSvc -> UserDB] Insert Record
    const newEnrollment = await this.prisma.userRoadmap.create({
      data: {
        userId,
        masterRoadmapId: masterMap.id,
        title: masterMap.title,
        slug: masterMap.slug,
        // Snapshot the totalNodes from the cached/fetched master map
        totalNodes: masterMap.totalNodes || masterMap.nodes?.length || 0,
        progressPercent: 0,
        completedNodes: 0,
      },
    });

    // 7. [Diagram: Return]
    return newEnrollment;
  }

  async getUserRoadmaps(userId: number) {
    return this.prisma.userRoadmap.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * 🟢 GET SINGLE ROADMAP (The "Merge" Logic)
   * GET /roadmaps/:id
   */
  async getRoadMapNodeMinimal(userId: number, userRoadmapId: number) {
    // 1. Fetch the "Container" (Enrollment) from User DB
    const userRoadmap = await this.prisma.userRoadmap.findUnique({
      where: { id: userRoadmapId },
    });

    if (!userRoadmap) throw new NotFoundException('Enrollment not found');
    if (userRoadmap.userId !== userId) throw new ForbiddenException('Access denied');

    // 2. Get Master Data (Nodes & Structure)
    // Strategy: Cache First -> Then Admin Service
    const cacheKey = `roadmap:nodes:${userRoadmap.slug}`; // Standardize key (e.g. roadmap:nodes:frontend-dev)
    let masterMap = await this.cacheManager.get<any>(cacheKey);

    if (masterMap) {
      console.log(`✅ CACHE HIT: Structure for ${userRoadmap.slug}`);
    } else {
      console.log(`❌ CACHE MISS: Fetching structure for ${userRoadmap.slug}`);
      
      // Call Admin Service to get the FULL map structure
      masterMap = await this.adminClient.getRoadmapDetails(userRoadmap.slug);
      
      // Store in Redis for 1 hour
      // We store the FULL map here so other endpoints can reuse it, 
      // but we will filter it before returning to the user below.
      await this.cacheManager.set(cacheKey, masterMap, 3600000); 
    }

    // 3. Get User's Progress Overlays (The "Status" of specific nodes)
    // This is a fast SQL query on the User DB
    const overlays = await this.prisma.userRoadmapNode.findMany({
      where: { userRoadmapId: userRoadmap.id },
    });

    // 4. 🔀 MERGE & MINIMIZE
    // We map over the Master Nodes to inject status AND strip out heavy content
    const mergedNodes = (masterMap.nodes || []).map((masterNode: any) => {
      // Find if user has touched this node
      // Note: Ensure your Admin Service returns 'nodeKey' or 'key' consistently
      const overlay = overlays.find(o => o.nodeKey === masterNode.nodeKey); 
      
      return {
        // 🟢 LIGHTWEIGHT FIELDS ONLY
        nodeKey: masterNode.nodeKey,
        title: masterNode.title,
        summary: masterNode.summary,
        coords: masterNode.coords,       // Needed for React Flow position
        isRequired: masterNode.isRequired,
        
        // 🟢 INJECT USER STATUS
        status: overlay ? overlay.status : RoadmapNodeStatus.AVAILABLE, 
        
        // ❌ EXCLUDED HEAVY FIELDS
        // contentMd: masterNode.contentMd  <-- intentionally removed
        // metadata: masterNode.metadata    <-- intentionally removed
      };
    });

    // 5. Return the Optimized Hybrid Object
    return {
      id: userRoadmap.id,             // Enrollment ID
      title: masterMap.title,         // Title from Master
      progress: userRoadmap.progressPercent,
      nodes: mergedNodes,             // The lightweight list
      edges: masterMap.edges          // Edges are usually small, so we keep them
    };
  }


  /**
   * 🟢 GET 
   * GET /roadmaps/:id/nodes/:nodeKey
   */
  async getRoadmapNodeDetail(userId: number, userRoadmapId: number, nodeKey: string) {
    // 1. Verify Enrollment (Security)
    // We do NOT need to fetch UserRoadmapNode here because we aren't changing it.
    const userRoadmap = await this.prisma.userRoadmap.findUnique({
      where: { id: userRoadmapId },
    });
    if (!userRoadmap || userRoadmap.userId !== userId) throw new ForbiddenException();

    // 2. Fetch Master Data (Cache First Strategy)
    const cacheKey = `roadmap:nodes:${userRoadmap.slug}`;
    let masterMap = await this.cacheManager.get<any>(cacheKey);

    // Cache Miss Logic
    if (!masterMap) {
      masterMap = await this.adminClient.getRoadmapDetails(userRoadmap.slug);
      await this.cacheManager.set(cacheKey, masterMap, 3600000); // 1 hour
    }

    // 3. Extract Specific Node Content
    const targetNode = masterMap.nodes.find((n: any) => n.nodeKey === nodeKey);
    if (!targetNode) throw new NotFoundException('Node not found');

    // 4. Return Content
    return {
      nodeKey: targetNode.nodeKey,
      title: targetNode.title,
      summary: targetNode.summary,
      contentMd: targetNode.contentMd, // 🟢 The Heavy Data
      // Note: We don't return 'status' here because the frontend already has it 
      // from the main map view.
    };
  }

  async updateNodeStatus(userId: number, userRoadmapId: number, nodeKey: string, status: RoadmapNodeStatus) {
    // 1. Validate Access & Get Enrollment Info
    const userRoadmap = await this.prisma.userRoadmap.findUnique({
      where: { id: userRoadmapId },
    });

    if (!userRoadmap) throw new NotFoundException('Enrollment not found');
    if (userRoadmap.userId !== userId) throw new ForbiddenException('Access denied');

    // 2. Update the Single Node Status (The Trigger)
    await this.prisma.userRoadmapNode.upsert({
      where: { 
        userRoadmapId_nodeKey: { userRoadmapId: userRoadmap.id, nodeKey } 
      },
      update: { 
        status, 
        updatedAt: new Date() 
      },
      create: { 
        userRoadmapId: userRoadmap.id, 
        nodeKey, 
        status, 
        startedAt: new Date() 
      }
    });

    // =========================================================
    // 🟢 3. PROGRESS CALCULATION LOGIC
    // =========================================================
    
    // A. Count how many nodes are currently 'COMPLETED' in DB
    const completedCount = await this.prisma.userRoadmapNode.count({
      where: {
        userRoadmapId: userRoadmap.id,
        status: 'COMPLETED'
      }
    });

    // B. Get Total Nodes 
    // (Assuming totalNodes is stored on UserRoadmap during enrollment. 
    // If not, you might need to fetch masterMap.nodes.length from cache)
    const totalNodes = userRoadmap.totalNodes || 1; // Prevent division by zero

    // C. Calculate New Percentage
    // Math.min ensures we never go above 100% even if data is weird
    const newProgress = Math.min(100, Math.round((completedCount / totalNodes) * 100));

    // D. SAVE TO DATABASE
    const updatedRoadmap = await this.prisma.userRoadmap.update({
      where: { id: userRoadmap.id },
      data: {
        completedNodes: completedCount,
        progressPercent: newProgress, // 👈 SAVING HERE
        updatedAt: new Date()
      }
    });

    // Return the updated status and the new progress to the controller
    return { 
      nodeKey, 
      status, 
      newRoadmapProgress: updatedRoadmap.progressPercent 
    };
  }
}