import React from 'react';
import { Modal } from 'antd';
import type { ModalProps } from 'antd';

export interface UiModalProps extends ModalProps {}

export const UiModal: React.FC<UiModalProps> = (props) => {
  return <Modal destroyOnHidden {...props} />;
};
