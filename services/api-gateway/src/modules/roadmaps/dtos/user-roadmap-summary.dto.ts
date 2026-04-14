export class UserRoadmapSummaryDto {
  id: number;
  userId: number;
  title: string;
  slug: string;
  progressPercent: number;
  totalNodes: number;
  completedNodes: number;
  startDate: string;
  updatedAt: string;
}