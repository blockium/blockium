import { Box, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

import { fDecimal } from '@blockium/utils';

import { IService } from '../../../types';
import { useServices } from '../../../data/useServices';

export const useServiceTable = () => {
  const { data, setSearchValue } = useServices();

  const onGlobalFilterChange = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  // TODO: i18n
  const columns: MRT_ColumnDef<IService>[] = [
    {
      accessorKey: 'name',
      header: 'Serviço',
      maxSize: 130,
    },
    {
      accessorKey: 'price',
      header: 'Valor',
      maxSize: 150,
      Cell: ({ cell }) => (
        <Box sx={{ textAlign: 'right' }}>
          {fDecimal(cell.getValue<number>())}
        </Box>
      ),
      muiTableHeadCellProps: { align: 'right' },
    },
    {
      accessorKey: 'dayInterval',
      header: 'Manutenção (dias)',
      maxSize: 150,
      Cell: ({ cell }) => (
        <Box sx={{ textAlign: 'right' }}>{cell.getValue<number>()}</Box>
      ),
      muiTableHeadCellProps: { align: 'right' },
    },
  ];

  // TODO: Implement onAddClick
  const onAddClick = () => void 0;

  // TODO: Implement onEditClick
  const onEditClick = () => void 0;

  // TODO: Implement onDeleteClick
  const onDeleteClick = () => void 0;

  const title = () => (
    <Box maxWidth="40%">
      <Typography variant="h3">Serviços</Typography>
    </Box>
  );

  return {
    title,
    data,
    columns,
    onGlobalFilterChange,
    onAddClick,
    onEditClick,
    onDeleteClick,
    initialState: {},
  };
};
