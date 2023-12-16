/* eslint-disable react/jsx-pascal-case */
import { useMemo, useState } from 'react';
import { Cake as CakeIcon } from '@mui/icons-material';
import { MRT_ColumnDef } from 'material-react-table';

import { fToNow, localeContains } from '@blockium/utils';

import jsonData from './customerServices.json';
import { ICustomerService } from '../../../types';

export const useBirthdayListTable = () => {
  const title = 'Aniversariantes';

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
      accessorKey: 'serviceDate',
      header: 'Aniversário',
      Cell: ({ cell }) => <span>{fToNow(cell.getValue<string>())}</span>,
      muiTableBodyCellProps: { align: 'right' },
      muiTableHeadCellProps: { align: 'right' },
    },
  ];

  return {
    title,
    icon: <CakeIcon />,
    data,
    columns,
    onGlobalFilterChange,
    initialState: {},
  };
};
