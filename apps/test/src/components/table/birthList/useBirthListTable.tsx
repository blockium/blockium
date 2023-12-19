/* eslint-disable react/jsx-pascal-case */
import { useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

import { fToNow, localeContains } from '@blockium/utils';

import jsonData from './customerServices.json';
import { ICustomerService } from '../../../types';

export const useBirthListTable = () => {
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
      maxSize: 80,
      Cell: ({ cell }) => <span>{fToNow(cell.getValue<string>())}</span>,
      muiTableBodyCellProps: { align: 'right' },
      muiTableHeadCellProps: { align: 'right' },
    },
  ];

  const title = () => (
    <Box maxWidth="40%">
      <Typography variant="h3">Aniversariantes</Typography>
    </Box>
  );
  return {
    title,
    data,
    columns,
    onGlobalFilterChange,
    initialState: {},
  };
};
