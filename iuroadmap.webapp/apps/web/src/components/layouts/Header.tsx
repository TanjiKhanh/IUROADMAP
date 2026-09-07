import React from 'react';
import { useSelector } from 'react-redux';
import { selectTokenProfile } from '@iuroadmap/store';
import type { RootState } from '@iuroadmap/store';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const user = useSelector((state: RootState) => selectTokenProfile(state));

  return (
    <header className="dashboard-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
}