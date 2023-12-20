import { Box, Container, Typography } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useCostTable } from './useCostTable';

export const CostTable = () => {
  const tableConfig = useCostTable();
  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <Typography variant="h3" gutterBottom>
          Despesas no Mês
        </Typography>
      </Box>
      <DefaultTable
        {...tableConfig}
        enablePagination={false}
        enableBottomToolbar={false} // default = true
      />
    </Container>
  );
};
