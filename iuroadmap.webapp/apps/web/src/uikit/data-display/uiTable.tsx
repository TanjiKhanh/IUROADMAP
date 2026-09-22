import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export type UiColumnsType<T = any> = ColumnsType<T>;

export interface UiTableProps<RecordType = any> extends TableProps<RecordType> {}

export const UiTable = <RecordType extends object = any>(props: UiTableProps<RecordType>) => {
  return <Table<RecordType> {...props} />;
};
