import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
  AdminOfferingTopicsZod,
  useOfferingTopicsControllerCreateEdge,
  useOfferingTopicsControllerCreateTopic,
  useOfferingTopicsControllerDeleteEdge,
  useOfferingTopicsControllerDeleteTopic,
  useOfferingTopicsControllerGetGraph,
  useOfferingTopicsControllerUpdateCoords,
  useOfferingTopicsControllerUpdateTopic,
  type TopicCreateRequest,
  type TopicResponse,
  type TopicsGraphResponse,
} from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import {
  UiButton,
  UiDrawer,
  UiForm,
  UiFormActions,
  UiInputField,
  UiNumberField,
  UiPageHeader,
  UiPlusIcon,
  UiResult,
  UiSkeleton,
  UiSpace,
  UiTag,
  UiText,
  UiTextAreaField,
  uiConfirm,
  useToast,
} from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../api/apiResult';
import { TopicGraph } from '../../../components/topic-graph/TopicGraph';

function TopicForm({
  topic,
  loading,
  onSubmit,
  onDelete,
}: {
  topic: TopicResponse | null;
  loading: boolean;
  onSubmit: (values: TopicCreateRequest) => void;
  onDelete?: () => void;
}) {
  const { t } = useTranslation();
  const { control, handleSubmit, reset } = useForm<TopicCreateRequest>({
    resolver: zodResolver(AdminOfferingTopicsZod.OfferingTopicsControllerCreateTopicBody) as never,
  });
  useEffect(() => {
    reset({
      slug: topic?.slug ?? '',
      title: topic?.title ?? '',
      description: topic?.description ?? '',
      learningObjectives: topic?.learningObjectives ?? '',
      resourcesUrl: topic?.resourcesUrl ?? '',
      estimatedHours: topic?.estimatedHours,
    });
  }, [topic, reset]);

  return (
    <UiForm
      layout="vertical"
      onFinish={handleSubmit((values) =>
        onSubmit({ ...values, description: values.description || undefined, learningObjectives: values.learningObjectives || undefined, resourcesUrl: values.resourcesUrl || undefined }),
      )}
    >
      <UiInputField name="title" control={control} label={t('config.topic.title')} required />
      <UiInputField name="slug" control={control} label={t('config.topic.slug')} required />
      <UiTextAreaField name="description" control={control} label={t('config.topic.description')} rows={3} />
      <UiTextAreaField name="learningObjectives" control={control} label={t('config.topic.objectives')} rows={3} />
      <UiInputField name="resourcesUrl" control={control} label={t('config.topic.resourcesUrl')} placeholder="https://" />
      <UiNumberField name="estimatedHours" control={control} label={t('config.topic.estimatedHours')} min={0.1} step={0.5} />
      <UiSpace style={{ width: '100%', justifyContent: 'space-between' }}>
        {onDelete ? (
          <UiButton danger onClick={onDelete}>
            {t('config.common.delete')}
          </UiButton>
        ) : (
          <span />
        )}
        <UiFormActions loading={loading} submitLabel={t('config.common.save')} />
      </UiSpace>
    </UiForm>
  );
}

/** Topic graph of a course offering (micro roadmap by academic year, FL-RDM-08). */
export function CourseTopicDesignPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const { id = '' } = useParams<{ id: string }>();
  const offeringId = Number(id);
  const [editing, setEditing] = useState<TopicResponse | 'new' | null>(null);

  const { data: raw, isLoading, isError } = useOfferingTopicsControllerGetGraph(offeringId, { query: { enabled: offeringId > 0 } });
  const graph = unwrapData<TopicsGraphResponse>(raw);
  const create = useOfferingTopicsControllerCreateTopic();
  const update = useOfferingTopicsControllerUpdateTopic();
  const move = useOfferingTopicsControllerUpdateCoords();
  const remove = useOfferingTopicsControllerDeleteTopic();
  const connect = useOfferingTopicsControllerCreateEdge();
  const disconnect = useOfferingTopicsControllerDeleteEdge();

  const run = async (action: () => Promise<unknown>, success?: string) => {
    try {
      await action();
      if (success) toast.success(success);
      queryClient.invalidateQueries();
      return true;
    } catch (err: unknown) {
      toast.error(apiErrorMessage(err, t, t('config.common.saveFailed')));
      return false;
    }
  };

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 10 }} />;
  if (isError || !graph) return <UiResult status="error" title={t('config.common.failedToLoad')} />;

  const current = editing && editing !== 'new' ? editing : null;
  return (
    <div>
      {toastContextHolder}
      <UiPageHeader
        title={
          <UiSpace wrap>
            {graph.courseCode} — {graph.courseName}
            <UiTag color="blue">
              {graph.academicYear}-{graph.academicYear + 1}
            </UiTag>
            <UiTag color={graph.status === 'PUBLISHED' ? 'green' : 'orange'}>{t(`config.offering.status.${graph.status}`)}</UiTag>
          </UiSpace>
        }
        action={
          <UiSpace>
            <UiButton onClick={() => navigate(RoutePaths.web.config.courseOffering.edit.replace(':id', String(offeringId)))}>{t('config.common.back')}</UiButton>
            <UiButton type="primary" icon={<UiPlusIcon />} onClick={() => setEditing('new')}>
              {t('config.topic.add')}
            </UiButton>
          </UiSpace>
        }
      />
      <UiText type="secondary" style={{ display: 'block', marginBottom: 8 }}>
        {t('config.topic.hint')}
      </UiText>
      <TopicGraph
        editable
        topics={graph.topics}
        edges={graph.edges}
        height="calc(100vh - 230px)"
        selectedTopicId={current?.id}
        onTopicClick={(topic) => setEditing(topic)}
        onMoveTopic={(topicId, x, y) => run(() => move.mutateAsync({ id: offeringId, topicId, data: { x, y } }))}
        onConnect={(sourceTopicId, targetTopicId) => run(() => connect.mutateAsync({ id: offeringId, data: { sourceTopicId, targetTopicId } }))}
        onEdgeClick={(edgeId) =>
          uiConfirm(t('config.topic.deleteEdge'), t('config.topic.deleteEdgeConfirm'), () => run(() => disconnect.mutateAsync({ id: offeringId, edgeId })))
        }
      />
      <UiDrawer open={Boolean(editing)} width={440} title={current ? t('config.topic.edit') : t('config.topic.add')} onClose={() => setEditing(null)} destroyOnHidden>
        <TopicForm
          topic={current}
          loading={create.isPending || update.isPending}
          onSubmit={async (values) => {
            const ok = current
              ? await run(() => update.mutateAsync({ id: offeringId, topicId: current.id, data: values }), t('config.common.success'))
              : await run(() => create.mutateAsync({ id: offeringId, data: values }), t('config.common.success'));
            if (ok) setEditing(null);
          }}
          onDelete={
            current
              ? () =>
                  uiConfirm(t('config.common.confirmDeleteTitle'), t('config.topic.deleteConfirm'), async () => {
                    if (await run(() => remove.mutateAsync({ id: offeringId, topicId: current.id }))) setEditing(null);
                  })
              : undefined
          }
        />
      </UiDrawer>
    </div>
  );
}
