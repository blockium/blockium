import { Box, Container, Typography } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useServiceMaintenanceTable } from './useServiceMaintenanceTable';

export const ServiceMaintenanceTable = () => {
  const tableConfig = useServiceMaintenanceTable();
  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <Typography variant="h3" gutterBottom>
          Manutenção de Serviço
        </Typography>
      </Box>
      <DefaultTable {...tableConfig} />
    </Container>
  );
};
