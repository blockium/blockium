import { ReactNode, useState } from 'react';
import { useWindowSize } from 'react-use';
import i18next from 'i18next';
// material-react-table
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
// @mui
import {
  Button,
  Card,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Add as AddIcon } from '@mui/icons-material';
// utils
// TODO: remove
// import { useFillHeight } from "../../hooks/useFillHeight";
// import TableContext from './TableContext';

type TableProps<T extends object> = {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  title: string;
  addTitle?: string;
  onAddClick?: () => void;
  onEditClick?: (rowIndex: number) => void;
  onDeleteClick?: (rowIndex: number) => void;
  globalActions?: ReactNode[];
  bottomGap?: number;
  [other: string]: unknown;
};

export const Table = <T extends object>(props: TableProps<T>) => {
  const {
    data,
    columns,
    title,
    addTitle,
    onAddClick,
    onEditClick,
    onDeleteClick,
    globalActions,
    bottomGap,
    ...other
  } = props;

  const [isFullScreen, setIsFullScreen] = useState(false);

  // Adjust the table height according to the window height
  const { height } = useWindowSize();

  // TODO: remove
  // const [height, setHeight] = useState(0);
  // useFillHeight(true, (height) => setHeight(height));

  // Adjust the table background color to white
  const theme = useTheme();
  if (theme.palette.mode === 'light') {
    theme.palette.background.default = '#fff';
  }

  // TODO Review
  // const tableContext = useContext(TableContext);

  return (
    <Container sx={{ zIndex: isFullScreen ? 1200 : 0 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={{ xs: 4, sm: 4 }}
      >
        <Typography variant="h4" gutterBottom>
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
              {addTitle || 'Novo'}
            </Button>
          )}
        </Stack>
      </Stack>

      <Card>
        <MaterialReactTable
          data={data}
          columns={columns}
          localization={
            i18next.language === 'pt-BR' ? MRT_Localization_PT_BR : undefined
          }
          // enableGlobalFilter={false}
          // enableRowNumbers
          // enableGrouping
          // enableColumnOrdering
          // enableColumnResizing
          // layoutMode="grid-no-grow"
          enableDensityToggle={false}
          // enableFullScreenToggle={false}
          enableColumnFilters={false}
          enableColumnActions={false}
          enablePagination={false}
          enableBottomToolbar={false}
          enableStickyHeader
          enableStickyFooter
          positionGlobalFilter="left"
          muiSearchTextFieldProps={{
            // variant: "standard",
            // size: "small",
            sx: { pt: '0.2em', pl: 1 },
          }}
          //
          // Following 2 options respond to row selection (checkbox mark):
          // enableRowSelection
          // onRowSelectionChange={() => {
          //   console.log("linha selecionada");
          // }}
          //
          // Following 2 options respond to row click/touch:
          // muiTableBodyRowProps={({ row }) => ({
          //   onClick: (event) => {
          //     console.info(event, row.id);
          //   },
          // })}
          // muiTableBodyCellProps={{ sx: { cursor: "pointer" } }}
          //
          // Below 4 options are the top table components:
          // muiTableProps={{ sx: { tableLayout: "fixed" } }}
          // muiTablePaperProps={{ sx: {  } }}
          // muiTableBodyProps={{ sx: {  } }}
          //
          // Remove table scrollbar and auto-adjust table height
          muiTableContainerProps={{
            sx: {
              scrollbarWidth: 'none' /* for Firefox */,
              '&::-webkit-scrollbar': {
                display: 'none' /* for Chrome, Safari, and Opera */,
              },
              maxHeight: {
                xs: height - 240 - (bottomGap || 0),
                sm: height - 280 - (bottomGap || 0),
              }, // gap for space above and bellow table
            },
          }}
          // Avoids the footer to be hidden by pinning columns
          muiTableFooterProps={{
            sx: {
              zIndex: 10,
            },
          }}
          //
          // Add edit and/or delete actions:
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
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              {onDeleteClick && (
                <Tooltip title="Excluir">
                  <IconButton
                    size="large"
                    onClick={(e) => onDeleteClick(row.index)}
                    color="error"
                    // color="inherit"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          )}
          onIsFullScreenChange={(
            isFullScreen: boolean | ((old: boolean) => boolean),
          ) => {
            if (typeof isFullScreen === 'boolean') {
              setIsFullScreen(isFullScreen);
              // TODO: Review
              // tableContext.setIsFullScreen(isFullScreen);}
            }
          }}
          {...other}
          initialState={{
            ...{
              showGlobalFilter: true,
              // sorting: [{ id: "name", desc: false }], //sort by state by default
            },
            ...(other.initialState as object),
          }}
          state={{
            // TODO: Review
            // ...{ isFullScreen: tableContext.isFullScreen },
            ...(other.state as object),
          }}
        />
      </Card>
    </Container>
  );
};

export default Table;
