import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import {
  useMajorsControllerGetMajorBySlug,
  useMajorsControllerUpdateMajor,
} from '@iuroadmap/api-gen';
import { UiCard, UiPageHeader, useToast } from '../../../uikit';
import { MajorForm, MajorFormValues } from './components/majorForm';

export function MajorEditPage() {
  const navigate = useNavigate();
  const { id: slug } = useParams<{ id: string }>();
  const { toast, toastContextHolder } = useToast();

  const { data: rawMajor, isLoading: isFetching } = useMajorsControllerGetMajorBySlug(slug ?? '', {
    query: {
      enabled: !!slug,
    },
  });
  
  const { mutateAsync: updateMajor, isPending: isUpdating } = useMajorsControllerUpdateMajor();

  const major = rawMajor?.data as any;

  const handleSubmit = async (values: MajorFormValues) => {
    try {
      await updateMajor({
        slug: slug ?? '',
        data: values,
      });
      toast.success('Major roadmap metadata updated successfully');
      navigate(RoutePaths.web.config.major.root);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update major metadata');
    }
  };

  if (isFetching && !major) {
    return <div>Loading...</div>;
  }

  if (!major) {
    return <div>Major not found</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 600 }}>
      {toastContextHolder}
      <UiPageHeader title={`Edit Major Roadmap: ${major.name}`} />
      
      <UiCard>
        <MajorForm
          initialValues={{
            name: major.name,
            description: major.description || '',
            totalCreditsRequired: major.totalCreditsRequired,
          }}
          onSubmit={handleSubmit}
          isLoading={isUpdating}
          onCancel={() => navigate(RoutePaths.web.config.major.root)}
        />
      </UiCard>
    </div>
  );
}