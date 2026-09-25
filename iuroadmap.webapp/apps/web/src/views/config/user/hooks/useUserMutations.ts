import { useQueryClient } from '@tanstack/react-query';
import {
  useUsersControllerCreate,
  useUsersControllerDelete,
  useUsersControllerUpdate,
} from '@iuroadmap/api-gen';

export function useUserMutations() {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries();
  };

  const mutationOptions = { mutation: { onSuccess } };

  return {
    create: useUsersControllerCreate(mutationOptions),
    update: useUsersControllerUpdate(mutationOptions),
    remove: useUsersControllerDelete(mutationOptions),
  };
}
