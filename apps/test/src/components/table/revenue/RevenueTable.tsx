import { Box, Container, Typography } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useRevenueTable } from './useRevenueTable';

export const RevenueTable = () => {
  const tableConfig = useRevenueTable();
  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <Typography variant="h3" gutterBottom>
          Receita no Mês
        </Typography>
      </Box>
      <DefaultTable {...tableConfig} />
    </Container>
  );
};
