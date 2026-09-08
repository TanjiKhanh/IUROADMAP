import { Modal, message } from 'antd';

export interface UseConfirmAndDeleteProps {
  mutateAsync: (args: any) => Promise<any>;
}

export function useConfirmAndDelete({ mutateAsync }: UseConfirmAndDeleteProps) {
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
          message.success('Deleted successfully');
        } catch (error: any) {
          message.error(error?.response?.data?.message ?? error?.message ?? 'Failed to delete');
        }
      },
    });
  };
}
