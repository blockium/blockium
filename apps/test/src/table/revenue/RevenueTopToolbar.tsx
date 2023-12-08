/* eslint-disable react/jsx-pascal-case */
import { ReactNode } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import {
  MRT_GlobalFilterTextField,
  // MRT_GlobalFilterTextField,
  // MRT_ShowHideColumnsButton,
  MRT_TableInstance,
  // MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
} from 'material-react-table';

import { IRevenue } from './Revenue';

interface RevenueTopToolbarProps {
  table: MRT_TableInstance<IRevenue>;
}

export const RevenueTopToolbar: React.FC<RevenueTopToolbarProps> = ({
  table,
}) => {
  const globalActions: ReactNode[] = [];
  const onAddClick = () => void 0;

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        // mb={{ xs: 4, sm: 4 }}
        p={2}
        pt={3}
      >
        <Typography variant="h6" gutterBottom>
          {/* TODO: i18n */}
          Receita no Mês
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
        <Box>
          <MRT_GlobalFilterTextField table={table} />
        </Box>
        <Box>
          {/* <MRT_ShowHideColumnsButton table={table} />
          <MRT_ToggleDensePaddingButton table={table} /> */}
          <MRT_ToggleFullScreenButton table={table} />
        </Box>
      </Stack>
    </Stack>
  );
};
