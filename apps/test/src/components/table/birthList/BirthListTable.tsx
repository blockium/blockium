import { Container } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useBirthListTable } from './useBirthListTable';

type BirthListTableProps = {
  height?: number | string;
};

export const BirthListTable: React.FC<BirthListTableProps> = ({ height }) => {
  const tableConfig = useBirthListTable();
  return (
    <Container
      maxWidth="xl"
      // sx={{ paddingBottom: (theme) => theme.spacing(10) }}
    >
      <DefaultTable {...tableConfig} height={height} />
    </Container>
  );
};
