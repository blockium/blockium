import { Container, Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Paid as PaidIcon } from '@mui/icons-material';
import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import { ThumbDown as ThumbDownIcon } from '@mui/icons-material';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { People as PeopleIcon } from '@mui/icons-material';

// import { useAuth } from '@blockium/firebase';
import { SummaryWidget } from '@blockium/ui';
import { Revenue } from '../table/revenue/Revenue';
import { FinanceEvolution } from '../chart/finance/evolution/FinanceEvolution';

export interface IFinanceDashboardProps {
  children?: React.ReactNode;
}

export const Home: React.FC<IFinanceDashboardProps> = (props) => {
  const theme = useTheme();
  // const [authUser] = useAuth();

  const customerServiceSum = 2500;
  const customerServiceCount = 12;
  const monthBalance = -4500;
  const customerCount = 45;

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
          <Revenue />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Stack gap={3}>
            <FinanceEvolution />
            <SummaryWidget
              title="Receita no Mês"
              total={customerServiceSum}
              color="success"
              icon={<PaidIcon />}
            />
            <SummaryWidget
              title="Resultado no Mês"
              total={monthBalance}
              color={monthBalance < 0 ? 'error' : 'success'}
              icon={monthBalance < 0 ? <ThumbDownIcon /> : <ThumbUpIcon />}
            />
          </Stack>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
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
        <Grid item xs={12} sm={6} md={3}>
          <SummaryWidget
            title="Atendimentos no Mês"
            total={customerServiceCount}
            color="info"
            icon={<FavoriteIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
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

export default Home;
