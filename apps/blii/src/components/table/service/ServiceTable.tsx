import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography } from '@mui/material';

// table
import { DefaultTable } from '@blockium/table';
import { useServiceTable } from './useServiceTable';

// dialog
import ServiceDialog from '../../dialog/service/ServiceDialog';

// model
import { IService } from '../../../types';

export const ServiceTable = () => {
  const { t } = useTranslation();
  const tableConfig = useServiceTable();

  const [current, setCurrent] = useState<IService>();
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // TODO: Implement onAddClick
  const onAddClick = () => {
    setCurrent(undefined);
    setOpenEditDialog(true);
  };

  // TODO: Implement onEditClick
  const onEditClick = (row: IService, rowIndex: number) => {
    setCurrent({ ...row });
    setOpenEditDialog(true);
  };

  // TODO: Implement onDeleteClick
  const onDeleteClick = (row: IService, rowIndex: number) => {
    console.log('onDeleteClick');
  };

  return (
    <>
      <Container disableGutters maxWidth="xl">
        <Box>
          <Typography variant="h3" gutterBottom>
            {t('table-services-title')}
          </Typography>
        </Box>
        <DefaultTable
          {...tableConfig}
          onAddClick={onAddClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          enablePagination={false}
          enableBottomToolbar={false} // default = true
        />
      </Container>
      <ServiceDialog
        service={current}
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      />
    </>
  );
};
