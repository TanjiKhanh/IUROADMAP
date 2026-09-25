import { Modal } from 'antd';

export interface UseConfirmAndDeleteProps {
  mutateAsync: (args: any) => Promise<any>;
  onError?: (message: string) => void;
}

export function useConfirmAndDelete({ mutateAsync, onError }: UseConfirmAndDeleteProps) {
  return (args: any) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this record?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await mutateAsync(args);
        } catch (error: any) {
          onError?.(error?.response?.data?.message ?? error?.message ?? 'Failed to delete');
        }
      },
    });
  };
}
