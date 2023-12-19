import { Box, Typography } from '@mui/material';
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
