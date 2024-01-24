import { useTranslation } from 'react-i18next';
import { Box, Container, Typography } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useRevenueTable } from './useRevenueTable';

export const RevenueTable = () => {
  const tableConfig = useRevenueTable();
  const { t } = useTranslation();
  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <Typography variant="h3" gutterBottom>
          {t('table-revenue-title')}
        </Typography>
      </Box>
      <DefaultTable {...tableConfig} />
    </Container>
  );
};
