import { useEffect, useState } from 'react';
import {
  AdminCourseCommentsZod,
  useAdminCourseCommentsControllerDismiss,
  useAdminCourseCommentsControllerGetById,
  useAdminCourseCommentsControllerHide,
  useAdminCourseCommentsControllerRestore,
  type AdminCommentResponse,
} from '@iuroadmap/api-gen';
import { EntityConstant } from '@iuroadmap/shared/constants';
import { UiAlert, UiButton, UiDivider, UiDrawer, UiSkeleton, UiSpace, UiTag, UiText, UiTextArea } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../../api/apiResult';
import { CommentStatusTag } from './commentStatusTag';

export interface CommentReviewDrawerProps {
  commentId: number | null;
  onClose: () => void;
  onChanged: () => void;
  onShowUser: (userId: string) => void;
}

/** Review one comment and its reports: hide (reason required), keep, or restore (FL-RDM-10). */
export function CommentReviewDrawer({ commentId, onClose, onChanged, onShowUser }: CommentReviewDrawerProps) {
  const { t } = useTranslation();
  const { data: raw, isLoading, refetch } = useAdminCourseCommentsControllerGetById(commentId ?? 0, { query: { enabled: Boolean(commentId), gcTime: 0 } });
  const comment = unwrapData<AdminCommentResponse>(raw);
  const { mutateAsync: hide, isPending: hiding } = useAdminCourseCommentsControllerHide();
  const { mutateAsync: dismiss, isPending: dismissing } = useAdminCourseCommentsControllerDismiss();
  const { mutateAsync: restore, isPending: restoring } = useAdminCourseCommentsControllerRestore();
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string>();

  useEffect(() => {
    setReason('');
    setError(undefined);
  }, [commentId]);

  const run = async (action: () => Promise<unknown>) => {
    setError(undefined);
    try {
      await action();
      await refetch();
      onChanged();
    } catch (err: unknown) {
      setError(apiErrorMessage(err, t, t('config.common.saveFailed')));
    }
  };

  return (
    <UiDrawer open={Boolean(commentId)} width={560} title={t('config.moderation.review')} onClose={onClose} destroyOnHidden>
      {isLoading || !comment ? (
        <UiSkeleton active paragraph={{ rows: 6 }} />
      ) : (
        <div data-testid="comment-review">
          <UiSpace wrap>
            <UiTag>{comment.courseCode}</UiTag>
            <UiText type="secondary">{comment.courseName}</UiText>
            <CommentStatusTag status={comment.status} />
          </UiSpace>
          <div style={{ marginTop: 12 }}>
            <UiText strong>{comment.authorDisplayName ?? t('learner.comments.deletedUser')}</UiText>{' '}
            <UiButton size="small" type="link" onClick={() => onShowUser(comment.userId)}>
              {t('config.moderation.userComments')}
            </UiButton>
            <UiText type="secondary" style={{ display: 'block', fontSize: 12 }}>
              {new Date(comment.createdAt).toLocaleString()}
            </UiText>
          </div>
          {comment.parentContent ? (
            <div style={{ marginTop: 8, padding: 8, background: '#f8fafc', borderRadius: 6, fontSize: 12, color: '#475569' }}>
              {t('config.moderation.replyTo')}: {comment.parentContent}
            </div>
          ) : null}
          <div style={{ marginTop: 12, whiteSpace: 'pre-wrap' }}>{comment.content}</div>
          {comment.moderationReason ? (
            <UiAlert type="warning" showIcon style={{ marginTop: 12 }} message={t('config.moderation.hiddenBecause', { reason: comment.moderationReason })} />
          ) : null}

          <UiDivider plain titlePlacement="start">
            {t('config.moderation.reports', { count: comment.reports.length })}
          </UiDivider>
          {comment.reports.map((r) => (
            <div key={r.id} style={{ padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
              <UiTag color={r.status === 'PENDING' ? 'orange' : 'default'}>{t(`config.moderation.reportStatus.${r.status}`)}</UiTag>
              <strong>{t(`learner.comments.reasons.${r.reason}`)}</strong>
              {r.note ? ` — ${r.note}` : ''}
              <UiText type="secondary" style={{ display: 'block', fontSize: 11 }}>
                {new Date(r.createdAt).toLocaleString()}
              </UiText>
            </div>
          ))}

          <UiDivider />
          {error ? <UiAlert type="error" showIcon message={error} style={{ marginBottom: 12 }} /> : null}
          {comment.status === 'HIDDEN' ? (
            <UiButton type="primary" loading={restoring} onClick={() => run(() => restore({ id: comment.id }))}>
              {t('config.moderation.restore')}
            </UiButton>
          ) : comment.status === 'DELETED' ? (
            <UiText type="secondary">{t('config.moderation.deletedByAuthor')}</UiText>
          ) : (
            <UiSpace direction="vertical" style={{ width: '100%' }}>
              <UiTextArea
                rows={3}
                maxLength={EntityConstant.DescriptionShort}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={t('config.moderation.reasonPlaceholder')}
                data-testid="moderation-reason"
              />
              <UiSpace>
                <UiButton
                  danger
                  type="primary"
                  loading={hiding}
                  disabled={!reason.trim()}
                  onClick={() => {
                    const data = { reason: reason.trim() };
                    const parsed = AdminCourseCommentsZod.AdminCourseCommentsControllerHideBody.safeParse(data);
                    if (!parsed.success) return setError(parsed.error.issues[0]?.message);
                    void run(() => hide({ id: comment.id, data }));
                  }}
                >
                  {t('config.moderation.hide')}
                </UiButton>
                <UiButton loading={dismissing} onClick={() => run(() => dismiss({ id: comment.id }))}>
                  {t('config.moderation.keep')}
                </UiButton>
              </UiSpace>
            </UiSpace>
          )}
        </div>
      )}
    </UiDrawer>
  );
}
