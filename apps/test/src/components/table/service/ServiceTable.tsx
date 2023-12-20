import { Box, Container, Typography } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useServiceTable } from './useServiceTable';

export const ServiceTable = () => {
  const tableConfig = useServiceTable();
  return (
    <>
      {/* <Alert message={'Teste'} setMessage={() => void 0} /> */}
      <Container disableGutters maxWidth="xl">
        <Box>
          <Typography variant="h3" gutterBottom>
            Serviços
          </Typography>
        </Box>
        <DefaultTable
          {...tableConfig}
          enablePagination={false}
          enableBottomToolbar={false} // default = true
        />
      </Container>
    </>
  );
};
