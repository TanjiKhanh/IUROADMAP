import type { RoadmapVersionStatus } from '@iuroadmap/api-gen';
import { UiTag } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';

const COLORS: Record<RoadmapVersionStatus, string> = {
  DRAFT: 'orange',
  PUBLISHED: 'green',
  ARCHIVED: 'default',
};

/** DRAFT / PUBLISHED / ARCHIVED of a curriculum year. `bare` renders text only (inside another tag). */
export function VersionStatusTag({ status, bare }: { status: RoadmapVersionStatus; bare?: boolean }) {
  const { t } = useTranslation();
  const label = t(`roadmap.versionStatus.${status}`);
  if (bare) return <span style={{ opacity: 0.7 }}>({label})</span>;
  return <UiTag color={COLORS[status]}>{label}</UiTag>;
}
