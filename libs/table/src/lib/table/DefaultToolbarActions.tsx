/* eslint-disable react/jsx-pascal-case */
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
// import { Print as PrintIcon } from '@mui/icons-material';

import {
  MRT_RowData,
  // MRT_ShowHideColumnsButton,
  MRT_TableInstance,
  // MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
} from 'material-react-table';

interface DefaultToolbarActionProps<T extends MRT_RowData> {
  table: MRT_TableInstance<T>;
  onAddClick?: () => void;
  globalActions?: ReactNode[];
}

export const DefaultToolbarActions = <T extends MRT_RowData>(
  props: DefaultToolbarActionProps<T>,
) => {
  const { table, onAddClick, globalActions } = props;
  const { t } = useTranslation();

  return (
    <Stack direction="row" gap={1} ml={2}>
      {globalActions?.map((action) => action)}
      {onAddClick && (
        <Tooltip title={t('table:button-new')}>
          <IconButton onClick={onAddClick}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      {/* add custom button to print table  */}
      {/* <Tooltip title={t('table:button-print')}>
        <IconButton
          onClick={() => {
            window.print();
          }}
        >
          <PrintIcon />
        </IconButton>
      </Tooltip> */}
      {/* <MRT_ShowHideColumnsButton table={table} /> */}
      {/* <MRT_ToggleDensePaddingButton table={table} /> */}
      <MRT_ToggleFullScreenButton table={table} />
    </Stack>
  );
};

export default DefaultToolbarActions;
