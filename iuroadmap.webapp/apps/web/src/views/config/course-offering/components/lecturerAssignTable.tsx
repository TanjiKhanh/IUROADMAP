import { useEffect, useState } from 'react';
import { LecturerRole, TermInYear, type CourseOfferingLecturerRequest, type CourseOfferingResponse } from '@iuroadmap/api-gen';
import { UiButton, UiColumnsType, UiDeleteIcon, UiPlusIcon, UiSelect, UiSpace, UiTable } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useLecturerOptions } from '../../../../hooks/useMasterDataOptions';

type Row = CourseOfferingLecturerRequest & { rowKey: string };

export interface LecturerAssignTableProps {
  offering: CourseOfferingResponse;
  loading?: boolean;
  /** Sends the whole list (it replaces the current one) */
  onSave: (lecturers: CourseOfferingLecturerRequest[]) => void | Promise<void>;
}

let seq = 0;
const rowKey = () => `row-${++seq}`;

/** Lecturers and TAs of an offering, optionally per term of the year (FR-RDM.08.1, D17). */
export function LecturerAssignTable({ offering, loading, onSave }: LecturerAssignTableProps) {
  const { t } = useTranslation();
  const { options } = useLecturerOptions();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    setRows(offering.lecturers.map((l) => ({ rowKey: rowKey(), lecturerId: l.lecturerId, role: l.role, termInYear: l.termInYear })));
  }, [offering]);

  const set = (key: string, patch: Partial<Row>) => setRows((prev) => prev.map((r) => (r.rowKey === key ? { ...r, ...patch } : r)));
  const duplicate = new Set<string>();
  const seen = new Set<string>();
  for (const r of rows) {
    const id = `${r.lecturerId}-${r.termInYear ?? ''}`;
    if (seen.has(id)) duplicate.add(id);
    seen.add(id);
  }
  const invalid = rows.some((r) => !r.lecturerId) || duplicate.size > 0;

  const columns: UiColumnsType<Row> = [
    {
      key: 'lecturer',
      title: t('config.offering.lecturer'),
      render: (_v, r) => (
        <UiSelect
          style={{ width: 280 }}
          showSearch
          optionFilterProp="label"
          options={options}
          value={r.lecturerId || undefined}
          status={!r.lecturerId || duplicate.has(`${r.lecturerId}-${r.termInYear ?? ''}`) ? 'error' : undefined}
          onChange={(lecturerId) => set(r.rowKey, { lecturerId })}
        />
      ),
    },
    {
      key: 'role',
      title: t('config.offering.role'),
      render: (_v, r) => (
        <UiSelect
          style={{ width: 150 }}
          value={r.role ?? LecturerRole.LECTURER}
          onChange={(role) => set(r.rowKey, { role })}
          options={Object.values(LecturerRole).map((v) => ({ value: v, label: t(`config.offering.roles.${v}`) }))}
        />
      ),
    },
    {
      key: 'term',
      title: t('config.offering.termInYear'),
      render: (_v, r) => (
        <UiSelect
          style={{ width: 170 }}
          allowClear
          placeholder={t('config.offering.wholeYear')}
          value={r.termInYear}
          onChange={(termInYear) => set(r.rowKey, { termInYear })}
          options={Object.values(TermInYear).map((v) => ({ value: v, label: t(`learner.term.termInYearOptions.${v}`) }))}
        />
      ),
    },
    {
      key: 'remove',
      title: '',
      width: 50,
      render: (_v, r) => (
        <UiButton type="text" danger icon={<UiDeleteIcon />} onClick={() => setRows((prev) => prev.filter((x) => x.rowKey !== r.rowKey))} aria-label={t('config.common.delete')} />
      ),
    },
  ];

  return (
    <div>
      <UiTable columns={columns} dataSource={rows} rowKey="rowKey" pagination={false} size="small" />
      <UiSpace style={{ marginTop: 12, width: '100%', justifyContent: 'space-between' }}>
        <UiButton icon={<UiPlusIcon />} onClick={() => setRows((prev) => [...prev, { rowKey: rowKey(), lecturerId: 0, role: LecturerRole.LECTURER }])}>
          {t('config.offering.addLecturer')}
        </UiButton>
        <UiButton
          type="primary"
          loading={loading}
          disabled={invalid}
          onClick={() => onSave(rows.map(({ lecturerId, role, termInYear }) => ({ lecturerId, role, termInYear })))}
        >
          {t('config.common.save')}
        </UiButton>
      </UiSpace>
    </div>
  );
}
