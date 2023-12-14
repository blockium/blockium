/* eslint-disable react/jsx-pascal-case */
import { useMemo, useState } from 'react';
import { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';

import { fDateTime, localeContains } from '@blockium/utils';

import { ServiceMaintenanceTopToolbar } from './ServiceMaintenanceTopToolbar';
import jsonData from './customerServices.json';
import { ICustomerService } from '../../types';

export const useServiceMaintenanceTable = () => {
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

  const renderTopToolbar = ({
    table,
  }: {
    table: MRT_TableInstance<ICustomerService>;
  }) => {
    return <ServiceMaintenanceTopToolbar table={table} />;
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
    renderTopToolbar,
    onGlobalFilterChange,
    initialState: {},
  };
};
