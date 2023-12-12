/* eslint-disable react/jsx-pascal-case */
import { useMemo, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { MRT_ColumnDef, MRT_TableInstance } from 'material-react-table';

import { fDecimal, localeContains } from '@blockium/utils';

import { ICost } from '../../types';
import { CostTopToolbar } from './CostTopToolbar';
import jsonData from './costs.json';

export const useCostTable = () => {
  const rawData: ICost[] = jsonData;
  const [searchValue, setSearchValue] = useState('');

  let costSum = 0;
  for (const obj of rawData) {
    costSum += obj.value;
  }

  const data = useMemo(() => {
    return rawData.filter((data) => {
      const { name, value } = data;
      return (
        (name && localeContains(name, searchValue)) ||
        (value && localeContains(value + '', searchValue))
      );
    });
  }, [rawData, searchValue]);

  const onGlobalFilterChange = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const renderTopToolbar = ({ table }: { table: MRT_TableInstance<ICost> }) => {
    return <CostTopToolbar table={table} onAddClick={onAddClick} />;
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
              color={(theme) => theme.palette.success.dark}
            >
              {fDecimal(costSum)}
            </Typography>
          </Grid>
        </Grid>
      ),
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
    renderTopToolbar,
    onGlobalFilterChange,
    onEditClick,
    onDeleteClick,
    initialState: {},
  };
};
