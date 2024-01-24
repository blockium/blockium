import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

import { fDecimal } from '@blockium/utils';

import { IService } from '../../../types';
import { useServices } from '../../../data';

export const useServiceTable = () => {
  const { t } = useTranslation();
  const { data, setSearchValue } = useServices();

  const onGlobalFilterChange = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const columns: MRT_ColumnDef<IService>[] = [
    {
      accessorKey: 'name',
      header: t('table-services-name'),
      maxSize: 150,
    },
    {
      accessorKey: 'price',
      header: t('table-services-price'),
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
      header: t('table-services-day-interval'),
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
