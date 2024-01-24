import { useTranslation } from 'react-i18next';
import { Box, Container, Typography } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useCostTable } from './useCostTable';

export const CostTable = () => {
  const tableConfig = useCostTable();
  const { t } = useTranslation();
  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <Typography variant="h3" gutterBottom>
          {t('table-costs-title')}
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
