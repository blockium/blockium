import { Box, Container, Typography } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useBirthListTable } from './useBirthListTable';

export const BirthListTable = () => {
  const tableConfig = useBirthListTable();
  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <Typography variant="h3" gutterBottom>
          Aniversariantes
        </Typography>
      </Box>
      <DefaultTable {...tableConfig} />
    </Container>
  );
};
