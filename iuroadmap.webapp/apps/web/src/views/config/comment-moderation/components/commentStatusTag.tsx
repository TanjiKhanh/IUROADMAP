import type { CommentStatus } from '@iuroadmap/api-gen';
import { UiTag } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';

const COLORS: Record<CommentStatus, string> = { VISIBLE: 'green', FLAGGED: 'orange', HIDDEN: 'red', DELETED: 'default' };

export function CommentStatusTag({ status }: { status: CommentStatus }) {
  const { t } = useTranslation();
  return <UiTag color={COLORS[status]}>{t(`config.moderation.status.${status}`)}</UiTag>;
}
