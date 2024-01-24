import { useTranslation } from 'react-i18next';

import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Paid as PaidIcon } from '@mui/icons-material';
import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import { ThumbDown as ThumbDownIcon } from '@mui/icons-material';

// import { useAuth } from '@blockium/firebase';
import { SummaryWidget } from '@blockium/ui';

import { FinanceChat } from './FinanceChat';
import { FinanceEvolution } from './FinanceEvolution';
import { FinanceHero } from './FinanceHero';
import { FinanceProgress } from './FinanceProgress';
// import { FinanceProgress } from './FinanceProgress';

export const FinanceDashboard = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  // const [authUser] = useAuth();

  const customerServiceSum = 1562.5;
  const monthBalance = -5437.5;

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ paddingBottom: theme.spacing(10) }}
    >
      <FinanceChat />

      {/* <Typography variant="h4" sx={{ mb: 5 }}>
        Olá, {authUser?.displayName}!
      </Typography> */}
      <Typography variant="h3" sx={{ mb: 5 }}>
        {t('page-finance-title')}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FinanceProgress />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          {/* <FinanceChat /> */}
          <FinanceHero />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <FinanceEvolution />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryWidget
            title={t('label-monthly-revenue')}
            total={customerServiceSum}
            color="success"
            icon={<PaidIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryWidget
            title={t('label-monthly-result')}
            total={monthBalance}
            color={monthBalance < 0 ? 'error' : 'success'}
            icon={monthBalance < 0 ? <ThumbDownIcon /> : <ThumbUpIcon />}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FinanceDashboard;
