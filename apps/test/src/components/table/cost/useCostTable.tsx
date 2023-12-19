import { Box, Grid, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

import { fDecimal } from '@blockium/utils';

import { ICost } from '../../../types';
import { useCosts } from '../../../data/useCosts';

export const useCostTable = () => {
  const { data, setSearchValue } = useCosts();

  let costSum = 0;
  for (const obj of data) {
    costSum += obj.value;
  }

  const onGlobalFilterChange = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  // TODO: i18n
  const columns: MRT_ColumnDef<ICost>[] = [
    {
      accessorKey: 'name',
      header: 'Custo',
      maxSize: 130,
    },
    {
      accessorKey: 'value',
      header: 'Valor',
      maxSize: 150,
      Cell: ({ cell }) => (
        <Box sx={{ textAlign: 'right' }}>
          {fDecimal(cell.getValue<number>())}
        </Box>
      ),
      Footer: () => (
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="caption" textTransform="uppercase">
              Total:
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

  const title = () => (
    <Box maxWidth="40%">
      <Typography variant="h3">Despesas no Mês</Typography>
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
