import { ReactElement } from 'react';
import {
  MRT_ColumnDef,
  MRT_RowData,
  MRT_TableInstance,
} from 'material-react-table';
import { Table } from './Table';

type ToolbarProps<T extends MRT_RowData> = {
  table: MRT_TableInstance<T>;
};

type DefaultTableProps<T extends MRT_RowData> = {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  renderTopToolbar?: (props: ToolbarProps<T>) => ReactElement;
  onGlobalFilterChange?: (searchValue: string) => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  initialState?: object;
  height?: number | string;
};

export const DefaultTable = <T extends MRT_RowData>(
  props: DefaultTableProps<T>,
) => {
  const {
    data,
    columns,
    renderTopToolbar,
    onGlobalFilterChange,
    onEditClick,
    onDeleteClick,
    initialState,
    height,
  } = props;

  return (
    <Table
      data={data}
      columns={columns}
      height={height}
      onEditClick={onEditClick}
      onDeleteClick={onDeleteClick}
      // enableColumnPinning
      // enableRowPinning
      initialState={{ pagination: { pageSize: 5 }, ...initialState }}
      renderTopToolbar={renderTopToolbar}
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
