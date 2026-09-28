import type { ReactNode } from 'react';
import { UiButton, UiDeleteIcon, UiEditIcon, UiSpace, UiTooltip } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';

export interface RowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  /** When false the delete button is disabled and `deleteBlockedReason` is shown as tooltip */
  canDelete?: boolean;
  deleteBlockedReason?: string;
  /** Extra buttons before edit/delete */
  extra?: ReactNode;
}

export function RowActions({ onEdit, onDelete, canDelete = true, deleteBlockedReason, extra }: RowActionsProps) {
  const { t } = useTranslation();
  return (
    <UiSpace size={4}>
      {extra}
      {onEdit ? (
        <UiTooltip title={t('config.common.edit')}>
          <UiButton size="small" type="text" icon={<UiEditIcon />} onClick={onEdit} aria-label={t('config.common.edit')} />
        </UiTooltip>
      ) : null}
      {onDelete ? (
        <UiTooltip title={canDelete ? t('config.common.delete') : deleteBlockedReason}>
          <UiButton
            size="small"
            type="text"
            danger
            disabled={!canDelete}
            icon={<UiDeleteIcon />}
            onClick={onDelete}
            aria-label={t('config.common.delete')}
          />
        </UiTooltip>
      ) : null}
    </UiSpace>
  );
}
