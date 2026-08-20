import { useQueryClient } from '@tanstack/react-query';
import {
  useRoadmapsControllerUpdateCourseProgress,
  useEnrollmentsControllerEnroll,
  useRoadmapsControllerGetPreviewRoadmapBySlug,
  useRoadmapsControllerGetMacroRoadmap,
  useRoadmapsControllerGetMicroRoadmap,
} from '@iuroadmap/api-gen';

export function useRoadmapMutations() {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries();
  };

  const mutationOptions = { mutation: { onSuccess } };

  return {
    enrollToRoadmap: useEnrollmentsControllerEnroll(mutationOptions),
    updateCourseStatus: useRoadmapsControllerUpdateCourseProgress(mutationOptions),
  };
}

export function useRoadmapQueries() {
  return {
    useGetPreviewRoadmap: (slug: string, options?: any) => 
      useRoadmapsControllerGetPreviewRoadmapBySlug(slug, { query: options }),
      
    useGetUserRoadmapDetail: (id: number, options?: any) => 
      useRoadmapsControllerGetMacroRoadmap(id, { query: options }),
      
    useGetMicroRoadmap: (courseNodeId: number, options?: any) => 
      useRoadmapsControllerGetMicroRoadmap(courseNodeId, { query: options }),
  };
}
