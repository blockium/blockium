import { useTranslation } from 'react-i18next';

import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { People as PeopleIcon } from '@mui/icons-material';

// import { useFirebaseUser } from '@blockium/firebase';
import { SummaryWidget } from '@blockium/ui';

import MarketingHero from './MarketingHero';

export const MarketingDashboard = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  // const [firebaseUser] = useFirebaseUser();

  const customerServiceCount = 12;
  const customerCount = 45;

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{ paddingBottom: theme.spacing(10) }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        {t('page-marketing-title')}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7} lg={8}>
          {/* <MarketingChat /> */}
          <MarketingHero />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={12}>
              <SummaryWidget
                title={t('label-monthly-services')}
                total={customerServiceCount}
                color="info"
                icon={<FavoriteIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <SummaryWidget
                title={t('label-customers')}
                total={customerCount}
                color="primary"
                icon={<PeopleIcon />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MarketingDashboard;
