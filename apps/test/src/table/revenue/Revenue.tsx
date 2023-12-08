/* eslint-disable react/jsx-pascal-case */
import { ReactNode } from 'react';
import { Table } from '@blockium/table';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_TableInstance,
  MRT_ToggleFullScreenButton,
} from 'material-react-table';

interface IRevenue {
  id?: string;
  creationTime: string; // A JSON Date and time representation. See Date.toJSON()
  serviceId?: string;
  serviceName?: string;
  servicePrice?: number;
  servicePriceOriginal?: number;
  serviceFeePercent?: number;
  serviceNetBalance?: number; // computed, discounting serviceFeePercent + payFeePercent
  serviceDate: string; // A JSON Date and time representation. See Date.toJSON()
  serviceDone?: boolean;
  customerId?: string;
  customerName?: string;
  payTypeId?: string;
  payTypeName?: string;
  payTypeFeePercent?: number;
  placeId?: string;
  placeName?: string;
  partnerEmail?: string;
  partnerName?: string;
  discountPercent?: number;
  duration?: string | null;
  payParcelQuantity?: number;
  notes?: string;
}

export const Revenue: React.FC = () => {
  const data: IRevenue[] = [];
  for (let i = 0; i < 22; i++) {
    const record: IRevenue = {
      id: `record_${i}`,
      creationTime: new Date().toJSON(),
      serviceId: `service_${i}`,
      serviceName: `Service ${i}`,
      servicePrice: Math.random() * 100,
      servicePriceOriginal: Math.random() * 100,
      serviceFeePercent: Math.random() * 10,
      serviceDate: new Date().toJSON(),
      serviceDone: i % 2 === 0, // alternates between true and false
      customerId: `customer_${i}`,
      customerName: `Customer ${i}`,
      payTypeId: `payType_${i}`,
      payTypeName: `Payment Type ${i}`,
      payTypeFeePercent: Math.random() * 5,
      placeId: `place_${i}`,
      placeName: `Place ${i}`,
      partnerEmail: `partner${i}@example.com`,
      partnerName: `Partner ${i}`,
      discountPercent: Math.random() * 20,
      duration: i % 3 === 0 ? null : `${i} hours`,
      payParcelQuantity: i % 2 === 0 ? 1 : 3,
      notes: `Notes for record ${i}`,
    };

    data.push(record);
  }

  const columns: MRT_ColumnDef<IRevenue>[] = [
    {
      accessorKey: 'payTypeName',
      header: 'Pagamento',
    },
    {
      accessorKey: 'serviceName',
      header: 'Serviço',
    },
    {
      accessorKey: 'customerName',
      header: 'Cliente',
    },
  ];

  const globalActions: ReactNode[] = [];
  const onAddClick = () => void 0;

  return (
    <Table
      data={data}
      columns={columns}
      title="Faturamento"
      // height={500}
      // onAddClick={onAddClick}
      // onEditClick={onEditClick}
      // onDeleteClick={onDeleteClick}
      // enableColumnPinning
      // enableRowPinning
      initialState={{
        columnPinning: { left: ['payTypeName'] },
      }}
      renderTopToolbar={({ table }: { table: MRT_TableInstance<IRevenue> }) => {
        return (
          <Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              // mb={{ xs: 4, sm: 4 }}
              p={2}
            >
              <Typography variant="h5" gutterBottom>
                Faturamento
              </Typography>
              <Stack direction="row" gap={2}>
                {globalActions?.map((action) => action)}
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={(e: React.MouseEvent) => onAddClick()}
                >
                  {/* TODO: i18n */}
                  Novo
                </Button>
              </Stack>
            </Stack>
            {/* <CalendarHeaderDate onCalendarDateChange={onCalendarDateChange} /> */}
            <Stack
              direction="row"
              gap={2}
              justifyContent="space-between"
              alignItems="center"
              pl={2}
              pr={2}
              pb={2}
            >
              <MRT_GlobalFilterTextField table={table} />
              <Box>
                {/* <MRT_ShowHideColumnsButton table={table} /> */}
                <MRT_ToggleFullScreenButton table={table} />
              </Box>
            </Stack>
          </Stack>
        );
      }}
      // manualFiltering // To be used on server searching
      onGlobalFilterChange={(searchValue: string) => {
        // setSearchValue(searchValue || '');
      }}
      // filterFns={{
      //   myCustomFilterFn: (row: MRT_Row, id: string, filterValue: string) => {
      //     const customerService = row.original;
      //     const value = row.getValue<string>(id);
      //     return localeContains(value, filterValue);
      //   },
      // }}
      // globalFilterFn="myCustomFilterFn"

      // bottomGap={isMobile ? 120 : 80}
    />
  );
};
