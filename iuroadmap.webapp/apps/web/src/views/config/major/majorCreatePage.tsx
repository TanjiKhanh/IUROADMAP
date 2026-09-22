import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import { UiCard, UiPageHeader, UiButton } from '../../../uikit';

export function MajorCreatePage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 600 }}>
      <UiPageHeader title="Create Major Roadmap" />
      
      <UiCard>
        <p style={{ marginBottom: 16, color: '#475569' }}>
          Creating a new major is currently managed via internal synchronization or department tools. 
          Please contact system administrators to sync a new major to the roadmap system.
        </p>
        
        <UiButton type="primary" onClick={() => navigate(RoutePaths.web.config.major.root)}>
          Back to List
        </UiButton>
      </UiCard>
    </div>
  );
}