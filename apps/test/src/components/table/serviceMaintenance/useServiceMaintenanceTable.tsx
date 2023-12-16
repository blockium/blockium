/* eslint-disable react/jsx-pascal-case */
import { useMemo, useState } from 'react';
import { HomeRepairService as HomeRepairServiceIcon } from '@mui/icons-material';
import { MRT_ColumnDef } from 'material-react-table';

import { fDateTime, localeContains } from '@blockium/utils';

import jsonData from './customerServices.json';
import { ICustomerService } from '../../../types';

export const useServiceMaintenanceTable = () => {
  const title = 'Manutenção de Serviço';

  const rawData: ICustomerService[] = jsonData;
  const [searchValue, setSearchValue] = useState('');

  const data = useMemo(() => {
    return rawData.filter((data) => {
      const { payTypeName, serviceName, customerName } = data;
      return (
        (payTypeName && localeContains(payTypeName, searchValue)) ||
        (serviceName && localeContains(serviceName, searchValue)) ||
        (customerName && localeContains(customerName, searchValue))
      );
    });
  }, [rawData, searchValue]);

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
    title,
    icon: <HomeRepairServiceIcon />,
    data,
    columns,
    onGlobalFilterChange,
    initialState: {},
  };
};
