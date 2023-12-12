import { Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Paid as PaidIcon } from '@mui/icons-material';
import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import { ThumbDown as ThumbDownIcon } from '@mui/icons-material';

// import { useAuth } from '@blockium/firebase';
import { SummaryWidget } from '@blockium/ui';

import { RevenueTable } from '../../table/revenue/RevenueTable';
import { FinanceEvolution } from './FinanceEvolution';
import FinanceChat from './FinanceChat';
import { CostTable } from '../../table/cost/CostTable';
// import FinanceHero from './FinanceHero';

export interface IFinanceDashboardProps {
  children?: React.ReactNode;
}

export const FinanceDashboard: React.FC<IFinanceDashboardProps> = (props) => {
  const theme = useTheme();
  // const [authUser] = useAuth();

  const customerServiceSum = 1562.5;
  const monthBalance = -5437.5;

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: theme.spacing(10) }}>
      {/* <Typography variant="h4" sx={{ mb: 5 }}>
        Olá, {authUser?.displayName}!
      </Typography> */}
      <Typography variant="h3" sx={{ mb: 5 }}>
        Painel Financeiro
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <RevenueTable />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <FinanceChat />
          {/* <FinanceHero /> */}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FinanceEvolution />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryWidget
            title="Receita no Mês"
            total={customerServiceSum}
            color="success"
            icon={<PaidIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryWidget
            title="Resultado no Mês"
            total={monthBalance}
            color={monthBalance < 0 ? 'error' : 'success'}
            icon={monthBalance < 0 ? <ThumbDownIcon /> : <ThumbUpIcon />}
          />
        </Grid>
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
        <Grid item xs={12} md={6} lg={8}>
          <CostTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FinanceDashboard;
