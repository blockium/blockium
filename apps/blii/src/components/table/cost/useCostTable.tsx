import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

import { fDecimal } from '@blockium/utils';

import { ICost } from '../../../types';
import { useCosts } from '../../../data/useCosts';

export const useCostTable = () => {
  const { t } = useTranslation();
  const { data, setSearchValue } = useCosts();

  let costSum = 0;
  for (const obj of data) {
    costSum += obj.value;
  }

  const onGlobalFilterChange = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const columns: MRT_ColumnDef<ICost>[] = [
    {
      accessorKey: 'name',
      header: t('table-costs-name'),
      maxSize: 150,
    },
    {
      accessorKey: 'value',
      header: t('table-costs-value'),
      maxSize: 150,
      Cell: ({ cell }) => (
        <Box sx={{ textAlign: 'right', width: '100%' }}>
          {fDecimal(cell.getValue<number>())}
        </Box>
      ),
      Footer: () => (
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="caption" textTransform="uppercase">
              {t('table-costs-label-total')}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography
              variant="subtitle1"
              color={(theme) => theme.palette.text.primary}
            >
              {fDecimal(costSum)}
            </Typography>
          </Grid>
        </Grid>
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

  return {
    data,
    columns,
    onGlobalFilterChange,
    onAddClick,
    onEditClick,
    onDeleteClick,
    initialState: {},
  };
};
