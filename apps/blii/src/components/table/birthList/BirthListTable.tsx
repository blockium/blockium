import { useTranslation } from 'react-i18next';
import { Box, Container, Typography } from '@mui/material';
import { DefaultTable } from '@blockium/table';
import { useBirthListTable } from './useBirthListTable';

export const BirthListTable = () => {
  const { t } = useTranslation();
  const tableConfig = useBirthListTable();
  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <Typography variant="h3" gutterBottom>
          {t('table-birth-list-title')}
        </Typography>
      </Box>
      <DefaultTable {...tableConfig} />
    </Container>
  );
};
