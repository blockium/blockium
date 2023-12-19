import { Container } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useRevenueTable } from './useRevenueTable';

type RevenueTableProps = {
  height?: number | string;
};

export const RevenueTable: React.FC<RevenueTableProps> = ({ height }) => {
  const tableConfig = useRevenueTable();
  return (
    <Container
      maxWidth="xl"
      // sx={{ paddingBottom: (theme) => theme.spacing(10) }}
    >
      <DefaultTable {...tableConfig} height={height} />
    </Container>
  );
};
