import { ReactNode, useState } from 'react';
import { useWindowSize } from 'react-use';
import i18next from 'i18next';
// material-react-table
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
// @mui
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';

type TableProps<T extends object> = {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  addBtnLabel?: string;
  onEditClick?: (rowIndex: number) => void;
  onDeleteClick?: (rowIndex: number) => void;
  globalActions?: ReactNode[];
  bottomGap?: number;
  height?: number | string;
  [other: string]: unknown;
};

export const Table = <T extends object>(props: TableProps<T>) => {
  const {
    data,
    columns,
    addBtnLabel,
    onEditClick,
    onDeleteClick,
    globalActions,
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

  return (
    <Box
      sx={{
        height,
        position: 'relative',
        zIndex: isFullScreen ? 1200 : 0,
      }}
    >
      <MaterialReactTable
        data={data}
        columns={columns}
        localization={
          i18next.language === 'pt-BR' ? MRT_Localization_PT_BR : undefined
        }
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
                : windowHeight - 240 - (bottomGap || 0),
              sm: height
                ? `calc(${height} - 153px)`
                : windowHeight - 260 - (bottomGap || 0),
            }, // gap for space above and bellow table
            p: 0,
            m: 0,
          },
        }}
        // muiTableProps={{ sx: { tableLayout: 'fixed' } }}
        muiTablePaperProps={{ sx: { bgcolor: theme.palette.background.paper } }}
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
          sx: { pt: '0.2em', pl: 1 },
        }}
        //
        // HEADER OPTIONS:
        enableStickyHeader // fix the header
        muiTableHeadCellProps={{
          sx: {
            color:
              mode === 'light'
                ? theme.palette.grey[600]
                : theme.palette.grey[500],
            bgcolor: mode === 'light' ? theme.palette.grey[200] : '#313944',
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
        })}
        muiTableBodyCellProps={{
          sx: { cursor: 'pointer', bgcolor: theme.palette.background.paper },
        }}
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
        muiTableFooterProps={{
          sx: {
            zIndex: 10,
          },
        }}
        //
        // BOTTOM TOOLBAR OPTIONS:
        // enableBottomToolbar={false}  // default = true
        muiBottomToolbarProps={{
          sx: {
            pt: theme.spacing(3),
            pb: theme.spacing(3),
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
          density: 'spacious',
          ...(other.initialState as object),
        }}
      />
    </Box>
  );
};

export default Table;
