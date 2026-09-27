import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  CommentStatus,
  useAdminCourseCommentsControllerFlaggedCount,
  useAdminCourseCommentsControllerList,
  type AdminCommentResponse,
  type FlaggedCountResponse,
} from '@iuroadmap/api-gen';
import { UiBadge, UiButton, UiCheckbox, UiColumnsType, UiSelect, UiTable, UiTag } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { unwrapData } from '../../../api/apiResult';
import { ConfigListShell } from '../shared/configListShell';
import { KeywordFilter } from '../shared/keywordFilter';
import { useConfigListState } from '../shared/useConfigListState';
import { CommentReviewDrawer } from './components/commentReviewDrawer';
import { CommentStatusTag } from './components/commentStatusTag';

const PAGE_SIZE = 20;

type ModerationFilter = { keyword?: string; status?: string; hasPendingReports?: boolean; userId?: string };

/** Post-moderation queue of course comments, flagged first (FL-RDM-10). */
export function CommentModerationListPage() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [reviewing, setReviewing] = useState<number | null>(null);
  const { filter, page, applyFilter, changePage } = useConfigListState<ModerationFilter>({
    keyword: 'string',
    status: 'string',
    hasPendingReports: 'boolean',
    userId: 'string',
  });

  const { data: rawCount } = useAdminCourseCommentsControllerFlaggedCount();
  const flagged = unwrapData<FlaggedCountResponse>(rawCount)?.flagged ?? 0;
  const { data: raw, isLoading } = useAdminCourseCommentsControllerList({
    currentPage: page,
    rowsPerPage: PAGE_SIZE,
    keyword: filter.keyword,
    status: filter.status as CommentStatus | undefined,
    hasPendingReports: filter.hasPendingReports,
    userId: filter.userId,
  });
  const data = unwrapData<{ datas: AdminCommentResponse[]; totalRows: number }>(raw);

  const columns = useMemo<UiColumnsType<AdminCommentResponse>>(
    () => [
      { key: 'course', title: t('config.moderation.course'), render: (_v, row) => <UiTag>{row.courseCode}</UiTag>, width: 110 },
      {
        key: 'content',
        title: t('config.moderation.content'),
        dataIndex: 'content',
        ellipsis: true,
        render: (text: string, row) => (
          <span>
            {row.parentId ? <UiTag>{t('config.moderation.reply')}</UiTag> : null}
            {text}
          </span>
        ),
      },
      { key: 'author', title: t('config.moderation.author'), render: (_v, row) => row.authorDisplayName ?? t('learner.comments.deletedUser') },
      { key: 'status', title: t('config.moderation.statusLabel'), dataIndex: 'status', render: (s: CommentStatus) => <CommentStatusTag status={s} /> },
      {
        key: 'reports',
        title: t('config.moderation.pendingReports'),
        dataIndex: 'pendingReportCount',
        align: 'right',
        render: (n: number) => (n ? <UiBadge count={n} color="orange" /> : '0'),
      },
      { key: 'createdAt', title: t('config.moderation.createdAt'), dataIndex: 'createdAt', render: (v: string) => new Date(v).toLocaleString() },
      {
        key: 'actions',
        title: '',
        align: 'right',
        render: (_v, row) => (
          <UiButton size="small" onClick={() => setReviewing(row.id)}>
            {t('config.moderation.review')}
          </UiButton>
        ),
      },
    ],
    [t],
  );

  return (
    <>
      <ConfigListShell
        title={
          <span>
            {t('config.moderation.title')} <UiBadge count={flagged} style={{ marginLeft: 8 }} title={t('config.moderation.flaggedCount')} />
          </span>
        }
        filters={
          <>
            <KeywordFilter value={filter.keyword} placeholder={t('config.moderation.search')} onSearch={(keyword) => applyFilter({ ...filter, keyword })} />
            <UiSelect
              style={{ width: 170 }}
              allowClear
              placeholder={t('config.moderation.statusLabel')}
              value={filter.status}
              onChange={(status) => applyFilter({ ...filter, status })}
              options={Object.values(CommentStatus).map((s) => ({ value: s, label: t(`config.moderation.status.${s}`) }))}
            />
            <UiCheckbox checked={Boolean(filter.hasPendingReports)} onChange={(e) => applyFilter({ ...filter, hasPendingReports: e.target.checked || undefined })}>
              {t('config.moderation.onlyReported')}
            </UiCheckbox>
            {filter.userId ? (
              <UiTag closable onClose={() => applyFilter({ ...filter, userId: undefined })}>
                {t('config.moderation.byUser')}
              </UiTag>
            ) : null}
          </>
        }
      >
        <UiTable
          columns={columns}
          dataSource={data?.datas ?? []}
          rowKey="id"
          loading={isLoading}
          scroll={{ x: 'max-content' }}
          onRow={(row) => ({ onDoubleClick: () => setReviewing(row.id) })}
          pagination={{ current: page, pageSize: PAGE_SIZE, total: data?.totalRows ?? 0, onChange: (next) => changePage(next) }}
        />
      </ConfigListShell>
      <CommentReviewDrawer
        commentId={reviewing}
        onClose={() => setReviewing(null)}
        onChanged={() => queryClient.invalidateQueries()}
        onShowUser={(userId) => {
          setReviewing(null);
          applyFilter({ userId });
        }}
      />
    </>
  );
}
