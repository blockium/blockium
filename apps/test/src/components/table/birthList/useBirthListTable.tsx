import { MRT_ColumnDef } from 'material-react-table';

import { fToNow } from '@blockium/utils';

import { ICustomerService } from '../../../types';
import { useCustomerServices } from '../../../data/useCustomerServices';

export const useBirthListTable = () => {
  const { data, setSearchValue } = useCustomerServices();

  const onGlobalFilterChange = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const columns: MRT_ColumnDef<ICustomerService>[] = [
    {
      accessorKey: 'customerName',
      header: 'Cliente',
      maxSize: 150,
    },
    {
      accessorKey: 'serviceDate',
      header: 'Aniversário',
      maxSize: 150,
      Cell: ({ cell }) => <span>{fToNow(cell.getValue<string>())}</span>,
      muiTableBodyCellProps: { align: 'right' },
      muiTableHeadCellProps: { align: 'right' },
    },
  ];

  return {
    data,
    columns,
    onGlobalFilterChange,
    initialState: {},
  };
};
