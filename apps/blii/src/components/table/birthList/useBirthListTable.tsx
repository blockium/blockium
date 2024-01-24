import { useTranslation } from 'react-i18next';
import { MRT_ColumnDef } from 'material-react-table';

import { fToNow } from '@blockium/utils';

import { ICustomerService } from '../../../types';
import { useCustomerServices } from '../../../data/useCustomerServices';

export const useBirthListTable = () => {
  const { t } = useTranslation();
  const { data, setSearchValue } = useCustomerServices();

  const onGlobalFilterChange = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const columns: MRT_ColumnDef<ICustomerService>[] = [
    {
      accessorKey: 'customerName',
      header: t('table-birth-list-customer-name'),
      maxSize: 150,
    },
    {
      accessorKey: 'serviceDate',
      header: t('table-birth-list-service-date'),
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
