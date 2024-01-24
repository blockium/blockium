import { useTranslation } from 'react-i18next';
import { Box, Container, Typography } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useServiceMaintenanceTable } from './useServiceMaintenanceTable';

export const ServiceMaintenanceTable = () => {
  const { t } = useTranslation();
  const tableConfig = useServiceMaintenanceTable();
  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <Typography variant="h3" gutterBottom>
          {t('table-maintenance-title')}
        </Typography>
      </Box>
      <DefaultTable {...tableConfig} />
    </Container>
  );
};
