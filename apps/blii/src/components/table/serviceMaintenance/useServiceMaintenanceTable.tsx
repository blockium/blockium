import { useTranslation } from 'react-i18next';
import { MRT_ColumnDef } from 'material-react-table';

import { fDateTime } from '@blockium/utils';

import { ICustomerService } from '../../../types';
import { useCustomerServices } from '../../../data/useCustomerServices';

export const useServiceMaintenanceTable = () => {
  const { t } = useTranslation();
  const { data, setSearchValue } = useCustomerServices();

  const onGlobalFilterChange = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const columns: MRT_ColumnDef<ICustomerService>[] = [
    {
      accessorKey: 'customerName',
      header: t('table-maintenance-customer-name'),
    },
    {
      accessorKey: 'serviceName',
      header: t('table-maintenance-service-name'),
    },
    {
      accessorKey: 'serviceDate',
      header: t('table-maintenance-service-date'),
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
