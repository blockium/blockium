import { MRT_ColumnDef } from 'material-react-table';

import { fDateTime } from '@blockium/utils';

import { ICustomerService } from '../../../types';
import { useCustomerServices } from '../../../data/useCustomerServices';

export const useServiceMaintenanceTable = () => {
  const { data, setSearchValue } = useCustomerServices();

  const onGlobalFilterChange = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const columns: MRT_ColumnDef<ICustomerService>[] = [
    {
      accessorKey: 'customerName',
      header: 'Cliente',
    },
    {
      accessorKey: 'serviceName',
      header: 'Serviço',
    },
    {
      accessorKey: 'serviceDate',
      header: 'Realizado em',
      Cell: ({ cell }) => <span>{fDateTime(cell.getValue<string>())}</span>,
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
