/* eslint-disable react/jsx-pascal-case */
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import {
  MRT_GlobalFilterTextField,
  MRT_RowData,
  // MRT_GlobalFilterTextField,
  // MRT_ShowHideColumnsButton,
  MRT_TableInstance,
  // MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
} from 'material-react-table';

interface DefaultToolbarProps<T extends MRT_RowData> {
  table: MRT_TableInstance<T>;
  title?: string;
  onAddClick?: () => void;
  globalActions?: ReactNode[];
}

export const DefaultTopToolbar = <T extends MRT_RowData>(
  props: DefaultToolbarProps<T>,
) => {
  const { table, title, onAddClick, globalActions } = props;
  const { t } = useTranslation();

  const hasFirstBar = title || onAddClick || globalActions;

  return (
    <Stack>
      {hasFirstBar && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          px={2}
          pt={3}
        >
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Stack direction="row" gap={2}>
            {globalActions?.map((action) => action)}
            {onAddClick && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={(e: React.MouseEvent) => onAddClick()}
              >
                {t('table:button-new')}
              </Button>
            )}
          </Stack>
        </Stack>
      )}
      <Stack
        direction="row"
        gap={2}
        justifyContent="space-between"
        alignItems="center"
        p={2}
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

export default DefaultTopToolbar;
