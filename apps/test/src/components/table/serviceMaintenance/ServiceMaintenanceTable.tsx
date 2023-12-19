import { Container } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useServiceMaintenanceTable } from './useServiceMaintenanceTable';

type ServiceMaintenanceTableProps = {
  height?: number | string;
};

export const ServiceMaintenanceTable: React.FC<
  ServiceMaintenanceTableProps
> = ({ height }) => {
  const tableConfig = useServiceMaintenanceTable();
  return (
    <Container
      maxWidth="xl"
      // sx={{ paddingBottom: (theme) => theme.spacing(10) }}
    >
      <DefaultTable {...tableConfig} height={height} />
    </Container>
  );
};
