import { Container } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useCostTable } from './useCostTable';

type CostTableProps = {
  height?: number | string;
};

export const CostTable: React.FC<CostTableProps> = ({ height }) => {
  const tableConfig = useCostTable();
  return (
    <Container
      maxWidth="xl"
      // sx={{ paddingBottom: (theme) => theme.spacing(10) }}
    >
      <DefaultTable {...tableConfig} height={height} />
    </Container>
  );
};
