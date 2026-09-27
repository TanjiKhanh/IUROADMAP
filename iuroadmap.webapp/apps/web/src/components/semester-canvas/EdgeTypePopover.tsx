import { useEffect, useState } from 'react';
import { RelationType } from '@iuroadmap/api-gen';
import { UiModal, UiRadio, UiRadioGroup, UiSpace, UiText } from '../../uikit';
import { useTranslation } from '../../hooks/useTranslation';

export interface EdgeTypePopoverProps {
  open: boolean;
  /** "IT069 → IT089" */
  title: string;
  initialType?: RelationType;
  onConfirm: (type: RelationType) => void;
  onCancel: () => void;
}

/** Choose the relation type after connecting A → B (design §4.4). */
export function EdgeTypePopover({ open, title, initialType = RelationType.PREREQUISITE, onConfirm, onCancel }: EdgeTypePopoverProps) {
  const { t } = useTranslation();
  const [type, setType] = useState<RelationType>(initialType);
  useEffect(() => {
    if (open) setType(initialType);
  }, [open, initialType]);

  return (
    <UiModal
      open={open}
      title={t('roadmap.relation.chooseType')}
      okText={t('config.common.save')}
      cancelText={t('config.common.cancel')}
      onOk={() => onConfirm(type)}
      onCancel={onCancel}
      width={440}
    >
      <UiText type="secondary">{title}</UiText>
      <UiRadioGroup value={type} onChange={(e) => setType(e.target.value)} style={{ marginTop: 12, width: '100%' }}>
        <UiSpace direction="vertical">
          {Object.values(RelationType).map((value) => (
            <UiRadio key={value} value={value} data-testid={`relation-${value}`}>
              <strong>{t(`roadmap.relation.${value}`)}</strong>
              <div style={{ fontSize: 12, color: '#64748b' }}>{t(`roadmap.relation.${value}Help`)}</div>
            </UiRadio>
          ))}
        </UiSpace>
      </UiRadioGroup>
    </UiModal>
  );
}
