import { Box } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

import { fDecimal } from '@blockium/utils';

import { IService } from '../../../types';
import { useServices } from '../../../data';

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
      maxSize: 150,
    },
    {
      accessorKey: 'price',
      header: 'Valor',
      maxSize: 100,
      Cell: ({ cell }) => (
        <Box sx={{ textAlign: 'right', width: '100%' }}>
          {fDecimal(cell.getValue<number>())}
        </Box>
      ),
      muiTableHeadCellProps: { align: 'right' },
    },
    {
      accessorKey: 'dayInterval',
      header: 'Manutenção (dias)',
      maxSize: 100,
      Cell: ({ cell }) => (
        <Box sx={{ textAlign: 'right', width: '100%' }}>
          {cell.getValue<number>()}
        </Box>
      ),
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
