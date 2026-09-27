import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseCommentsZod, type CourseCommentCreateRequest } from '@iuroadmap/api-gen';
import { EntityConstant } from '@iuroadmap/shared/constants';
import { UiButton, UiFormItem, UiSelect, UiSpace, UiTextArea } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';

export interface CommentFormProps {
  courseId: number;
  parentId?: number;
  /** Edit mode: initial text, no academic year */
  initialContent?: string;
  /** Academic years the course was offered (the author picks when they took it) */
  academicYears?: number[];
  submitLabel: string;
  loading?: boolean;
  onSubmit: (values: CourseCommentCreateRequest) => void | Promise<void>;
  onCancel?: () => void;
}

/** Plain-text comment (no HTML, FR-LRN.10.2). */
export function CommentForm({ courseId, parentId, initialContent, academicYears, submitLabel, loading, onSubmit, onCancel }: CommentFormProps) {
  const { t } = useTranslation();
  const { control, handleSubmit, reset, watch } = useForm<CourseCommentCreateRequest>({
    defaultValues: { courseId, parentId, content: initialContent ?? '' },
    resolver: zodResolver(CourseCommentsZod.CourseCommentsControllerCreateBody) as never,
  });
  const content = watch('content') ?? '';

  useEffect(() => reset({ courseId, parentId, content: initialContent ?? '' }), [courseId, parentId, initialContent, reset]);

  const submit = handleSubmit(async (values) => {
    await onSubmit({ ...values, content: values.content.trim() });
    if (!initialContent) reset({ courseId, parentId, content: '' });
  });

  return (
    <form onSubmit={submit}>
      <Controller
        control={control}
        name="content"
        render={({ field, fieldState }) => (
          <UiFormItem validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message} style={{ marginBottom: 8 }}>
            <UiTextArea
              {...field}
              rows={parentId ? 2 : 3}
              maxLength={EntityConstant.CourseCommentContent}
              showCount
              placeholder={parentId ? t('learner.comments.replyPlaceholder') : t('learner.comments.placeholder')}
            />
          </UiFormItem>
        )}
      />
      <UiSpace wrap>
        {academicYears?.length && !initialContent && !parentId ? (
          <Controller
            control={control}
            name="academicYear"
            render={({ field }) => (
              <UiSelect
                size="small"
                allowClear
                style={{ width: 200 }}
                placeholder={t('learner.comments.tookIn')}
                value={field.value}
                onChange={field.onChange}
                options={academicYears.map((y) => ({ value: y, label: `${y}-${y + 1}` }))}
              />
            )}
          />
        ) : null}
        {onCancel ? (
          <UiButton size="small" onClick={onCancel}>
            {t('config.common.cancel')}
          </UiButton>
        ) : null}
        <UiButton size="small" type="primary" htmlType="submit" loading={loading} disabled={!content.trim()} data-testid="comment-submit">
          {submitLabel}
        </UiButton>
      </UiSpace>
    </form>
  );
}
