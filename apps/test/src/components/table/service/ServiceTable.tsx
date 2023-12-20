import { Container } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useServiceTable } from './useServiceTable';

type ServiceTableProps = {
  height?: number | string;
};

export const ServiceTable: React.FC<ServiceTableProps> = ({ height }) => {
  const tableConfig = useServiceTable();
  return (
    <Container
      maxWidth="xl"
      // sx={{ paddingBottom: (theme) => theme.spacing(10) }}
    >
      <DefaultTable {...tableConfig} height={height} />
    </Container>
  );
};
