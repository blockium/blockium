import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { People as PeopleIcon } from '@mui/icons-material';

// import { useAuth } from '@blockium/firebase';
import { SummaryWidget } from '@blockium/ui';

import { ServiceMaintenanceTable } from '../../components/table/serviceMaintenance/ServiceMaintenanceTable';
import { MarketingChat } from './MarketingChat';
import { BirthdayListTable } from '../../components/table/birthdayList/BirthdayListTable';

export const MarketingDashboard = () => {
  const theme = useTheme();
  // const [authUser] = useAuth();

  const customerServiceCount = 12;
  const customerCount = 45;

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: theme.spacing(10) }}>
      <Typography variant="h3" sx={{ mb: 5 }}>
        Painel de Marketing
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <ServiceMaintenanceTable />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MarketingChat />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <BirthdayListTable />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={12}>
              <SummaryWidget
                title="Atendimentos no Mês"
                total={customerServiceCount}
                color="info"
                icon={<FavoriteIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <SummaryWidget
                title="Clientes"
                total={customerCount}
                color="primary"
                icon={<PeopleIcon />}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <SummaryWidget
            title="Clientes"
            total={customerCount}
            color="primary"
            icon={<PeopleIcon />}
          />
        </Grid> */}
        {/* <Grid item xs={12}>
          <ProgressWidget />
        </Grid> */}
        {/* {customerServicesCount.length > 0 && (
          <Grid item xs={12} md={6} lg={4}>
            <PieChart
              title="Tipos de Atendimentos"
              chartData={customerServicesCount}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
                theme.palette.chart.green[0],
              ]}
            />
          </Grid>
        )} */}
      </Grid>
    </Container>
  );
};

export default MarketingDashboard;
