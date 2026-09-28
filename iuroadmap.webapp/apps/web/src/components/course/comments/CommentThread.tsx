import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useCourseCommentsControllerCreate,
  useCourseCommentsControllerDelete,
  useCourseCommentsControllerThread,
  useCourseCommentsControllerUpdate,
  type CourseCommentCreateRequest,
  type CourseCommentResponse,
} from '@iuroadmap/api-gen';
import { UiAlert, UiButton, UiEmpty, UiSelect, UiSkeleton, UiSpace, UiTag, UiText, uiConfirm, useToast } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../api/apiResult';
import { CommentForm } from './CommentForm';
import { ReportDialog } from './ReportDialog';

const PAGE_SIZE = 10;

export interface CommentThreadProps {
  courseId: number;
  /** Years with an offering, to filter and to tag a new comment */
  academicYears?: number[];
}

/**
 * Course comments (FL-LRN-10): newest first, one level of replies, the author edits / deletes their
 * own, others can report. Hidden or flagged comments stay visible to their author with the reason.
 */
export function CommentThread({ courseId, academicYears }: CommentThreadProps) {
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [yearFilter, setYearFilter] = useState<number>();
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [reporting, setReporting] = useState<number | null>(null);
  const [error, setError] = useState<string>();

  const { data: raw, isLoading } = useCourseCommentsControllerThread(courseId, { currentPage: page, rowsPerPage: PAGE_SIZE, academicYear: yearFilter });
  const data = unwrapData<{ datas: CourseCommentResponse[]; totalRows: number }>(raw);
  const roots = data?.datas ?? [];
  const totalPages = Math.ceil((data?.totalRows ?? 0) / PAGE_SIZE);

  const refresh = () => queryClient.invalidateQueries();
  const { mutateAsync: create, isPending: creating } = useCourseCommentsControllerCreate();
  const { mutateAsync: update, isPending: updating } = useCourseCommentsControllerUpdate();
  const { mutateAsync: remove } = useCourseCommentsControllerDelete();

  const run = async (action: () => Promise<unknown>, success?: string) => {
    setError(undefined);
    try {
      await action();
      if (success) toast.success(success);
      refresh();
      return true;
    } catch (err: unknown) {
      setError(apiErrorMessage(err, t, t('config.common.saveFailed')));
      return false;
    }
  };

  const post = (values: CourseCommentCreateRequest) =>
    run(() => create({ data: values }), t('learner.comments.posted')).then((ok) => {
      if (ok) setReplyTo(null);
    });

  const renderComment = (c: CourseCommentResponse, isReply: boolean) => {
    const author = c.authorDisplayName ?? t('learner.comments.deletedUser');
    const deleted = c.status === 'DELETED';
    return (
      <div
        key={c.id}
        data-testid={`comment-${c.id}`}
        style={{ padding: '10px 0', borderBottom: isReply ? 'none' : '1px solid #f1f5f9', marginLeft: isReply ? 28 : 0 }}
      >
        <UiSpace size={6} wrap>
          <UiText strong>{author}</UiText>
          {c.authorCohortYear ? <UiTag>K{c.authorCohortYear}</UiTag> : null}
          {c.academicYear ? <UiTag color="blue">{t('learner.comments.tookInYear', { year: `${c.academicYear}-${c.academicYear + 1}` })}</UiTag> : null}
          <UiText type="secondary" style={{ fontSize: 12 }}>
            {new Date(c.createdAt).toLocaleString()}
            {c.isEdited ? ` · ${t('learner.comments.edited')}` : ''}
          </UiText>
          {c.isMine && c.status === 'FLAGGED' ? <UiTag color="orange">{t('learner.comments.flagged')}</UiTag> : null}
          {c.isMine && c.status === 'HIDDEN' ? <UiTag color="red">{t('learner.comments.hidden')}</UiTag> : null}
        </UiSpace>

        {editing === c.id ? (
          <div style={{ marginTop: 6 }}>
            <CommentForm
              courseId={courseId}
              initialContent={c.content}
              submitLabel={t('config.common.save')}
              loading={updating}
              onCancel={() => setEditing(null)}
              onSubmit={(values) =>
                run(() => update({ data: { id: c.id, content: values.content } })).then((ok) => {
                  if (ok) setEditing(null);
                })
              }
            />
          </div>
        ) : (
          <div style={{ whiteSpace: 'pre-wrap', marginTop: 4, color: deleted ? '#94a3b8' : undefined, fontStyle: deleted ? 'italic' : undefined }}>
            {deleted ? t('learner.comments.deletedContent') : c.content}
          </div>
        )}
        {c.isMine && c.status === 'HIDDEN' && c.moderationReason ? (
          <UiText type="danger" style={{ fontSize: 12 }}>
            {t('learner.comments.hiddenReason', { reason: c.moderationReason })}
          </UiText>
        ) : null}

        {!deleted && editing !== c.id ? (
          <UiSpace size={2} style={{ marginTop: 4 }}>
            {!isReply ? (
              <UiButton size="small" type="link" onClick={() => setReplyTo(replyTo === c.id ? null : c.id)}>
                {t('learner.comments.reply')}
              </UiButton>
            ) : null}
            {c.isMine && c.status === 'VISIBLE' ? (
              <UiButton size="small" type="link" onClick={() => setEditing(c.id)}>
                {t('config.common.edit')}
              </UiButton>
            ) : null}
            {c.isMine ? (
              <UiButton
                size="small"
                type="link"
                danger
                onClick={() => uiConfirm(t('learner.comments.deleteTitle'), t('learner.comments.deleteConfirm'), () => run(() => remove({ id: c.id })))}
              >
                {t('config.common.delete')}
              </UiButton>
            ) : (
              <UiButton size="small" type="link" onClick={() => setReporting(c.id)}>
                {t('learner.comments.report')}
              </UiButton>
            )}
          </UiSpace>
        ) : null}

        {replyTo === c.id ? (
          <div style={{ marginLeft: 28, marginTop: 6 }}>
            <CommentForm courseId={courseId} parentId={c.id} submitLabel={t('learner.comments.reply')} loading={creating} onSubmit={post} onCancel={() => setReplyTo(null)} />
          </div>
        ) : null}
        {c.replies?.map((r) => renderComment(r, true))}
      </div>
    );
  };

  return (
    <div data-testid="comment-thread">
      {toastContextHolder}
      <CommentForm courseId={courseId} academicYears={academicYears} submitLabel={t('learner.comments.post')} loading={creating} onSubmit={post} />
      {error ? <UiAlert type="error" showIcon closable message={error} onClose={() => setError(undefined)} style={{ margin: '12px 0' }} /> : null}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0 4px' }}>
        <UiText strong>{t('learner.comments.count', { count: data?.totalRows ?? 0 })}</UiText>
        {academicYears?.length ? (
          <UiSelect
            size="small"
            allowClear
            style={{ width: 180 }}
            placeholder={t('learner.comments.filterYear')}
            value={yearFilter}
            onChange={(y) => {
              setYearFilter(y);
              setPage(1);
            }}
            options={academicYears.map((y) => ({ value: y, label: `${y}-${y + 1}` }))}
          />
        ) : null}
      </div>
      {isLoading ? <UiSkeleton active paragraph={{ rows: 4 }} /> : null}
      {!isLoading && !roots.length ? <UiEmpty image={UiEmpty.PRESENTED_IMAGE_SIMPLE} description={t('learner.comments.empty')} /> : null}
      {roots.map((c) => renderComment(c, false))}
      {totalPages > 1 ? (
        <UiSpace style={{ marginTop: 12 }}>
          <UiButton size="small" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            {t('common.back')}
          </UiButton>
          <UiText>
            {page} / {totalPages}
          </UiText>
          <UiButton size="small" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            {t('common.next')}
          </UiButton>
        </UiSpace>
      ) : null}
      <ReportDialog
        commentId={reporting}
        onClose={() => setReporting(null)}
        onReported={() => {
          setReporting(null);
          toast.success(t('learner.comments.reported'));
          refresh();
        }}
      />
    </div>
  );
}
