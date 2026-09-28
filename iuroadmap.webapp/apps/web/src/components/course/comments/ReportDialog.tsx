import { useEffect, useState } from 'react';
import { CommentReportReason, CourseCommentsZod, useCourseCommentsControllerReport } from '@iuroadmap/api-gen';
import { EntityConstant } from '@iuroadmap/shared/constants';
import { UiAlert, UiModal, UiRadio, UiRadioGroup, UiSpace, UiTextArea } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage } from '../../../api/apiResult';

export interface ReportDialogProps {
  commentId: number | null;
  onClose: () => void;
  onReported: () => void;
}

/** Report a comment; enough reports hide it until an admin reviews it (FR-LRN.10.8). */
export function ReportDialog({ commentId, onClose, onReported }: ReportDialogProps) {
  const { t } = useTranslation();
  const [reason, setReason] = useState<CommentReportReason>(CommentReportReason.SPAM);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string>();
  const { mutateAsync: report, isPending } = useCourseCommentsControllerReport();

  useEffect(() => {
    if (commentId) {
      setReason(CommentReportReason.SPAM);
      setNote('');
      setError(undefined);
    }
  }, [commentId]);

  return (
    <UiModal
      open={Boolean(commentId)}
      title={t('learner.comments.reportTitle')}
      okText={t('learner.comments.report')}
      cancelText={t('config.common.cancel')}
      okButtonProps={{ loading: isPending, disabled: reason === CommentReportReason.OTHER && !note.trim() }}
      onCancel={onClose}
      onOk={async () => {
        if (!commentId) return;
        const data = { reason, note: note.trim() || undefined };
        const parsed = CourseCommentsZod.CourseCommentsControllerReportBody.safeParse(data);
        if (!parsed.success) return setError(parsed.error.issues[0]?.message);
        try {
          await report({ id: commentId, data });
          onReported();
        } catch (err: unknown) {
          setError(apiErrorMessage(err, t, t('learner.comments.reportFailed')));
        }
      }}
    >
      <UiRadioGroup value={reason} onChange={(e) => setReason(e.target.value)}>
        <UiSpace direction="vertical">
          {Object.values(CommentReportReason).map((r) => (
            <UiRadio key={r} value={r}>
              {t(`learner.comments.reasons.${r}`)}
            </UiRadio>
          ))}
        </UiSpace>
      </UiRadioGroup>
      <UiTextArea
        style={{ marginTop: 12 }}
        rows={3}
        maxLength={EntityConstant.DescriptionShort}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={reason === CommentReportReason.OTHER ? t('learner.comments.noteRequired') : t('learner.comments.noteOptional')}
      />
      {error ? <UiAlert type="error" showIcon message={error} style={{ marginTop: 12 }} /> : null}
    </UiModal>
  );
}
