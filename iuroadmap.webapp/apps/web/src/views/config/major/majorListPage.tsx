import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import {
  useMajorsControllerListMajors,
  type MajorResponseDto,
} from '@iuroadmap/api-gen';
import {
  UiTable,
  UiButton,
  UiTooltip,
  UiSpace,
  UiColumnsType,
  UiEditIcon,
  UiPageHeader,
} from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { Map } from 'lucide-react';

export function MajorListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: response, isLoading } = useMajorsControllerListMajors();
  const majors = (response?.data as any) || [];

  const columns = useMemo<UiColumnsType<MajorResponseDto>>(
    () => [
      {
        key: 'name',
        title: 'Major Name',
        dataIndex: 'name',
        render: (value, row) => (
          <span style={{ fontWeight: 500 }}>{(value as string) ?? ''}</span>
        ),
      },
      {
        key: 'slug',
        title: 'Slug',
        dataIndex: 'slug',
      },
      {
        key: 'totalCreditsRequired',
        title: 'Credits Required',
        dataIndex: 'totalCreditsRequired',
      },
      {
        key: 'totalCourses',
        title: 'Total Courses',
        dataIndex: 'totalCourses',
      },
      {
        key: 'actions',
        title: t('config.common.actions'),
        align: 'right',
        width: 180,
        render: (_v, row) => (
          <UiSpace>
            <UiTooltip title="Edit Meta">
              <UiButton
                size="small"
                type="text"
                icon={<UiEditIcon />}
                onClick={() =>
                  navigate(RoutePaths.web.config.major.edit.replace(':id', row.slug ?? ''))
                }
              />
            </UiTooltip>
            <UiTooltip title="Design Flow">
              <UiButton
                size="small"
                type="primary"
                icon={<Map size={14} style={{ marginRight: 4 }} />}
                onClick={() =>
                  navigate(RoutePaths.web.config.roadmap.designSlug.replace(':slug', row.slug ?? ''))
                }
              >
                Design Flow
              </UiButton>
            </UiTooltip>
          </UiSpace>
        ),
      },
    ],
    [navigate, t]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <UiPageHeader title="Roadmap Configuration (Majors)" />

      <UiTable
        columns={columns}
        dataSource={majors}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
}