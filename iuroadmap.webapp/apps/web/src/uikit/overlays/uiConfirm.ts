import { Modal } from 'antd';

export const uiConfirm = (title: string, content: string, onOk: () => void, onCancel?: () => void) => {
  Modal.confirm({
    title,
    content,
    onOk,
    onCancel,
    okText: 'Confirm',
    cancelText: 'Cancel',
  });
};
