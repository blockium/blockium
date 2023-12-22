/* eslint-disable react/jsx-pascal-case */
import { ReactNode } from 'react';

import {
  MRT_ColumnDef,
  MRT_RowData,
  MRT_TableInstance,
} from 'material-react-table';

import { Table } from './Table';
import { DefaultToolbarActions } from './DefaultToolbarActions';

type DefaultTableProps<T extends MRT_RowData> = {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  title?: () => ReactNode;
  globalActions?: ReactNode[];
  onGlobalFilterChange?: (searchValue: string) => void;
  onAddClick?: () => void;
  onEditClick?: (row: T, rowIndex: number) => void;
  onDeleteClick?: (row: T, rowIndex: number) => void;
  initialState?: object;
  height?: number | string;
  [other: string]: unknown;
};

export const DefaultTable = <T extends MRT_RowData>(
  props: DefaultTableProps<T>,
) => {
  const {
    data,
    columns,
    title,
    globalActions,
    onGlobalFilterChange,
    onAddClick,
    onEditClick,
    onDeleteClick,
    initialState,
    height,
    ...other
  } = props;

  const renderToolbarInternalActions = ({
    table,
  }: {
    table: MRT_TableInstance<MRT_RowData>;
  }) => {
    return (
      <DefaultToolbarActions
        table={table}
        onAddClick={onAddClick}
        globalActions={globalActions}
      />
    );
  };

  return (
    <Table
      data={data}
      columns={columns}
      height={height}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      {...other}
      // enableColumnPinning
      // enableRowPinning
      initialState={{
        // pagination: { pageSize: 5 },
        // density: 'compact', // 'comfortable' | 'compact' | 'spacious'
        ...initialState,
      }}
      renderTopToolbarCustomActions={title}
      renderToolbarInternalActions={renderToolbarInternalActions}
      // manualFiltering // To be used on server searching
      onGlobalFilterChange={onGlobalFilterChange}
      // filterFns={{
      //   myCustomFilterFn: (row: MRT_Row, id: string, filterValue: string) => {
      //     const data = row.original;
      //     const value = row.getValue<string>(id);
      //     return localeContains(value, filterValue);
      //   },
      // }}
      // globalFilterFn="myCustomFilterFn"

      // bottomGap={isMobile ? 120 : 80}
    />
  );
};
