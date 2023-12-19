import { useState } from 'react';
import { useWindowSize } from 'react-use';
// material-react-table
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
// @mui
import { Card, IconButton, Tooltip, useTheme } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';

// I18n
import { useTranslation } from 'react-i18next';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
const locales = {
  'pt-BR': MRT_Localization_PT_BR,
  // Add new locales here, using the i18next.language as the key
};
type LocaleKey = keyof typeof locales;

type TableProps<T extends object> = {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  onEditClick?: (rowIndex: number) => void;
  onDeleteClick?: (rowIndex: number) => void;
  bottomGap?: number;
  height?: number | string;
  [other: string]: unknown;
};

export const Table = <T extends object>(props: TableProps<T>) => {
  const {
    data,
    columns,
    onEditClick,
    onDeleteClick,
    bottomGap,
    height,
    ...other
  } = props;

  // Adjust the table height according to the window height
  const { height: windowHeight } = useWindowSize();

  // Adjust the table background color to white
  const theme = useTheme();
  const { mode } = theme.palette;
  if (mode === 'light') {
    theme.palette.background.default = '#fff';
  }

  const [isFullScreen, setIsFullScreen] = useState(false);

  // I18n
  const { i18n } = useTranslation();
  const locale = locales[i18n.language as LocaleKey];

  return (
    <Card
      sx={{
        height,
        position: 'relative',
        zIndex: isFullScreen ? 1200 : 0,
      }}
    >
      <MaterialReactTable
        data={data}
        columns={columns}
        localization={locale}
        // GENERAL OPTIONS:
        // layoutMode="grid-no-grow"

        // TABLE OPTIONS:
        // Remove table scrollbar and auto-adjust table height
        muiTableContainerProps={{
          sx: {
            scrollbarWidth: 'none' /* for Firefox */,
            '&::-webkit-scrollbar': {
              display: 'none' /* for Chrome, Safari, and Opera */,
            },
            maxHeight: {
              xs: height
                ? `calc(${height} - 153px)`
                : windowHeight - 320 - (bottomGap || 0),
              sm: height
                ? `calc(${height} - 153px)`
                : windowHeight - 280 - (bottomGap || 0),
            },
            // maxHeight: height,
          },
        }}
        // muiTableProps={{
        //   sx: { tableLayout: 'fixed' },
        // }}
        muiTablePaperProps={{
          sx: {
            bgcolor: theme.palette.background.paper,
            boxShadow: 'none',
          },
        }}
        // muiTableBodyProps={{ sx: {} }}
        //
        // TOP TOOLBAR OPTIONS (if not using renderTopToolbar())
        // enableDensityToggle={false} // default = true
        // enableFullScreenToggle={false} // default = true
        // enableGlobalFilter={false}
        // positionGlobalFilter="left"
        muiSearchTextFieldProps={{
          variant: 'standard',
          size: 'small',
          sx: { pt: '0.2em', pl: 1, display: 'inline' },
        }}
        //
        // HEADER OPTIONS:
        enableStickyHeader // fix the header
        muiTopToolbarProps={{
          sx: { p: 2, bgcolor: theme.palette.background.paper },
        }}
        // muiTableHeadProps={{ sx: {} }}
        muiTableHeadCellProps={{
          sx: {
            color:
              mode === 'light'
                ? theme.palette.grey[600]
                : theme.palette.grey[500],
            bgcolor:
              theme.palette.background[
                mode === 'light' ? 'neutral' : 'default'
              ],
            pt: theme.spacing(3),
            pb: theme.spacing(2),
          },
        }}
        //
        // ROW OPTIONS:
        // enableRowNumbers
        // enableGrouping
        //
        // Following 2 options respond to row selection (checkbox mark):
        // enableRowSelection
        // onRowSelectionChange={() => {
        //   console.log("linha selecionada");
        // }}
        //
        // Following 2 options respond to row click/touch:
        muiTableBodyRowProps={({ row }) => ({
          onClick: (event) => {
            // console.info(row.id, row.index);
            onEditClick?.(row.index);
          },
          sx: { cursor: 'pointer', bgcolor: theme.palette.background.paper },
        })}
        // muiTableBodyCellProps={{
        // }}
        // Add edit and/or delete row actions:
        enableRowActions={Boolean(onEditClick) || Boolean(onDeleteClick)}
        positionActionsColumn="last"
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'right',
            },
            maxSize: 100,
          },
        }}
        renderRowActions={({ row }) => (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              flexWrap: 'nowrap',
              gap: '0.5rem',
            }}
          >
            {onEditClick && (
              <Tooltip title="Editar">
                <IconButton
                  size="large"
                  onClick={(e) => onEditClick(row.index)}
                  // color="primary"
                >
                  <EditIcon
                    sx={{
                      color:
                        mode === 'light'
                          ? theme.palette.primary.main
                          : theme.palette.primary.light,
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
            {onDeleteClick && (
              <Tooltip title="Excluir">
                <IconButton
                  size="large"
                  onClick={(e) => onDeleteClick(row.index)}
                >
                  <DeleteIcon
                    sx={{
                      color:
                        mode === 'light'
                          ? theme.palette.primary.light
                          : theme.palette.primary.lighter,
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </div>
        )}
        //
        // COLUMN OPTIONS:
        // enableColumnOrdering
        // enableColumnResizing
        enableColumnFilters={false}
        enableColumnActions={false}
        //
        // FOOTER OPTIONS:
        enableStickyFooter
        // Avoids the footer to be hidden by pinning columns
        // muiTableFooterProps={{ sx: { zIndex: 10 } }}
        muiTableFooterRowProps={{
          sx: {
            bgcolor:
              theme.palette.background[
                mode === 'light' ? 'neutral' : 'default'
              ],
          },
        }}
        // muiTableFooterCellProps={{ sx: {} }}
        //
        // BOTTOM TOOLBAR OPTIONS:
        // enableBottomToolbar={false}  // default = true
        muiBottomToolbarProps={{
          sx: {
            minHeight: theme.spacing(6),
            bgcolor: theme.palette.background.paper,
          },
        }}
        //
        // PAGINATION OPTIONS: (bottom toolbar should be enabled)
        // enablePagination={false} // default = true
        // positionPagination="top" // top toolbar should be enabled

        //
        // OTHER CONFIGS:
        onIsFullScreenChange={(
          isFullScreen: boolean | ((old: boolean) => boolean),
        ) => {
          if (typeof isFullScreen === 'boolean') {
            setIsFullScreen(isFullScreen);
          }
        }}
        {...other}
        state={{
          isFullScreen,
          ...(other.state as object),
        }}
        initialState={{
          showGlobalFilter: true,
          ...(other.initialState as object),
        }}
      />
    </Card>
  );
};

export default Table;
