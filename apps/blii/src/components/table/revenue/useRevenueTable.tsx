import { useTranslation } from 'react-i18next';

import { Box, Grid, Stack, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';

import { fDateTime, fDecimal } from '@blockium/utils';

import { ICustomerService } from '../../../types';
import { useCustomerServices } from '../../../data/useCustomerServices';

export const useRevenueTable = () => {
  const { t } = useTranslation();
  const { data, setSearchValue } = useCustomerServices();

  let servicePriceSum = 0;
  let servicePriceSumOpen = 0;
  for (const obj of data) {
    if (obj.serviceDone) {
      servicePriceSum += obj.servicePrice || 0;
    } else {
      servicePriceSumOpen += obj.servicePrice || 0;
    }
  }

  const onGlobalFilterChange = (searchValue: string) => {
    setSearchValue(searchValue || '');
  };

  const columns: MRT_ColumnDef<ICustomerService>[] = [
    {
      accessorKey: 'payTypeName',
      header: t('table-revenue-pay-type-name'),
      Cell: ({ cell, row }) => {
        const { payTypeName, servicePrice } = row.original;
        return (
          <Stack
            direction="row"
            justifyContent="space-between"
            gap={2}
            width="100%"
          >
            <Box>{payTypeName}</Box>
            <Box>{servicePrice && fDecimal(servicePrice)}</Box>
          </Stack>
        );
      },
      Footer: () => (
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="caption" textTransform="uppercase">
              {t('table-revenue-label-received')}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography
              variant="subtitle1"
              color={(theme) => theme.palette.text.primary}
            >
              {fDecimal(servicePriceSum)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" textTransform="uppercase">
              {t('table-revenue-label-booked')}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography
              variant="subtitle1"
              color={(theme) => theme.palette.grey[500]}
            >
              {fDecimal(servicePriceSumOpen)}
            </Typography>
          </Grid>
        </Grid>
      ),
    },
    {
      accessorKey: 'serviceName',
      header: t('table-revenue-service-name'),
    },
    {
      accessorKey: 'customerName',
      header: t('table-revenue-customer-name'),
    },
    {
      accessorKey: 'serviceDate',
      header: t('table-revenue-service-date'),
      Cell: ({ cell }) => <span>{fDateTime(cell.getValue<string>())}</span>,
      muiTableBodyCellProps: { align: 'right' },
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
