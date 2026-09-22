import React from 'react';
import { UiSpace } from '../layout/uiSpace';
import { UiButton } from '../primitives/uiButton';

export interface UiFormActionsProps {
  loading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

export const UiFormActions: React.FC<UiFormActionsProps> = ({
  loading,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  onCancel,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
      <UiSpace>
        {onCancel ? (
          <UiButton onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </UiButton>
        ) : null}
        <UiButton type="primary" htmlType="submit" loading={loading}>
          {submitLabel}
        </UiButton>
      </UiSpace>
    </div>
  );
};
